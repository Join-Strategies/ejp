# EJP Sitemap v2 — Revised Information Architecture
### Post-Client Meeting (March 2025)

---

## Guiding Principles

1. **EJP is a career services platform, not a job board.** Every page should reinforce the "trusted partner" positioning — not make promises about job placement.
2. **Member-first.** CPT graduates and union members are the primary audiences. Non-union job seekers receive a lighter-touch experience.
3. **One brand, no legacy references.** No "From CPT / From EC / From TEF" labels. EJP is the product.
4. **Landing page = the whole of EJP.** Audience segmentation happens on deeper pages, not the homepage.
5. **Explain functionality, not design.** Content should make clear what each service *does*, not just look good.
6. **Scope is relative to page count.** Keep the architecture lean and purposeful.

---

## Audience Matrix

| Audience | Priority | Key Value | Primary Action |
|---|---|---|---|
| CPT Graduate | Highest | Full career services pipeline, placement support, employer matching | Connect with career counselor |
| Union Member | High | myTEF tools, career services, resume/interview support | Access myTEF / career services |
| Non-Union Job Seeker | Medium | Resume drop, basic job info, path to membership | Submit resume / learn about membership |
| Employer | Growing | Access CPT-trained candidate pool, partnership model | Contact employer relations / submit vacancy |

---

## Site Map

```
EJP — Employment & Job Placement
│
├── LANDING PAGE (Homepage)
│   ├── Hero: "Your Trusted Partner in Healthcare Employment"
│   │   └── Subhead: long-term partner positioning, not job promises
│   ├── What EJP Does (3-4 cards, high-level)
│   │   ├── Career Services & Support
│   │   ├── Employer Partnerships
│   │   └── Training-to-Career Pipeline
│   ├── Self-Identification CTA
│   │   ├── "I'm a Job Seeker" → /job-seekers
│   │   └── "I'm an Employer" → /employers
│   ├── CPT Grad Callout Banner (persistent/temporary)
│   │   └── "Completing your CPT training? Start here →"
│   ├── Stats / Social Proof
│   │   └── Real numbers from EJP (TBD from client)
│   ├── Events & Career Fairs
│   │   ├── Upcoming event cards
│   │   └── "Meet Us in Person" positioning
│   ├── Testimonial / Quote (Danielle? TBD)
│   └── Footer
│
├── FOR JOB SEEKERS (/job-seekers)
│   ├── Section Hero: "Your Gateway to New York Healthcare Careers"
│   │   └── Subhead: "As part of the 1199SEIU Training and Employment Fund,
│   │       EJP provides job seekers with resources and support to build
│   │       a career in healthcare."
│   │
│   ├── Audience Segmentation (inline, not a wizard)
│   │   ├── CPT Graduate Path
│   │   │   ├── Career counselor connection
│   │   │   ├── Placement support
│   │   │   ├── Resume & interview prep
│   │   │   ├── Employer matching
│   │   │   └── myTEF Portal access
│   │   │
│   │   ├── Union Member Path
│   │   │   ├── Career services access
│   │   │   ├── Resume help
│   │   │   ├── myTEF Portal access
│   │   │   ├── Workshops & skill-building
│   │   │   └── Laid-off Member Support (Job Security Fund)
│   │   │
│   │   └── New to Healthcare / Non-Member Path
│   │       ├── Resume submission
│   │       ├── "Why Healthcare / Why 1199" content
│   │       └── How to become a member
│   │
│   ├── myTEF Tools (integrated, not separate)
│   │   ├── Sign up for classes
│   │   ├── Apply for programs
│   │   ├── Upload resume
│   │   ├── Check reimbursement
│   │   └── CTA: Log in to MyTEF Portal →
│   │
│   └── Career Services Overview
│       ├── Resume assistance
│       ├── Career counseling
│       ├── Interview prep
│       └── Workshops & skill-building
│
├── FOR EMPLOYERS (/employers)
│   ├── Section Hero: "The Candidates You Need"
│   │   └── Subhead: "Every year, thousands of New Yorkers choose healthcare
│   │       not because it's a job, but because it's a calling..."
│   │
│   ├── Why Partner with EJP
│   │   └── CPT-trained candidate value prop
│   │
│   ├── Services
│   │   ├── Submit Job Openings (vacancy portal)
│   │   ├── Become a Partner Provider
│   │   └── Contact Employer Relations
│   │
│   └── Employer Testimonial / Stats (TBD)
│
├── ABOUT EJP (/about)
│   ├── Mission & Vision
│   ├── Our Approach
│   ├── The 1199SEIU Connection
│   └── Success Stories
│
├── EVENTS (/events) — optional standalone or homepage-only
│   ├── Upcoming Career Fairs
│   └── Past Events / Recaps
│
└── CONTACT (/contact)
    ├── Job Seeker Inquiries
    ├── Employer Inquiries
    └── Partnership Inquiries
```

