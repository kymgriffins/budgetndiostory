import {
   capaybilities1,
   capaybilities2,
   capaybilities3,
   capaybilities4,
   client01,
   client02,
   client03,
   client04,
   insights1,
   insights2,
   insights3,
   latest1,
   latest2,
   nestle,
   officevibe,
   phase1,
   phase2,
   phase3,
   phase4,
   phase5,
   planetly,
   project1,
   project2,
   project3,
   project4,
   project5,
   project6,
   project7,
   project8,
   project9,
   publication1,
   publication2,
   publication3,
} from "@/public";

// Navbar
export const navbarItems = [
  {
    id: 1,
    title: "Services",
    href: "/services",
  },
  // {
  //    id: 2,
  //    title: "Our work",
  //    href: "/presentation",
  // },
  {
    id: 3,
    title: "About us",
    href: "/budgetndiostory",
  },
  // {
  //    id: 4,
  //    title: "Insights",
  //    href: "/insights",
  // },
  {
    id: 5,
    title: "Contact us",
    href: "/contact",
  },
  // {
  //    id: 6,
  //    title: "Case",
  //    href: "/case",
  // },
];

// Footer

export const footerItems = [
  {
    id: 1,
    title: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    id: 2,
    title: "Behance",
    href: "https://www.behance.com/",
  },
  {
    id: 3,
    title: "Facebook",
    href: "https://www.facebook.com/",
  },
  {
    id: 4,
    title: "Linkedin",
    href: "https://www.linkedin.com/",
  },
];

export const footernavbarItems = [
  // {
  //    id: 1,
  //    title: "Home",
  //    href: "/",
  // },
  {
    id: 2,
    title: "Services",
    href: "services",
  },
  // {
  //    id: 3,
  //    title: "Our work",
  //    href: "presentation",
  // },
  {
    id: 4,
    title: "About us",
    href: "budgetndiostory",
  },
  // {
  //    id: 5,
  //    title: "Insights",
  //    href: "insights",
  // },
  {
    id: 6,
    title: "Contact us",
    href: "contact",
  },
];

