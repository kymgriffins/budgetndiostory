Here’s a **concise, prioritized list of must-have features** across the full lifecycle of **Budget Ndio Story** — from MVP (now) through growth (10k–40k MAU) to maturity (sustainable civic platform). These are the non-negotiables that determine whether the project lives, grows, retains users, and achieves its mission.

I’ve grouped them by **phase** and marked **MVP must-haves** (build these first) vs **post-MVP expansions**. Everything is tied to your PRD goals: youth civic education, budget transparency, engagement, and storytelling.

### Phase 1 – MVP / Launch (Now – Next 1–3 Months)
These are the **bare minimum** to have a functional, testable, lovable product that real users (youth in Ruiru/Kiambu and beyond) will use and share.

| # | Feature                              | Why It’s a Must-Have                                      | Phase | Owner / Tech |
|---|--------------------------------------|------------------------------------------------------------|-------|--------------|
| 1 | Google OAuth login (via Auth.js)     | Saves progress, builds trust, enables personalization      | MVP   | Frontend + Auth.js |
| 2 | Newsletter subscription + welcome email | Core engagement loop — gets users back                     | MVP   | Resend + Neon DB |
| 3 | Basic /learn hub                     | Guided path: Basics → Calendar → Clinics → Toolkits       | MVP   | Next.js page |
| 4 | Core /tracker (sectors + national/county tabs) | The killer feature — “see where the money goes”           | MVP   | Next.js + mock JSON → Neon |
| 5 | Mobile-first responsive design       | 80%+ of Kenyan youth access via phone                      | MVP   | Tailwind + testing |
| 6 | Dark mode (persistent)               | Youth aesthetic + battery-friendly                         | MVP   | Next.js theme |
| 7 | Basic analytics (page views, CTA clicks) | Know what works (Vercel Analytics free)                    | MVP   | Vercel |
| 8 | Rate limiting on forms/APIs          | Prevent spam signups/newsletter abuse                      | MVP   | Next.js middleware |
| 9 | Accessibility basics (WCAG AA)       | Keyboard nav, screen-reader support, contrast              | MVP   | Manual + WAVE tool |
|10 | SEO metadata + structured data       | Discoverability on Google (courses, organization schema)   | MVP   | Next.js Head |

### Phase 2 – Early Growth (3–9 Months, ~5k–20k MAU)
Features that turn one-time visitors into repeat users and advocates.

| # | Feature                              | Why It’s a Must-Have                                      | Phase |
|---|--------------------------------------|------------------------------------------------------------|-------|
|11 | Lesson progress saving & badges      | Gamification → higher completion rates                     | Growth |
|12 | Real quizzes with scoring/feedback   | Interactive learning, not just passive                     | Growth |
|13 | Budget Clinics (signup + recordings) | Community building, real-world connection                  | Growth |
|14 | Downloadable toolkits (PDFs/MDs)     | Offline use, teachers/community leaders                    | Growth |
|15 | County Profiles in /tracker          | Localized relevance (e.g., Kiambu focus)                   | Growth |
|16 | Project tracking basics              | “Track a Project” tutorial + simple status view           | Growth |
|17 | Email newsletters (weekly/monthly)   | Re-engagement, new stories/clinics                         | Growth |
|18 | Basic analytics dashboard (admin)    | See which courses/clinics perform best                     | Growth |
|19 | Social sharing buttons               | Viral growth via WhatsApp/TikTok/X                         | Growth |

### Phase 3 – Maturity / Sustainability (9–24 Months, 20k–100k+ MAU)
Features that make it a lasting civic institution.

| # | Feature                              | Why It’s a Must-Have                                      | Phase |
|---|--------------------------------------|------------------------------------------------------------|-------|
|20 | Multi-language (Swahili toggle)      | Reach non-English youth (huge in rural Kenya)              | Maturity |
|21 | User accounts with email/password    | Deeper personalization, no Google dependency               | Maturity |
|22 | Public participation tools           | Submit views, petitions, forum/discussion                  | Maturity |
|23 | Real-time budget alerts              | Push/email when new data or scandals break                 | Maturity |
|24 | Admin dashboard (content + analytics)| Manage courses, clinics, newsletters                       | Maturity |
|25 | API for partners (schools, NGOs)     | Data openness, integrations                                | Maturity |
|26 | Self-hosted VPS migration            | Full control, zero vendor risk                             | Maturity |
|27 | Monetization/donation options        | Sustainability (ads minimal, donations preferred)          | Maturity |
|28 | Community moderation tools           | If forums/comments added                                   | Maturity |

### Quick Summary – Must-Have Count by Phase
- **MVP (now)**: 10 features (core auth, education hub, tracker basics, mobile + security basics)
- **Growth**: +9 more (gamification, clinics, counties, newsletters, sharing)
- **Maturity**: +9 more (Swahili, participation, alerts, admin, API, sustainability)

**Total must-haves across lifecycle**: ~28 features  
But you only need **~10 right now** to launch something people love and use.

