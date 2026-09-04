export type SkillGroupId = 'frontend' | 'backend' | 'database' | 'devops_design';
export type SkillCategoryId = SkillGroupId; // Alias for backward compatibility

export interface SkillGroup {
  id: SkillGroupId;
  number: string;
  title: string;
  subtitle: string;
  badge: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: SkillGroupId;
  icon: string;
  brandColor: string;
  badge: string; // e.g., 'CORE', '2+ YRS', 'SSR', 'RELATIONAL', 'REAL-TIME', 'CLOUD', 'DESIGN'
  shortRole: string; // concise description
  role: string; // architectural role
  usage: string; // application context
  relatedProjects?: string[];
  tags: string[];
  featured?: boolean;
  width?: number;
  height?: number;
}

export const PROJECT_NAMES: Record<string, { title: string; number: string }> = {
  marymount: { title: 'Marymount Paris', number: '01' },
  lcml: { title: 'Life-Cycle Management Laboratory', number: '02' },
  v1: { title: 'Portfolio v1', number: '03' },
  kic: { title: 'Kelowna Islamic Center', number: '04' },
  grillzzy: { title: 'Grillzzy Foods', number: '05' },
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: 'frontend',
    number: '01',
    title: 'FRONTEND',
    subtitle: 'Type-safe architectures, reactive state loops & design systems',
    badge: 'CLIENT SYSTEMS',
  },
  {
    id: 'backend',
    number: '02',
    title: 'BACKEND',
    subtitle: 'Asynchronous runtimes, contract protocols & spatial 3D engines',
    badge: 'SERVICES & GRAPHICS',
  },
  {
    id: 'database',
    number: '03',
    title: 'DATABASE',
    subtitle: 'ACID integrity, real-time sync stores & relational index schemas',
    badge: 'PERSISTENCE',
  },
  {
    id: 'devops_design',
    number: '04',
    title: 'DEVOPS / DESIGN',
    subtitle: 'Serverless containers, CI pipelines, tooling & vector prototypes',
    badge: 'INFRA & DESIGN',
  },
];

export const SKILL_CATEGORIES = SKILL_GROUPS;