export const clientsItem = [
  {
    id: 1,
    website: "Kenya Ministry of Finance",
    href: "https://www.treasury.go.ke",
    title: "Services:",
    name: "Budget Analysis Team",
    src: client01,
    review:
      "Budget Ndio helped us break down complex national and county budgets into simple, youth-friendly presentations. Their visuals and storytelling made it easy for the public to understand revenue and expenditure priorities.",
    links: [
      { id: 1, title: "county budget guide", href: "/services" },
      { id: 2, title: "youth engagement deck", href: "/services" },
    ],
  },
  {
    id: 2,
    website: "Nairobi County Government",
    href: "https://nairobi.go.ke",
    title: "Services:",
    name: "Public Participation Unit",
    src: client02,
    review:
      "We collaborated to create presentations that educate Nairobi residents on how public funds are allocated and spent. The team ensured even young audiences could grasp key budget concepts.",
    links: [
      { id: 1, title: "interactive budget", href: "/services" },
      { id: 2, title: "policy review deck", href: "/services" },
      { id: 3, title: "county spending guide", href: "/services" },
    ],
  },
  {
    id: 3,
    website: "Kenya Youth Budget Forum",
    href: "https://www.kybf.or.ke",
    title: "Services:",
    name: "Forum Coordinators",
    src: client03,
    review:
      "Budget Ndio designed workshops and decks that help youth understand national and county budgets. The presentations were engaging, visually appealing, and very informative.",
    links: [
      { id: 1, title: "national budget deck", href: "/services" },
      { id: 2, title: "interactive learning", href: "/services" },
    ],
  },
  {
    id: 4,
    website: "Kenya Revenue Authority",
    href: "https://kra.go.ke",
    title: "Services:",
    name: "Public Awareness Team",
    src: client04,
    review:
      "The team transformed tax and budget data into clear, educational content for the public. This increased awareness of revenue sources and expenditure priorities among citizens.",
    links: [
      { id: 1, title: "tax & budget overview", href: "/services" },
      { id: 2, title: "youth engagement deck", href: "/services" },
    ],
  },
  //   {
  //     id: 5,
  //     website: "County Governments Association of Kenya",
  //     href: "https://cgakenya.org",
  //     title: "Services:",
  //     name: "CGA Knowledge Team",
  //     src: client05,
  //     review:
  //       "We created county-level budget visualization tools that make allocations, projects, and public spending understandable for all stakeholders, especially young people.",
  //     links: [
  //       { id: 1, title: "county allocations deck", href: "/services" },
  //       { id: 2, title: "public education tools", href: "/services" },
  //     ],
  //   },
  //   {
  //     id: 6,
  //     website: "Parliament of Kenya",
  //     href: "http://www.parliament.go.ke",
  //     title: "Services:",
  //     name: "Legislative Research Team",
  //     src: client06,
  //     review:
  //       "Budget Ndio produced clear visual briefs to explain national and county budget proposals to citizens, NGOs, and youth organizations. Engagement and comprehension improved greatly.",
  //     links: [
  //       { id: 1, title: "budget briefing deck", href: "/services" },
  //     ],
  //   },
  //   {
  //     id: 7,
  //     website: "Kenya Institute for Public Policy Research and Analysis (KIPPRA)",
  //     href: "https://www.kippra.or.ke",
  //     title: "Services:",
  //     name: "Research Team",
  //     src: client07,
  //     review:
  //       "We helped transform policy and budget research into easy-to-understand presentations, making policy recommendations more accessible to young people and civic groups.",
  //     links: [
  //       { id: 1, title: "policy deck", href: "/services" },
  //       { id: 2, title: "youth budget guide", href: "/services" },
  //     ],
  //   },
  //   {
  //     id: 8,
  //     website: "National Treasury Innovation Hub",
  //     href: "#",
  //     title: "Services:",
  //     name: "Innovation Team",
  //     src: client08,
  //     review:
  //       "Budget Ndio created engaging visual tools to make national budget data interactive and educational, bridging the knowledge gap for students and youth organizations.",
  //     links: [
  //       { id: 1, title: "interactive visual deck", href: "/services" },
  //       { id: 2, title: "public education toolkit", href: "/services" },
  //     ],
  //   },
  //   {
  //     id: 9,
  //     website: "Youth Civic Engagement Initiative",
  //     href: "#",
  //     title: "Services:",
  //     name: "David Otieno",
  //     src: client09,
  //     review:
  //       "They helped us create decks and materials that simplify budget and civic data for youth forums, workshops, and schools. The content was accessible and impactful.",
  //     links: [
  //       { id: 1, title: "youth engagement deck", href: "/services" },
  //       { id: 2, title: "budget literacy workshop", href: "/services" },
  //     ],
  //   },
];

export const projectItem = [
  {
    id: 1,
    title: "fyde",
    href: "/case/",
    src: project1,
    links: [
      {
        id: 1,
        title: "audit",
        href: "/services",
      },
      {
        id: 2,
        title: "copywriting",
        href: "/services",
      },
      {
        id: 3,
        title: "sales deck",
        href: "/services",
      },
      {
        id: 4,
        title: "slides design",
        href: "/services",
      },
    ],
  },
  {
    id: 2,
    title: "vise",
    href: "/case/",
    src: project2,
    links: [
      {
        id: 1,
        title: "agency",
        href: "/services",
      },
      {
        id: 2,
        title: "compony presentation",
        href: "/services",
      },
    ],
  },
  {
    id: 3,
    title: "trawa",
    href: "/case/",
    src: project3,
    links: [
      {
        id: 1,
        title: "brand identity",
        href: "/services",
      },
      {
        id: 2,
        title: "design research",
        href: "/services",
      },
      {
        id: 3,
        title: "investor deck",
        href: "/services",
      },
    ],
  },
  {
    id: 4,
    title: "premiumblend",
    href: "/case/",
    src: project4,
    links: [
      {
        id: 1,
        title: "brand template",
        href: "/services",
      },
    ],
  },
];

