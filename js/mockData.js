// FindIt - Mock Data & Campus State Store
window.FindItData = {
  // Current user defaults if not logged in
  defaultUser: {
    name: "Alex Morgan",
    email: "alex.m@campus.edu",
    role: "Student / Individual",
    points: 350,
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

  // Verified campus hubs
  hubs: [
    {
      id: "hub-1",
      name: "Campus Security Headquarters",
      building: "Building Alpha (Bldg A)",
      room: "Room 101 - Main Lobby",
      hours: "24/7 Always Open",
      status: "Open Now",
      phone: "(555) 019-2831",
      badge: "Official Central Depot",
      verified: true
    },
    {
      id: "hub-2",
      name: "Student Union Info Desk",
      building: "Student Innovation Center",
      room: "Level 1 Information Counter",
      hours: "8:00 AM - 9:00 PM Daily",
      status: "Open Now",
      phone: "(555) 019-4412",
      badge: "High Traffic Hub",
      verified: true
    },
    {
      id: "hub-3",
      name: "Central Library Circulation Counter",
      building: "William Central Library",
      room: "Ground Floor Atrium",
      hours: "7:30 AM - 11:30 PM",
      status: "Open Now",
      phone: "(555) 019-8820",
      badge: "Quiet Zone Recovery",
      verified: true
    },
    {
      id: "hub-4",
      name: "Campus Transit Station Hub",
      building: "North Depot Terminal",
      room: "Bus Terminal Office 3",
      hours: "6:00 AM - 10:00 PM",
      status: "Open Now",
      phone: "(555) 019-7751",
      badge: "Transit & Commuter",
      verified: true
    }
  ],

  // Redeemable reward coupons
  coupons: [
    {
      id: "c-1",
      title: "$5 Campus Coffee Voucher",
      partner: "Student Union Coffeehouse & Starbucks",
      points: 100,
      code: "BREW-FINDIT-5OFF",
      icon: "☕",
      badge: "Popular"
    },
    {
      id: "c-2",
      title: "20% Off Campus Bookstore",
      partner: "University Apparel & Supply Store",
      points: 200,
      code: "BOOK-RECOVER-20",
      icon: "📚",
      badge: "Best Value"
    },
    {
      id: "c-3",
      title: "Free Campus Metro Day Pass",
      partner: "City Transit Authority",
      points: 150,
      code: "METRO-CAMPUS-PASS",
      icon: "🚌",
      badge: "Transit"
    },
    {
      id: "c-4",
      title: "50 Free Cloud Printing Credits",
      partner: "Library IT Services",
      points: 75,
      code: "PRINT-SAFE-50",
      icon: "🖨️",
      badge: "Study Perk"
    }
  ]
};
