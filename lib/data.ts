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
  // Rotating words for the typing hero.
  typing: ['HCI', 'machine learning', 'data', 'accessibility', 'health tech'],
  intro:
    "I'm a Computer Science + Statistics student at UW–Madison who likes taking projects end to end — from research and design through the engineering that ships them.",
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

// ── Experience ───────────────────────────────────────────────────────────
export interface Experience {
  role: string
  org: string
  logo?: string
  dates: string
  loc: string
  blurb: string
  did: string[] // "what I actually did" expandable bullets
  stack: string[]
  status?: 'incoming' | 'current'
}

export const EXPERIENCE: Experience[] = [
  {
    role: 'Data Operations Intern',
    org: 'TruStage · Filene Research Institute',
    dates: 'May – Aug 2026',
    loc: 'Madison, WI',
    status: 'incoming',
    blurb:
      'Supporting Salesforce CRM data quality, reporting, and automation for Filene Research Institute.',
    did: [
      'Improving CRM data quality and reporting workflows across the research org.',
      'Building automation to cut manual reporting overhead.',
    ],
    stack: ['Salesforce', 'Data Quality', 'Reporting'],
  },
  {
    role: 'Undergraduate Research Assistant',
    org: 'MadAbility Lab · UW–Madison CDIS',
    logo: '/logos/madability-cdis.png',
    dates: 'Feb 2026 – Present',
    loc: 'Madison, WI',
    status: 'current',
    blurb:
      'Evaluating vision-language models in MR/AR for an HCI accessibility project.',
    did: [
      'Analyzed 500+ Meta Quest apps with a structured classification framework to surface accessibility trends.',
      'Evaluating VLMs for MR/AR accessibility; contributing to a paper in preparation.',
    ],
    stack: ['HCI', 'Accessibility', 'VLM Eval', 'MR/AR'],
  },
  {
    role: 'Vice President · Product Manager',
    org: 'Design Interactive · UW–Madison',
    logo: '/logos/design-interactive.png',
    dates: 'May 2025 – Present',
    loc: 'Madison, WI',
    blurb:
      'Lead operations across a 14-member exec team spanning marketing, comms, and web design.',
    did: [
      'Oversee managers across 3+ local client projects each semester.',
      'Support execution and delivery of human-centered design solutions.',
    ],
    stack: ['Leadership', 'Product', 'UX Strategy'],
  },
  {
    role: 'AI/ML Project Intern',
    org: 'Spectacle Health',
    logo: '/logos/spectacle-health.png',
    dates: 'Jan – May 2025',
    loc: 'Madison, WI',
    blurb:
      'Engineered an end-to-end RAG pipeline over health-insurance documents.',
    did: [
      'Built a Dockerized Weaviate vector DB with Hugging Face embeddings across 20+ document schemas.',
      'Delivered the production semantic-search system to the client.',
    ],
    stack: ['RAG', 'Weaviate', 'Hugging Face', 'Python', 'Docker'],
  },
  {
    role: 'Data Science Intern',
    org: 'LAVIS Research Informatics',
    logo: '/logos/lavis.png',
    dates: 'Jun 2022 – Sep 2024',
    loc: 'Middleton, WI',
    blurb:
      'Built ETL pipelines and validation tooling across multiple clinical studies.',
    did: [
      'Built ETL pipelines in Python and R for 10+ workflows across 3 studies, cutting audit prep time by 45%.',
      'Designed 25+ SQL-based validation checks and 6+ Tableau dashboards for cross-study monitoring.',
    ],
    stack: ['SQL', 'Python', 'R', 'Tableau', 'AWS'],
  },
  {
    role: 'Research Intern',
    org: 'Tech4Good Lab · UC Santa Cruz',
    logo: '/logos/tech4good.png',
    dates: 'Jun 2022 – Feb 2024',
    loc: 'Santa Cruz, CA',
    blurb:
      'HCI research on gratitude in online communities (PACMHCI / CSCW 2025).',
    did: [
      'Co-authored “Exploring Communal Gratitude in Online Communities.”',
      'Ran thematic analysis on user-research data and synthesized behavioral patterns.',
    ],
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
      'Reads prescription labels with Gemini vision and offers multilingual, NLP-driven translation to support adherence.',
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
  Languages: ['Python', 'SQL', 'R', 'Java', 'C', 'JavaScript', 'TypeScript'],
  'ML & Data': ['RAG', 'NLP', 'LLM Evaluation', 'ETL', 'Pandas', 'Scikit-learn'],
  Technologies: ['React Native', 'React', 'Next.js', 'FastAPI', 'Weaviate', 'Docker'],
  Tools: ['PostgreSQL', 'MongoDB', 'AWS', 'Git', 'Figma', 'Tableau'],
}

// ── The shelf: music · film · books ──────────────────────────────────────
// Music is live from Spotify, film is live from the Letterboxd RSS diary, and
// books are hand-curated here. Michelle Liu's "Shelf", but three-up.

export const SHELF_HEADING = 'What I’m into lately.'
export const SHELF_BLURB =
  'Outside of classes and labs. The music and film shelves update themselves; the books I keep by hand.'

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