// services page

export const serviceProcessItems = [
  {
    id: 1,
    phase: "01. Phase",
    name: "Discovery",
    src: phase1,
    review:
      "We start by understanding the budget topic, your audience, and the story to tell. We explore what matters most to youth and communities, gathering insights and examples to make the budget relatable.",
    button: "read",
  },
  {
    id: 2,
    phase: "02. Phase",
    name: "Story Mapping",
    src: phase2,
    review:
      "We craft a narrative from the budget data, turning numbers into human stories. We decide which voices, examples, and stories will engage youth and explain how public money affects their lives.",
    button: "read",
  },
  {
    id: 3,
    phase: "03. Phase",
    name: "Creative Design",
    src: phase3,
    review:
      "We design visuals, infographics, short videos, and interactive elements to bring the stories to life. The focus is on clarity, curiosity, and cultural resonance — so youth can understand and share.",
    button: "read",
  },
  {
    id: 4,
    phase: "04. Phase",
    name: "Feedback & Co-Creation",
    src: phase4,
    review:
      "We present drafts to youth representatives, community members, and experts to ensure the story is relatable, accurate, and impactful. Feedback is incorporated before finalization.",
    button: "read",
  },
  {
    id: 5,
    phase: "05. Phase",
    name: "Launch & Engagement",
    src: phase5,
    review:
      "We publish the content across digital channels — website, social media, podcasts, and WhatsApp. The goal is to spark curiosity, conversations, and participation among Kenyan youth.",
    button: "read",
  },
];

export const serviceClientsItem = [
  {
    id: 1,
    website: "Kenya Ministry of Finance",
    href: "https://www.treasury.go.ke",
    title: "Services:",
    name: "Budget Analysts Team",
    src: client01,
    review:
      "Budget Ndio helped us break down complex county budget allocations into clear, youth-friendly presentations. The visuals and flow made it easy for the public to understand revenue and expenditure priorities.",
    links: [
      { id: 1, title: "county budget guide", href: "/services" },
      { id: 2, title: "youth engagement deck", href: "/services" },
    ],
  },
  {
    id: 2,
    website: "Nairobi County Government",
    href: "https://nairobi.go.ke",
    title: "Services:",
    name: "Public Participation Unit",
    src: client02,
    review:
      "We collaborated to create presentations that educate Nairobi residents on how public funds are spent. The team’s approach ensured that even young audiences could grasp key budget concepts.",
    links: [
      { id: 1, title: "interactive budget", href: "/services" },
      { id: 2, title: "policy review deck", href: "/services" },
    ],
  },
  {
    id: 3,
    website: "Kenya Youth Budget Forum",
    href: "https://www.kybf.or.ke",
    title: "Services:",
    name: "Forum Coordinators",
    src: client01,
    review:
      "Budget Ndio designed workshops and decks that help youth understand national and county budgets. The presentations were engaging, visually appealing, and very informative.",
    links: [
      { id: 1, title: "national budget deck", href: "/services" },
      { id: 2, title: "interactive learning", href: "/services" },
    ],
  },
  {
    id: 4,
    website: "Kenya Revenue Authority",
    href: "https://kra.go.ke",
    title: "Services:",
    name: "Public Awareness Team",
    src: client01,
    review:
      "The team transformed tax and budget data into clear, educational content for the public. This increased awareness of revenue sources and expenditure priorities among citizens.",
    links: [
      { id: 1, title: "tax & budget overview", href: "/services" },
      { id: 2, title: "youth engagement deck", href: "/services" },
    ],
  },
  {
    id: 5,
    website: "County Governments Association of Kenya",
    href: "https://cgakenya.org",
    title: "Services:",
    name: "CGA Knowledge Team",
    src: client01,
    review:
      "We created county-level budget visualization tools that make allocations, projects, and public spending understandable for all stakeholders, especially young people.",
    links: [
      { id: 1, title: "county allocations deck", href: "/services" },
      { id: 2, title: "public education tools", href: "/services" },
    ],
  },
  {
    id: 6,
    website: "Parliament of Kenya",
    href: "http://www.parliament.go.ke",
    title: "Services:",
    name: "Legislative Research Team",
    src: client01,
    review:
      "Budget Ndio produced clear visual briefs to explain national and county budget proposals to citizens, NGOs, and youth organizations. Engagement and comprehension improved greatly.",
    links: [{ id: 1, title: "budget briefing deck", href: "/services" }],
  },
  {
    id: 7,
    website: "Kenya Institute for Public Policy Research and Analysis (KIPPRA)",
    href: "https://www.kippra.or.ke",
    title: "Services:",
    name: "Research Team",
    src: client01,
    review:
      "We helped transform policy and budget research into easy-to-understand presentations, making policy recommendations more accessible to young people and civic groups.",
    links: [
      { id: 1, title: "policy deck", href: "/services" },
      { id: 2, title: "youth budget guide", href: "/services" },
    ],
  },
  {
    id: 8,
    website: "National Treasury Innovation Hub",
    href: "#",
    title: "Services:",
    name: "Innovation Team",
    src: client01,
    review:
      "Budget Ndio created engaging visual tools to make national budget data interactive and educational, bridging the knowledge gap for students and youth organizations.",
    links: [
      { id: 1, title: "interactive visual deck", href: "/services" },
      { id: 2, title: "public education toolkit", href: "/services" },
    ],
  },
];