export const SKILLS_DATA: SkillItem[] = [
  // ==========================================
  // 01 — FRONTEND
  // ==========================================
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    icon: '/assets/imgs/svg-icons/typescript.svg',
    brandColor: '#3178C6',
    badge: 'CORE',
    shortRole: 'Type-safe architecture & contracts',
    role: 'Strict Interface Contracts & Type Verification',
    usage: 'Generics, discriminated unions, static verification, and scalable modular refactoring.',
    relatedProjects: ['lcml', 'marymount', 'v1'],
    tags: ['Static Types', 'Generics', 'Strict Mode', 'Contracts'],
    featured: true,
    width: 76,
    height: 76,
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    icon: '/assets/imgs/svg-icons/react.svg',
    brandColor: '#61DAFB',
    badge: '2+ YRS',
    shortRole: 'Declarative UI & hook state loops',
    role: 'Component Architecture & Reactive Workflows',
    usage: 'State-driven SPAs, reactive dashboards, custom hooks, and virtual DOM reconciliation.',
    relatedProjects: ['marymount', 'lcml', 'v1'],
    tags: ['Hooks', 'Virtual DOM', 'State Management', 'Components'],
    featured: true,
    width: 80,
    height: 80,
  },
  {
    id: 'javascript',
    name: 'JavaScript (ESNext)',
    category: 'frontend',
    icon: '/assets/imgs/svg-icons/javascript.svg',
    brandColor: '#F7DF1E',
    badge: 'CORE',
    shortRole: 'Modern runtime & Web APIs',
    role: 'Core Asynchronous Programming & Web Platform',
    usage: 'Async/await pipelines, DOM events, Web Streams, and functional data transformations.',
    relatedProjects: ['v1', 'grillzzy'],
    tags: ['Async/Await', 'Event Loop', 'DOM', 'Closures'],
    width: 66,
    height: 66,
  },
  {
    id: 'svelte',
    name: 'Svelte',
    category: 'frontend',
    icon: '/assets/imgs/svg-icons/svelte.svg',
    brandColor: '#FF3E00',
    badge: 'COMPILED',
    shortRole: 'Zero-VDOM reactivity & speed',
    role: 'Compile-Time Reactivity & High-Framerate UI',
    usage: 'Zero-virtual-DOM performance for micro-interactions, high frame rates, and smooth transitions.',
    relatedProjects: ['v1'],
    tags: ['Compiler', 'Zero VDOM', 'Micro-Interactions', 'Transitions'],
    featured: true,
    width: 68,
    height: 68,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: '/assets/imgs/svg-icons/tailwind.svg',
    brandColor: '#38BDF8',
    badge: 'TOKENS',
    shortRole: 'Design tokens & fluid scales',
    role: 'Design System Scalability & Utility Architecture',
    usage: 'Responsive breakpoints, dark/light canvas harmony, and tokens without stylesheet bloat.',
    relatedProjects: ['lcml', 'v1'],
    tags: ['Design Systems', 'Utility-First', 'Tokens', 'Responsive'],
    featured: true,
    width: 72,
    height: 72,
  },
  {
    id: 'html5',
    name: 'HTML5 & Semantics',
    category: 'frontend',
    icon: '/assets/imgs/svg-icons/html5.svg',
    brandColor: '#E34F26',
    badge: 'A11Y',
    shortRole: 'Accessible DOM & semantic outlines',
    role: 'Document Structure & Accessibility Standards',
    usage: 'WCAG compliance, screen-reader friendly landmarks, and optimized meta configurations.',
    relatedProjects: ['marymount', 'grillzzy', 'v1'],
    tags: ['Semantic DOM', 'Accessibility', 'ARIA', 'SEO'],
    width: 66,
    height: 66,
  },

  // ==========================================
  // 02 — BACKEND
  // ==========================================
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    icon: '/assets/imgs/svg-icons/nodejs.svg',
    brandColor: '#68A063',
    badge: 'CORE',
    shortRole: 'Event-driven server runtime',
    role: 'Backend Services & High-Throughput APIs',
    usage: 'RESTful endpoints, secure auth workflows, multipart upload pipelines, and microservices.',
    relatedProjects: ['marymount', 'kic'],
    tags: ['Runtime', 'Express', 'Async I/O', 'REST'],
    featured: true,
    width: 78,
    height: 78,
  },
  {
    id: 'api',
    name: 'REST & GraphQL APIs',
    category: 'backend',
    icon: '/assets/imgs/svg-icons/api.svg',
    brandColor: '#10B981',
    badge: 'CONTRACTS',
    shortRole: 'Optimized network interfaces',
    role: 'Strict Network Contracts & Schema Validation',
    usage: 'Strict payload validation, caching strategies, pagination, and predictable client fetching.',
    relatedProjects: ['marymount', 'kic'],
    tags: ['API Contracts', 'JSON', 'Endpoints', 'HTTP'],
    width: 66,
    height: 66,
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    icon: '/assets/imgs/svg-icons/php.svg',
    brandColor: '#777BB4',
    badge: 'SERVER',
    shortRole: 'Dynamic CMS & server logic',
    role: 'CMS Architecture & Server-Side Integration',
    usage: 'Headless CMS implementations, secure admin dashboards, and database querying.',
    relatedProjects: ['marymount', 'lcml'],
    tags: ['CMS', 'Server-Side', 'APIs', 'MySQL'],
    width: 66,
    height: 66,
  },
  {
    id: 'threejs',
    name: 'Three.js & WebGL',
    category: 'backend',
    icon: '/assets/imgs/svg-icons/threejs.svg',
    brandColor: '#38BDF8',
    badge: 'SPATIAL',
    shortRole: 'Real-time 3D spatial scenes',
    role: 'Spatial Graphics & Interactive Viewports',
    usage: 'Real-time 3D particle systems, mathematical distribution shells, and custom scene graphs.',
    relatedProjects: ['v1'],
    tags: ['3D Graphics', 'WebGL', 'SceneGraph', 'Perspective'],
    featured: true,
    width: 80,
    height: 80,
  },
  {
    id: 'shaders',
    name: 'GLSL Shaders',
    category: 'backend',
    icon: '/assets/imgs/svg-icons/shader.svg',
    brandColor: '#F43F5E',
    badge: 'GPU',
    shortRole: 'Hardware fragment programs',
    role: 'GPU Acceleration & Procedural Rendering',
    usage: 'Simplex noise displacement, chromatic aberration split, and interactive image deformation.',
    relatedProjects: ['v1'],
    tags: ['GPU', 'Fragment Shaders', 'Simplex Noise', 'Math'],
    featured: true,
    width: 68,
    height: 68,
  },
  {
    id: 'motion',
    name: 'Animation & Physics',
    category: 'backend',
    icon: '/assets/imgs/svg-icons/motion.svg',
    brandColor: '#A855F7',
    badge: 'KINETIC',
    shortRole: 'Choreographed spring physics',
    role: 'Micro-Interactions & Choreographed Motion',
    usage: 'Cubic-bezier easing curves, staggered viewport entries, and inertial drag responsiveness.',
    relatedProjects: ['v1', 'grillzzy'],
    tags: ['Spring Physics', 'Interpolation', 'Choreography', 'Transitions'],
    width: 66,
    height: 66,
  },

  // ==========================================
  // 03 — DATABASE
  // ==========================================
  {
    id: 'postgresql',
    name: 'PostgreSQL / SQL',
    category: 'database',
    icon: '/assets/imgs/svg-icons/postgresql.svg',
    brandColor: '#4169E1',
    badge: 'RELATIONAL',
    shortRole: 'ACID relational schemas & joins',
    role: 'Relational Schema Design & Data Integrity',
    usage: 'Structured persistence, relational query optimization, composite indexing, and transactions.',
    relatedProjects: ['marymount', 'lcml'],
    tags: ['SQL', 'Schemas', 'Relational', 'ACID'],
    featured: true,
    width: 76,
    height: 76,
  },
  {
    id: 'firebase',
    name: 'Firebase Firestore',
    category: 'database',
    icon: '/assets/imgs/svg-icons/firebase.svg',
    brandColor: '#FFCA28',
    badge: 'REAL-TIME',
    shortRole: 'Reactive document sync & auth',
    role: 'Realtime Sync & Identity Management',
    usage: 'Cloud Firestore document storage, user authentication, and Firebase Cloud Messaging.',
    relatedProjects: ['kic'],
    tags: ['Firestore', 'Auth', 'Realtime', 'Document Store'],
    featured: true,
    width: 64,
    height: 64,
  },
  {
    id: 'schema_arch',
    name: 'Schema Architecture',
    category: 'database',
    icon: '/assets/imgs/svg-icons/schema.svg',
    brandColor: '#34D399',
    badge: 'INDEXING',
    shortRole: 'Entity modeling & constraints',
    role: 'Data Modeling & Query Optimization',
    usage: 'Foreign key constraints, migration lifecycles, and high-performance read projections.',
    relatedProjects: ['marymount', 'lcml'],
    tags: ['Normalization', 'Constraints', 'Migrations', 'Queries'],
    width: 62,
    height: 62,
  },
  {
    id: 'cache_store',
    name: 'Data Persistence',
    category: 'database',
    icon: '/assets/imgs/svg-icons/storage.svg',
    brandColor: '#60A5FA',
    badge: 'STORAGE',
    shortRole: 'State sync & storage lifecycle',
    role: 'Client & Server State Synchronization',
    usage: 'Hydration persistence, optimistic updates, and resilient offline cache boundaries.',
    relatedProjects: ['v1', 'marymount'],
    tags: ['Offline First', 'State Sync', 'Hydration', 'Cache'],
    width: 62,
    height: 62,
  },

  // ==========================================
  // 04 — DEVOPS / DESIGN
  // ==========================================
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops_design',
    icon: '/assets/imgs/svg-icons/docker.svg',
    brandColor: '#2496ED',
    badge: 'CONTAINERS',
    shortRole: 'Multi-stage container builds',
    role: 'Containerization & Environment Parity',
    usage: 'Multi-stage Docker builds, lightweight image creation, and deployment pipelines.',
    relatedProjects: ['marymount'],
    tags: ['Containers', 'DevOps', 'Reproducibility', 'Deploy'],
    width: 68,
    height: 68,
  },
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    category: 'devops_design',
    icon: '/assets/imgs/svg-icons/gcp.svg',
    brandColor: '#4285F4',
    badge: 'CLOUD',
    shortRole: 'Cloud Run & serverless hosting',
    role: 'Serverless Hosting & Cloud Architecture',
    usage: 'Cloud Run container hosting, IAM security policies, and Cloud Storage distribution.',
    relatedProjects: ['marymount', 'kic'],
    tags: ['Cloud Run', 'GCP', 'Storage', 'Serverless'],
    featured: true,
    width: 66,
    height: 66,
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'devops_design',
    icon: '/assets/imgs/svg-icons/git.svg',
    brandColor: '#F05032',
    badge: 'VCS',
    shortRole: 'Branch workflows & CI/CD',
    role: 'Version Control & Code Quality',
    usage: 'Branching workflows, semantic releases, pull-request reviews, and GitHub Actions.',
    relatedProjects: ['marymount', 'lcml', 'v1', 'kic', 'grillzzy'],
    tags: ['VCS', 'Collaboration', 'CI/CD', 'Open Source'],
    width: 64,
    height: 64,
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'devops_design',
    icon: '/assets/imgs/svg-icons/figma.svg',
    brandColor: '#A259FF',
    badge: 'DESIGN',
    shortRole: 'Vector tokens & interactive flow',
    role: 'Interface Design & Interactive Prototyping',
    usage: 'Wireframing, typography pairing, component design tokens, and client presentations.',
    relatedProjects: ['marymount', 'lcml', 'v1', 'kic', 'grillzzy'],
    tags: ['UI/UX', 'Wireframing', 'Prototyping', 'Design Systems'],
    featured: true,
    width: 60,
    height: 60,
  },
  {
    id: 'vite',
    name: 'Vite & Tooling',
    category: 'devops_design',
    icon: '/assets/imgs/svg-icons/vite.svg',
    brandColor: '#646CFF',
    badge: 'BUNDLER',
    shortRole: 'ESM pipelines & optimization',
    role: 'Build Pipelines & Module Bundling',
    usage: 'Fast development cold-starts, Rollup tree-shaking, and production asset optimization.',
    relatedProjects: ['marymount', 'lcml', 'v1'],
    tags: ['Bundler', 'Rollup', 'ESM', 'Optimization'],
    width: 62,
    height: 62,
  },
  {
    id: 'mobile_systems',
    name: 'Mobile Systems',
    category: 'devops_design',
    icon: '/assets/imgs/svg-icons/iOS.svg',
    brandColor: '#9CA3AF',
    badge: 'RESPONSIVE',
    shortRole: 'Adaptive viewports & touch ergonomics',
    role: 'Cross-Device Performance & Touch UX',
    usage: 'Mobile touch boundaries, safe area insets, and progressive web application paradigms.',
    relatedProjects: ['kic', 'v1'],
    tags: ['Mobile First', 'Touch UI', 'Adaptive', 'PWA'],
    width: 60,
    height: 60,
  },
];

