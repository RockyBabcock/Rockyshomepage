export type SkillCategoryId =
  | 'frontend'
  | 'frameworks'
  | 'backend'
  | 'cloud'
  | 'creative'
  | 'tools';

export interface SkillCategory {
  id: SkillCategoryId;
  number: string;
  title: string;
  description: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategoryId;
  icon: string;
  shortDescription: string;
  role: string;
  usage: string;
  relatedProjects?: string[];
  tags: string[];
  featured?: boolean;
}

export const PROJECT_NAMES: Record<string, { title: string; number: string }> = {
  marymount: { title: 'Marymount Paris', number: '01' },
  lcml: { title: 'Life-Cycle Management Laboratory', number: '02' },
  v1: { title: 'Portfolio v1', number: '03' },
  kic: { title: 'Kelowna Islamic Center', number: '04' },
  grillzzy: { title: 'Grillzzy Foods', number: '05' },
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    number: '01',
    title: 'FRONTEND',
    description: 'Foundational web standards, type safety, and responsive design systems.',
  },
  {
    id: 'frameworks',
    number: '02',
    title: 'FRAMEWORKS & UI',
    description: 'Component architecture, reactive paradigms, and multi-platform app ecosystems.',
  },
  {
    id: 'backend',
    number: '03',
    title: 'BACKEND & DATA',
    description: 'API architectures, server-side runtimes, relational schemas, and persistence.',
  },
  {
    id: 'cloud',
    number: '04',
    title: 'CLOUD & DEVOPS',
    description: 'Serverless deployment, container orchestration, and cloud infrastructure.',
  },
  {
    id: 'creative',
    number: '05',
    title: 'CREATIVE TECHNOLOGY',
    description: 'Real-time 3D spatial scenes, custom GLSL shaders, physics, and choreographed motion.',
  },
  {
    id: 'tools',
    number: '06',
    title: 'TOOLS & WORKFLOW',
    description: 'Vector prototyping, distributed version control, and ultra-fast bundlers.',
  },
];