export const serviceCapaybilitiesItem = [
  {
    id: 1,
    src1: capaybilities1,
    title1: "RAISE FUNDS:",
    review:
      "We help manage investor expectations and secure financing for your business with an excellent investor deck.Having a good product or illuminating ideas is not enough anymore.Poor investor presentation may close the door to potential financing right away.In contrast, a properly made investor deck provides investors with clarity, evokes confidence, and leaves them craving for more.",
    subTitle: "Projects",
    links1: [
      {
        id: 1,
        title: "investor deck",
        href: "/",
      },
      {
        id: 2,
        title: "startup pitch",
        href: "/",
      },
    ],
    src2: capaybilities2,
    title2: "SELL PRODUCTS:",
    links2: [
      {
        id: 1,
        title: "business proposal",
        href: "/",
      },
      {
        id: 2,
        title: "company presentation",
        href: "/",
      },
      {
        id: 3,
        title: "product presentation",
        href: "/",
      },
      {
        id: 4,
        title: "sales deck",
        href: "/",
      },
      {
        id: 5,
        title: "service deck",
        href: "/",
      },
    ],
  },
  {
    id: 2,
    src1: capaybilities3,
    title1: "HIRE & MANAGE PEOPLE:",
    review:
      "We help manage investor expectations and secure financing for your business with an excellent investor deck.Having a good product or illuminating ideas is not enough anymore.Poor investor presentation may close the door to potential financing right away.In contrast, a properly made investor deck provides investors with clarity, evokes confidence, and leaves them craving for more.",
    subTitle: "Projects",
    links1: [
      {
        id: 1,
        title: "big news deck",
        href: "/",
      },
      {
        id: 2,
        title: "branded template",
        href: "/",
      },
      {
        id: 3,
        title: "onboarding presentation",
        href: "/",
      },
      {
        id: 4,
        title: "policy deck & playbook",
        href: "/",
      },
      {
        id: 5,
        title: "progress report",
        href: "/",
      },
    ],
    src2: capaybilities4,
    title2: "ADDITIONAL:",
    links2: [
      {
        id: 1,
        title: "agency",
        href: "/",
      },
      {
        id: 2,
        title: "branding",
        href: "/",
      },
      {
        id: 3,
        title: "corporate training",
        href: "/",
      },
      {
        id: 4,
        title: "redesign",
        href: "/",
      },
      {
        id: 5,
        title: "review",
        href: "/",
      },
    ],
  },
];

