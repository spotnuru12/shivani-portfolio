// ─────────────────────────────────────────────────────────────────────────
// Single source of truth for site content. Everything the pages render pulls
// from here so copy edits never require touching component code.
// ─────────────────────────────────────────────────────────────────────────

export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const PROFILE = {
  name: 'Shivani Potnuru',
  first: 'Shivani',
  role: 'CS + Statistics student',
  school: 'UW–Madison',
  email: 'spotnuru@wisc.edu',
  location: 'Madison, WI',
  github: 'https://github.com/spotnuru12',
  linkedin: 'https://linkedin.com/in/shivanipotnuru',
  resume:
    'https://1drv.ms/b/c/796c1c094714b749/IQBpbMNQIu_fTKxRTsmsHhXdAd6jGVWQFeYLjr3sCK_E8wg',
  // Opening claim. Rotating domains live on the line under it.
  lead:
    "A software engineer with a passion for accessible, data-driven, human-centered tools. Currently I'm studying CS + Statistics at UW–Madison.",
  typing: [
    'accessibility',
    'credit unions',
    'clinical trials',
    'health insurance',
    'assistive technology',
    'public health data',
    'civic technology',
    'medication access',
  ],
  intro:
    "I've worked across pharma and clinical data, HCI research, and health insurance. Same thread through all of it: sit with the people who have to use the thing, then build until it stops being confusing.",
} as const

// Big animated stat blocks in the hero (Peter-style). `live` counters are
// handled in the component (e.g. seconds on page).
export const STATS: { value: string; label: string; live?: 'seconds' }[] = [
  { value: '2', label: 'majors' },
  { value: '6', label: 'roles across research, data & design' },
  { value: '4', label: 'projects shipped' },
  { value: '', label: 'seconds you’ve spent here', live: 'seconds' },
]

// ── Sticky-note bulletin board ───────────────────────────────────────────
// Draggable, tilted notes. `kind` drives the paper texture/color.
export type StickyKind = 'ruled' | 'grid' | 'plain' | 'accent'
export interface Sticky {
  id: string
  text: string
  kind: StickyKind
  rotate: number // initial tilt in degrees
  font?: 'hand' | 'mono' | 'serif'
}

export const BELIEFS_HEADING = 'a few things I believe'
export const BELIEFS: Sticky[] = [
  { id: 'clarity', text: 'Tirelessly pursue clarity.', kind: 'ruled', rotate: -5, font: 'hand' },
  { id: 'empower', text: 'Software should empower.', kind: 'grid', rotate: 4, font: 'mono' },
  { id: 'moments', text: 'Design for real moments, not demos.', kind: 'plain', rotate: -2, font: 'serif' },
  { id: 'research', text: 'Good research is just careful listening.', kind: 'accent', rotate: 3, font: 'hand' },
  { id: 'ship', text: 'Ship, then learn. Repeat.', kind: 'plain', rotate: 6, font: 'mono' },
]

// Tilted Polaroids in About. `src` is optional so empty frames can sit as
// placeholders until you drop photos in public/.
export interface PolaroidShot {
  id: string
  caption: string
  src?: string
}
export const POLAROIDS: PolaroidShot[] = [
  { id: 'lab', caption: 'MadAbility Lab' },
  { id: 'di', caption: 'Design Interactive' },
  { id: 'madison', caption: 'Madison, obviously' },
  { id: 'pharavo', caption: 'Pharavo, still in progress' },
]

