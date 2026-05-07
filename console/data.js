// Synthetic data for the Operator Console
window.DPF_DATA = {
  systemConfig: {
    MasterEnabled: true, DryRun: false,
    LegalEntityConfirmed: true, InsuranceBoundUntil: "2027-05-07",
    EtsyShopOwnerType: "business", DisclosureApprovedAt: "2026-04-12T14:00:00Z",
    DailyDiscoveryCap: 8, DailyApprovalsCap: 8,
    epsilon: 0.20, QAPassThreshold: 0.80,
    shopAge: 47   // days; days 31-90 → 8/day cap
  },
  kpis: {
    readyForReview: 7,
    approvedToday: 4,
    avgQAToday: 0.87,
    approvalRate7d: 0.74,
    stuckGenerating: 0,
    qaPassRate7d: 0.71
  },
  niches: [
    { id: "n_wedding",    name: "Wedding Planning",    score: 0.84, prevScore: 0.79, status: "Active",  pinned: false, weeklyRev: [142,168,195,231], products: 14 },
    { id: "n_homeschool", name: "Homeschool Worksheets", score: 0.71, prevScore: 0.74, status: "Active",  pinned: false, weeklyRev: [98,112,103,89], products: 11 },
    { id: "n_fitness",    name: "Fitness Trackers",    score: 0.68, prevScore: 0.55, status: "Active",  pinned: false, weeklyRev: [44,67,89,124], products: 8 },
    { id: "n_budget",     name: "Budget Planners",     score: 0.62, prevScore: 0.62, status: "Active",  pinned: true,  weeklyRev: [88,91,87,93], products: 9 },
    { id: "n_meal",       name: "Meal Planning",       score: 0.41, prevScore: 0.49, status: "Active",  pinned: false, weeklyRev: [62,55,48,41], products: 7 },
    { id: "n_party",      name: "Kids Birthday Parties", score: 0.34, prevScore: 0.40, status: "Active",  pinned: false, weeklyRev: [38,33,29,28], products: 5 },
    { id: "n_realestate", name: "Real Estate Marketing", score: 0.12, prevScore: 0.18, status: "Paused", pinned: false, weeklyRev: [14,9,4,2], products: 3 }
  ],
  reviewQueue: [
    { id: "p_001", name: "Modern Minimalist Wedding Day Timeline Template",
      niche: "Wedding Planning", type: "Printable", format: "Canva", interactive: false,
      qa: 0.93, design: 0.91, price: 8.50, marketAvg: 9.95,
      hero: "https://picsum.photos/seed/wed1/600/600",
      mockups: ["https://picsum.photos/seed/wed1a/300/300","https://picsum.photos/seed/wed1b/300/300","https://picsum.photos/seed/wed1c/300/300"],
      title: "Wedding Day Timeline Template | Editable Canva | Modern Minimalist | Printable Schedule Card | Instant Download",
      tagCount: 13, descLen: 1054, hasDisclosure: true,
      complaintsAddr: ["Generic templates feel impersonal","Hard to customize timing"],
      flags: []
    },
    { id: "p_002", name: "Fillable PDF Daily Workout Tracker",
      niche: "Fitness Trackers", type: "Printable", format: "Adobe", interactive: true, interactiveMethod: "Adobe_FillablePDF",
      qa: 0.89, design: 0.88, price: 6.75, marketAvg: 7.50,
      hero: "https://picsum.photos/seed/fit2/600/600",
      mockups: ["https://picsum.photos/seed/fit2a/300/300","https://picsum.photos/seed/fit2b/300/300","https://picsum.photos/seed/fit2c/300/300"],
      title: "Daily Workout Tracker | Fillable PDF | Auto-Calculating Set & Rep Log | Print or Tablet | Instant Download",
      tagCount: 13, descLen: 1142, hasDisclosure: true,
      complaintsAddr: ["No way to track progress over weeks","Required printing fresh copy daily"],
      flags: ["Interactive: 8 form fields"]
    },
    { id: "p_003", name: "Notion Wedding Budget Dashboard",
      niche: "Wedding Planning", type: "DigitalPlanner", format: "Notion", interactive: true, interactiveMethod: "Notion_Database",
      qa: 0.91, design: 0.94, price: 14.25, marketAvg: 16.00,
      hero: "https://picsum.photos/seed/wed3/600/600",
      mockups: ["https://picsum.photos/seed/wed3a/300/300","https://picsum.photos/seed/wed3b/300/300","https://picsum.photos/seed/wed3c/300/300"],
      title: "Wedding Budget Dashboard | Notion Template | Vendor Tracker | Guest List Database | Linked Views",
      tagCount: 13, descLen: 1218, hasDisclosure: true,
      complaintsAddr: ["Spreadsheets break when you customize","Lost track of vendor deposits"],
      flags: ["Interactive: 4 databases"]
    },
    { id: "p_004", name: "Homeschool Math Worksheet Bundle, Grade 3",
      niche: "Homeschool Worksheets", type: "Worksheet", format: "PDF", interactive: false,
      qa: 0.82, design: 0.79, price: 5.95, marketAvg: 6.95,
      hero: "https://picsum.photos/seed/hsa4/600/600",
      mockups: ["https://picsum.photos/seed/hsa4a/300/300","https://picsum.photos/seed/hsa4b/300/300","https://picsum.photos/seed/hsa4c/300/300"],
      title: "Grade 3 Math Worksheet Bundle | 30 Pages | Multiplication, Division, Word Problems | Print Ready",
      tagCount: 13, descLen: 894, hasDisclosure: true,
      complaintsAddr: ["Worksheets too easy or too hard","Lacked answer key"],
      flags: []
    },
    { id: "p_005", name: "Auto-Calculating Monthly Budget Spreadsheet",
      niche: "Budget Planners", type: "Template", format: "Sheets", interactive: true, interactiveMethod: "Sheets_Formulas",
      qa: 0.85, design: 0.83, price: 9.50, marketAvg: 10.95,
      hero: "https://picsum.photos/seed/bud5/600/600",
      mockups: ["https://picsum.photos/seed/bud5a/300/300","https://picsum.photos/seed/bud5b/300/300","https://picsum.photos/seed/bud5c/300/300"],
      title: "Monthly Budget Spreadsheet | Google Sheets | Auto-Calculating Categories | Savings Tracker",
      tagCount: 13, descLen: 1086, hasDisclosure: true,
      complaintsAddr: ["Manual math is tedious","Hard to see category overspend"],
      flags: ["Interactive: 23 formulas"]
    },
    { id: "p_006", name: "Wedding RSVP Card Set Editable Canva",
      niche: "Wedding Planning", type: "Printable", format: "Canva", interactive: false,
      qa: 0.81, design: 0.85, price: 7.25, marketAvg: 8.50,
      hero: "https://picsum.photos/seed/wed6/600/600",
      mockups: ["https://picsum.photos/seed/wed6a/300/300","https://picsum.photos/seed/wed6b/300/300","https://picsum.photos/seed/wed6c/300/300"],
      title: "Wedding RSVP Card Set | Editable Canva Template | 5x7 and 4x6 | Modern Botanical | Print at Home",
      tagCount: 13, descLen: 962, hasDisclosure: true,
      complaintsAddr: ["RSVP design clashed with invitation","Sizes wrong for envelope inserts"],
      flags: []
    },
    { id: "p_007", name: "Kids Party Activity Pack Pirates Theme",
      niche: "Kids Birthday Parties", type: "Printable", format: "PDF", interactive: false,
      qa: 0.78, design: 0.74, price: 4.95, marketAvg: 5.95,
      hero: "https://picsum.photos/seed/par7/600/600",
      mockups: ["https://picsum.photos/seed/par7a/300/300","https://picsum.photos/seed/par7b/300/300","https://picsum.photos/seed/par7c/300/300"],
      title: "Pirate Theme Kids Party Activity Pack | 12 Pages | Coloring, Bingo, Word Search | Instant Print",
      tagCount: 13, descLen: 832, hasDisclosure: true,
      complaintsAddr: ["Activities too short for party hour","Need both boys and girls themes"],
      flags: ["QA score below 0.80 — review carefully"]
    }
  ],
  recentLogs: [
    { ts: "07 May 14:32", sev: "info",     scen: "Production", stage: "B16.5", msg: "Visual dedup PASS: max 0.61 vs source, max 0.43 vs shop." },
    { ts: "07 May 14:28", sev: "info",     scen: "Production", stage: "B17", msg: "QA agent verdict Pass; score 0.93." },
    { ts: "07 May 14:11", sev: "warning",  scen: "Production", stage: "B16.5", msg: "Mockup variant LifestyleA 0.79 vs shop_recM034. Below reject threshold but flagged." },
    { ts: "07 May 13:54", sev: "error",    scen: "Production", stage: "B17", msg: "QA Fail: tag count 12, expected 13. Status=QA_Failed." },
    { ts: "07 May 13:02", sev: "info",     scen: "Discovery",  stage: "A14", msg: "Cap-aware trigger: 7/8 products created today; firing Scenario B for product_ids[7]." },
    { ts: "07 May 02:00", sev: "info",     scen: "Discovery",  stage: "A0", msg: "Pre-flight gate PASS. SystemConfig OK. InsuranceBoundUntil=2027-05-07." }
  ]
};