export const expectationsItems = [
  {
    id: 1,
    title1: "01",
    subTitle1: "Youth-Centric Approach",
    btn: "read",
    para1:
      "Our work starts and ends with young people. We prioritize youth voices in every project, ensuring that budget stories are told from their perspective and resonate with their experiences. This approach builds trust and makes complex information accessible and relevant.",
  },
  {
    id: 2,
    title1: "04",
    subTitle1: "Data-Driven Storytelling",
    btn: "read",
    para1:
      "We combine accurate budget data with compelling narratives. Every presentation is grounded in verified information, transformed into engaging stories that educate while maintaining credibility. Our team ensures facts are presented clearly and impactfully.",
  },
  {
    id: 3,
    title1: "02",
    subTitle1: "Community Engagement",
    btn: "read",
    para1:
      "We are deeply rooted in Kenyan communities, working closely with local organizations, youth groups, and government partners. This connection allows us to create content that reflects real community needs and fosters meaningful civic participation.",
  },
  {
    id: 4,
    title1: "05",
    subTitle1: "Transparent Communication",
    btn: "read",
    para1:
      "We believe in open and honest collaboration. Throughout each project, we provide clear updates, welcome feedback, and ensure our clients understand the process. This transparency builds strong partnerships and delivers better results.",
  },
  {
    id: 5,
    title1: "03",
    subTitle1: "Holistic Process",
    btn: "read",
    para1:
      "We take a comprehensive approach to budget education, from initial research to final delivery and ongoing engagement. This ensures that our work not only informs but also inspires action and creates lasting impact in communities.",
  },
  {
    id: 6,
    title1: "06",
    subTitle1: "Continuous Learning",
    btn: "read",
    para1:
      "Budget landscapes evolve, and so do we. We stay updated on the latest budget policies, educational methods, and youth engagement strategies. This commitment to learning allows us to continuously improve and adapt our approach.",
  },
];

export const achiveItems = [
  {
    id: 1,
    title1: ["50,000+"],
    title2: ["200+"],
    subTitle1: "Youth educated on budgets",
    subTitle2: "Presentations created",
  },
  {
    id: 2,
    title1: ["15"],
    title2: ["95%"],
    subTitle1: "Counties covered",
    subTitle2: "Youth engagement rate",
  },
];

// presentation page

export const presentationProjectItem = [
  {
    id: 1,
    title: "fyde",
    src: project1,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "audit",
        href: "/services",
      },
      {
        id: 2,
        title: "copywriting",
        href: "services",
      },
      {
        id: 3,
        title: "sales deck",
        href: "services",
      },
      {
        id: 4,
        title: "slides design",
        href: "services",
      },
    ],
  },
  {
    id: 2,
    title: "trawa",
    src: project3,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "brand identity",
        href: "/services",
      },
      {
        id: 2,
        title: "design research",
        href: "services",
      },
      {
        id: 3,
        title: "investor deck",
        href: "services",
      },
    ],
  },
  {
    id: 3,
    title: "premium blend",
    src: project4,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "brand template",
        href: "/services",
      },
    ],
  },
  {
    id: 4,
    title: "planetly",
    src: project5,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "brand template",
        href: "/services",
      },
      {
        id: 2,
        title: "big news deck",
        href: "/services",
      },
      {
        id: 3,
        title: "branded template",
        href: "/services",
      },
      {
        id: 4,
        title: "investor deck",
        href: "/services",
      },
      {
        id: 5,
        title: "policy deck & playbook",
        href: "/services",
      },
      {
        id: 6,
        title: "sales deck",
        href: "/services",
      },
    ],
  },
  {
    id: 5,
    title: "black box",
    src: project8,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "investor deck",
        href: "/services",
      },
      {
        id: 2,
        title: "redesign",
        href: "/services",
      },
      {
        id: 3,
        title: "review",
        href: "/services",
      },
    ],
  },
  {
    id: 6,
    title: "vise",
    src: project2,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "agency",
        href: "/services",
      },
      {
        id: 2,
        title: "compony presentation",
        href: "services",
      },
    ],
  },
  {
    id: 7,
    title: "soft start",
    src: project9,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "brand template",
        href: "/services",
      },
      {
        id: 2,
        title: "sales desc",
        href: "/services",
      },
    ],
  },
  {
    id: 8,
    title: "officevibe",
    src: project7,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "brand template",
        href: "/services",
      },
    ],
  },
  {
    id: 9,
    title: "workiz easy",
    src: project6,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "onboarding presentation",
        href: "/services",
      },
      {
        id: 2,
        title: "policy deck & playbook",
        href: "/services",
      },
      {
        id: 3,
        title: "sales deck",
        href: "/services",
      },
    ],
  },
];

