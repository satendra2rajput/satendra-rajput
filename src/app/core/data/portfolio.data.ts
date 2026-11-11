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
          'Expanded and optimized Angular applications for financial services.',
          'Improved UI/UX and fixed API sync issues in HDFC Loan CRM, reducing lead processing',
          'Developed reusable Angular components for real-time financial dashboards, reducing development time for new modules by 40%.',
          'Reduced UI latency by 35% using zone-less patterns and manual change detection.',
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
    tags: ['HTML', 'CSS', 'JavaScript', 'Angular', 'Angular Material'],
  },
];

/* --------------------------------- About ----------------------------------- */
export const ABOUT_STATS: StatItem[] = [
  { label: 'Years Experience', value: '4.5+' },
  { label: 'Primary Expertise', value: 'Angular' },
  { label: 'Backend', value: 'Java' },
  { label: 'Product', value: 'Serotask' },
  { label: 'Builder', value: 'Open Source' },
  { label: 'Next Goal', value: 'Applied AI Engineer' },
];

/* ---------------------------------- Blog ------------------------------------
   Newest first. `body` is one paragraph per array item (plain text, no markdown). */

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'my-journey-as-a-software-engineer',
    title: 'My Journey as a Software Engineer: Learning, Building and Growing',
    date: '2026-11-12',
    readMins: 5,
    tag: 'Career',
    excerpt:
      'My engineering journey, the technologies I work with, why I enjoy building products, and how I approach continuous learning.',
    body: [
      'I believe software engineering is much more than writing code. It is about understanding problems, designing solutions, making technical decisions, and continuously improving the way we build software.',
      'My journey has involved working with modern frontend technologies, especially Angular and TypeScript, while developing my understanding of backend engineering with Java and Spring Boot. Over time, I have become increasingly interested in application architecture, scalable systems, performance, and maintainable code.',
      'Alongside my engineering journey, I am building Serotask as a personal product and learning initiative. It gives me an opportunity to explore real-world product development, application architecture, developer experience, and the decisions involved in building software from the ground up.',
      'My current learning interests include Core Java, Spring Boot, REST APIs, Microservices, System Design, Data Structures and Algorithms, Generative AI, RAG, and AI Agents.',
      'My goal is simple: become a stronger engineer by consistently learning, building practical projects, understanding the fundamentals, and sharing useful technical knowledge with the developer community.',
    ],
  },
  {
    slug: 'angular-architecture-for-scalable-applications',
    title: 'Angular Architecture: How to Build Scalable and Maintainable Applications',
    date: '2026-11-13',
    readMins: 7,
    tag: 'Angular',
    excerpt:
      'Understand Angular application architecture, standalone components, feature-based structure, services, dependency injection, and maintainable frontend development.',
    body: [
      'Building an Angular application is easy when the project is small. The real challenge begins when multiple developers work on the same application and the number of features, components, and API integrations increases.',
      'I prefer organizing Angular applications around business features instead of keeping every component, service, and model in large shared folders. Feature-based architecture makes ownership clearer and helps developers understand where new functionality belongs.',
      'Standalone components simplify Angular application structure by reducing the need for unnecessary NgModule declarations. Combined with lazy loading, they help create applications that load features when users actually need them.',
      'Angular Signals provide a modern reactive approach to managing local and shared UI state. RxJS remains important for asynchronous streams, HTTP operations, event handling, and complex reactive workflows. Understanding when to use each is an important part of modern Angular development.',
      'Dependency injection, reusable services, typed reactive forms, route guards, interceptors, and clear component responsibilities are equally important. Components should focus on presentation and interaction rather than becoming responsible for every business operation.',
      'My approach is to keep components focused, services purposeful, data models strongly typed, and application boundaries clear. Good Angular architecture is not about creating more folders; it is about making future changes easier and safer.',
    ],
  },
  {
    slug: 'typescript-concepts-every-angular-developer-should-know',
    title: 'TypeScript Concepts Every Angular Developer Should Master',
    date: '2026-11-14',
    readMins: 6,
    tag: 'TypeScript',
    excerpt:
      'A practical guide to interfaces, types, generics, utility types, union types, and type safety in real Angular applications.',
    body: [
      'TypeScript is one of the most important technologies in my frontend development toolkit. Angular uses TypeScript extensively, and understanding its type system makes applications easier to maintain and debug.',
      'Interfaces and type aliases help define the shape of application data. For example, an API response should have a clear structure instead of being represented everywhere as any.',
      'Generics are particularly useful when building reusable services, API response models, tables, and utility functions. They allow us to write flexible code without losing type safety.',
      'Union types and optional properties help model real-world application states. Utility types such as Partial, Pick, Omit, and Record reduce repetitive type definitions.',
      'I also pay attention to strict TypeScript configuration, avoiding unnecessary any usage, and using type guards when working with uncertain data.',
      'My recommendation is to learn TypeScript beyond Angular syntax. Strong TypeScript fundamentals make it easier to build reusable libraries, scalable frontend architectures, and reliable developer tools.',
    ],
  },
  {
    slug: 'java-oop-concepts-with-real-world-examples',
    title: 'Java OOP Concepts Explained with Practical Examples',
    date: '2026-11-15',
    readMins: 8,
    tag: 'Java',
    excerpt:
      'Learn encapsulation, inheritance, polymorphism, abstraction, constructors, interfaces, and object relationships through practical Java examples.',
    body: [
      'Object-Oriented Programming is one of the most important foundations of Java. Before working deeply with Spring Boot, developers should understand how Java objects are created, organized, and interact with each other.',
      'Encapsulation means keeping data and the operations that manage that data together. Private fields with controlled access through methods help protect an object from invalid state changes.',
      'Inheritance allows one class to reuse and extend another class. However, inheritance should be used when a genuine is-a relationship exists. Composition is often a better choice when one object simply uses another object.',
      'Polymorphism allows the same interface or parent reference to represent different implementations. Method overriding is particularly useful when designing flexible business logic.',
      'Abstraction hides implementation details and exposes essential behavior. Java interfaces and abstract classes help define contracts and separate what a component does from how it does it.',
      'Other important concepts include constructors, access modifiers, static and final keywords, method overloading, the Object class, equals, hashCode, and object relationships such as association, aggregation, and composition.',
      'I recommend practicing these concepts by building small examples such as a payment system, notification service, employee management system, and order management model. Understanding OOP through code is more valuable than memorizing definitions.',
    ],
  },
  {
    slug: 'java-collections-framework-practical-guide',
    title: 'Java Collections Framework: List, Set, Map and Their Use Cases',
    date: '2026-11-16',
    readMins: 7,
    tag: 'Java',
    excerpt:
      'Understand ArrayList, LinkedList, HashSet, TreeSet, HashMap, TreeMap, iteration, and how to choose the right collection.',
    body: [
      'The Java Collections Framework provides reusable data structures for storing and processing objects. Choosing the correct collection can improve application performance and simplify business logic.',
      'List maintains an ordered collection and allows duplicate elements. ArrayList is commonly useful when frequent indexed access is required, while LinkedList has different performance characteristics for insertion and removal operations.',
      'Set stores unique elements. HashSet is useful when uniqueness and efficient average-case membership checks matter. TreeSet maintains sorted order and provides ordered operations.',
      'Map stores key-value pairs. HashMap is commonly used for efficient lookups, while TreeMap maintains keys in sorted order. LinkedHashMap preserves insertion order.',
      'Developers should understand equals and hashCode because they directly affect how hash-based collections identify objects. Incorrect implementations can lead to unexpected duplicate entries or lookup failures.',
      'Another important topic is time complexity. Understanding average-case O(1), O(log n), and O(n) operations helps make better data structure decisions.',
      'My learning approach is to implement small examples, compare different collections, understand their internal behavior, and solve DSA problems using the appropriate data structure.',
    ],
  },
  {
    slug: 'spring-boot-application-architecture',
    title: 'Spring Boot Application Architecture: Controller, Service and Repository',
    date: '2026-11-17',
    readMins: 8,
    tag: 'Spring Boot',
    excerpt:
      'Learn how to structure a Spring Boot application using layered architecture, dependency injection, DTOs, repositories, and service classes.',
    body: [
      'Spring Boot makes it easier to build Java applications, but a good framework does not automatically guarantee good architecture. Developers still need to understand how application responsibilities should be separated.',
      'A common starting point is layered architecture. The controller handles incoming HTTP requests, the service contains business logic, and the repository manages persistence operations.',
      'Controllers should remain thin. They should validate request inputs, delegate work to services, and return appropriate HTTP responses instead of implementing complex business rules.',
      'Service classes coordinate business operations and communicate with repositories or other application services. This separation makes business logic easier to test and reuse.',
      'DTOs help control the data exposed through API contracts. Entity classes should represent persistence concerns, while request and response DTOs represent the information exchanged with clients.',
      'Spring dependency injection allows components to depend on abstractions and collaborate without manually creating every dependency. Constructor injection is a clean approach because dependencies are explicit and can be immutable.',
      'I also consider global exception handling, validation, configuration management, logging, database transactions, and structured API responses essential parts of a production-ready application.',
      'A well-designed Spring Boot project should be understandable to another developer without requiring them to inspect every class. Clear responsibilities and consistent conventions make that possible.',
    ],
  },
  {
    slug: 'building-secure-rest-apis-with-spring-boot',
    title: 'Building Secure REST APIs with Java and Spring Boot',
    date: '2026-11-18',
    readMins: 8,
    tag: 'Backend Development',
    excerpt:
      'Explore REST principles, HTTP methods, validation, authentication, authorization, exception handling, and API security fundamentals.',
    body: [
      'REST APIs are an important part of modern application development. They allow frontend applications, mobile clients, and external services to communicate through well-defined HTTP contracts.',
      'A good REST API should use HTTP methods correctly. GET retrieves resources, POST creates resources, PUT replaces resources, PATCH updates selected fields, and DELETE removes resources.',
      'HTTP status codes communicate the result of an operation. Developers should understand when to return 200, 201, 204, 400, 401, 403, 404, and 500 instead of returning the same status for every response.',
      'In Spring Boot, Bean Validation helps validate incoming request data using annotations such as NotNull, NotBlank, Size, and Email. Validation should happen at the API boundary, with business rules enforced in the appropriate service layer.',
      'Spring Security provides authentication and authorization capabilities. Authentication establishes who a user is, while authorization determines what that user is allowed to do.',
      'JWT-based authentication is one possible approach for stateless APIs. Developers should understand token validation, expiration, signing, secure storage, and the difference between roles and permissions.',
      'Production APIs also require centralized exception handling, rate limiting where appropriate, secure configuration, HTTPS, safe logging, and careful management of sensitive information.',
      'My focus when designing an API is not just making an endpoint work. It is making the contract predictable, secure, testable, and easy for other developers to integrate.',
    ],
  },
  {
    slug: 'microservices-vs-monolithic-architecture',
    title: 'Monolithic vs Microservices Architecture: Understanding the Trade-offs',
    date: '2026-11-19',
    readMins: 7,
    tag: 'System Design',
    excerpt:
      'Understand monolithic and microservices architectures, service boundaries, communication, scalability, deployment, and distributed system complexity.',
    body: [
      'One common misconception in software development is that microservices are always better than monolithic architecture. In reality, both approaches solve different problems and introduce different trade-offs.',
      'A monolithic application keeps most business functionality within a single deployable application. This can simplify development, debugging, deployment, and transactions, especially for small teams and early-stage products.',
      'Microservices divide an application into independently deployable services based on business capabilities. Each service can own its responsibilities and, where appropriate, its own data.',
      'However, distributed architecture introduces additional challenges. Network failures, service discovery, API versioning, distributed tracing, data consistency, retries, and monitoring become important engineering concerns.',
      'Service boundaries should be based on business responsibilities rather than simply splitting every database table or controller into a separate service.',
      'Before adopting microservices, I would evaluate team size, deployment requirements, scaling needs, domain complexity, and operational maturity.',
      'The best architecture is not necessarily the most complex one. It is the architecture that meets current requirements while leaving room for responsible evolution.',
    ],
  },
  {
    slug: 'clean-code-solid-principles-for-java-developers',
    title: 'Clean Code and SOLID Principles Every Java Developer Should Understand',
    date: '2026-11-20',
    readMins: 7,
    tag: 'Software Engineering',
    excerpt:
      'Learn Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion with practical engineering examples.',
    body: [
      'Writing code that works is only the first step. Professional software engineering also requires code that other developers can understand, test, extend, and maintain.',
      'Clean code starts with meaningful names, small focused methods, clear responsibilities, and avoiding unnecessary complexity. Code should communicate its intention rather than force readers to reconstruct what it does.',
      'The Single Responsibility Principle encourages a class to have one clear responsibility. A service responsible for unrelated database operations, email delivery, and report generation is difficult to maintain.',
      'The Open/Closed Principle encourages designs that can support new behavior without repeatedly modifying stable existing code. Interfaces and appropriate extension points can help achieve this.',
      'The Liskov Substitution Principle means that implementations should behave consistently with the contracts of their parent types. The Interface Segregation Principle encourages smaller, focused interfaces.',
      'The Dependency Inversion Principle encourages high-level business logic to depend on abstractions rather than tightly coupled implementations. Dependency injection in Spring supports this design approach.',
      'SOLID principles should not be applied mechanically. They are guidelines for making code easier to change, not rules that require creating an interface and abstraction for every class.',
      'I believe maintainable code comes from good engineering judgment: choosing the simplest design that keeps responsibilities clear and future changes manageable.',
    ],
  },
  {
    slug: 'from-full-stack-development-to-applied-ai-engineering',
    title: 'From Full Stack Development to Applied AI Engineering',
    date: '2026-11-21',
    readMins: 8,
    tag: 'Applied AI',
    excerpt:
      'How frontend and backend engineering fundamentals connect with LLMs, embeddings, RAG pipelines, AI agents, and production AI applications.',
    body: [
      'The evolution of software engineering is creating new opportunities for developers who understand both traditional application development and modern AI capabilities.',
      'My interest in Applied AI Engineering comes from wanting to build useful software products rather than simply experimenting with AI prompts. A production AI application still needs reliable APIs, frontend experiences, authentication, databases, observability, and proper error handling.',
      'Large Language Models can generate and understand text, but they do not automatically have access to private application knowledge. Retrieval-Augmented Generation, commonly known as RAG, addresses this limitation by retrieving relevant information and providing it as context to a model.',
      'A typical RAG pipeline includes document ingestion, text extraction, chunking, embedding generation, vector storage, retrieval, and response generation. Each stage affects answer quality and system performance.',
      'AI agents introduce another layer of capability. An agent can use tools, retrieve information, perform structured actions, and coordinate multiple steps. However, permissions, validation, tool boundaries, and human approval are important when agents interact with real systems.',
      'For full-stack developers, technologies such as Angular, Java, Spring Boot, REST APIs, databases, and Spring AI can provide a foundation for integrating AI features into existing applications.',
      'I am focusing on understanding LLM fundamentals, prompt engineering, embeddings, RAG evaluation, tool calling, agent workflows, and production deployment. I believe practical implementation and evaluation are more valuable than following AI trends without understanding them.',
      'My long-term direction is to combine strong software engineering fundamentals with Applied AI capabilities and build products that solve real problems.',
    ],
  },
  {
    slug: 'complete-angular-developer-roadmap',
    title: 'Complete Angular Developer Roadmap: Learn Angular Step by Step',
    date: '2026-11-12',
    readMins: 10,
    tag: 'Angular',
    excerpt:
      'A structured 15-day Angular learning roadmap covering components, Signals, RxJS, routing, forms, HTTP, testing, performance and architecture.',
    body: [
      'Day 1: Angular fundamentals, SPA architecture, CLI and project structure.',
      'Day 2: Components, selectors, templates and component communication.',
      'Day 3: Data binding, interpolation, property binding and event binding.',
      'Day 4: Directives, pipes and template control flow.',
      'Day 5: Services, dependency injection and providers.',
      'Day 6: Standalone components, feature organization and lazy loading.',
      'Day 7: Angular Router, route parameters, guards and resolvers.',
      'Day 8: Reactive Forms, validation and custom validators.',
      'Day 9: HttpClient, interceptors and API integration.',
      'Day 10: RxJS, Observables, Subjects and operators.',
      'Day 11: Angular Signals, computed, effect and reactive state.',
      'Day 12: State management and component communication patterns.',
      'Day 13: Change detection, performance optimization and OnPush.',
      'Day 14: Unit testing, accessibility and error handling.',
      'Day 15: Production architecture, SSR and a practical Angular project.',
      'Daily practice: Build small components, implement features and revise interview questions.',
    ],
  },
  {
    slug: 'complete-typescript-roadmap',
    title: 'Complete TypeScript Roadmap: Beginner to Advanced',
    date: '2026-11-13',
    readMins: 8,
    tag: 'TypeScript',
    excerpt:
      'Master TypeScript fundamentals, advanced types, generics and real-world application development in 10 days.',
    body: [
      'Day 1: TypeScript introduction, installation and compiler configuration.',
      'Day 2: Primitive types, arrays, tuples and enums.',
      'Day 3: Functions, optional parameters and return types.',
      'Day 4: Interfaces, type aliases and object types.',
      'Day 5: Classes, inheritance, access modifiers and abstract classes.',
      'Day 6: Union types, intersection types and type narrowing.',
      'Day 7: Generics and generic constraints.',
      'Day 8: Utility types: Partial, Pick, Omit, Record and Required.',
      'Day 9: Advanced types, keyof, typeof, mapped types and conditional types.',
      'Day 10: Modules, async programming, strict mode and practical project.',
      'Daily practice: Write strongly typed functions, models and reusable utilities.',
    ],
  },
  {
    slug: 'complete-core-java-roadmap',
    title: 'Complete Core Java Roadmap: Zero to Professional',
    date: '2026-11-14',
    readMins: 12,
    tag: 'Java',
    excerpt:
      'A 20-day Core Java roadmap covering Java fundamentals, OOP, Collections, Streams, exceptions, multithreading and JVM.',
    body: [
      'Day 1: Java introduction, JDK, JRE, JVM and first Java program.',
      'Day 2: Variables, primitive data types, operators and type casting.',
      'Day 3: Conditional statements and loops.',
      'Day 4: Methods, parameters, return types and method overloading.',
      'Day 5: Classes, objects, constructors and this keyword.',
      'Day 6: Encapsulation and access modifiers.',
      'Day 7: Inheritance, super keyword and method overriding.',
      'Day 8: Polymorphism and dynamic method dispatch.',
      'Day 9: Abstraction, abstract classes and interfaces.',
      'Day 10: Association, aggregation, composition and object relationships.',
      'Day 11: Strings, StringBuilder, StringBuffer and immutability.',
      'Day 12: Arrays, multidimensional arrays and varargs.',
      'Day 13: Exception handling and custom exceptions.',
      'Day 14: Collections Framework, List, Set and Queue.',
      'Day 15: Map, HashMap, HashSet and internal working.',
      'Day 16: Generics, Comparable and Comparator.',
      'Day 17: Lambda expressions, functional interfaces and Streams.',
      'Day 18: Optional, Date and Time API and file handling.',
      'Day 19: Multithreading, synchronization and concurrency basics.',
      'Day 20: JVM, memory management, garbage collection and final revision.',
      'Daily practice: Write Java programs and solve interview-oriented problems.',
    ],
  },
  {
    slug: 'complete-spring-boot-roadmap',
    title: 'Complete Spring Boot Developer Roadmap: 20 Days',
    date: '2026-11-15',
    readMins: 12,
    tag: 'Spring Boot',
    excerpt:
      'Learn Spring Framework, Spring Boot, REST APIs, JPA, Security, testing and production development step by step.',
    body: [
      'Day 1: Spring Framework introduction, IoC and Dependency Injection.',
      'Day 2: Beans, ApplicationContext and bean lifecycle.',
      'Day 3: Spring Boot fundamentals, starters and auto-configuration.',
      'Day 4: Project structure, configuration and profiles.',
      'Day 5: REST controllers, request mappings and HTTP methods.',
      'Day 6: Request parameters, path variables and DTOs.',
      'Day 7: Bean Validation and global exception handling.',
      'Day 8: Spring Data JPA and entity mapping.',
      'Day 9: Relationships, OneToOne, OneToMany and ManyToMany.',
      'Day 10: Repositories, pagination, sorting and custom queries.',
      'Day 11: Hibernate, lazy loading and N+1 query problems.',
      'Day 12: Transactions, propagation and isolation.',
      'Day 13: Spring Security fundamentals and authentication.',
      'Day 14: JWT authentication and authorization.',
      'Day 15: Role-based access control and method security.',
      'Day 16: Unit testing, Mockito and integration testing.',
      'Day 17: Logging, Actuator and application monitoring.',
      'Day 18: Caching, performance and asynchronous operations.',
      'Day 19: Docker, externalized configuration and deployment.',
      'Day 20: Build a production-style Spring Boot REST API.',
      'Daily practice: Implement endpoints, database operations, security and tests.',
    ],
  },
  {
    slug: 'complete-dsa-roadmap-for-developers',
    title: 'Complete DSA Roadmap: Data Structures and Algorithms',
    date: '2026-11-16',
    readMins: 15,
    tag: 'DSA',
    excerpt:
      'A 30-day interview preparation roadmap covering complexity, arrays, strings, trees, graphs, recursion and dynamic programming.',
    body: [
      'Day 1: Programming problem-solving approach and time complexity.',
      'Day 2: Space complexity and Big O notation.',
      'Day 3: Arrays and array traversal.',
      'Day 4: Searching and sorting fundamentals.',
      'Day 5: Strings and character frequency problems.',
      'Day 6: HashMap, HashSet and hashing.',
      'Day 7: Two Pointers pattern.',
      'Day 8: Sliding Window pattern.',
      'Day 9: Prefix Sum and difference arrays.',
      'Day 10: Binary Search and variations.',
      'Day 11: Recursion fundamentals.',
      'Day 12: Backtracking and subsets.',
      'Day 13: Linked List and operations.',
      'Day 14: Stack and monotonic stack.',
      'Day 15: Queue, Deque and circular queue.',
      'Day 16: Trees and binary tree traversal.',
      'Day 17: Binary Search Trees.',
      'Day 18: Tree height, diameter and recursion problems.',
      'Day 19: Heap and Priority Queue.',
      'Day 20: Greedy algorithms.',
      'Day 21: Graph representation and traversal.',
      'Day 22: BFS and DFS.',
      'Day 23: Topological sorting and cycle detection.',
      'Day 24: Shortest path fundamentals.',
      'Day 25: Dynamic Programming introduction.',
      'Day 26: One-dimensional Dynamic Programming.',
      'Day 27: Two-dimensional Dynamic Programming.',
      'Day 28: Bit manipulation.',
      'Day 29: Mixed interview problems.',
      'Day 30: Timed mock interview and revision.',
      'Daily practice: Solve problems, analyze complexity and explain your approach.',
    ],
  },
  {
    slug: 'complete-system-design-roadmap',
    title: 'Complete System Design Roadmap: Beginner to Advanced',
    date: '2026-11-17',
    readMins: 12,
    tag: 'System Design',
    excerpt:
      'Understand scalable architecture, caching, databases, load balancing, messaging and real-world system design interviews.',
    body: [
      'Day 1: System Design fundamentals and functional requirements.',
      'Day 2: Non-functional requirements and quality attributes.',
      'Day 3: Scalability, availability and reliability.',
      'Day 4: Latency, throughput and performance metrics.',
      'Day 5: Load balancing and reverse proxies.',
      'Day 6: Caching strategies and cache invalidation.',
      'Day 7: SQL and NoSQL database selection.',
      'Day 8: Database indexing, replication and partitioning.',
      'Day 9: CAP theorem and consistency models.',
      'Day 10: Message queues and asynchronous processing.',
      'Day 11: CDN, object storage and file handling.',
      'Day 12: Rate limiting and API design.',
      'Day 13: Logging, metrics and distributed tracing.',
      'Day 14: Design a URL shortener or notification system.',
      'Day 15: Mock system design interview and architecture revision.',
    ],
  },
  {
    slug: 'complete-microservices-roadmap',
    title: 'Complete Microservices Architecture Roadmap',
    date: '2026-11-18',
    readMins: 10,
    tag: 'Microservices',
    excerpt:
      'A 12-day practical roadmap covering service architecture, communication, resilience, Kafka, observability and deployment.',
    body: [
      'Day 1: Monolithic architecture vs microservices.',
      'Day 2: Service boundaries and Domain-Driven Design fundamentals.',
      'Day 3: Building independent Spring Boot services.',
      'Day 4: Synchronous communication with REST.',
      'Day 5: API Gateway and service discovery.',
      'Day 6: Centralized configuration.',
      'Day 7: Resilience patterns, timeouts, retries and circuit breakers.',
      'Day 8: Event-driven architecture and Apache Kafka.',
      'Day 9: Distributed transactions and Saga pattern.',
      'Day 10: Observability, tracing and centralized logging.',
      'Day 11: Docker, Kubernetes fundamentals and deployment.',
      'Day 12: Build and document a practical microservices system.',
    ],
  },
  {
    slug: 'complete-sql-postgresql-database-roadmap',
    title: 'Complete SQL and PostgreSQL Database Roadmap',
    date: '2026-11-19',
    readMins: 9,
    tag: 'Database',
    excerpt:
      'Learn SQL queries, joins, indexes, normalization, transactions and PostgreSQL performance in 10 days.',
    body: [
      'Day 1: Database fundamentals, relational databases and PostgreSQL setup.',
      'Day 2: SELECT, WHERE, ORDER BY and LIMIT.',
      'Day 3: INSERT, UPDATE and DELETE.',
      'Day 4: Aggregate functions and GROUP BY.',
      'Day 5: INNER JOIN, LEFT JOIN, RIGHT JOIN and FULL JOIN.',
      'Day 6: Subqueries, CTEs and window functions.',
      'Day 7: Primary keys, foreign keys and normalization.',
      'Day 8: Indexes and query execution plans.',
      'Day 9: ACID, transactions and isolation levels.',
      'Day 10: Query optimization, PostgreSQL operations and revision.',
    ],
  },
  {
    slug: 'complete-git-github-devops-roadmap',
    title: 'Complete Git, GitHub and DevOps Roadmap',
    date: '2026-11-20',
    readMins: 9,
    tag: 'DevOps',
    excerpt:
      'A 10-day developer roadmap covering version control, Docker, CI/CD, Jenkins, Linux, Nginx and deployment.',
    body: [
      'Day 1: Git fundamentals and repository initialization.',
      'Day 2: Commits, branches, merge and rebase.',
      'Day 3: GitHub repositories, pull requests and code reviews.',
      'Day 4: Git conflict resolution and collaborative workflows.',
      'Day 5: Linux commands, permissions and process management.',
      'Day 6: Docker images, containers and Dockerfiles.',
      'Day 7: Docker Compose and container networking.',
      'Day 8: CI/CD pipelines and Jenkins fundamentals.',
      'Day 9: Nginx, reverse proxy and application deployment.',
      'Day 10: Monitoring, logs and production deployment practice.',
    ],
  },
  {
    slug: 'complete-generative-ai-llm-roadmap',
    title: 'Complete Generative AI and LLM Engineering Roadmap',
    date: '2026-11-21',
    readMins: 12,
    tag: 'Generative AI',
    excerpt:
      'A 15-day roadmap covering LLM fundamentals, prompting, embeddings, APIs, structured outputs and AI evaluation.',
    body: [
      'Day 1: Artificial Intelligence, Machine Learning and Deep Learning fundamentals.',
      'Day 2: Generative AI and Large Language Models.',
      'Day 3: Tokens, tokenization and context windows.',
      'Day 4: Transformers and attention mechanism fundamentals.',
      'Day 5: Model parameters, temperature and sampling.',
      'Day 6: Prompt engineering and prompt patterns.',
      'Day 7: System prompts, user prompts and instruction hierarchy.',
      'Day 8: LLM APIs and model integration.',
      'Day 9: Structured outputs and JSON responses.',
      'Day 10: Function calling and tool integration.',
      'Day 11: Embeddings and semantic similarity.',
      'Day 12: Model selection, cost and latency.',
      'Day 13: Hallucinations, evaluation and guardrails.',
      'Day 14: Integrate an LLM into a Java Spring Boot application.',
      'Day 15: Build a complete LLM-powered application and document it.',
    ],
  },
  {
    slug: 'complete-rag-engineering-roadmap',
    title: 'Complete RAG Engineering Roadmap: Beginner to Advanced',
    date: '2026-11-22',
    readMins: 12,
    tag: 'RAG',
    excerpt:
      'Learn document ingestion, chunking, embeddings, vector search, hybrid retrieval, reranking and RAG evaluation.',
    body: [
      'Day 1: RAG fundamentals and why retrieval is needed.',
      'Day 2: Document ingestion and file processing.',
      'Day 3: Text extraction and document cleaning.',
      'Day 4: Chunking strategies and overlap.',
      'Day 5: Embedding models and vector representations.',
      'Day 6: Vector databases and similarity search.',
      'Day 7: Metadata filtering and document retrieval.',
      'Day 8: Semantic search and hybrid search.',
      'Day 9: RAG prompting and context construction.',
      'Day 10: Reranking and retrieval optimization.',
      'Day 11: Citations, source grounding and access control.',
      'Day 12: RAG evaluation and retrieval metrics.',
      'Day 13: Advanced RAG and query transformation.',
      'Day 14: Build RAG using Java, Spring AI and a vector database.',
      'Day 15: Deploy, monitor and evaluate a production-style RAG application.',
    ],
  },
  {
    slug: 'complete-ai-agents-applied-ai-engineering-roadmap',
    title: 'Complete AI Agents and Applied AI Engineer Roadmap',
    date: '2026-11-23',
    readMins: 12,
    tag: 'AI Agents',
    excerpt:
      'A 15-day roadmap to understand AI agents, tool calling, workflows, memory, orchestration, guardrails and production deployment.',
    body: [
      'Day 1: AI agent fundamentals and agent vs chatbot.',
      'Day 2: Agent architecture and reasoning-action cycles.',
      'Day 3: Tool calling and external API integration.',
      'Day 4: Structured tool inputs and outputs.',
      'Day 5: Agent memory and state management.',
      'Day 6: Planning and task decomposition.',
      'Day 7: Single-agent workflows.',
      'Day 8: Multi-agent architecture and coordination.',
      'Day 9: Workflow orchestration and deterministic execution.',
      'Day 10: Human-in-the-loop approvals and safety.',
      'Day 11: Agent guardrails, permissions and error recovery.',
      'Day 12: Agent evaluation, tracing and observability.',
      'Day 13: Integrate agents using Java and Spring AI.',
      'Day 14: Build a practical AI agent application.',
      'Day 15: Production deployment, security, cost and performance.',
    ],
  },
];
