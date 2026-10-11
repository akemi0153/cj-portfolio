import { Project, TechItem, BlogPost, ClientTestimonial, FastTrackPhase } from './types';

export const techStack: TechItem[] = [
  // Languages
  {
    name: 'TypeScript',
    category: 'Languages',
    icon: 'https://cdn.simpleicons.org/typescript',
    role: 'Strict typing & domain modeling',
    proficiency: 'Production Lead',
    usedIn: ['SWAD Aurora DRMD AID', 'CTTS Salinbanwa', 'Drive Guard AI']
  },
  {
    name: 'JavaScript (ES6+)',
    category: 'Languages',
    icon: 'https://cdn.simpleicons.org/javascript',
    role: 'Modern asynchronous runtime patterns',
    proficiency: 'Core Daily',
    usedIn: ['All Web Apps']
  },
  {
    name: 'Python',
    category: 'Languages',
    icon: 'https://cdn.simpleicons.org/python',
    role: 'Edge computer vision & telemetry',
    proficiency: 'Specialist',
    usedIn: ['Drive Guard AI']
  },
  {
    name: 'SQL',
    category: 'Languages',
    icon: 'https://cdn.simpleicons.org/sqlite',
    role: 'Relational query design & indexing',
    proficiency: 'Production Lead',
    usedIn: ['SWAD Aurora DRMD AID']
  },

  // Frontend
  {
    name: 'React',
    category: 'Frontend',
    icon: 'https://cdn.simpleicons.org/react',
    role: 'Component architecture & state orchestration',
    proficiency: 'Production Lead',
    usedIn: ['SWAD Aurora DRMD AID', 'CTTS Salinbanwa', 'Aurora Tourism']
  },
  {
    name: 'Next.js',
    category: 'Frontend',
    icon: 'https://cdn.simpleicons.org/nextdotjs',
    role: 'SSR, SSG & edge rendering performance',
    proficiency: 'Production Lead',
    usedIn: ['GovTech Client Portals']
  },
  {
    name: 'Tailwind CSS',
    category: 'Frontend',
    icon: 'https://cdn.simpleicons.org/tailwindcss',
    role: 'Design systems & responsive layouts',
    proficiency: 'Core Daily',
    usedIn: ['All Projects']
  },
  {
    name: 'Framer Motion',
    category: 'Frontend',
    icon: 'https://cdn.simpleicons.org/framer',
    role: 'Hardware-accelerated layout & choreography',
    proficiency: 'Production Lead',
    usedIn: ['CTTS Salinbanwa', 'Aurora Tourism']
  },
  {
    name: 'Vite',
    category: 'Frontend',
    icon: 'https://cdn.simpleicons.org/vite',
    role: 'Optimized ESM bundling & fast HMR builds',
    proficiency: 'Core Daily',
    usedIn: ['SWAD Aurora DRMD AID', 'Drive Guard AI']
  },

  // Backend
  {
    name: 'Node.js',
    category: 'Backend',
    icon: 'https://cdn.simpleicons.org/nodedotjs',
    role: 'Asynchronous event-driven server runtime',
    proficiency: 'Production Lead',
    usedIn: ['SWAD Aurora DRMD AID', 'Drive Guard AI']
  },
  {
    name: 'Express',
    category: 'Backend',
    icon: 'https://cdn.simpleicons.org/express',
    role: 'RESTful API routing & auth middleware',
    proficiency: 'Production Lead',
    usedIn: ['SWAD Aurora DRMD AID']
  },
  {
    name: 'NestJS',
    category: 'Backend',
    icon: 'https://cdn.simpleicons.org/nestjs',
    role: 'Modular enterprise architecture & DI',
    proficiency: 'Specialist',
    usedIn: ['Enterprise Services']
  },
  {
    name: 'GraphQL',
    category: 'Backend',
    icon: 'https://cdn.simpleicons.org/graphql',
    role: 'Declarative schemas & client queries',
    proficiency: 'Production Ready',
    usedIn: ['Municipal Analytics']
  },

  // Database
  {
    name: 'PostgreSQL',
    category: 'Database',
    icon: 'https://cdn.simpleicons.org/postgresql',
    role: 'ACID transactions & relational schema design',
    proficiency: 'Production Lead',
    usedIn: ['SWAD Aurora DRMD AID']
  },
  {
    name: 'Supabase',
    category: 'Database',
    icon: 'https://cdn.simpleicons.org/supabase',
    role: 'Postgres BaaS, row-level security & real-time',
    proficiency: 'Production Lead',
    usedIn: ['Aurora Tourism', 'Casiguran Lexicon']
  },
  {
    name: 'Firebase',
    category: 'Database',
    icon: 'https://cdn.simpleicons.org/firebase',
    role: 'NoSQL Firestore sync & Auth federation',
    proficiency: 'Production Ready',
    usedIn: ['Aurora Tourism']
  },
  {
    name: 'Redis',
    category: 'Database',
    icon: 'https://cdn.simpleicons.org/redis',
    role: 'In-memory caching & rate-limit queues',
    proficiency: 'Specialist',
    usedIn: ['High-throughput Gateways']
  },
  {
    name: 'MongoDB',
    category: 'Database',
    icon: 'https://cdn.simpleicons.org/mongodb',
    role: 'Document collection stores & logging',
    proficiency: 'Production Ready',
    usedIn: ['Telemetry Logs']
  },

  // Tools (DevOps & Tools)
  {
    name: 'Docker',
    category: 'Tools',
    icon: 'https://cdn.simpleicons.org/docker',
    role: 'Multi-stage containerization & staging environments',
    proficiency: 'Production Lead',
    usedIn: ['SWAD Aurora DRMD AID', 'Drive Guard AI']
  },
  {
    name: 'GitHub Actions',
    category: 'Tools',
    icon: 'https://cdn.simpleicons.org/githubactions',
    role: 'Automated CI/CD pipelines, tests & security scanning',
    proficiency: 'Production Lead',
    usedIn: ['SWAD Aurora DRMD AID', 'CTTS Salinbanwa']
  },
  {
    name: 'Git',
    category: 'Tools',
    icon: 'https://cdn.simpleicons.org/git',
    role: 'Distributed version control & trunk stability',
    proficiency: 'Core Daily',
    usedIn: ['All Repositories']
  },
  {
    name: 'Vercel',
    category: 'Tools',
    icon: 'https://cdn.simpleicons.org/vercel',
    role: 'Global CDN edge deployment & staging previews',
    proficiency: 'Core Daily',
    usedIn: ['Web Portals']
  },
  {
    name: 'Linux / Bash',
    category: 'Tools',
    icon: 'https://cdn.simpleicons.org/linux',
    role: 'Server administration & operational scripts',
    proficiency: 'Core Daily',
    usedIn: ['Production Infrastructure']
  },
  {
    name: 'Postman',
    category: 'Tools',
    icon: 'https://cdn.simpleicons.org/postman',
    role: 'API testing, mock generation & integration suites',
    proficiency: 'Core Daily',
    usedIn: ['API Verification']
  }
];