export const SKILLS_DATA: SkillItem[] = [
  // 01 - FRONTEND
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    icon: '/assets/imgs/svg-icons/typescript.svg',
    shortDescription: 'Typed superset of JavaScript providing static verification and scalable architecture.',
    role: 'Type-Safe Architecture & Contract Guarantees',
    usage: 'Strict interface contracts, generics, and seamless refactoring across complex web systems.',
    relatedProjects: ['lcml', 'marymount', 'v1'],
    tags: ['Static Types', 'Generics', 'ESNext', 'Safety'],
    featured: true,
  },
  {
    id: 'javascript',
    name: 'JavaScript (ESNext)',
    category: 'frontend',
    icon: '/assets/imgs/svg-icons/javascript.svg',
    shortDescription: 'Modern ECMAScript runtime, asynchronous event loops, and web platform APIs.',
    role: 'Core Runtime & Async Programming',
    usage: 'Asynchronous workflows, DOM events, Web APIs, and functional transformations.',
    relatedProjects: ['v1', 'grillzzy'],
    tags: ['Async/Await', 'Event Loop', 'DOM', 'Closures'],
  },
  {
    id: 'html5',
    name: 'HTML5 & Semantics',
    category: 'frontend',
    icon: '/assets/imgs/svg-icons/html5.svg',
    shortDescription: 'Accessible document outlines, ARIA attributes, and semantic web structures.',
    role: 'Document Structure & Accessibility Standards',
    usage: 'WCAG compliance, screen-reader friendly layouts, and optimized meta configurations.',
    relatedProjects: ['marymount', 'grillzzy', 'v1'],
    tags: ['Semantic DOM', 'Accessibility', 'ARIA', 'SEO'],
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: '/assets/imgs/svg-icons/tailwind.svg',
    shortDescription: 'Utility-first CSS framework for expressive, fluid, and maintainable design systems.',
    role: 'Systematic Styling & Responsive Scales',
    usage: 'Responsive breakpoints, dark/light canvas harmony, and tokens without stylesheet bloat.',
    relatedProjects: ['lcml', 'v1'],
    tags: ['Design Systems', 'Utility-First', 'Responsive', 'CSS'],
    featured: true,
  },

  // 02 - FRAMEWORKS & UI
  {
    id: 'react',
    name: 'React',
    category: 'frameworks',
    icon: '/assets/imgs/svg-icons/react.svg',
    shortDescription: 'Declarative component-driven user interfaces and reactive state management.',
    role: 'Component Architecture & Interactive Workflows',
    usage: 'State-driven SPAs, reactive dashboards, custom hooks, and virtual DOM reconciliation.',
    relatedProjects: ['marymount', 'lcml', 'v1'],
    tags: ['UI', 'Components', 'Hooks', 'Virtual DOM'],
    featured: true,
  },
  {
    id: 'svelte',
    name: 'Svelte',
    category: 'frameworks',
    icon: '/assets/imgs/svg-icons/svelte.svg',
    shortDescription: 'Compiler-based reactive framework delivering lightweight bundles and fluid transitions.',
    role: 'Compile-Time Reactivity & Performance',
    usage: 'Zero-virtual-DOM performance for micro-interactions, high frame rates, and smooth UI animations.',
    relatedProjects: ['v1'],
    tags: ['Compiler', 'Reactivity', 'Micro-Interactions'],
    featured: true,
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'frameworks',
    icon: '/assets/imgs/svg-icons/flutter.svg',
    shortDescription: 'Multi-platform UI toolkit compiled to native ARM machine code.',
    role: 'Cross-Platform Mobile Development',
    usage: 'Building coherent multi-platform applications for iOS and Android from a single codebase.',
    relatedProjects: ['kic'],
    tags: ['Mobile', 'Dart', 'Cross-Platform', 'Widgets'],
  },
  {
    id: 'ios',
    name: 'iOS / Swift',
    category: 'frameworks',
    icon: '/assets/imgs/svg-icons/iOS.svg',
    shortDescription: 'Native iOS engineering with App Store compliance and platform integration.',
    role: 'Native Apple Platform Engineering',
    usage: 'App packaging, push notifications, and iOS layout adaptations.',
    relatedProjects: ['kic'],
    tags: ['iOS', 'Mobile', 'Apple', 'App Store'],
  },
  {
    id: 'android',
    name: 'Android',
    category: 'frameworks',
    icon: '/assets/imgs/svg-icons/android.svg',
    shortDescription: 'Android platform ecosystem, Google Play distribution, and device adaptations.',
    role: 'Android Platform Engineering & Packaging',
    usage: 'Google Play Store deployment, OS permissions, and mobile lifecycle handling.',
    relatedProjects: ['kic'],
    tags: ['Android', 'Mobile', 'Google Play', 'OS'],
  },

  // 03 - BACKEND & DATA
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    icon: '/assets/imgs/svg-icons/nodejs.svg',
    shortDescription: 'Asynchronous event-driven JavaScript runtime for scalable backend services.',
    role: 'Backend Services & API Servers',
    usage: 'Building RESTful APIs, authentication workflows, file upload pipelines, and microservices.',
    relatedProjects: ['marymount', 'kic'],
    tags: ['Runtime', 'Express', 'Async I/O', 'REST'],
    featured: true,
  },
  {
    id: 'php',
    name: 'PHP',
    category: 'backend',
    icon: '/assets/imgs/svg-icons/php.svg',
    shortDescription: 'Server-side scripting language driving dynamic CMS backends and content architectures.',
    role: 'CMS & Server-Side Integration',
    usage: 'Headless CMS implementations, secure admin dashboards, and database querying.',
    relatedProjects: ['marymount', 'lcml'],
    tags: ['CMS', 'Server-Side', 'APIs', 'MySQL'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL / SQL',
    category: 'backend',
    icon: '/assets/imgs/svg-icons/postgresql.svg',
    shortDescription: 'Enterprise relational database management system with ACID compliance.',
    role: 'Relational Schema Design & Data Integrity',
    usage: 'Structured data persistence, relational query optimization, indexing, and transactions.',
    relatedProjects: ['marymount', 'lcml'],
    tags: ['SQL', 'Schemas', 'Relational', 'Persistence'],
  },
  {
    id: 'api',
    name: 'REST & GraphQL APIs',
    category: 'backend',
    icon: '/assets/imgs/svg-icons/api.svg',
    shortDescription: 'Structured interface communication protocols between clients and distributed servers.',
    role: 'Contract Design & Network Optimization',
    usage: 'Strict payload validation, payload caching, and predictable client-side fetching.',
    relatedProjects: ['marymount', 'kic'],
    tags: ['API Contracts', 'JSON', 'Endpoints', 'HTTP'],
  },

  // 04 - CLOUD & DEVOPS
  {
    id: 'gcp',
    name: 'Google Cloud Platform',
    category: 'cloud',
    icon: '/assets/imgs/svg-icons/gcp.svg',
    shortDescription: 'Cloud infrastructure, serverless containers, and scalable enterprise services.',
    role: 'Serverless Hosting & Cloud Architecture',
    usage: 'Cloud Run container hosting, IAM security policies, and Cloud Storage distribution.',
    relatedProjects: ['marymount', 'kic'],
    tags: ['Cloud Run', 'GCP', 'Storage', 'Serverless'],
    featured: true,
  },
  {
    id: 'firebase',
    name: 'Firebase',
    category: 'cloud',
    icon: '/assets/imgs/svg-icons/firebase.svg',
    shortDescription: 'Real-time database, user authentication, and cloud serverless functions.',
    role: 'Realtime Sync & Identity Management',
    usage: 'Cloud Firestore document storage, user authentication, and Firebase Cloud Messaging.',
    relatedProjects: ['kic'],
    tags: ['Firestore', 'Auth', 'FCM', 'Realtime'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    icon: '/assets/imgs/svg-icons/docker.svg',
    shortDescription: 'Containerization platform providing reproducibility between development and production.',
    role: 'Containerization & Environment Parity',
    usage: 'Multi-stage Docker builds, lightweight image creation, and deployment pipelines.',
    relatedProjects: ['marymount'],
    tags: ['Containers', 'DevOps', 'Reproducibility', 'Deploy'],
  },

  // 05 - CREATIVE TECHNOLOGY
  {
    id: 'threejs',
    name: 'Three.js & WebGL',
    category: 'creative',
    icon: '/assets/imgs/svg-icons/threejs.svg',
    shortDescription: '3D scene graphs, perspective cameras, buffer geometries, and particle clouds.',
    role: 'Spatial Graphics & Interactive Viewports',
    usage: 'Real-time 3D particle systems, mathematical distribution shells, and custom scene graphs.',
    relatedProjects: ['v1'],
    tags: ['3D Graphics', 'WebGL', 'SceneGraph', 'Perspective'],
    featured: true,
  },
  {
    id: 'shaders',
    name: 'GLSL Shaders',
    category: 'creative',
    icon: '/assets/imgs/svg-icons/shader.svg',
    shortDescription: 'Hardware-accelerated vertex and fragment programs executed on the GPU.',
    role: 'GPU Acceleration & Procedural Effects',
    usage: 'Fluid noise waves, chromatic aberration split, and interactive image deformation.',
    relatedProjects: ['v1'],
    tags: ['GPU', 'Vertex Shaders', 'Simplex Noise', 'Math'],
    featured: true,
  },
  {
    id: 'motion',
    name: 'Animation & Physics',
    category: 'creative',
    icon: '/assets/imgs/svg-icons/motion.svg',
    shortDescription: 'Choreographed spring physics, scroll-linked viewport reveals, and fluid transitions.',
    role: 'Micro-Interactions & Choreographed Motion',
    usage: 'Cubic-bezier easing curves, staggered viewport entries, and inertial drag responsiveness.',
    relatedProjects: ['v1', 'grillzzy'],
    tags: ['Motion', 'Physics', 'Interpolation', 'Choreography'],
  },

  // 06 - TOOLS & WORKFLOW
  {
    id: 'figma',
    name: 'Figma',
    category: 'tools',
    icon: '/assets/imgs/svg-icons/figma.svg',
    shortDescription: 'Interface design, typographic hierarchies, vector systems, and interactive prototypes.',
    role: 'Interface Design & Interactive Prototyping',
    usage: 'Wireframing, typography pairing, component design tokens, and client presentations.',
    relatedProjects: ['marymount', 'lcml', 'v1', 'kic', 'grillzzy'],
    tags: ['UI/UX', 'Wireframing', 'Prototyping', 'Design Systems'],
    featured: true,
  },
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'tools',
    icon: '/assets/imgs/svg-icons/git.svg',
    shortDescription: 'Distributed version control, atomic branching strategies, and CI/CD pipelines.',
    role: 'Version Control & Code Quality',
    usage: 'Branching workflows, semantic releases, pull-request reviews, and GitHub Actions.',
    relatedProjects: ['marymount', 'lcml', 'v1', 'kic', 'grillzzy'],
    tags: ['VCS', 'Collaboration', 'CI/CD', 'Open Source'],
  },
  {
    id: 'vite',
    name: 'Vite & Tooling',
    category: 'tools',
    icon: '/assets/imgs/svg-icons/vite.svg',
    shortDescription: 'Modern frontend build tool and development server powered by native ES modules.',
    role: 'Build Pipelines & Module Bundling',
    usage: 'Fast development cold-starts, Rollup tree-shaking, and production asset optimization.',
    relatedProjects: ['marymount', 'lcml', 'v1'],
    tags: ['Bundler', 'Rollup', 'ESM', 'Optimization'],
  },
];
