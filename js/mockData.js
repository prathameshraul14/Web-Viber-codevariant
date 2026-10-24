// FindIt - Mock Data & Campus State Store
window.FindItData = {
  // Current user defaults if not logged in
  defaultUser: {
    name: "Alex Morgan",
    email: "alex.morgan@domain.com",
    role: "People / Individual",
    points: 2450,
    avatar: "AM",
    campusId: "STU-88492",
    joinedDate: "Fall 2024"
  },

  // Active cases in the system
  cases: [
    {
      id: "CASE-1042",
      title: "AirPods Pro Case (2nd Gen)",
      category: "Electronics",
      status: "Match Found",
      type: "lost",
      matchScore: 87,
      date: "Oct 24, 2024",
      time: "11:30 AM",
      location: "William Central Library - 2nd Floor",
      hotspotId: "library",
      icon: "🎧",
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80",
      description: "White charging case with subtle dark blue silicone protective sleeve. Small scratch near hinge.",
      secretQuestion: "What color is the protective silicone sleeve and what charm is attached?",
      foundLocation: "Library Desk Turnstiles",
      foundBy: "Officer Martinez (Security Staff)",
      matchId: "FOUND-2091",
      actionRequired: "Verification Required",
      actionType: "verify"
    },
    {
      id: "CASE-1088",
      title: "Cobalt Blue Hydro Flask (32oz)",
      category: "Personal Gear",
      status: "Match Found",
      type: "lost",
      matchScore: 92,
      date: "Oct 23, 2024",
      time: "2:15 PM",
      location: "Student Innovation Center - Atrium",
      hotspotId: "union",
      icon: "🍶",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
      description: "Dark cobalt blue bottle covered in outdoor stickers including Yosemite and Redwoods stickers.",
      secretQuestion: "Name two specific national park stickers visible on the side.",
      foundLocation: "Union Ground Floor Cafe Counter",
      foundBy: "Barista Maya",
      matchId: "FOUND-2104",
      actionRequired: "Ready for Pickup at Hub",
      actionType: "pickup"
    },
    {
      id: "CASE-1102",
      title: "Campus Access Student ID Card",
      category: "Cards & IDs",
      status: "Match Found",
      type: "found",
      matchScore: 98,
      date: "Oct 24, 2024",
      time: "9:05 AM",
      location: "North Dining Hall - Register #3",
      hotspotId: "dining",
      icon: "🪪",
      image: "https://images.unsplash.com/photo-1589330694653-dad6bc0140fa?auto=format&fit=crop&w=600&q=80",
      description: "University plastic student ID badge in clear lanyard cardholder with green lanyard strap.",
      secretQuestion: "What is the 5-digit campus card number ending digits?",
      foundLocation: "North Dining Register",
      foundBy: "Dining Staff Robert",
      matchId: "LOST-3021",
      actionRequired: "Hub Handover Pending",
      actionType: "handover"
    },
    {
      id: "CASE-1115",
      title: "MacBook Pro 96W USB-C Charger",
      category: "Electronics",
      status: "Scanning Campus",
      type: "lost",
      matchScore: null,
      date: "Oct 24, 2024",
      time: "1:45 PM",
      location: "Engineering Hall B - Lab 304",
      hotspotId: "engineering",
      icon: "🔌",
      image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=600&q=80",
      description: "Original Apple 96W power brick with 2-meter braided white cable. Has green tape near the plug.",
      secretQuestion: "What color tape is wrapped around the plug end?",
      foundLocation: null,
      foundBy: null,
      matchId: null,
      actionRequired: "Active Radar Scanning",
      actionType: "scanning"
    },
    {
      id: "CASE-1120",
      title: "Car Key Ring with BMW Fob & Gym Tag",
      category: "Keys",
      status: "Deposited at Hub",
      type: "found",
      matchScore: 84,
      date: "Oct 23, 2024",
      time: "5:30 PM",
      location: "Varsity Sports Complex - Locker Room",
      hotspotId: "sports",
      icon: "🔑",
      image: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80",
      description: "Single electronic key fob with 2 metal locker keys and an orange 24-Hour Fitness barcode tag.",
      secretQuestion: "What color is the gym membership barcode keytag?",
      foundLocation: "Bench opposite Locker 42",
      foundBy: "Coach Evans",
      matchId: "LOST-3045",
      actionRequired: "Awaiting Claimant Proof",
      actionType: "verify"
    }
  ],

  // Interactive campus hotspots for the map
  hotspots: [
    {
      id: "library",
      name: "William Central Library",
      area: "North Quad",
      icon: "📚",
      x: 32, // percentage coordinates on map
      y: 28,
      itemsCount: 4,
      activeItems: [
        "AirPods Pro Case (Found)",
        "Calculus Textbook (Lost)",
        "Black North Face Beanie (Found)",
        "Apple Pencil 2nd Gen (Lost)"
      ],
      description: "High traffic recovery area. Security desk located at main turnstile entrance."
    },
    {
      id: "union",
      name: "Student Innovation Center",
      area: "Central Plaza",
      icon: "☕",
      x: 58,
      y: 42,
      itemsCount: 5,
      activeItems: [
        "Hydro Flask 32oz (Found)",
        "Wireless Mouse (Lost)",
        "Grey Patagonia Fleece (Found)",
        "RayBan Sunglasses Case (Lost)"
      ],
      description: "Primary gathering point with cafeteria, lounges, and Student Help Information desk."
    },
    {
      id: "dining",
      name: "North Dining Commons",
      area: "Residential Village",
      icon: "🍔",
      x: 22,
      y: 68,
      itemsCount: 3,
      activeItems: [
        "Student ID Card - Alex M. (Found)",
        "Black Umbrella (Lost)",
        "Dorm Key #214 (Found)"
      ],
      description: "Drop box located at manager register counter near entry doors."
    },
    {
      id: "engineering",
      name: "Engineering & Tech Complex",
      area: "South Science Quad",
      icon: "💻",
      x: 74,
      y: 65,
      itemsCount: 4,
      activeItems: [
        "MacBook Pro Charger (Lost)",
        "TI-84 Plus CE Calculator (Found)",
        "Soldering Safety Glasses (Lost)",
        "SanDisk 1TB SSD (Found)"
      ],
      description: "High tech drop locker available in Room 102 next to IT department."
    },
    {
      id: "sports",
      name: "Varsity Sports Pavilion",
      area: "West Athletics Field",
      icon: "🏀",
      x: 82,
      y: 25,
      itemsCount: 2,
      activeItems: [
        "Car Key Ring (Found)",
        "Nike Gym Duffel Bag (Lost)"
      ],
      description: "Equipment check-in desk acts as verified campus hub."
    }
  ],

  // Verified Secure Hubs
  hubs: [
    {
      id: "hub-1",
      name: "Blue Tokai Coffee Roasters",
      building: "Partner Cafe Hub",
      room: "Barista Escrow Counter",
      hours: "7:00 AM - 11:00 PM Daily",
      status: "Open Now",
      phone: "+1 (555) 019-2831",
      badge: "Partner Cafe",
      verified: true
    },
    {
      id: "hub-2",
      name: "HDFC Bank Branch Vault",
      building: "Commercial Banking Tower",
      room: "Secure Vault Custodian #4",
      hours: "9:30 AM - 4:00 PM",
      status: "Open Now",
      phone: "+1 (555) 019-4412",
      badge: "Secure Vault",
      verified: true
    },
    {
      id: "hub-3",
      name: "Central Metro Station Help Desk",
      building: "Central Metro Concourse",
      room: "Customer Care Booth A",
      hours: "24/7 Always Open",
      status: "Open Now",
      phone: "+1 (555) 019-8820",
      badge: "Transit Escrow",
      verified: true
    },
    {
      id: "hub-4",
      name: "Apollo Pharmacy 24/7",
      building: "Main Road Health Complex",
      room: "Night Manager Cashier",
      hours: "24/7 Always Open",
      status: "Open Now",
      phone: "+1 (555) 019-7751",
      badge: "24/7 Partner",
      verified: true
    }
  ],

  // Brand-Tiered Redeemable Reward Coupons (All strictly > 1500 points)
  coupons: [
    {
      id: "c-swiggy",
      title: "₹250 Gourmet Voucher",
      partner: "Swiggy Instamart & Gourmet",
      points: 1650,
      code: "SWIGGY-FINDIT-250",
      icon: "🛒",
      category: "food",
      badge: "Fast Delivery",
      description: "Valid on any gourmet food or grocery order above ₹499."
    },
    {
      id: "c-starbucks",
      title: "Free Tall Coffee & Pastry",
      partner: "Starbucks Reserve",
      points: 1850,
      code: "STARBUCKS-HERO-TALL",
      icon: "☕",
      category: "food",
      badge: "Popular Pick",
      description: "Valid on any handcrafted beverage and bakery item."
    },
    {
      id: "c-zomato",
      title: "Zomato Gold 3-Mo + ₹300 Off",
      partner: "Zomato Dining & Delivery",
      points: 1950,
      code: "ZOMATO-GOLD-FINDIT",
      icon: "🍔",
      category: "food",
      badge: "Dining Perk",
      description: "Complimentary 3-month Gold membership plus ₹300 off delivery."
    },
    {
      id: "c-uber",
      title: "₹500 Premier Ride Pass",
      partner: "Uber Premier & Intercity",
      points: 2200,
      code: "UBER-RECOVER-500",
      icon: "🚗",
      category: "travel",
      badge: "City Travel",
      description: "Flat ₹500 discount across any Premier, XL, or airport rides."
    },
    {
      id: "c-spotify",
      title: "3 Months Spotify Premium",
      partner: "Spotify Music",
      points: 2500,
      code: "SPOTIFY-FINDIT-3M",
      icon: "🎵",
      category: "entertainment",
      badge: "Best Music",
      description: "Ad-free uninterrupted high-fidelity streaming & offline downloads."
    },
    {
      id: "c-bms",
      title: "Buy 1 Get 1 Free IMAX Tickets",
      partner: "BookMyShow VIP",
      points: 2800,
      code: "BMS-IMAX-PASS",
      icon: "🎟️",
      category: "entertainment",
      badge: "Cinema Pass",
      description: "2 complimentary tickets for any IMAX / 4DX weekend screenings."
    },
    {
      id: "c-myntra",
      title: "Flat ₹1,000 Off Fresh Arrivals",
      partner: "Myntra Luxe & Fashion",
      points: 3400,
      code: "MYNTRA-LUXE-1000",
      icon: "👗",
      category: "shopping",
      badge: "Fashion Tier",
      description: "Valid on apparel, footwear, and accessories above ₹2,499."
    },
    {
      id: "c-decathlon",
      title: "₹1,200 Gear Voucher",
      partner: "Decathlon Sports",
      points: 3800,
      code: "DECATHLON-KARMA-1200",
      icon: "⛺",
      category: "shopping",
      badge: "Sport & Outdoor",
      description: "Redeemable in-store or online for sportswear and adventure equipment."
    },
    {
      id: "c-amazon",
      title: "₹1,500 Amazon Pay Balance",
      partner: "Amazon.in Prime",
      points: 4500,
      code: "AMAZON-PAY-1500",
      icon: "📦",
      category: "shopping",
      badge: "Universal Gift",
      description: "Instant gift balance added directly to your Amazon account."
    },
    {
      id: "c-sony",
      title: "25% Off Sony Noise-Cancelling ANC",
      partner: "Sony Center Official",
      points: 5800,
      code: "SONY-ANC-25OFF",
      icon: "🎧",
      category: "tech",
      badge: "Flagship Audio",
      description: "25% discount voucher on WH-1000XM5 headphones and WF series earbuds."
    },
    {
      id: "c-apple",
      title: "₹3,000 Apple Store Partner Credit",
      partner: "Apple Authorized Reseller",
      points: 7500,
      code: "APPLE-RECOVER-3000",
      icon: "🍎",
      category: "tech",
      badge: "Premium Tier",
      description: "Valid toward any iPad, Apple Watch, AirPods Pro, or Mac accessories."
    }
  ]
};