export const projects: Project[] = [
  {
    id: 'swad-aurora-drmd-aid',
    title: 'SWAD Aurora DRMD AID',
    description: 'Mission-critical disaster response logistics and relief distribution system developed for provincial government operations.',
    longDescription: 'SWAD Aurora DRMD AID is a secure, high-concurrency disaster response platform engineered to coordinate immediate relief goods distribution, family aid tracking, and disaster incident command in Aurora province. It features real-time geospatial inventory allocation, tamper-resistant audit trails, and strict role-based access across department leads.',
    image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=2000&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'GovTech'],
    category: 'Fullstack',
    confidential: true,
    clientImpact: '4x reduction in emergency relief dispatch latency; zero data discrepancies across 8 municipality checkpoints.',
    architectureNotes: [
      'PostgreSQL with strict Row-Level Security and indexed JSONB geospatial markers',
      'Node.js REST microservices with rate-limiting and tamper-evident audit logs',
      'Role-Based Access Control (RBAC) separating field operators from agency directors',
      'Offline-tolerant local data cache ensuring continuous field entry during storms'
    ],
    reliabilityTier: '99.99% Critical Uptime · Gov Security Grade',
    turnaroundTime: '4-Week Fast-Track Deployment',
    features: [
      'Confidential government property with high-security standards',
      'Real-time disaster reporting and relief management',
      'Geospatial data integration for resource allocation',
      'Role-based access control for different agency departments'
    ]
  },
  {
    id: 'drive-guard-ai',
    title: 'Drive Guard AI',
    description: 'Real-time computer vision and vehicular telemetry system predicting driver fatigue and road hazards with sub-45ms inference.',
    longDescription: 'Drive Guard AI processes live sensor streams and facial attention vectors directly in the client runtime. Built to safeguard fleet operators and long-haul transport, the system evaluates micro-sleep occurrences, erratic acceleration, and collision vectors while displaying actionable telemetry on a HUD interface.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop',
    tags: ['React', 'TypeScript', 'Computer Vision AI', 'Vite', 'Telemetry'],
    category: 'Frontend',
    demoUrl: 'https://drive-guard-ai.vercel.app',
    clientImpact: '< 45ms end-to-end edge inference latency with zero server round-trip dependency for critical alerts.',
    architectureNotes: [
      'Client-side WebWorker multi-threading for continuous facial landmark tracking',
      'Optimized Canvas rendering engine rendering real-time vector HUD overlays at 60 FPS',
      'IndexedDB event store logging telemetry telemetry chunks for post-trip analytics'
    ],
    reliabilityTier: 'Sub-45ms Real-Time Inference · 60 FPS Fluid UI',
    turnaroundTime: '2-Week Sprint Prototype to Staging',
    features: [
      'Real-time driving behavior analysis',
      'Driver fatigue and distraction alerts',
      'Interactive dashboard for monitoring performance',
      'Responsive design for mobile and desktop'
    ]
  },
  {
    id: 'ctts-salinbanwa',
    title: 'CTTS Salinbanwa',
    description: 'High-availability tri-lingual lexicographical preservation engine bridging English, Tagalog, and indigenous Casiguranin.',
    longDescription: 'CTTS Salinbanwa is a linguistic preservation platform engineered to catalog, verify, and cross-translate the endangered Casiguran Agta cultural dialect. Powered by Supabase real-time database and full-text search indexing, it supports collaborative dictionary submissions, phonological audio playback, and pedagogical flashcards.',
    image: '/567176759_1310893256954766_4710285668659820098_n.png',
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    category: 'Fullstack',
    demoUrl: 'https://ctts-salinbanwa.vercel.app',
    clientImpact: 'Cataloged over 1,400+ rare native lexical entries with instant search under 18ms across all mobile devices.',
    architectureNotes: [
      'Next.js Incremental Static Regeneration (ISR) guaranteeing instant SEO indexing',
      'Supabase PostgreSQL full-text search with phonetic match scoring for dialect variants',
      'Edge CDN caching yielding a 99 Lighthouse performance rating'
    ],
    reliabilityTier: '99.98% Cloud Uptime · Sub-20ms Search Latency',
    turnaroundTime: '3-Week Turnaround with Staging Revisions',
    features: [
      'Multi-language translation (English, Tagalog, Casiguran)',
      'Community-driven dictionary updates',
      'Fast and intuitive translation interface',
      'High-performance and SEO-optimized pages'
    ]
  },
  {
    id: 'aurora-tourism',
    title: 'Aurora Tourism',
    description: 'Immersive regional travel portal and municipal merchant discovery engine featuring interactive destination routing.',
    longDescription: 'Aurora Tourism serves as the digital front door for provincial eco-tourism, uniting beachfront resorts, local eco-guides, and cultural heritage sites under one high-performance responsive web portal. Features smooth gesture-driven navigation, localized weather advisories, and curated eco-tours.',
    image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2000&auto=format&fit=crop',
    tags: ['React', 'Firebase', 'Framer Motion', 'Tailwind CSS'],
    category: 'Frontend',
    demoUrl: 'https://aurora-tourism.vercel.app',
    clientImpact: 'Over 25,000+ monthly travelers serviced with zero layout shifts and mobile-first gesture navigation.',
    architectureNotes: [
      'Hardware-accelerated Framer Motion transitions with strict compositor-only animations',
      'Static asset optimization reducing initial page payload by 68%',
      'Progressive image loading with instant blur-up previews'
    ],
    reliabilityTier: 'Zero Layout Shift · 100/100 Mobile UX Score',
    turnaroundTime: '2-Week Sprint Delivery',
    features: [
      'Interactive maps and destination guides',
      'Smooth page transitions and animations',
      'Integrated local business directory',
      'Mobile-first responsive layout'
    ]
  }
];

