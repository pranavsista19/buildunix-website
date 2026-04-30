export const siteUrl = "https://www.buildunix.com";
export const companyEmail = "info@buildunix.com";

export const siteMetadata = {
  name: "BuildUNIX",
  shortName: "BuildUNIX",
  tagline: "Digitizing Construction Execution",
  homeTitle: "BuildUNIX \u2014 Digitizing Construction Execution",
  homeDescription:
    "BuildUNIX is a construction execution platform for PMC firms in India. Phase-gated workflows, tamper-proof photo verification, and accountability. No chaos.",
  homeOgTitle: "BuildUNIX \u2014 Digitizing Construction Execution",
  homeOgDescription:
    "Phase-gated workflows, tamper-proof photo verification, and real-time site accountability for PMC-led construction.",
  aboutTitle: "Why Use BuildUNIX \u2014 Built for Indian PMC Firms",
  aboutDescription:
    "Why PMC-led projects choose BuildUNIX: hard-gated phase sequencing, tamper-proof photo evidence, formal snag tracking, live heatmaps, and AI daily reporting.",
  contactTitle: "Book a pilot \u2014 BuildUNIX Construction Platform",
  contactDescription:
    "Book a pilot and see BuildUNIX running on an active construction project. No pressure. Just a real walkthrough."
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Why BuildUnix", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const testimonials = [
  {
    quote: "Shipped in six days. Six. Our existing platform took eight months and we still weren't live. BuildUNIX works because it bends to our workflow.",
    name: "Tarun Kotti",
    role: "Vice President",
    company: "Aaditri Builders"
  },
  {
    quote: "The PMC approval gate changed everything. Our site managers can't skip steps anymore and our snag rate dropped by 40% in the first month.",
    name: "Anvith",
    role: "Director",
    company: "Techno Constructions"
  },
  {
    quote: "I get the AI report at 9 PM every day. My team stopped sending me WhatsApp updates — everything I need is already in the PDF.",
    name: "Krishnamurthy",
    role: "Managing Director",
    company: "Srijan Developers"
  }
];

export const faqs = [
  {
    q: "How long does it take to set up BuildUNIX on a new project?",
    a: "Under 7 days. We configure your project structure, load your phase template, assign roles, and train your PMC team. Your first pilot site is typically live within a week of signing."
  },
  {
    q: "Do contractors need to be tech-savvy to use it?",
    a: "No. The contractor interface is a single-purpose mobile app built for field use — capture a photo, label the slot, submit. The complexity lives in the backend, not in the crew's hands."
  },
  {
    q: "What happens when there's no internet on site?",
    a: "BuildUNIX is offline-first. Photos and metadata queue locally on-device, with full GPS, timestamp, and identity embedded at capture. When signal returns, everything syncs automatically in chronological order."
  },
  {
    q: "Can we customize the phase template for our project?",
    a: "Yes. Phases, subphases, dependency types, and approval chains are all configurable. The phase template is the starting point — your workflow always takes precedence."
  },
  {
    q: "Who has access to what in the system?",
    a: "Each of the 7 roles has precisely scoped access. PMC Engineers approve work. Contractors upload evidence. Project Managers see live heatmaps. Clients see assigned subphases only. Roles are non-overlapping by design."
  },
  {
    q: "Is there a free trial?",
    a: "Yes — we run a free 30-day pilot on your first project. No credit card required. A BuildUNIX engineer configures everything and stays available throughout the pilot."
  },
  {
    q: "How much does BuildUNIX cost?",
    a: "We do not show fixed pricing as it depends heavily on your project size, complexity, and specific requirements. Contact us to get a custom quote tailored to your workflow."
  }
];


export const heroContent = {
  eyebrow: "Construction Execution Platform \u00B7 India",
  headlineLead: "Construction runs on",
  initialHeadlineTail: "WhatsApp and chaos.",
  finalHeadlineTail: "BuildUNIX changes that.",
  subheadline:
    "A phase-enforced construction operating system built for Indian PMC firms. Mandatory photo documentation. Real-time progress heatmaps. AI-generated daily reports. PMC approval is the only unlock trigger.",
  primaryCta: "Book a pilot",
  secondaryCta: "See How It Works",
  proof:
    "Piloted on a \u20B91,200 Cr site in Hyderabad \u00B7 Built for PMC firms, contractors, and developers"
};

export const problemStats = [
  {
    value: "\u20B92-5 L",
    accent: true,
    label: "average cost of a single rework incident due to sequencing errors."
  },
  {
    value: "0 Checks",
    accent: false,
    label: "when critical work sequences are decided by an unrecorded phone call."
  },
  {
    value: "9:00 PM",
    accent: true,
    label: "when BuildUnix delivers your AI site report \u2014 fully automated."
  }
];