// Lookup map for fast retrieval
export const SKILLS_MAP = new Map(SKILLS_DATA.map((s) => [s.id, s]));

// =================================================================
// 5 SPATIAL CONSTELLATION BANDS (Matching Space Portfolio architecture)
// Each technology appears EXACTLY ONCE with intentional sizing & hierarchy
// =================================================================

// ROW 01 — Large Core Technologies (High prominence 76-80px)
export const ROW_1_CORE_SKILLS: SkillItem[] = [
  SKILLS_MAP.get('typescript')!,
  SKILLS_MAP.get('react')!,
  SKILLS_MAP.get('threejs')!,
  SKILLS_MAP.get('nodejs')!,
  SKILLS_MAP.get('postgresql')!,
];

// ROW 02 — Frontend & Reactive Systems (66-72px)
export const ROW_2_FRONTEND_SKILLS: SkillItem[] = [
  SKILLS_MAP.get('javascript')!,
  SKILLS_MAP.get('svelte')!,
  SKILLS_MAP.get('tailwind')!,
  SKILLS_MAP.get('html5')!,
  SKILLS_MAP.get('motion')!,
];

// ROW 03 — Graphics, Shaders & Backend Architecture (64-68px)
export const ROW_3_BACKEND_SKILLS: SkillItem[] = [
  SKILLS_MAP.get('shaders')!,
  SKILLS_MAP.get('api')!,
  SKILLS_MAP.get('php')!,
  SKILLS_MAP.get('firebase')!,
];