// ── Experience ───────────────────────────────────────────────────────────
// `blurb` carries the substance directly — the timeline shows everything up
// front instead of hiding bullets behind a disclosure.
export interface Experience {
  role: string
  org: string
  logo?: string
  logoFit?: 'cover' | 'contain'
  dates: string
  loc: string
  blurb: string
  stack: string[]
  url?: string
  status?: 'incoming' | 'current'
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'Data Operations Intern',
    org: 'TruStage · Filene Research Institute',
    logo: '/logos/filene.png',
    logoFit: 'cover',
    dates: 'May 2026 – Present',
    loc: 'Madison, WI',
    status: 'current',
    url: 'https://filene.org/',
    blurb:
      'I built an engagement analytics dashboard that pulls campaign and web data out of Salesforce and GA4 into one view, plus Python reconciliation scripts that cut 5 to 6 hours of manual cleanup per cycle. I am also mapping data flows for the Salesforce to Data 360 migration.',
    stack: ['Salesforce', 'GA4', 'Python', 'Tableau'],
  },
  {
    role: 'Undergraduate Research Assistant',
    org: 'MadAbility Lab · UW–Madison CDIS',
    logo: '/logos/madability-cdis.png',
    logoFit: 'contain',
    dates: 'Feb 2026 – Present',
    loc: 'Madison, WI',
    status: 'current',
    url: 'https://madability.cs.wisc.edu/',
    blurb:
      'I lead user-needs discovery for an accessibility project, testing where vision-language models fall short of audio descriptions that blind and low vision users can actually rely on. The findings feed a paper in preparation.',
    stack: ['HCI', 'Accessibility', 'LLM Eval', 'MR/AR'],
  },
  {
    role: 'Vice President',
    org: 'Design Interactive · UW–Madison',
    logo: '/logos/design-interactive.png',
    logoFit: 'cover',
    dates: 'Jan 2025 – Present',
    loc: 'Madison, WI',
    status: 'current',
    url: 'https://www.designinteractive-uw.com/',
    blurb:
      'I run operations for a 14-member exec team (strategy, sponsorship, finances, agile workflows) and oversee 3+ Madison-area client projects each semester, from discovery through delivery.',
    stack: ['Leadership', 'Product', 'UX Strategy'],
  },
  {
    role: 'AI/ML Project Intern',
    org: 'Spectacle Health',
    logo: '/logos/spectacle-health.png',
    logoFit: 'cover',
    dates: 'Jan 2025 – May 2025',
    loc: 'Madison, WI',
    url: 'https://spectacle.health/',
    blurb:
      'I built a document Q&A system over dense health insurance paperwork using Python, NLP, semantic search, and RAG, then traced its failure modes through edge case testing and shipped it to the client.',
    stack: ['RAG', 'Weaviate', 'Hugging Face', 'Python', 'Docker'],
  },
  {
    role: 'Data Science Intern',
    org: 'LAVIS Research Informatics',
    logo: '/logos/lavis.png',
    logoFit: 'cover',
    dates: 'Jun 2022 – Sep 2024',
    loc: 'Middleton, WI',
    url: 'https://lavisresearch.com/',
    blurb:
      'I built automated ETL pipelines in Python and R for 10+ recurring workflows across 3 clinical studies. They cut audit prep time by 45% while holding 100% IRB compliance.',
    stack: ['SQL', 'Python', 'R', 'Tableau', 'ETL'],
  },
  {
    role: 'Research Intern',
    org: 'Tech4Good Lab · UC Santa Cruz',
    logo: '/logos/tech4good.png',
    logoFit: 'cover',
    dates: 'Jun 2022 – Feb 2024',
    loc: 'Santa Cruz, CA',
    url: 'https://tech4good.soe.ucsc.edu/',
    blurb:
      'I co-authored "Exploring Communal Gratitude in Online Communities" (PACMHCI, CSCW 2025). I ran the thematic analysis and turned it into design implications for prosocial platform features.',
    stack: ['HCI Research', 'Thematic Analysis'],
  },
]

