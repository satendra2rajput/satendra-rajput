import {
  BlogPost,
  Library,
  NavLink,
  Project,
  SeroTile,
  SkillGroup,
  StatItem,
  TimelineEntry,
} from '../models/portfolio.models';

/* ==========================================================================
   ✏️  YAHAN APNA CONTENT EDIT KARO — poori site isi file se chalti hai
   ========================================================================== */

/** Used to build canonical URLs, og:url and sitemap.xml entries — keep this in sync with where the site is actually deployed. */
export const SITE_URL = 'https://satendra2rajput.com';

export const PROFILE = {
  name: 'Satendra Rajput',
  years: '4.5+',
  links: {
    // TODO: apne real links daalo
    github: 'https://github.com/satendra2rajput',
    linkedin: 'https://www.linkedin.com/in/satendra2rajput/',
    resume: 'assets/resume.pdf',
    // the 9 published packages are still under the old npm scope — see the NPM_SCOPE note near LIBRARIES below
    npm: 'https://www.npmjs.com/~serotask',
    serotask: 'https://serotask.com',
  },
};

/** Anchor links on the home page. The Blog link lives separately in NavComponent (it's a route, not a fragment). */
export const NAV_LINKS: NavLink[] = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
];

export const MARQUEE_ITEMS = [
  'Angular',
  'TypeScript',
  'Java',
  'Spring Boot',
  'MySQL',
  'RxJS',
  'System Design',
  'REST APIs',
  'JavaScript',
];

/** Chips shown under the "4.5+ years" count — what those years actually cover. */
export const EXPERIENCE_CHIPS = [
  'Banking & Fintech',
  'AEPS / Aadhaar Pay',
  'Recharge',
  'Bill Payment',
  'Micro-ATM',
  'Axis Bank LOS',
  'npm Packages',
  'SaaS Tools',
  'VS Code Extensions',
  'Open Source',
];

/* -------------------------------- Timeline -------------------------------- */
/* LinkedIn-style: newest company first, and within a company, newest role first.
   A role without `to` means "Present" — its own duration, and the company's total
   duration, then keep counting up to today automatically. */
export const TIMELINE: TimelineEntry[] = [
  {
    org: 'Serotask',
    kind: 'Personal',
    logo: 'assets/images/serotask-logo.png',
    tile: false,
    from: '2026-07',
    role: 'Creator · All-in-one online tools platform',
    text: 'PDF, image, SEO and developer tools plus a resume builder — 150+ tools behind one fast, no-sign-up-needed interface.',
  },
  {
    org: 'Vastika Technologies',
    kind: 'Company',
    logo: 'assets/images/vastika-logo.png',
    tile: true,
    roles: [
      {
        title: 'Senior Software Engineer',
        from: '2026-10',
        promoted: true,
        points: [
          'Develop scalable applications using Angular, Java, and Spring Boot.',
          'Build dynamic loan workflows and dealer-focused dashboards.',
          'Integrate and optimize REST APIs and backend services.',
          'Fix bugs and collaborate with teams to improve performance and delivery.',
        ],
      },
      {
        title: 'Software Engineer',
        from: '2025-12',
        to: '2026-09',
        points: [
          'Developed LOS modules for loan applications, document uploads, and eligibility checks.',
          'Built dynamic UI workflows and dealer-focused features.',
          'Integrated REST APIs with backend services.',
          'Resolved bugs and improved UI performance and usability.',
        ],
      },
    ],
  },
  {
    org: 'Redmil Business Mall',
    kind: 'Company',
    logo: 'assets/images/redmil-logo.png',
    tile: true,
    roles: [
      {
        title: 'Software Engineer',
        from: '2024-05',
        to: '2025-11',
        promoted: true,
        points: [
          'Developed full-stack applications using Angular 18 and Java Spring Boot.',
          'Built fintech modules for AEPS, Micro-ATM, Recharge, and Bill Payments.',
          'Implemented JWT-based RBAC and biometric device integration.',
          'Developed REST APIs, improving performance and reducing transaction errors by 40%.',
        ],
      },
      {
        title: 'Angular Developer',
        from: '2022-04',
        to: '2024-04',
        points: [
          "Admin Portal, HDFC Bank loan applications via Jan Samarth and Eazycool's PPF project — Angular, Angular Material and TypeScript.",
        ],
      },
    ],
  },
];