export const clientTestimonials: ClientTestimonial[] = [
  {
    id: 't-1',
    quote: 'During typhoon season, relief logistics cannot afford a single second of downtime. Kriyos architected SWAD AID with exceptional discipline—the platform maintained sub-second dispatch coordination under heavy simultaneous field load, and the access controls met all provincial security mandates.',
    clientName: 'Engr. R. Mendoza',
    role: 'Disaster Risk Reduction & Management Lead',
    organization: 'SWAD Provincial Division',
    projectRef: 'SWAD Aurora DRMD AID',
    metricHighlight: '4x Faster Aid Dispatch'
  },
  {
    id: 't-2',
    quote: 'Preserving our native language required technical precision and deep cultural sensitivity. Kriyos provided continuous staging updates, refined our phonetic search algorithms, and launched CTTS Salinbanwa ahead of schedule. The community response has been extraordinary.',
    clientName: 'M. A. Salumbides',
    role: 'Heritage Project Director',
    organization: 'Casiguran Cultural Initiatives',
    projectRef: 'CTTS Salinbanwa',
    metricHighlight: '1,400+ Lexical Records Indexed'
  },
  {
    id: 't-3',
    quote: 'In edge AI, milliseconds make the difference between safety and hazard. Kriyos optimized Drive Guard AI to run client-side with minimal memory overhead and zero latency degradation. His code quality and architecture documentation are gold standard.',
    clientName: 'D. K. Valenzuela',
    role: 'Lead Systems Architect',
    organization: 'Automotive Telemetry Lab',
    projectRef: 'Drive Guard AI',
    metricHighlight: '< 45ms Edge Inference'
  }
];