// ROW 04 — Infrastructure, Cloud & Data Integrity (62-68px)
export const ROW_4_INFRA_SKILLS: SkillItem[] = [
  SKILLS_MAP.get('docker')!,
  SKILLS_MAP.get('gcp')!,
  SKILLS_MAP.get('schema_arch')!,
  SKILLS_MAP.get('cache_store')!,
  SKILLS_MAP.get('git')!,
];

// ROW 05 — Design, Tooling & Mobile Ergonomics (60-62px)
export const ROW_5_DESIGN_SKILLS: SkillItem[] = [
  SKILLS_MAP.get('figma')!,
  SKILLS_MAP.get('vite')!,
  SKILLS_MAP.get('mobile_systems')!,
];

export const SKILL_CONSTELLATION_ROWS = [
  { id: 'row-1', label: 'Core Foundations', skills: ROW_1_CORE_SKILLS },
  { id: 'row-2', label: 'Frontend & Reactive Systems', skills: ROW_2_FRONTEND_SKILLS },
  { id: 'row-3', label: 'Graphics, Shaders & Backend', skills: ROW_3_BACKEND_SKILLS },
  { id: 'row-4', label: 'Cloud, DevOps & Data Integrity', skills: ROW_4_INFRA_SKILLS },
  { id: 'row-5', label: 'Design & Tooling Systems', skills: ROW_5_DESIGN_SKILLS },
];
