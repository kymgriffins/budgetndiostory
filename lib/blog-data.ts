// Blog Mock Data with comprehensive sample posts
import { BlogPost, calculateReadTime } from "./blog-types";

const now = new Date().toISOString();

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Kenya's County Budget Process",
    slug: "understanding-kenya-county-budget-process",
    excerpt:
      "A deep dive into how county governments allocate funds and where citizens can influence the budget process.",
    content: `
# Understanding Kenya's County Budget Process

Kenya's devolved government system, established under the 2010 Constitution, gives county governments significant powers over local development. However, many citizens remain unaware of how these budgets are created and implemented.

## The Budget Cycle

The county budget process follows a structured annual cycle:

1. **County Budget Review and Outlook Paper (CBROP)** - July
2. **County Fiscal Strategy Paper (CFSP)** - February
3. **Budget Estimates** - April
4. **Finance Bill** - June
5. **Final Budget Approval** - June 30

## Where Citizens Can Participate

Citizens can participate at multiple stages:
- Submit written memoranda during public participation forums
- Attend ward-level budget consultations
- Review budget documents on county websites
- Engage with County Assembly representatives

## Key Takeaways

Understanding the budget process empowers citizens to hold their leaders accountable and ensure public resources serve community needs.
    `,
    category: "Governance",
    author: {
      id: "1",
      name: "Sarah Muthoni",
      role: "Senior Budget Analyst",
      bio: "Former civil servant with 15 years of experience in public finance management.",
    },
    tags: ["budget", "governance", "citizen participation", "county"],
    status: "published",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-12T14:30:00Z",
    publishedAt: "2025-01-12T14:30:00Z",
    readTime: calculateReadTime(
      "A deep dive into how county governments allocate funds",
    ),
    featured: true,
    seo: {
      title: "Understanding Kenya's County Budget Process | Budget Ndio Story",
      description:
        "Learn how county budgets are created and where citizens can participate.",
      keywords: [
        "county budget",
        "devolution",
        "citizen participation",
        "Kenya",
      ],
    },
  },
  {
    id: "2",
    title: 'The Hidden Costs of "Free" Primary Education',
    slug: "hidden-costs-free-primary-education",
    excerpt:
      "While tuition is free, Kenyan families still pay significant fees. Our investigation reveals the true cost of primary education.",
    content: `
# The Hidden Costs of "Free" Primary Education

Since 2003, Kenya has maintained a policy of Free Primary Education. But for many families, the costs haven't disappeared—they've just shifted.

## What Parents Actually Pay

Our investigation across 15 counties found that parents pay an average of Ksh 4,500 per child annually in:
- Building fund contributions
- Activity fees
- Examination fees
- Uniform requirements
- Learning materials

## The Reality in Rural Areas

In counties like Turkana and Marsabit, these costs can represent up to 30% of household income, creating barriers that undermine the policy's goals.

## Recommendations

1. Transparent fee disclosure by schools
2. Enhanced capitation from national government
3. Community monitoring of fee collection
4. Support for the most vulnerable families
    `,
    category: "Education",
    author: {
      id: "2",
      name: "James Kariuki",
      role: "Investigative Journalist",
      bio: "Award-winning journalist specializing in education and social justice.",
    },
    tags: ["education", "free primary education", "costs", "inequality"],
    status: "published",
    createdAt: "2025-01-08T09:00:00Z",
    updatedAt: "2025-01-08T09:00:00Z",
    publishedAt: "2025-01-08T09:00:00Z",
    readTime: calculateReadTime(
      "While tuition is free, Kenyan families still pay",
    ),
    featured: true,
    seo: {
      title: "The Hidden Costs of Free Primary Education | Budget Ndio Story",
      description:
        'Investigation into what Kenyan families actually pay for "free" primary education.',
      keywords: ["education", "primary education", "costs", "Kenya"],
    },
  },
  {
    id: "3",
    title: "Tracking Health Equipment in Nairobi County",
    slug: "tracking-health-equipment-nairobi-county",
    excerpt:
      "We traced Ksh 2.3 billion in health equipment purchases. Here's what we found.",
    content: `
# Tracking Health Equipment in Nairobi County

In 2023, Nairobi County allocated Ksh 2.3 billion for medical equipment. We filed requests under the Access to Information Act to trace these purchases.

## Our Findings

Of the 47 health facilities we surveyed:
- 31% had no record of equipment deliveries
- 18% received equipment incompatible with existing infrastructure
- 23% lacked staff trained to operate new equipment

## Case Study: Embakasi Health Center

We visited Embakasi Health Center, which was allocated ultrasound machines in 2023. Twelve months later, the machines remain in their original boxes.

> "We have the machines, but no one trained to use them and no space to install them," - Facility Manager

## What Needs to Change

1. Better coordination between procurement and facility needs
2. Training budgets tied to equipment purchases
3. Transparent tracking systems
4. Accountability for undelivered equipment
    `,
    category: "Health",
    author: {
      id: "3",
      name: "Dr. Achieng Ochieng",
      role: "Health Policy Researcher",
      bio: "Public health specialist with focus on resource allocation.",
    },
    tags: ["health", "equipment", "procurement", "Nairobi"],
    status: "published",
    createdAt: "2025-01-05T11:00:00Z",
    updatedAt: "2025-01-05T11:00:00Z",
    publishedAt: "2025-01-05T11:00:00Z",
    readTime: calculateReadTime(
      "We traced Ksh 2.3 billion in health equipment",
    ),
    featured: false,
    seo: {
      title: "Tracking Health Equipment in Nairobi County | Budget Ndio Story",
      description:
        "Investigation into Ksh 2.3 billion health equipment purchases.",
      keywords: ["health", "equipment", "Nairobi", "procurement"],
    },
  },
  {
    id: "4",
    title: "Youth Employment Programs: Where Did the Money Go?",
    slug: "youth-employment-programs-money",
    excerpt:
      "Ksh 5 billion was allocated for youth employment last year. We tracked every shilling.",
    content: `
# Youth Employment Programs: Where Did the Money Go?

The Kenya Youth Employment and Opportunities Project (KYEOP) has allocated over Ksh 5 billion since 2020. We analyzed budget documents and interviewed beneficiaries to understand the impact.

## Budget Breakdown

- Training programs: 35%
- Micro-grants: 40%
- Administration: 20%
- Monitoring: 5%

## The Beneficiary Experience

We spoke with 50 youth across 5 counties who participated in the program. Only 23 reported receiving the full training package promised.

### Success Story

> "The training helped me start my tailoring business. The grant wasn't much, but the skills were valuable." - Grace, 24, Kisumu

### Challenges

- Delayed payments
- Limited follow-up support
- Mismatch between training and job market needs
- Geographic bias toward urban areas
    `,
    category: "Youth",
    author: {
      id: "4",
      name: "Peninah L.",
      role: "Youth Advocate",
      bio: "Former beneficiary turned advocate for youth employment programs.",
    },
    tags: ["youth", "employment", "KYEOP", "jobs"],
    status: "published",
    createdAt: "2025-01-03T08:00:00Z",
    updatedAt: "2025-01-03T08:00:00Z",
    publishedAt: "2025-01-03T08:00:00Z",
    readTime: calculateReadTime(
      "Ksh 5 billion was allocated for youth employment",
    ),
    featured: false,
    seo: {
      title: "Youth Employment Programs Investigation | Budget Ndio Story",
      description: "Tracking Ksh 5 billion in youth employment funding.",
      keywords: ["youth", "employment", "jobs", "Kenya"],
    },
  },
  {
    id: "5",
    title: "Water Projects: The Makueni Case Study",
    slug: "water-projects-makueni-case-study",
    excerpt:
      "Three years, Ksh 800 million, and still no water. How budget promises failed Makueni communities.",
    content: `
# Water Projects: The Makueni Case Study

In 2021, Makueni County allocated Ksh 800 million for rural water infrastructure. Three years later, many communities still lack access to clean water.

## The Original Plan

The county planned to:
- Drill 50 new boreholes
- Rehabilitate 30 existing water points
- Install 20 solar-powered water systems
- Connect 5,000 households to piped water

## What Actually Happened

Our field verification revealed:
- Only 18 boreholes drilled (36% of target)
- 12 rehabilitations completed (40% of target)
- 3 solar systems installed (15% of target)
- 0 household connections made (0% of target)

## Community Perspectives

> "We voted for leaders who promised water. Four years later, we still walk 5 kilometers to the river." - Village Elder, Makueni

## Investigation Ongoing

This investigation is part of our ongoing Water Watch series. We're filing additional requests to understand where the money was actually spent.
    `,
    category: "Water",
    author: {
      id: "5",
      name: "Samuel T.",
      role: "Investigative Reporter",
      bio: "Data journalist focusing on infrastructure and development.",
    },
    tags: ["water", "infrastructure", "Makueni", "rural"],
    status: "published",
    createdAt: "2024-12-28T10:00:00Z",
    updatedAt: "2024-12-28T10:00:00Z",
    publishedAt: "2024-12-28T10:00:00Z",
    readTime: calculateReadTime(
      "Three years, Ksh 800 million, and still no water",
    ),
    featured: true,
    seo: {
      title: "Water Projects Makueni Case Study | Budget Ndio Story",
      description:
        "How Ksh 800 million water project failed Makueni communities.",
      keywords: ["water", "infrastructure", "Makueni", "rural development"],
    },
  },
  {
    id: "6",
    title: "Analysis: Agriculture Sector Budget Trends 2020-2024",
    slug: "agriculture-sector-budget-trends-2020-2024",
    excerpt:
      "Five years of agricultural spending analyzed. What the numbers tell us about food security priorities.",
    content: `
# Analysis: Agriculture Sector Budget Trends 2020-2024

We analyzed five years of national and county agricultural budgets to understand funding patterns and their implications for food security.

## National Budget Trends

The national allocation to agriculture has fluctuated between 2-4% of the total budget, well below the 10% target set by the Maputo Declaration.

### Year-by-Year Breakdown

| Year | Allocation (Billion Ksh) | % of Total Budget |
|------|-------------------------|-------------------|
| 2020 | 45.2 | 2.1% |
| 2021 | 52.8 | 2.3% |
| 2022 | 58.4 | 2.5% |
| 2023 | 61.2 | 2.4% |
| 2024 | 68.5 | 2.8% |

## County-Level Variations

Spending patterns vary significantly across counties, with some prioritizing agriculture while others reduce allocations.

## Implications

1. Inadequate funding undermines food security goals
2. Dependence on rain-fed agriculture continues
3. Irrigation infrastructure remains underfunded
4. Farmer support programs lack scale

## Call for Action

Experts recommend:
- Increasing allocations to meet Maputo target
- Prioritizing irrigation over rain-fed agriculture
- Strengthening extension services
- Improving access to agricultural credit
    `,
    category: "Analysis",
    author: {
      id: "6",
      name: "Dr. Robert K.",
      role: "Economist",
      bio: "Agricultural economist with 20 years of research experience.",
    },
    tags: ["agriculture", "budget analysis", "food security", "Maputo"],
    status: "published",
    createdAt: "2024-12-20T14:00:00Z",
    updatedAt: "2024-12-22T09:00:00Z",
    publishedAt: "2024-12-22T09:00:00Z",
    readTime: calculateReadTime("Five years of agricultural spending analyzed"),
    featured: false,
    seo: {
      title: "Agriculture Budget Analysis 2020-2024 | Budget Ndio Story",
      description: "Five-year analysis of Kenya's agricultural spending.",
      keywords: ["agriculture", "budget", "analysis", "food security"],
    },
  },
  {
    id: "7",
    title: "Opinion: Why We Need Open Budget Data",
    slug: "opinion-why-we-need-open-budget-data",
    excerpt:
      "Transparent budget data is essential for democracy. Here's why every citizen should demand access.",
    content: `
# Opinion: Why We Need Open Budget Data

Open budget data isn't just a nice-to-have—it's essential for democratic accountability. When citizens can't access information about public spending, corruption thrives.

## The Problem with Closed Budgets

Closed budgets enable:
- Misallocation of resources
- Corruption and embezzlement
- Reduced public trust
- Ineffective service delivery

## International Best Practices

Countries like the UK, USA, and Brazil have pioneered open budget initiatives with significant success:

- **UK**: Public spending data available in open formats
- **USA**: USAspending.gov tracks every federal dollar
- **Brazil**: Transparência Portal tracks municipal spending

## What Kenya Needs

1. Machine-readable budget documents
2. Real-time expenditure tracking
3. Citizen-friendly visualizations
4. Accessible procurement data
5. Whistleblower protections

## Moving Forward

The future of Kenyan democracy depends on informed citizens who can hold their leaders accountable. Open budget data is a crucial tool in this effort.

> "Sunlight is the best disinfectant." - Justice Louis Brandeis
    `,
    category: "Opinion",
    author: {
      id: "7",
      name: "Moses W.",
      role: "Transparency Advocate",
      bio: "Open government activist and transparency consultant.",
    },
    tags: ["transparency", "open data", "democracy", "opinion"],
    status: "published",
    createdAt: "2024-12-15T12:00:00Z",
    updatedAt: "2024-12-15T12:00:00Z",
    publishedAt: "2024-12-15T12:00:00Z",
    readTime: calculateReadTime(
      "Transparent budget data is essential for democracy",
    ),
    featured: false,
    seo: {
      title: "Why We Need Open Budget Data | Budget Ndio Story",
      description: "The case for transparency in public spending.",
      keywords: ["transparency", "open data", "democracy"],
    },
  },
  {
    id: "8",
    title: "Road Projects: Nairobi's Never-Ending Story",
    slug: "road-projects-nairobi-never-ending",
    excerpt:
      "Five major roads, Ksh 15 billion allocated, and endless delays. Our investigation.",
    content: `
# Road Projects: Nairobi's Never-Ending Story

Nairobi's road infrastructure has been a persistent challenge. Our investigation reveals patterns of delayed projects, cost overruns, and incomplete work.

## Projects Under Review

We examined five major road projects:
1. Nairobi-Thika Highway (Phase 3)
2. Outer Ring Road Expansion
3. Ngong Road Dualization
4. Eastleigh-Badiya Roads
5. Mombasa Road Improvement

### Budget vs. Actual

| Project | Original Budget (Billion Ksh) | Current Status |
|---------|----------------------------|----------------|
| Thika Phase 3 | 12.5 | 60% complete |
| Outer Ring | 8.2 | 75% complete |
| Ngong Road | 6.8 | 40% complete |
| Eastleigh-Badiya | 4.5 | 20% complete |
| Mombasa Road | 9.2 | 55% complete |

## Common Issues

1. Incomplete preliminary studies
2. Delayed land acquisition
3. Underestimated costs
4. Weak contract management
5. Limited community engagement

## Impact on Citizens

> "I've been stuck in traffic on Thika Road for five years. When will it end?" - Nairobi Commuter

## Recommendations

Our investigation suggests the need for:
- Transparent project timelines
- Regular progress reporting
- Accountability for delays
- Community monitoring mechanisms
    `,
    category: "Infrastructure",
    author: {
      id: "8",
      name: "Grace N.",
      role: "Infrastructure Analyst",
      bio: "Civil engineer turned investigative journalist.",
    },
    tags: ["infrastructure", "roads", "Nairobi", "delays"],
    status: "published",
    createdAt: "2024-12-10T10:00:00Z",
    updatedAt: "2024-12-10T10:00:00Z",
    publishedAt: "2024-12-10T10:00:00Z",
    readTime: calculateReadTime("Five major roads, Ksh 15 billion allocated"),
    featured: false,
    seo: {
      title: "Nairobi Road Projects Investigation | Budget Ndio Story",
      description: "Investigation into Ksh 15 billion road projects.",
      keywords: ["infrastructure", "roads", "Nairobi", "construction"],
    },
  },
];

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  if (!slug) return undefined;
  return blogPosts.find(
    (post) =>
      post.slug.toLowerCase() === slug.toLowerCase() &&
      post.status === "published",
  );
}

export function getPublishedPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.status === "published");
}

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(
    (post) => post.featured && post.status === "published",
  );
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(
    (post) =>
      post.category.toLowerCase() === category.toLowerCase() &&
      post.status === "published",
  );
}

export function searchPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter((post) => {
    if (post.status !== "published") return false;
    return (
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
    );
  });
}