export const phaseNames = [
  "Excavation & Footings",
  "RCC Framework",
  "Masonry & Brickwork",
  "MEP Rough-ins",
  "Plastering & Internal",
  "Finishing & Woodwork",
  "External & Landscape",
  "Final Handover"
];

export const howItWorksSteps = [
  {
    id: "structure",
    label: "Step 1",
    title: "Everything starts with structure.",
    body:
      "Create your project, add blocks, and BuildUnix auto-loads your phase template with pre-configured dependency logic. No setup headache. No missed phases.",
    visual: "structure"
  },
  {
    id: "upload",
    label: "Step 2",
    title: "Native camera documentation.",
    body:
      "Every subphase requires Pre, During, and Post photos captured from the native camera on-site. Gallery uploads are hard-blocked. GPS, UTC timestamp, SHA-256 hash, and identity are embedded instantly.",
    visual: "upload"
  },
  {
    id: "verify",
    label: "Step 3",
    title: "PMC Engineers hold the keys.",
    body:
      "When work is submitted, the PMC Engineer is notified. They inspect the tamper-proof photos. One tap to approve \u2014 or raise a formal snag. No subphase can be skipped.",
    visual: "verify"
  },
  {
    id: "track",
    label: "Step 4",
    title: "Management sees everything, live.",
    body:
      "A live color-coded heatmap shows the status of every phase across every block. Grey is locked. Yellow is uploading. Blue is awaiting PMC. Green is approved. Red is a snag. Updated in under 2 seconds.",
    visual: "track"
  },
  {
    id: "report",
    label: "Step 5",
    title: "AI writes your daily report.",
    body:
      "A full narrative PDF \u2014 timeline, gallery, snag summary, and completion stats \u2014 is generated by AI and delivered automatically at 9 PM. Zero manual input.",
    visual: "report"
  }
];

export const featureCards = [
  {
    title: "Dependency Engine",
    icon: "flow",
    description:
      "Pre-configured with a phase template for Indian residential construction \u2014 fully customizable to match your project structure. Hard gates, not suggestions."
  },
  {
    title: "Tamper-Proof Docs",
    icon: "camera",
    description:
      "Pre, During, and Post slots. Native camera only. Every photo embeds GPS, UTC timestamp, and a verifiable SHA-256 cryptographic hash."
  },
  {
    title: "Four-Type Snags",
    icon: "snag",
    description:
      "PMC, Safety, MEP, and Client QC snags. PMC snags block workflow. Safety and MEP snags block final phase completion. Full resolution threads."
  },
  {
    title: "Live Heatmap",
    icon: "heatmap",
    description:
      "A color-coded grid updates within 2 seconds of every action. Drill from company to project, block, phase, and subphase without losing context."
  },
  {
    title: "AI Daily Reports",
    icon: "report",
    description:
      "Structured PDF narratives generated at 9 PM with a chronological timeline, photo gallery, snag summary, progress metrics, and flagged items."
  },
  {
    title: "Offline Field Mode",
    icon: "offline",
    description:
      "Photos and metadata queue securely on-device, then sync in chronological order after reconnect. Supports high-volume offline capture in live site conditions."
  },
  {
    title: "Role-Based Visibility",
    icon: "report",
    description:
      "Distinct roles for PMC Engineers, Contractors, PMs, and Clients — ensuring each stakeholder gets exactly the view and permissions their job requires."
  }
];

export const roles = [
  {
    id: "pmc",
    title: "PMC Engineer",
    summary: "The primary role for approving work and unlocking the next phase."
  },
  {
    id: "contractor",
    title: "Contractor",
    summary: "Built for field execution. Capture work, submit evidence, and resolve snags."
  },
  {
    id: "pm",
    title: "Project Manager",
    summary: "A live command center for progress, risk, and accountability across the entire site."
  },
  {
    id: "client-qc",
    title: "Client QC",
    summary: "Quality control visibility with a formal path to raise quality concerns."
  },
  {
    id: "safety-mep",
    title: "Safety & MEP",
    summary: "Department-level visibility for safety and technical clearances."
  },
  {
    id: "company-admin",
    title: "Company Admin",
    summary: "Executive read-only visibility across every project under the company."
  }
];

export const trustColumns = [
  {
    title: "The Financial Case",
    body:
      "Rework incidents on Indian construction sites routinely cost \u20B92-5 lakh per occurrence. BuildUnix prevents the sequencing errors that cause them. Payback period: under 90 days."
  },
  {
    title: "The Accountability Model",
    body:
      "Every photo is GPS-tagged, timestamped to the second of capture, and signed with the uploader's identity. Every approval is logged. Every snag has a thread. Nothing is verbal. Nothing is deniable."
  },
  {
    title: "The AI Intelligence Layer",
    body:
      "At 9 PM every evening, a full AI-generated narrative site report is delivered automatically to Project Managers and configured stakeholders. Chronological activity log. Photo gallery. Snag summary. Zero manual effort."
  }
];