// ── Projects & case studies ──────────────────────────────────────────────
export interface Project {
  slug: string
  title: string
  sub: string
  blurb: string
  tags: string[]
  year: string
  // Case-study metadata (Emmi Wu style)
  timeline: string
  roleLabel: string
  team: string
  tools: string[]
  outcome: string
  // Longer-form sections keyed for the sidebar TOC
  sections: { id: string; heading: string; body: string[] }[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'pharavo',
    title: 'Pharavo',
    sub: 'An AI medication companion for ESL patients & older adults',
    blurb:
      'Reads a prescription label with Gemini vision, then translates it into language the patient actually uses.',
    tags: ['React Native', 'Gemini API', 'OCR', 'NLP'],
    year: '2026',
    timeline: 'Feb 2026 – Present',
    roleLabel: 'Founder · Engineering',
    team: 'Solo (in progress)',
    tools: ['React Native', 'Gemini API', 'OCR', 'NLP', 'Firebase'],
    outcome: 'MVP in build',
    sections: [
      {
        id: 'context',
        heading: 'Context',
        body: [
          'Medication non-adherence is one of the most expensive, avoidable problems in healthcare — and it hits ESL patients and older adults hardest, where a label they can’t fully read becomes a daily point of failure.',
          'Pharavo started from a simple question: what if the bottle could explain itself, in your language, out loud?',
        ],
      },
      {
        id: 'approach',
        heading: 'Approach',
        body: [
          'Built in React Native so it runs on the phones people already carry. Gemini vision reads the prescription label straight from the camera, and an NLP layer translates dosage and timing into plain, multilingual instructions.',
          'The design goal was calm: no dashboards, no jargon — just the next thing to do, when to do it.',
        ],
      },
      {
        id: 'status',
        heading: 'Where it stands',
        body: [
          'MVP in active build. Next up: reminder scheduling and a caregiver view so families can help from a distance.',
        ],
      },
    ],
  },
  {
    slug: 'wcv',
    title: 'Wisconsin Conservation Voices',
    sub: 'Redesigning the Native Vote & Voting Info experience',
    blurb:
      'Led a team of 8 through an end-to-end redesign — reaching a System Usability Score of 91, 23 points above average.',
    tags: ['UI/UX', 'Figma', 'Usability'],
    year: '2026',
    timeline: 'Sep 2025 – Jan 2026',
    roleLabel: 'Project Lead',
    team: '8 people',
    tools: ['Figma', 'Usability Testing', 'A/B Testing', 'Heuristic Eval'],
    outcome: '+23 SUS · 91 score',
    sections: [
      {
        id: 'brief',
        heading: 'The brief',
        body: [
          'The Native Vote and Voting Info pages carried critical information but buried it under confusing navigation. The ask: make it obvious, trustworthy, and fast to act on.',
        ],
      },
      {
        id: 'process',
        heading: 'Process',
        body: [
          'Led a team of 8 through research, Figma prototyping, heuristic evaluation, usability tests, and A/B testing.',
          'Every decision was pinned to a measured usability signal rather than taste.',
        ],
      },
      {
        id: 'outcome',
        heading: 'The outcome',
        body: [
          'Reached a System Usability Score of 91 — 23 points above the industry average — and recommendations were adopted in production.',
        ],
      },
    ],
  },
  {
    slug: 'spectacle',
    title: 'Spectacle Health',
    sub: 'An AI chatbot for navigating health insurance',
    blurb:
      'A production RAG pipeline + Weaviate vector DB with Hugging Face embeddings across 20+ document schemas.',
    tags: ['RAG', 'Weaviate', 'Hugging Face'],
    year: '2025',
    timeline: 'Jan 2025 – May 2025',
    roleLabel: 'Project Engineer',
    team: 'Cohort team',
    tools: ['Python', 'Weaviate', 'Hugging Face', 'Docker', 'FastAPI'],
    outcome: 'Shipped to client',
    sections: [
      {
        id: 'problem',
        heading: 'The problem',
        body: [
          'Health-insurance documents are dense, inconsistent, and terrifying to search when you actually need an answer. Members give up before they find it.',
        ],
      },
      {
        id: 'build',
        heading: 'What we built',
        body: [
          'An end-to-end RAG pipeline with semantic search over insurance documents, backed by a Dockerized Weaviate vector database and Hugging Face embeddings across 20+ document schemas.',
          'Delivered the production system to the client.',
        ],
      },
    ],
  },
  {
    slug: 'billboard',
    title: 'Billboard “One-Hit Wonder”',
    sub: 'Modeling chart reappearance with logistic regression',
    blurb:
      'Built a 2,000+ record dataset across 50+ years of charts and modeled reappearance at 95% accuracy.',
    tags: ['R', 'Python', 'Spotify API', 'Scikit-learn'],
    year: '2025',
    timeline: 'Jan 2025 – May 2025',
    roleLabel: 'Data + Modeling',
    team: 'Solo',
    tools: ['R', 'Python', 'Spotify API', 'Scikit-learn'],
    outcome: '95% accuracy',
    sections: [
      {
        id: 'question',
        heading: 'The question',
        body: [
          'Does a one-hit wonder ever come back? I wanted to know whether an artist’s single chart appearance could predict a future one — 50 years of Billboard data, tested.',
        ],
      },
      {
        id: 'data',
        heading: 'The data',
        body: [
          'Built a 2,000+ record dataset combining Wikipedia, Spotify, and Last.fm with fuzzy matching across five decades of charts.',
          'Modeled reappearance using logistic regression at 95% classification accuracy.',
        ],
      },
    ],
  },
]

export const EDUCATION = {
  school: 'University of Wisconsin–Madison',
  logo: '/logos/cdis.png',
  degree: 'B.S. Computer Science & Statistics',
  dates: 'Sep 2024 – May 2028',
  honors: 'L&S Honors Program',
  coursework: [
    'Algorithms',
    'Data Structures',
    'Object-Oriented Programming',
    'User Interfaces',
    'Linear Regression',
    'Applied Categorical Data Analysis',
  ],
}

export const SKILLS: Record<string, string[]> = {
  Languages: ['Python', 'SQL', 'R', 'Java', 'C', 'JavaScript', 'TypeScript', 'HTML/CSS'],
  Technologies: [
    'React Native',
    'React',
    'Next.js',
    'FastAPI',
    'Weaviate',
    'Hugging Face',
    'Pandas',
    'Scikit-learn',
    'Docker',
    'Tailwind CSS',
  ],
  Methods: [
    'RAG',
    'NLP',
    'LLM Evaluation',
    'ETL',
    'Data Validation',
    'User Research',
    'A/B Testing',
    'Usability Testing',
  ],
  Tools: [
    'PostgreSQL',
    'SQLite',
    'MongoDB',
    'AWS',
    'Node.js',
    'Git',
    'Figma',
    'Tableau',
    'GA4',
    'Salesforce',
  ],
}