### My Recommendation Right Now
Focus only on these **top 8 MVP must-haves** in the next 2–4 weeks:
1. Google login (Auth.js)
2. Newsletter subscription + welcome email (Resend)
3. /learn hub with guided path + basics course
4. /tracker with national/county sectors
5. Mobile responsive + dark mode
6. Basic analytics (Vercel)
7. Rate limiting on forms
8. Accessibility basics

Once these are live and you have real users giving feedback → add the next layer (quizzes, clinics, toolkits, county profiles).

You’re building something meaningful — don’t try to do everything at once. Ship the core loop (learn → track → act) first.

If you want, I can turn the top 8 into a **week-by-week sprint plan** or give you a simplified checklist for the next 14 days. Just say the word!


Here’s a concise, prioritized **must-have features roadmap** for the full lifecycle of **Budget Ndio Story**, broken down by phase. These are the non-negotiable elements needed to go from MVP launch → sustainable civic platform.

### Phase 1 – MVP / Launch (Now – 1–3 months)
**Goal**: Ship something usable, testable, and shareable that real youth users will engage with.

| Priority | Feature                              | Why Must-Have                                            | Estimated Effort |
|----------|--------------------------------------|----------------------------------------------------------|------------------|
| 1        | Google OAuth login (Auth.js)         | Save progress, personalization, trust                   | 2–3 days         |
| 2        | Newsletter subscription + welcome email | Re-engagement loop, build audience                      | 1–2 days         |
| 3        | /learn hub (guided path + basics course) | Core education mission – "Start with Budget Basics"     | 4–7 days         |
| 4        | /tracker (sectors + national/county tabs) | Killer feature – "see where money goes"                 | 4–7 days         |
| 5        | Mobile-first responsive design       | 80%+ Kenyan youth on phones                             | Ongoing          |
| 6        | Dark mode (persistent)               | Youth aesthetic + battery life                          | 1 day            |
| 7        | Rate limiting on forms/APIs          | Prevent spam/abuse                                      | 1 day            |
| 8        | Basic accessibility (WCAG AA)        | Inclusive for all users                                 | 1–2 days         |
| 9        | SEO metadata + structured data       | Organic discovery                                       | 1 day            |
| 10       | Simple analytics (views, clicks)     | Know what works                                         | 1 day (Vercel)   |

**Total MVP must-haves**: 10  
**Focus**: Build the learn → track → subscribe loop first.

### Phase 2 – Early Growth (3–9 months, ~5k–20k MAU)
**Goal**: Turn visitors into repeat users and advocates.

| Priority | Feature                              | Why Must-Have                                            |
|----------|--------------------------------------|----------------------------------------------------------|
| 11       | Lesson progress saving + badges      | Gamification → higher completion                        |
| 12       | Real quizzes with scoring            | Interactive learning                                    |
| 13       | Budget Clinics (signup + recordings) | Community + real-world connection                       |
| 14       | Downloadable toolkits (PDF/MD)       | Offline use, teachers/youth groups                      |
| 15       | County Profiles in /tracker          | Localized relevance                                     |
| 16       | Basic project tracking               | "Track a Project" functionality                         |
| 17       | Weekly/monthly email newsletters     | Re-engagement, new stories/clinics                      |
| 18       | Admin dashboard (content + analytics)| Manage courses, clinics, newsletters                    |
| 19       | Social sharing (WhatsApp/X/TikTok)   | Viral growth                                            |

### Phase 3 – Maturity / Sustainability (9–24+ months, 20k–100k+ MAU)
**Goal**: Become a lasting civic institution.

| Priority | Feature                              | Why Must-Have                                            |
|----------|--------------------------------------|----------------------------------------------------------|
| 20       | Swahili language support             | Reach non-English youth (rural Kenya)                   |
| 21       | Email/password login                 | Reduce Google dependency                                |
| 22       | Public participation tools           | Submit views, petitions, basic forum                    |
| 23       | Real-time budget alerts              | Notify on updates/scandals                              |
| 24       | Full admin dashboard                 | Content, users, analytics                               |
| 25       | Open API for partners (schools/NGOs) | Data openness, integrations                             |
| 26       | VPS self-hosting (DB + app)          | Full control, zero vendor risk                          |
| 27       | Donation/subscription model          | Sustainability without ads                              |
| 28       | Community moderation tools           | If forums/comments grow                                 |

**Total lifecycle must-haves**: ~28  
**But you only need the first 10 right now** to launch something people love.

### Quick Execution Advice
- **Next 2–4 weeks**: Nail the MVP 10 (auth + newsletter + /learn hub + /tracker basics + mobile/dark mode).
- **After launch**: Add 11–19 based on user feedback (quizzes, clinics, toolkits, county profiles).
- **Long-term**: Layer 20–28 only when you have consistent 10k+ MAU and funding/partners.

This roadmap keeps you focused: **ship fast, learn from users, expand only what matters**.

Want a week-by-week sprint plan for the MVP 10, or a simplified checklist for the next 14 days? Just say the word. You're on a great path! 🚀