export const fastTrackPhases: FastTrackPhase[] = [
  {
    phase: '01',
    duration: 'Days 1 – 3',
    title: 'Architecture Blueprint & Tech Stack Alignment',
    summary: 'Rapid technical discovery, database schema modeling (ERDs), API contract specification, and security invariants definition.',
    deliverables: ['Database Schema & ERD', 'Interactive Wireframe Prototype', 'API Contract Specification', 'Security & Access Control Matrix'],
    clientCheckpoint: 'Sign-off on technical architecture & fixed sprint milestones'
  },
  {
    phase: '02',
    duration: 'Week 1 – 2',
    title: 'Rapid MVP Engine & Staging Pipeline',
    summary: 'Sprint buildout of core database models, transactional endpoints, responsive UI views, and live continuous staging deployments.',
    deliverables: ['Live Staging URL with Daily CI/CD Deploys', 'Functional CRUD & Core Workflow APIs', 'Database Row-Level Security Setup', 'Responsive Desktop & Mobile Layouts'],
    clientCheckpoint: 'Interactive weekly demo walk-through on staging environment'
  },
  {
    phase: '03',
    duration: 'Week 3',
    title: 'Performance Optimization & Security Hardening',
    summary: 'Rigorous latency optimization, stress testing, vulnerability audits, rate limiting, and automated fallback verification.',
    deliverables: ['OWASP Security Checklist Audit', 'Lighthouse 95+ Performance Audit', 'Cross-browser & Mobile Stress Report', 'Automated E2E Test Suite'],
    clientCheckpoint: 'Client acceptance test & security verification sign-off'
  },
  {
    phase: '04',
    duration: 'Week 4',
    title: 'Zero-Downtime Launch & Production SLA Handover',
    summary: 'Domain DNS provisioning, SSL encryption, database backup routines, error monitoring integration, and complete technical handover.',
    deliverables: ['Zero-Downtime Production Deployment', 'Automated Error Alerting (Sentry/Logflare)', 'Comprehensive Architecture Documentation', '30-Day Post-Launch SLA Monitoring'],
    clientCheckpoint: 'Production handover, codebase repository transfer & training'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'building-scalable-react-apps',
    title: 'Architecting Scalable React Applications in 2026',
    excerpt: 'Explore modern patterns for structuring large-scale React applications, managing state, and optimizing performance.',
    date: 'July 10, 2026',
    readTime: '8 min read',
    tags: ['React', 'Architecture', 'Performance'],
    content: `
## The Evolution of React Architecture

Building large-scale React applications requires a solid architectural foundation. Over the years, the community has shifted from monolithic Redux stores to more modular, feature-based structures.

### Feature-Sliced Design

One of the most effective ways to organize a React project is by feature. Instead of grouping files by type (e.g., all components in one folder, all hooks in another), we group them by the domain they belong to.

\`\`\`typescript
src/
  features/
    auth/
      components/
      hooks/
      api/
      types.ts
    products/
      components/
      hooks/
      api/
      types.ts
\`\`\`

### State Management in 2026

Global state is no longer the default. We now prefer colocation of state. Server state is handled by robust data-fetching libraries like TanStack Query, while complex local state is managed via Context + useReducer, or lightweight libraries like Zustand for shared client state.

### Performance Optimization

Memoization is mostly handled automatically by the React compiler now, but understanding component lifecycles and avoiding unnecessary renders by optimizing context providers remains crucial.

In conclusion, architecture is about creating boundaries that allow teams to move fast without breaking things.
    `
  },
  {
    id: 'mastering-tailwind-animations',
    title: 'Mastering Fluid Animations with Tailwind and Framer Motion',
    excerpt: 'A deep dive into creating highly interactive, smooth user experiences using the latest animation tools.',
    date: 'June 22, 2026',
    readTime: '6 min read',
    tags: ['CSS', 'Animation', 'UX'],
    content: `
## Why Animation Matters

Animation isn't just about making things look pretty; it's about providing context and feedback. A well-placed animation guides the user's eye and explains how the interface works.

### Combining Tailwind and Framer Motion

Tailwind is fantastic for static styling and simple transitions, but when you need orchestrated, physics-based animations, Framer Motion (now \`motion/react\`) is the perfect companion.

Here is a simple example of a stagger effect:

\`\`\`tsx
import { motion } from 'motion/react';

const list = {
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  hidden: { opacity: 0 },
};

const item = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 20 },
};

export const StaggeredList = () => (
  <motion.ul initial="hidden" animate="visible" variants={list}>
    <motion.li variants={item}>Item 1</motion.li>
    <motion.li variants={item}>Item 2</motion.li>
  </motion.ul>
);
\`\`\`

### Best Practices

1. **Keep it subtle**: Don't overdo it. Animations should feel natural.
2. **Respect user preferences**: Always check for \`prefers-reduced-motion\`.
3. **Performance**: Animate only \`transform\` and \`opacity\` to ensure 60fps hardware-accelerated rendering.
    `
  },
  {
    id: 'scaling-with-postgresql-and-supabase',
    title: 'Scaling Modern Apps with PostgreSQL and Supabase',
    excerpt: 'How leveraging PostgreSQL features and Supabase accelerated our backend development and simplified real-time data sync.',
    date: 'May 15, 2026',
    readTime: '10 min read',
    tags: ['PostgreSQL', 'Supabase', 'Backend'],
    content: `
## Rethinking the Backend

As our platform grew, managing a custom backend infrastructure started to slow down our feature delivery. We needed a robust database that could handle complex queries, along with a secure way to manage authentication and real-time updates.

### Enter Supabase & PostgreSQL

Instead of reinventing the wheel, we decided to migrate our core services to Supabase, which provides a managed PostgreSQL database with powerful built-in tools.

### The Results

The difference was staggering:
- **Development Speed**: We cut our backend development time in half by utilizing Row Level Security (RLS) directly in PostgreSQL.
- **Real-time Sync**: Implementing live updates across clients became trivial thanks to Supabase's real-time subscriptions.
- **Infrastructure Overhead**: By offloading database management and auth, we could focus entirely on product features.

### Lessons Learned

Moving business logic closer to the database (via RLS and Postgres functions) was a paradigm shift, but the resulting architecture was remarkably robust. 

Node.js and Express are still fantastic for specialized microservices, but for a scalable, feature-rich core, PostgreSQL combined with Supabase has become my stack of choice.
    `
  }
];