---

## Key Changes from v1

| Area | v1 (Current) | v2 (Proposed) | Rationale |
|---|---|---|---|
| **Hero** | "Your Healthcare Career Starts Here" | "Your Trusted Partner in Healthcare Employment" | Reposition from job board to career services partner |
| **Hero subhead** | Implies direct job matching | Long-term partnership, resources and guidance | Avoid false promises per client feedback |
| **Source tags** | "From CPT", "From EC", "From TEF" on every card | Removed entirely | EJP is one brand, not a legacy mashup |
| **Homepage structure** | 5 job seeker cards + 4 employer cards on homepage | High-level value prop + self-ID CTA + events | Homepage = EJP as a whole; segmentation later |
| **Job seeker section** | 5 equal cards (same for everyone) | 3 audience paths (CPT grad / member / non-member) | Different audiences get different value |
| **myTEF** | Standalone section at bottom | Integrated into Job Seekers page | Part of the member value story |
| **Events** | Not present | New section on homepage + possible standalone page | Strategy team requested career fairs / stats |
| **Testimonials** | Fabricated placeholder | Real quote TBD (Danielle?) | Social proof needs to be authentic |
| **Stats** | "EJP by the Numbers" with some made-up numbers | Real stats from client (TBD) | Credibility matters |
| **Member distinction** | None | Clear paths for CPT grads vs members vs non-members | "THIS IS FOR MEMBERS" — core client feedback |

---

## Open Questions (Need Client Input)

1. **Stats**: What real numbers can we use? (placements, participants, employer partners, etc.)
2. **Testimonial**: Is Danielle's quote available? Any other success stories?
3. **CPT section weight**: Does CPT get its own dedicated section on the Job Seekers page, or is it one of three paths?
4. **Ideal actions per audience**: What's the single most important thing each audience should do?
   - CPT grad → ?
   - Union member → ?
   - Non-member → ?
   - Employer → ?
5. **Events data**: Where do events/career fairs live currently? Is there a feed or manual entry?
6. **myTEF integration depth**: Link out to the Salesforce portal, or surface features inline?
7. **Job search**: Is iCIMS staying? Is Salesforce replacing it? What do we link to?
8. **Page count**: Client mentioned scope relative to page count — is 5-6 pages the right scope?
   - Homepage, Job Seekers, Employers, About, Contact, Events(?)

---

## Navigation Structure

```
[Logo: EJP — Employment & Job Placement]

Desktop Nav:
  For Job Seekers  |  For Employers  |  About  |  Events  |  Contact  |  [Get Started]

Utility Bar:
  "An 1199SEIU Training & Employment Fund Program"    MyTEF Portal  |  Español
```

---

## Notes on Technical Scope

- **No wizard/form flow** for now — team is wary of data input features
- **iCIMS → Salesforce** transition is unclear — avoid deep integration dependencies
- **Existing services on predecessor sites** will likely link out initially
- **Redirect strategy needed** for 1199careers.org, tefcpt.org/employment, 1199seiubenefits.org/employment
