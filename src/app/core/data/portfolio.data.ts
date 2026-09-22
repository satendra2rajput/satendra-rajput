import {
  Library,
  NavLink,
  Project,
  SeroTile,
  SkillGroup,
  StatItem,
  TimelineEntry,
} from "../models/portfolio.models";

/* ==========================================================================
   ✏️  YAHAN APNA CONTENT EDIT KARO — poori site isi file se chalti hai
   ========================================================================== */

export const PROFILE = {
  name: "Satendra Rajput",
  years: "4.5+",
  links: {
    // TODO: apne real links daalo
    github: "https://github.com/",
    linkedin: "https://www.linkedin.com/in/",
    resume: "assets/resume.pdf",
    npm: "https://www.npmjs.com/~kudoengineer",
    kudoengineer: "https://kudoengineer.com",
  },
};

export const NAV_LINKS: NavLink[] = [
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
];

export const MARQUEE_ITEMS = [
  "Angular",
  "TypeScript",
  "Java",
  "Spring Boot",
  "MySQL",
  "RxJS",
  "System Design",
  "REST APIs",
  "Docker",
  "Jenkins",
  "Nginx",
  "JavaScript",
  "AI Engineer",
  "LLM",
  "RAG",
];

/* -------------------------------- Timeline -------------------------------- */
/* Newest first. Entries without `to` show "Present" and their duration keeps growing automatically. */
export const TIMELINE: TimelineEntry[] = [
  {
    org: "KudoEngineer",
    kind: "Personal",
    logo: "assets/images/kudoengineer-logo.png",
    tile: false,
    from: "2026-07",
    role: "Creator · Developer learning & career platform",
    text: "Built to help software engineers learn, practice and prepare for real-world development and technical interviews — alongside the @kudoengineer Angular libraries.",
  },
  {
    org: "Vastika Technologies",
    kind: "Company",
    logo: "assets/images/vastika-logo.png",
    tile: true,
    from: "2026-02",
    role: "Angular + Java (Spring Boot)",
    text: "Axis Bank Dealer Journey — onboarding flow, Group Founder and entity management, dealer registration and verification.",
  },
  {
    org: "Redmil Business Mall",
    kind: "Company",
    logo: "assets/images/redmil-logo.png",
    tile: true,
    from: "2022-04",
    to: "2025-08",
    roles: [
      {
        title: "Software Engineer",
        focus: "Angular + Java",
        promoted: true,
        text: "AePS / DMT fintech platform — payments, recharges, bill pay and loan management with Java and Angular Material.",
      },
      {
        title: "Angular Developer",
        text: "Admin Portal, HDFC Bank loan applications via Jan Samarth and Eazycool's PPF project — Angular, Angular Material and MEAN stack.",
      },
    ],
  },
];

/* --------------------------- Serotask panel (tiles) ------------------------ */
const SEARCH_ICON = [
  { d: "M5 11a6 6 0 1 0 12 0a6 6 0 1 0-12 0" },
  { d: "M20 20l-4.2-4.2" },
];

export const SERO_AI = {
  title: "AI writing tools",
  color: "#8b5cf6",
  prompt: "Write a blog intro on Angular signals",
  icon: [
    { d: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" },
    { d: "M19 15l.8 2.2 2.2.8-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" },
  ],
};

export const SERO_TILES: SeroTile[] = [
  {
    title: "PDF solutions",
    color: "#ef4444",
    icon: [
      { d: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" },
      { d: "M14 3v5h5" },
      { d: "M9 14h6M9 17h4" },
    ],
  },
  { title: "SEO utilities", color: "#22c55e", icon: SEARCH_ICON, bars: true },
  {
    title: "Image tools",
    color: "#f59e0b",
    icon: [
      {
        d: "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
      },
      { d: "M7.4 10a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0" },
      { d: "M21 16l-5-5-8 8" },
    ],
  },
  {
    title: "Smart online tools",
    color: "#2b59ff",
    icon: [{ d: "M13 2L4 14h7l-1 8 9-12h-7z" }],
  },
];

/* -------------------------------- Skills ---------------------------------- */
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    items: ["Angular", "TypeScript", "JavaScript", "RxJS", "SCSS", "HTML"],
  },
  {
    title: "Backend",
    items: [
      "Java",
      "Spring Boot",
      "REST API",
      "Spring Security",
      "JWT",
      "System Design",
      "DSA",
    ],
  },
  { title: "Database", items: ["MySQL", "JPA", "Hibernate"] },
  {
    title: "Tools",
    items: ["Git", "GitHub", "Docker", "Linux", "Nginx", "Jenkins"],
  },
];