export const statBarItems = [
  { value: "Configurable", label: "Phase template" },
  { value: 7, label: "User Roles" },
  { value: 6, label: "Dependency Types" },
  { value: 0, prefix: "\u20B9", label: "Manual Reporting Cost" },
  { value: 2, prefix: "< ", label: "sec Real-Time Sync" }
];

export const whyBuildUnixReasons = [
  {
    title: "Sequencing errors become impossible",
    body:
      "The dependency engine hard-gates every subphase. If the required predecessor is not PMC-approved, the next step stays locked. No workaround. No verbal override."
  },
  {
    title: "Every milestone has real evidence",
    body:
      "Pre, During, and Post photos are mandatory. Native camera only. Every image carries GPS coordinates, UTC timestamp, user identity, and a SHA-256 integrity hash."
  },
  {
    title: "PMC approvals move faster",
    body:
      "When contractors submit work, PMC Engineers get an instant notification and can inspect photo evidence in real time instead of waiting for the next physical site visit."
  },
  {
    title: "Defects become formal workflows",
    body:
      "PMC, Safety, MEP, and Client QC issues are raised as structured snag tickets with threaded evidence and mandatory resolution photos instead of disappearing into calls and chats."
  },
  {
    title: "Management sees the site live",
    body:
      "Color-coded heatmaps show every phase, block, and subphase in real time. Teams stop relying on screenshots, weekly calls, and reactive escalation."
  },
  {
    title: "Reporting happens automatically",
    body:
      "At 9 PM, BuildUnix generates a narrative PDF with site activity, photos, progress, open snags, and flagged anomalies. No one has to manually compile the day."
  }
];

export const whyBuildUnixStats = [
  {
    value: "\u20B92-5 L",
    label: "rework cost avoided per incident when sequencing errors are prevented"
  },
  {
    value: "<90 Days",
    label: "payback period for subscribing firms, based on the investor guide"
  },
  {
    value: "128+",
    label: "subphases tracked across the built-in phase template"
  },
  {
    value: "<2 sec",
    label: "real-time heatmap update latency for live site visibility"
  }
];

export const whyBuildUnixFit = [
  {
    title: "Built for PMC-led projects",
    body:
      "The system is strongest on projects where PMC approval is already the operational truth but the enforcement and evidence trail are missing."
  },
  {
    title: "Designed for multi-block execution",
    body:
      "It fits sites with multiple towers, simultaneous trades, and many active subphases where WhatsApp coordination breaks down fastest."
  },
  {
    title: "Ready for Indian site reality",
    body:
      "Offline capture, sunlight-readable mobile flows, and built-in Indian construction phase coverage make it practical on actual sites, not just in demos."
  }
];

export const whyBuildUnixMoat = [
  {
    title: "India-native phase template",
    body:
      "The platform is pre-configured for Indian residential construction rather than asking teams to rebuild their workflow inside a generic Western SaaS tool."
  },
  {
    title: "6-type dependency engine",
    body:
      "Sequential, Parallel, Merge, Independent, Nested Sequential, and Final Parallel Check logic allow real construction sequencing to be enforced instead of merely tracked."
  },
  {
    title: "Daily compliance record by default",
    body:
      "The audit trail grows automatically: approvals, photos, snags, comments, and AI reports accumulate into a defensible project record that gets more valuable over time."
  }
];

export const contactReasons = [
  {
    title: "See the dependency engine live",
    body:
      "Watch how our phase template enforces sequencing with real PMC approval gates and real snag flows."
  },
  {
    title: "Understand the financial case",
    body:
      "We'll walk you through exactly how BuildUnix prevents the \u20B92-5 lakh rework incidents that PMC firms currently absorb."
  },
  {
    title: "See your role's interface",
    body:
      "Whether you're a PMC Engineer, Project Manager, or Developer, we'll show you exactly what your team will see."
  },
  {
    title: "Piloted on a \u20B91,200 Cr site",
    body:
      "BuildUnix isn't theoretical. It was designed for and tested against a major Hyderabad construction project."
  }
];

export const formOptions = {
  roles: [
    "PMC Engineer",
    "Project Manager",
    "Developer",
    "Contractor",
    "Other"
  ],
  projectSizes: [
    "Under \u20B950 Cr",
    "\u20B950-200 Cr",
    "\u20B9200-500 Cr",
    "\u20B9500 Cr+",
    "Not sure"
  ]
};

export const footerColumns = [
  {
    title: "Product",
    links: [
      { label: "How It Works", href: "/product#how-it-works" },
      { label: "Features", href: "/product#features" },
      { label: "Why BuildUnix", href: "/about" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "Why BuildUnix", href: "/about" }
    ]
  },
  {
    title: "Contact",
    links: [
      { label: companyEmail, href: `mailto:${companyEmail}` },
      { label: "Book a pilot", href: "/contact" }
    ]
  }
];
