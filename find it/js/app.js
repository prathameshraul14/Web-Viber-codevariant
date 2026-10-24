// FindIt - Main Client Application Logic & State Controller
(function() {
  'use strict';

  // 1. Initialize cases storage with enriched worldwide mock data
  if (!localStorage.getItem('findit_cases_v4') || !localStorage.getItem('findit_cases')) {
    localStorage.setItem('findit_cases', JSON.stringify(window.FindItData.cases));
    localStorage.setItem('findit_cases_v4', 'true');
  }

  // 2. Initialize default user profile
  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem('findit_user'));
  } catch (e) {
    storedUser = null;
  }
  if (!storedUser || !storedUser.name) {
    storedUser = Object.assign({}, window.FindItData.defaultUser);
    localStorage.setItem('findit_user', JSON.stringify(storedUser));
  }

  // 3. Initialize points and ensure 100% sync with user profile
  let storedPts = parseInt(localStorage.getItem('findit_points') || '0', 10);
  if (!storedPts || storedPts < 1500) {
    storedPts = storedUser.points || 2450;
    localStorage.setItem('findit_points', storedPts.toString());
  }
  // Guarantee user.points == findit_points
  if (storedUser.points !== storedPts) {
    storedUser.points = storedPts;
    localStorage.setItem('findit_user', JSON.stringify(storedUser));
  }

  // 4. Initialize sample transaction history if none
  if (!localStorage.getItem('findit_transactions')) {
    const initialTx = [
      { id: 'TX-901', title: 'Initial Global Helper Karma Grant', type: 'earn', points: 2000, date: 'Oct 18, 2024 · 09:30 AM', category: 'Welcome Bonus' },
      { id: 'TX-902', title: 'Safe Return: MacBook Air Charger (Central Library)', type: 'earn', points: 250, date: 'Oct 21, 2024 · 02:15 PM', category: 'Item Return' },
      { id: 'TX-903', title: 'Spatial Mesh Beacon Relay Contribution', type: 'earn', points: 150, date: 'Oct 23, 2024 · 11:45 AM', category: 'Mesh Network' },
      { id: 'TX-904', title: 'Intake Report: Beats Studio Pro Case', type: 'earn', points: 50, date: 'Oct 24, 2024 · 08:10 AM', category: 'AI Intake' }
    ];
    localStorage.setItem('findit_transactions', JSON.stringify(initialTx));
  }

  // 5. Initialize sample redeemed vouchers if none
  if (!localStorage.getItem('findit_redeemed_coupons')) {
    const initialVouchers = [
      {
        id: 'RD-01',
        partner: 'Starbucks Coffee',
        title: '₹500 Off Any Cold Brew or Frappuccino Order',
        category: 'Food & Beverage',
        code: 'FINDIT-SBUX-500',
        date: 'Oct 22, 2024',
        points: 1800,
        status: 'Active',
        expiry: 'Valid until Nov 30, 2024',
        logo: '☕'
      }
    ];
    localStorage.setItem('findit_redeemed_coupons', JSON.stringify(initialVouchers));
  }

  window.FindIt = {
    // Auth & Profile helpers
    getUser: function() {
      try {
        const u = JSON.parse(localStorage.getItem('findit_user'));
        if (u && u.name) {
          // Keep points strictly in sync
          u.points = this.getPoints();
          return u;
        }
        return window.FindItData.defaultUser;
      } catch (e) {
        return window.FindItData.defaultUser;
      }
    },

    setUser: function(user) {
      if (!user) return;
      if (typeof user.points === 'number') {
        localStorage.setItem('findit_points', user.points.toString());
      }
      localStorage.setItem('findit_user', JSON.stringify(user));
      localStorage.setItem('findit_logged_in', 'true');
      this.updateAllUI();
    },

    updateUserProfile: function(partial) {
      const current = this.getUser();
      const updated = Object.assign({}, current, partial);
      // Auto-compute initials avatar if name changes
      if (partial.name) {
        const parts = partial.name.trim().split(/\s+/);
        updated.avatar = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : parts[0].substring(0, 2).toUpperCase();
      }
      this.setUser(updated);
      this.toast('Profile Updated', 'Your profile details have been synchronized across all pages.', 'success');
      return updated;
    },

    isLoggedIn: function() {
      return localStorage.getItem('findit_logged_in') === 'true';
    },

    logout: function() {
      localStorage.removeItem('findit_logged_in');
      this.toast('Logged Out', 'You have been safely signed out.', 'info');
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 700);
    },

    // Points system - Single Source of Truth
    getPoints: function() {
      const pts = parseInt(localStorage.getItem('findit_points') || '2450', 10);
      return isNaN(pts) ? 2450 : pts;
    },

    addPoints: function(pts, reason = 'Platform Karma Reward') {
      const current = this.getPoints();
      const newTotal = current + pts;
      localStorage.setItem('findit_points', newTotal.toString());
      
      // Sync into user object
      try {
        const u = JSON.parse(localStorage.getItem('findit_user')) || Object.assign({}, window.FindItData.defaultUser);
        u.points = newTotal;
        localStorage.setItem('findit_user', JSON.stringify(u));
      } catch (e) {}

      // Log transaction
      this.recordTransaction({
        title: reason,
        type: 'earn',
        points: pts,
        category: 'Karma Reward'
      });

      this.updateAllUI();
      return newTotal;
    },

    deductPoints: function(pts, reason = 'Redeemed Voucher') {
      const current = this.getPoints();
      if (current < pts) return false;
      const newTotal = current - pts;
      localStorage.setItem('findit_points', newTotal.toString());

      // Sync into user object
      try {
        const u = JSON.parse(localStorage.getItem('findit_user')) || Object.assign({}, window.FindItData.defaultUser);
        u.points = newTotal;
        localStorage.setItem('findit_user', JSON.stringify(u));
      } catch (e) {}

      // Log transaction
      this.recordTransaction({
        title: reason,
        type: 'spend',
        points: pts,
        category: 'Redemption'
      });

      this.updateAllUI();
      return true;
    },

    // Transaction History
    getTransactions: function() {
      try {
        return JSON.parse(localStorage.getItem('findit_transactions')) || [];
      } catch (e) {
        return [];
      }
    },

    recordTransaction: function(tx) {
      const list = this.getTransactions();
      const d = new Date();
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const record = {
        id: 'TX-' + Math.floor(1000 + Math.random() * 9000),
        title: tx.title || 'Points Activity',
        type: tx.type || 'earn',
        points: tx.points || 0,
        date: tx.date || dateStr,
        category: tx.category || 'General'
      };
      list.unshift(record);
      localStorage.setItem('findit_transactions', JSON.stringify(list));
    },

    // Redeemed Coupons Vouchers
    getRedeemedCoupons: function() {
      try {
        return JSON.parse(localStorage.getItem('findit_redeemed_coupons')) || [];
      } catch (e) {
        return [];
      }
    },

    addRedeemedCoupon: function(coupon) {
      const list = this.getRedeemedCoupons();
      const d = new Date();
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const voucher = {
        id: 'RD-' + Math.floor(1000 + Math.random() * 9000),
        partner: coupon.partner || 'Partner Brand',
        title: coupon.title || 'Brand Voucher',
        category: coupon.category || 'Lifestyle',
        code: coupon.code || ('FINDIT-' + Math.random().toString(36).substring(2, 8).toUpperCase()),
        date: dateStr,
        points: coupon.points || 1500,
        status: 'Active',
        expiry: 'Valid for 30 days',
        logo: coupon.logo || '🎟️'
      };
      list.unshift(voucher);
      localStorage.setItem('findit_redeemed_coupons', JSON.stringify(list));
      return voucher;
    },

    // Cases Store
    getCases: function() {
      try {
        return JSON.parse(localStorage.getItem('findit_cases')) || window.FindItData.cases;
      } catch (e) {
        return window.FindItData.cases;
      }
    },

    addCase: function(newCase) {
      const cases = this.getCases();
      cases.unshift(newCase);
      localStorage.setItem('findit_cases', JSON.stringify(cases));
      this.addPoints(50, 'Reported Item Intake #' + (newCase.id || 'New'));
      return cases;
    },

    // Toast Notifications
    toast: function(title, message, type = 'success') {
      let toastEl = document.getElementById('findit-toast');
      if (!toastEl) {
        toastEl = document.createElement('div');
        toastEl.id = 'findit-toast';
        toastEl.className = 'fixed bottom-6 right-6 z-[9999] transform translate-y-24 opacity-0 pointer-events-none transition-all duration-300 flex items-center gap-3.5 bg-gray-900/95 backdrop-blur-md text-white px-5 py-4 rounded-2xl shadow-2xl border border-gray-700/80 max-w-md';
        document.body.appendChild(toastEl);
      }

      let iconHtml = '<div class="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold shrink-0">✓</div>';
      if (type === 'info') {
        iconHtml = '<div class="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">ℹ</div>';
      } else if (type === 'warning' || type === 'error') {
        iconHtml = '<div class="w-8 h-8 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center font-bold shrink-0">⚠</div>';
      }

      toastEl.innerHTML = `
        ${iconHtml}
        <div>
          <h5 class="text-sm font-bold text-white tracking-tight">${title}</h5>
          <p class="text-xs text-gray-300 mt-0.5 leading-relaxed">${message}</p>
        </div>
      `;

      toastEl.classList.remove('translate-y-24', 'opacity-0', 'pointer-events-none');
      if (window.toastTimer) clearTimeout(window.toastTimer);
      window.toastTimer = setTimeout(() => {
        toastEl.classList.add('translate-y-24', 'opacity-0', 'pointer-events-none');
      }, 4000);
    },

    // Centralized UI Synchronizer: Updates points and user on ANY active page
    updatePointsUI: function() {
      const points = this.getPoints();
      const formatted = points.toLocaleString();

      // Update all elements with points classes
      document.querySelectorAll('.js-reward-points, .js-karma-points, [data-user-points]').forEach(el => {
        if (el.dataset.pointsFormat === 'full') {
          el.innerHTML = `${formatted} <span class="text-xs text-orange-600 font-bold">pts</span>`;
        } else if (el.innerHTML.includes('pts') && !el.textContent.trim().endsWith('pts')) {
          el.innerHTML = `${formatted} <span class="text-xs text-orange-600 font-bold">pts</span>`;
        } else {
          el.textContent = formatted;
        }
      });

      const topbarPts = document.getElementById('topbar-points');
      if (topbarPts) topbarPts.textContent = formatted + ' pts';
    },

    updateUserUI: function() {
      const user = this.getUser();
      const points = this.getPoints();
      const formatted = points.toLocaleString();

      // User name
      document.querySelectorAll('#nav-user-name, .js-user-name').forEach(el => {
        el.textContent = user.name || 'Alex Morgan';
      });

      // First name only (welcome banner)
      document.querySelectorAll('#welcome-user-name, .js-user-firstname').forEach(el => {
        el.textContent = (user.name || 'Alex').split(' ')[0];
      });

      // Role
      document.querySelectorAll('#nav-user-role, .js-user-role').forEach(el => {
        el.textContent = user.role || 'Global Campus Helper';
      });

      // Avatar Initials
      document.querySelectorAll('#nav-user-avatar, .js-user-avatar').forEach(el => {
        el.textContent = user.avatar || 'AM';
      });

      // Email
      document.querySelectorAll('#menu-user-email, .js-user-email').forEach(el => {
        el.textContent = user.email || 'alex.morgan@domain.com';
      });

      // Campus ID
      document.querySelectorAll('.js-user-campus-id').forEach(el => {
        el.textContent = user.campusId || 'FINDIT-88492';
      });
    },

    updateAllUI: function() {
      this.updatePointsUI();
      this.updateUserUI();
    }
  };

  // Cross-Tab and Cross-Page Real-Time Sync via Storage Event
  window.addEventListener('storage', function(e) {
    if (e.key === 'findit_points' || e.key === 'findit_user' || e.key === 'findit_redeemed_coupons') {
      window.FindIt.updateAllUI();
    }
  });

  // Auto-run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.FindIt.updateAllUI();
    });
  } else {
    window.FindIt.updateAllUI();
  }
})();