export const LEARNING = [
  "Spring AI",
  "LLM",
  "GenAI",
  "LangChain",
  "RAG",
  "Vector DB",
  "OpenAI",
  "Gemini",
];

/* ------------------------------ KudoEngineer ------------------------------- */
export const KUDO = {
  period: "01 · Jul 2026 – Present",
  kind: "Developer Learning & Career Platform",
  text: "Built to help software engineers learn, practice and prepare for real-world development and technical interviews.",
  tags: ["Angular", "Spring Boot", "MySQL", "SEO", "Open Source"],
};

/* -------------------------- Angular libraries (npm) ------------------------ */
export const NPM_SCOPE = "@kudoengineer/";

export const LIBRARIES: Library[] = [
  {
    name: "toast",
    version: "22.0.4",
    color: "#f59e0b",
    description: "Modern toast notification library for Angular.",
    tags: ["Notifications"],
    icon: [
      { d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" },
      { d: "M10.3 21a1.94 1.94 0 0 0 3.4 0" },
    ],
  },
  {
    name: "loader",
    version: "1.0.1",
    color: "#2b59ff",
    description:
      "Modern, lightweight and customizable loader library with 20 loader types, manual control, HTTP interceptor support, custom colors and overlay options.",
    tags: ["20 loader types", "HTTP interceptor", "Overlay"],
    icon: [{ d: "M21 12a9 9 0 1 1-6.2-8.55" }],
  },
  {
    name: "seo",
    version: "0.0.1",
    color: "#22c55e",
    description:
      "Lightweight and customizable SEO service for Angular applications.",
    tags: ["SEO service", "Lightweight"],
    icon: SEARCH_ICON,
  },
  {
    name: "storage",
    version: "1.0.1",
    color: "#8b5cf6",
    description:
      "A lightweight, type-safe storage utility with LocalStorage, SessionStorage, TTL, prefix support and SSR safety.",
    tags: ["LocalStorage", "SessionStorage", "TTL", "SSR safe"],
    icon: [
      { d: "M4 5a8 3 0 1 0 16 0a8 3 0 1 0-16 0" },
      { d: "M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" },
      { d: "M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" },
    ],
  },
  {
    name: "modal",
    version: "1.0.0",
    color: "#ec4899",
    description:
      "Modern, lightweight and customizable modal dialog library for Angular.",
    tags: ["Dialogs", "Customizable"],
    icon: [
      {
        d: "M5 4h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
      },
      { d: "M3 9h18" },
      { d: "M7 6.5h.01M10 6.5h.01" },
    ],
  },
  {
    name: "permission",
    version: "1.0.0",
    color: "#ef4444",
    description:
      "Lightweight permission and role-based access control library for Angular applications.",
    tags: ["RBAC", "Roles"],
    icon: [
      { d: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" },
      { d: "M9 12l2 2 4-4" },
    ],
  },
  {
    name: "http",
    version: "1.0.0",
    color: "#0ea5e9",
    description:
      "Production-ready HTTP client for Angular — base URL, authentication, retry, timeout, cancellation, caching, request deduplication, request IDs, logging and Signals support.",
    tags: ["Retry", "Caching", "Signals", "Auth"],
    icon: [
      { d: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" },
      { d: "M3 12h18" },
      { d: "M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" },
    ],
  },
  {
    name: "theme",
    version: "1.0.0",
    color: "#a855f7",
    description:
      "Production-ready theme management library for Angular with Light, Dark and System theme support.",
    tags: ["Light", "Dark", "System"],
    icon: [
      { d: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" },
      { d: "M12 3a9 9 0 0 0 0 18z", fill: true },
    ],
  },
  {
    name: "validator",
    version: "0.0.1",
    color: "#14b8a6",
    description:
      "Modern, type-safe validation utilities for Angular applications.",
    tags: ["Type-safe", "Validation"],
    icon: [
      { d: "M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0" },
      { d: "M8 12.5l2.7 2.7L16 9.5" },
    ],
  },
];

/* ------------------------- Client & product projects ----------------------- */
/* Newest first. No `to` = still running (green "live" dot). */
export const PROJECTS: Project[] = [
  {
    span: 7,
    from: "2026-02",
    client: "Vastika Technologies",
    title: "Axis Bank — Dealer Onboarding & Group Entity Management Platform",
    points: [
      "Dealer Journey module: onboarding flow, Group Founder and Entity management.",
      "Built dealer registration, verification and group/entity mapping journeys.",
      "Improved form validations, error handling and the stepper-based flow; scalable Angular UI on a Java (Spring Boot) backend.",
    ],
    tags: ["Angular", "Java · Spring Boot", "Stepper UI", "Validations"],
  },
  {
    span: 5,
    delay: 100,
    from: "2026-02",
    client: "SaaS",
    title: "Serotask — All-in-One SaaS Platform",
    text: "AI writing tools, PDF solutions, SEO utilities, image tools and smart online tools that simplify everyday digital work.",
    tags: ["AI tools", "PDF", "SEO", "Image tools"],
  },
  {
    span: 5,
    from: "2025-12",
    client: "ADCB Bank",
    title: "Loan Origination System — Borrower Journey",
    text: "Stepper-based flow for loan application, document upload, validation and status tracking — from initiation to submission, with API error handling.",
    tags: ["Angular", "Spring Boot APIs", "HTML · CSS"],
  },
  {
    span: 7,
    delay: 100,
    from: "2024-09",
    to: "2025-08",
    client: "Redmil Business Mall",
    title: "Fintech Platform — AePS, DMT, Bill & Recharges",
    text: "A comprehensive fintech platform covering AePS, banking services, digital payments, recharges, loan management, bill payments, insurance and e-commerce integrations — built with a focus on user experience, security and performance.",
    tags: ["Java", "Angular Material", "AePS", "DMT", "Payments"],
  },
  {
    span: 4,
    from: "2024-05",
    to: "2024-08",
    title: "Poker9Club",
    text: "Online poker platform — front-end development.",
    tags: ["TypeScript", "Angular Material"],
  },
  {
    span: 4,
    delay: 100,
    from: "2022-04",
    to: "2024-04",
    client: "Redmil Business Mall",
    title: "Admin Portal",
    text: "Admin portal for Redmil Business Mall.",
    tags: ["Angular", "Angular Material"],
  },
  {
    span: 4,
    delay: 200,
    from: "2022-04",
    to: "2024-04",
    client: "Redmil Business Mall",
    title: "Loan Applications for HDFC Bank via Jan Samarth Portal",
    text: "Loan applications referred to HDFC Bank through the Jan Samarth portal.",
    tags: ["TypeScript", "Angular Material"],
  },
  {
    span: 12,
    wide: true,
    from: "2022-04",
    to: "2024-04",
    client: "Redmil Business Mall",
    title: "Paint Protection Film (PPF) — Eazycool",
    text: "Built for Eazycool, a Singapore-based company offering paint protection film, solar film, window tinting and bike frame protection film for vehicles, homes and offices.",
    tags: ["MEAN Stack", "Angular Material"],
  },
];

/* --------------------------------- About ----------------------------------- */
export const ABOUT_STATS: StatItem[] = [
  { label: "Years Experience", value: "4.5+" },
  { label: "Primary Expertise", value: "Angular" },
  { label: "Backend", value: "Java" },
  { label: "Product", value: "KudoEngineer" },
  { label: "Builder", value: "Open Source" },
];
