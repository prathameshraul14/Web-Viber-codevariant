// FindIt - Main Client Application Logic & State Controller
(function() {
  'use strict';

  // Initialize storage with enriched worldwide mock data (v4 with verified high-res imagery)
  if (!localStorage.getItem('findit_cases_v4') || !localStorage.getItem('findit_cases')) {
    localStorage.setItem('findit_cases', JSON.stringify(window.FindItData.cases));
    localStorage.setItem('findit_cases_v4', 'true');
  }
  if (!localStorage.getItem('findit_user')) {
    // If not logged in yet, keep default in memory or initial template
    localStorage.setItem('findit_user', JSON.stringify(window.FindItData.defaultUser));
  }
  // Initialize points for 1500+ coupon scale
  const storedPts = parseInt(localStorage.getItem('findit_points') || '0', 10);
  if (!storedPts || storedPts < 1500) {
    localStorage.setItem('findit_points', '2450');
  }

  window.FindIt = {
    // Auth helpers
    getUser: function() {
      try {
        return JSON.parse(localStorage.getItem('findit_user')) || window.FindItData.defaultUser;
      } catch (e) {
        return window.FindItData.defaultUser;
      }
    },
    setUser: function(user) {
      localStorage.setItem('findit_user', JSON.stringify(user));
      localStorage.setItem('findit_logged_in', 'true');
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

    // Points system
    getPoints: function() {
      return parseInt(localStorage.getItem('findit_points') || '2450', 10);
    },
    addPoints: function(pts) {
      const current = this.getPoints() + pts;
      localStorage.setItem('findit_points', current.toString());
      this.updatePointsUI();
      return current;
    },
    deductPoints: function(pts) {
      const current = this.getPoints();
      if (current < pts) return false;
      localStorage.setItem('findit_points', (current - pts).toString());
      this.updatePointsUI();
      return true;
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
      this.addPoints(50); // reward points for reporting
      return cases;
    },

    // Toast notifications
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

    // Update UI elements with points
    updatePointsUI: function() {
      const points = this.getPoints();
      document.querySelectorAll('.js-reward-points').forEach(el => {
        el.textContent = points;
      });
      document.querySelectorAll('.js-karma-points').forEach(el => {
        el.textContent = (points + 500);
      });
    }
  };

  // Run on page load
  document.addEventListener('DOMContentLoaded', function() {
    window.FindIt.updatePointsUI();
  });
})();