export const publicationItems = [
  {
    id: 1,
    title: "officevibe ppt template",
    src: publication1,
  },
  {
    id: 2,
    title: "trawa energy pitch deck",
    src: publication2,
  },
  {
    id: 3,
    title: "tech for ukraine",
    src: publication3,
  },
];

// insights page constants

export const insightsPublicationItems = [
  {
    id: 1,
    title: "Hii budget inakuathiri vipi? 👀",
    src: insights1,
  },
  {
    id: 2,
    title: "Who really benefits from this budget?",
    src: insights2,
  },
  {
    id: 3,
    title: "7 Budget Stories You Missed",
    src: insights3,
  },
];

export const latestItemss = [
  {
    id: 1,
    href: "/",
    src: latest1,
    links: [
      {
        id: 1,
        title: "public money",
      },
      {
        id: 2,
        title: "budget story",
      },
    ],
    title: "A budget was approved: <br/> What changed on the ground?",
    subTitle: "Field report from the community",
    date: "26 May 2023",
  },
  {
    id: 2,
    href: "/",
    src: latest2,
    links: [
      {
        id: 1,
        title: "county budget",
      },
    ],
    title: "From paper to reality: tracking a county budget promise.",
    subTitle: "On-the-ground budget story",
    date: "07 Dec 2022",
  },
];

// workiz page constants
export const workizItem = [
  {
    id: 1,
    title: "office vibe",
    src: project7,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "brand template",
        href: "/services",
      },
    ],
  },
  {
    id: 2,
    title: "planetly",
    src: project5,
    href: "/case/",
    links: [
      {
        id: 1,
        title: "brand template",
        href: "/services",
      },
      {
        id: 2,
        title: "big news deck",
        href: "/services",
      },
      {
        id: 3,
        title: "branded template",
        href: "/services",
      },
      {
        id: 4,
        title: "investor deck",
        href: "/services",
      },
      {
        id: 5,
        title: "policy deck & playbook",
        href: "/services",
      },
      {
        id: 6,
        title: "sales deck",
        href: "/services",
      },
    ],
  },
];

// about page constants

export const aboutPartberItems = [
  {
    id: 1,
    src: planetly,
    title: "Community Voices",
    para: "The team worked closely with young people on the ground to turn complex budget information into stories that were easy to understand and powerful to share. Their approach made public finance feel human, relatable, and worth paying attention to.",
  },
  {
    id: 2,
    src: officevibe,
    title: "Youth Creators Network",
    para: "Budget Ndio Story has a rare ability to explain serious issues without losing the audience. The stories were clear, engaging, and grounded in reality. Many young people said it was the first time they truly understood how the budget affects them.",
  },
  {
    id: 3,
    src: nestle,
    title: "Civil Society Partners",
    para: "Working with this team brought a fresh, credible way of communicating public spending. Their storytelling was accurate, non-partisan, and deeply connected to real communities. The impact and response were immediate and meaningful.",
  },
];

// contact page constants