// Hover/focus copy for each chip in the Toolkit. Plain-English, so a recruiter
// reading the grid learns something instead of just scanning logos.
export const SKILL_DEFINITIONS: Record<string, string> = {
  Python: 'General-purpose language. Daily driver for data, ML, and backend work.',
  SQL: 'Structured Query Language. Pulling, joining, and validating data.',
  R: 'Statistical programming language. My go-to for regression and data viz.',
  Java: 'Object-oriented language. Class projects and algorithms coursework.',
  C: 'Low-level systems programming. Memory, pointers, the classics.',
  JavaScript: 'The language of the web. Interactive UIs and scripting.',
  TypeScript: 'Typed JavaScript. Catches bugs before they ship.',
  'HTML/CSS': 'The building blocks of every web page I make.',
  'React Native': 'Cross-platform mobile. What Pharavo is built on.',
  React: 'Component-driven UI library for the web.',
  'Next.js': 'React framework for fast, production-ready sites — including this one.',
  FastAPI: 'Python web framework for building APIs quickly.',
  Weaviate: 'Open-source vector database. Powered the RAG over insurance docs.',
  'Hugging Face': 'Open-source model and embeddings hub.',
  Pandas: 'Python data analysis library. Dataframe-everything.',
  'Scikit-learn': 'Classical ML in Python — regression, classification, clustering.',
  Docker: 'Container runtime. Ship the environment, not just the code.',
  'Tailwind CSS': 'Utility-first CSS framework. Used to build this site.',
  RAG: 'Retrieval-Augmented Generation — grounding LLMs in your own documents.',
  NLP: 'Natural Language Processing — making sense of text at scale.',
  'LLM Evaluation': 'Scoring model outputs against structured criteria to find capability gaps.',
  ETL: 'Extract, Transform, Load — the plumbing under every data pipeline.',
  'Data Validation': 'Business-rule checks that catch bad data before it spreads.',
  'User Research': 'Interviews and discovery work to learn what people actually need.',
  'A/B Testing': 'Shipping two versions and letting the data pick the winner.',
  'Usability Testing': 'Watching real people use it. How the WCV redesign hit a 91 SUS.',
  PostgreSQL: 'Open-source relational database. Boring — in the good way.',
  SQLite: 'Lightweight embedded database. Perfect for prototypes.',
  MongoDB: 'Document-store NoSQL database.',
  AWS: 'Cloud infrastructure. EC2, S3, Lambda, the usual suspects.',
  'Node.js': 'JavaScript runtime. Server-side JS and build tooling.',
  Git: 'Version control. Branches, PRs, the works.',
  Figma: 'Where every design starts. UI, prototyping, and handoff.',
  Tableau: 'BI dashboards. Built 6+ for cross-study clinical monitoring.',
  GA4: 'Google Analytics 4. Web engagement data for the TruStage dashboard.',
  Salesforce: 'CRM platform. Campaign and audience data at Filene.',
}

// ── The shelf: music · film · books ──────────────────────────────────────
// Music is live from Spotify, film is live from the Letterboxd RSS diary, and
// books are hand-curated here. Michelle Liu's "Shelf", but three-up.

export const SHELF_HEADING = "What I'm into lately"
export const SHELF_BLURB =
  "What I've been listening to, watching, and reading outside of class. Album art pulls in live (the films and books I keep by hand)."

/**
 * The handwritten strip above the shelf. `reading` comes from BOOKS and
 * `watching` from the Letterboxd feed, so only the last one is by hand.
 */
export const CURRENTLY_INTO = 'buttons that tell you what they do'

/**
 * Letterboxd handle, e.g. 'petezha' for letterboxd.com/petezha.
 * Leave empty to keep the curated FILMS list below instead.
 */
export const LETTERBOXD_USERNAME = 'spotnuru'

/** Shown when Letterboxd isn't wired up yet (or the feed is unreachable). */
export interface Film {
  title: string
  year: string
  rating: number
}
export const FILMS: Film[] = [
  { title: 'Everything Everywhere All at Once', year: '2022', rating: 5 },
  { title: 'Past Lives', year: '2023', rating: 4.5 },
  { title: 'Spirited Away', year: '2001', rating: 5 },
  { title: 'Whiplash', year: '2014', rating: 4.5 },
  { title: 'The Farewell', year: '2019', rating: 4 },
]

export interface Book {
  title: string
  author: string
  status: 'reading' | 'finished' | 'next'
  note?: string
}
export const BOOKS: Book[] = [
  {
    title: 'The Design of Everyday Things',
    author: 'Don Norman',
    status: 'reading',
    note: 'affordances, but for prescription labels',
  },
  { title: 'Weapons of Math Destruction', author: "Cathy O'Neil", status: 'finished' },
  { title: 'Educated', author: 'Tara Westover', status: 'finished' },
  { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', status: 'next' },
]