/* --------------------------- Serotask panel (tiles) ------------------------
   Serotask is an all-in-one online tools platform — these are its actual
   categories and tool counts; keep this in sync with the real product. */
export const SERO_SINCE = '2026-11';

export const SERO_TILES: SeroTile[] = [
  {
    title: 'PDF Tools',
    count: '40+ tools',
    color: '#ef4444',
    icon: [
      { d: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z' },
      { d: 'M14 3v5h5' },
      { d: 'M9 14h6M9 17h4' },
    ],
  },
  {
    title: 'Image Tools',
    count: '50+ tools',
    color: '#f59e0b',
    icon: [
      { d: 'M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z' },
      { d: 'M7.4 10a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0' },
      { d: 'M21 16l-5-5-8 8' },
    ],
  },
  {
    title: 'SEO Tools',
    count: '20+ tools',
    color: '#22c55e',
    icon: [{ d: 'M5 11a6 6 0 1 0 12 0a6 6 0 1 0-12 0' }, { d: 'M20 20l-4.2-4.2' }],
  },
  {
    title: 'Developer Tools',
    count: '40+ tools',
    color: '#2b59ff',
    icon: [{ d: 'M8 9l-5 3 5 3M16 9l5 3-5 3M13 5l-2 14' }],
  },
  {
    title: 'Resume Builder',
    count: 'Create professional resumes',
    color: '#8b5cf6',
    icon: [
      { d: 'M9 2h4.5L19 7.5V20a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z' },
      { d: 'M13 2v5h5' },
      { d: 'M9 13h6M9 16.5h6M9 9.5h2' },
    ],
  },
];

/* -------------------------------- Skills ---------------------------------- */
export const SKILL_GROUPS: SkillGroup[] = [
  { title: 'Frontend', items: ['Angular', 'TypeScript', 'JavaScript', 'RxJS', 'SCSS', 'HTML'] },
  {
    title: 'Backend',
    items: ['Java', 'Spring Boot', 'REST API', 'Spring Security', 'JWT', 'System Design', 'DSA'],
  },
  { title: 'Database', items: ['MySQL', 'JPA', 'Hibernate'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'Docker', 'Linux', 'Nginx', 'Jenkins'] },
];

export const LEARNING = [
  'Spring AI',
  'LLM',
  'GenAI',
  'LangChain',
  'RAG',
  'Vector DB',
  'OpenAI',
  'Gemini',
];

/* -------------------------- Serotask (featured project) -------------------- */
export const SEROTASK_PROJECT = {
  period: '01 · Jul 2026 – Present',
  kind: 'All-in-One Online Tools Platform',
  text: 'PDF, image, SEO and developer tools plus a resume builder — 150+ tools in one fast, no-sign-up-needed interface.',
  tags: ['PDF Tools', 'Image Tools', 'SEO Tools', 'Developer Tools', 'Resume Builder'],
};

/* -------------------------- Angular libraries (npm) ------------------------
   These 9 packages are already published and live under the @kudoengineer npm
   scope — https://www.npmjs.com/~kudoengineer — so the scope stays as-is here.
   Renaming NPM_SCOPE would point every "npm i" command and npm link at
   packages that don't exist under that name. Publish under @serotask on npm
   first, then switch this constant (and PROFILE.links.npm) over to match. */
export const NPM_SCOPE = '@serotask/';

export const LIBRARIES: Library[] = [
  {
    name: 'toast',
    version: '22.0.4',
    color: '#f59e0b',
    description: 'Modern toast notification library for Angular.',
    tags: ['Notifications'],
    icon: [
      { d: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9' },
      { d: 'M10.3 21a1.94 1.94 0 0 0 3.4 0' },
    ],
  },
  {
    name: 'loader',
    version: '1.0.1',
    color: '#2b59ff',
    description:
      'Modern, lightweight and customizable loader library with 20 loader types, manual control, HTTP interceptor support, custom colors and overlay options.',
    tags: ['20 loader types', 'HTTP interceptor', 'Overlay'],
    icon: [{ d: 'M21 12a9 9 0 1 1-6.2-8.55' }],
  },
];

/* ------------------------- Client & product projects ----------------------- */
/* Newest first. No `to` = still running (green "live" dot). */
export const PROJECTS: Project[] = [
  {
    span: 7,
    from: '2026-02',
    client: 'Vastika Technologies',
    title: 'Axis Bank — Dealer Onboarding & Group Entity Management Platform',
    points: [
      'Dealer Journey module: onboarding flow, Group Founder and Entity management.',
      'Built dealer registration, verification and group/entity mapping journeys.',
      'Improved form validations, error handling and the stepper-based flow; scalable Angular UI on a Java (Spring Boot) backend.',
    ],
    tags: ['Angular', 'Java · Spring Boot', 'Stepper UI', 'Validations'],
  },
  {
    span: 5,
    delay: 100,
    from: '2025-12',
    client: 'ADCB Bank',
    title: 'Loan Origination System — Borrower Journey',
    text: 'Stepper-based flow for loan application, document upload, validation and status tracking — from initiation to submission, with API error handling.',
    tags: ['Angular', 'Spring Boot APIs', 'HTML · CSS'],
  },
  {
    span: 7,
    delay: 100,
    from: '2024-09',
    to: '2025-08',
    client: 'Redmil Business Mall',
    title: 'Fintech Platform — AePS, DMT, Bill & Recharges',
    text: 'A comprehensive fintech platform covering AePS, banking services, digital payments, recharges, loan management, bill payments, insurance and e-commerce integrations — built with a focus on user experience, security and performance.',
    tags: ['Java', 'Angular Material', 'AePS', 'DMT', 'Payments'],
  },
  {
    span: 4,
    from: '2024-05',
    to: '2024-08',
    title: 'Poker9Club',
    text: 'Online poker platform — front-end development.',
    tags: ['TypeScript', 'Angular Material'],
  },
  {
    span: 4,
    delay: 100,
    from: '2022-04',
    to: '2024-04',
    client: 'Redmil Business Mall',
    title: 'Admin Portal',
    text: 'Admin portal for Redmil Business Mall.',
    tags: ['Angular', 'Angular Material'],
  },
  {
    span: 4,
    delay: 200,
    from: '2022-04',
    to: '2024-04',
    client: 'Redmil Business Mall',
    title: 'Loan Applications for HDFC Bank via Jan Samarth Portal',
    text: 'Loan applications referred to HDFC Bank through the Jan Samarth portal.',
    tags: ['TypeScript', 'Angular Material'],
  },
  {
    span: 12,
    wide: true,
    from: '2022-04',
    to: '2024-04',
    client: 'Redmil Business Mall',
    title: 'Paint Protection Film (PPF) — Eazycool',
    text: 'Built for Eazycool, a Singapore-based company offering paint protection film, solar film, window tinting and bike frame protection film for vehicles, homes and offices.',
    tags: ['MEAN Stack', 'Angular Material'],
  },
];

/* --------------------------------- About ----------------------------------- */
export const ABOUT_STATS: StatItem[] = [
  { label: 'Years Experience', value: '4.5+' },
  { label: 'Primary Expertise', value: 'Angular' },
  { label: 'Backend', value: 'Java' },
  { label: 'Product', value: 'Serotask' },
  { label: 'Builder', value: 'Open Source' },
];

/* ---------------------------------- Blog ------------------------------------
   Newest first. `body` is one paragraph per array item (plain text, no markdown). */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'getting-started-with-serotask',
    title: 'Getting Started with Serotask',
    date: '2026-11-05',
    readMins: 4,
    tag: 'Serotask',
    excerpt:
      'Why I built Serotask, what it covers today — PDF, image, SEO and developer tools plus a resume builder — and what comes next.',
    body: [
      'Serotask started as a side project to solve a problem I kept running into at work: switching between five different tabs just to convert a PDF, resize an image, or check an SEO tag. The idea was simple — put the tools people reach for most often in one place, with no sign-up friction and no bloated UI.',
      'Today Serotask is organized into five areas: PDF Tools (40+ tools — merge, split, compress, convert and more), Image Tools (50+ tools), SEO Tools (20+ tools), Developer Tools (40+ tools), and a Resume Builder for putting together a professional resume in minutes. That is 150+ tools behind one fast interface, and most of them run entirely in the browser — no upload-and-wait step.',
      'The roadmap for the next few months is focused on three things: a proper API so these tools can be scripted or embedded, tighter integration between categories (so a PDF tool can hand off straight into an image or SEO tool), and rounding out each category based on which tools people actually use most.',
      'If you try it and something is missing or broken, that feedback is genuinely useful to me — Serotask is still small enough that one good bug report can change what gets built next.',
    ],
  },
  {
    slug: 'publishing-angular-libraries-on-npm',
    title: 'What I Learned Publishing 9 Angular Libraries on npm',
    date: '2026-10-02',
    readMins: 6,
    tag: 'Angular',
    excerpt:
      'Toast, loader, modal, storage, theme — nine packages later, here is what actually mattered for adoption and maintenance.',
    body: [
      'Over the last year I published nine small Angular libraries — toast, loader, modal, storage, validator, theme, permission, http and seo — all under one npm scope. None of them are complicated individually, which turned out to be the point.',
      'The biggest lesson: a library that does one thing well with a tiny API gets adopted faster than one that tries to be configurable for every use case. @kudoengineer/loader has 20 loader types and an HTTP interceptor hook, but the default import still works in two lines of code — that balance mattered more than any single feature.',
      'Versioning was the other recurring headache. A few early 0.x releases went out before the API had settled, which meant breaking changes for anyone who adopted early. Since then everything ships behind a changelog and a deprecation window before anything gets removed.',
      'The short version: build the narrowest useful thing first, write the README before the code if you can, and expect maintenance — not the initial release — to be where most of the real work happens.',
    ],
  },
  {
    slug: 'from-angular-developer-to-software-engineer',
    title: 'From Angular Developer to Software Engineer: What Actually Changed',
    date: '2026-09-10',
    readMins: 5,
    tag: 'Career',
    excerpt:
      'The title changed on a Tuesday. The day-to-day work changed gradually, over about a year — here is what that looked like.',
    body: [
      "When the title on my offer letter changed from Angular Developer to Software Engineer, the work didn't change overnight. What changed was the shape of the problems I was handed.",
      'As an Angular Developer, most tickets arrived already scoped: build this screen, wire up this API, fix this validation bug. As a Software Engineer, I started owning the gap between "the business wants dealers to onboard faster" and an actual technical plan — which meant more time in design discussions with the Java/Spring Boot side before a single component got written.',
      'The other shift was depth on the backend. Being able to read and reason about the Spring Boot services my Angular code was calling — not just consume their contracts — made a lot of "mystery bugs" stop being mysterious.',
      "If you're making the same jump: ask to sit in on backend design discussions before you're asked to. That's the fastest way I found to close the gap.",
    ],
  },
  {
    slug: 'building-a-stepper-based-los-in-angular',
    title: 'Building a Stepper-Based Loan Origination Flow in Angular',
    date: '2026-07-18',
    readMins: 7,
    tag: 'Fintech',
    excerpt:
      'Document uploads, conditional steps, and saving partial progress — notes from building loan-application journeys in Angular + Spring Boot.',
    body: [
      'Loan origination journeys look simple on a wireframe — a handful of steps, a progress bar, a submit button — and get complicated fast once you add document uploads, conditional steps, and borrowers who close the tab halfway through.',
      'The pattern that worked best was treating each step as its own reactive form, validated independently, with a single service holding the overall application state as a plain object rather than one giant form group. That made it straightforward to let borrowers jump backward to fix something without losing progress on later steps.',
      'Document upload was its own small project: chunked uploads for large scanned files, clear per-file status (uploading, verified, rejected with a reason), and a retry path that did not force the borrower to pick the file again from scratch.',
      'On the API side, the win was an endpoint that accepted a partial application and returned exactly which fields were still missing — instead of the frontend trying to track completeness rules that could drift out of sync with backend validation.',
      "None of this is unique to loan applications — the same shape applies to any long, resumable, multi-step form. The core idea is: let the backend be the source of truth for what's valid and what's missing, and keep the frontend focused on making that state easy to navigate.",
    ],
  },
];