export const FaqItems = [
  {
    id: 1,
    question: "Why is understanding the budget important for youth?",
    title: "Budget Awareness",
    description:
      "Knowing how government and county budgets work empowers young people to make informed decisions, participate in civic matters, and plan their personal finances effectively.",
    links: [
      {
        id: 1,
        title: 1,
        description:
          "Budget literacy helps youth understand where public funds are allocated and how policies affect communities.",
      },
      {
        id: 2,
        title: 2,
        description:
          "It also builds skills to manage personal finances, saving, and investment habits early in life.",
      },
    ],
    button: "read",
  },
  {
    id: 2,
    question: "How does the government budget impact my community?",
    title: "Local Impact",
    description:
      "Government and county budgets determine funding for schools, roads, healthcare, and local projects. Understanding these budgets helps you hold leaders accountable and see how public resources are used.",
    links: [
      {
        id: 1,
        title: 1,
        description:
          "You can track which sectors receive more funding and identify opportunities to advocate for underfunded areas.",
      },
    ],
    button: "read",
  },
  {
    id: 3,
    question: "How can I start learning about budgets and finances?",
    title: "Learning Resources",
    description:
      "Budget Ndio Story provides easy-to-understand guides, interactive tools, and youth-friendly content to make learning about budgets simple and engaging.",
    links: [
      {
        id: 1,
        title: 1,
        description:
          "Start with our simplified guides explaining national and county budgets step by step.",
      },
      {
        id: 2,
        title: 2,
        description:
          "Use our interactive tools to simulate budget allocations and see how decisions impact communities.",
      },
    ],
    button: "read",
  },
  {
    id: 4,
    question: "Can I influence how budget decisions are made?",
    title: "Youth Participation",
    description:
      "Yes! Understanding the budget equips you to participate in consultations, advocacy, and civic engagement initiatives organized by government or youth groups.",
    links: [
      {
        id: 1,
        title: 1,
        description:
          "Attend public forums, join youth councils, or use Budget Ndiyo’s platform to learn how to voice your ideas effectively.",
      },
    ],
    button: "read",
  },
  {
    id: 5,
    question: "Does Budget Ndio Story cover county-specific budgets?",
    title: "Local Focus",
    description:
      "Absolutely. We provide detailed insights on county budgets, highlighting local priorities, allocations, and expenditure trends.",
    links: [
      {
        id: 1,
        title: 1,
        description:
          "Compare how different counties allocate funds for education, healthcare, and infrastructure.",
      },
      {
        id: 2,
        title: 2,
        description:
          "Learn how your county spends taxes and discover opportunities to influence local development projects.",
      },
    ],
    button: "read",
  },
  {
    id: 6,
    question: "Why is bridging the budget education gap important?",
    title: "Financial Inclusion",
    description:
      "Many youth are excluded from understanding budgets and financial decisions that affect them.     Budget Ndio Story aims to bridge this gap, making budget education accessible, simple, and actionable.",
    links: [
      {
        id: 1,
        title: 1,
        description:
          "Knowledge is power – the more youth understand budgets, the more effectively they can plan, save, and participate in governance.",
      },
    ],
    button: "read",
  },
];

// edustories constants

export const edustoriesItems = [
  {
    id: 1,
    title: "The Hidden Story of County Budgets",
    description: "Explore how county governments allocate funds and the real impact on local communities.",
    videoSrc: "/homevideo.mp4", // Placeholder, use actual video
  },
  {
    id: 2,
    title: "Youth Voices in Budget Decisions",
    description: "Hear from young Kenyans on how budget policies affect their future and dreams.",
    videoSrc: "/workizvideo.mp4", // Placeholder
  },
  {
    id: 3,
    title: "From Taxes to Transformation",
    description: "A cinematic journey showing how your tax shillings build schools, roads, and hope.",
    videoSrc: "/homevideo.mp4", // Placeholder
  },
  {
    id: 4,
    title: "Budget Myths Busted",
    description: "Debunking common misconceptions about government spending and public finance.",
    videoSrc: "/workizvideo.mp4", // Placeholder
  },
  {
    id: 5,
    title: "The Power of Public Participation",
    description: "See how community involvement shapes budget priorities and local development.",
    videoSrc: "/homevideo.mp4", // Placeholder
  },
  {
    id: 6,
    title: "Future Leaders on Finance",
    description: "Young innovators share their visions for transparent and impactful budgeting.",
    videoSrc: "/workizvideo.mp4", // Placeholder
  },
];
