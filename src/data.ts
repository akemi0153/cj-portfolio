import { Project, TechItem, BlogPost } from './types';

export const techStack: TechItem[] = [
  { name: 'TypeScript', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'Vite', category: 'Frontend' },
  
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express', category: 'Backend' },
  { name: 'NestJS', category: 'Backend' },
  { name: 'GraphQL', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  
  { name: 'Supabase', category: 'Database' },
  { name: 'Firebase', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  
  { name: 'Docker', category: 'DevOps & Tools' },
  { name: 'GitHub Actions', category: 'DevOps & Tools' },
  { name: 'Git', category: 'DevOps & Tools' },
  { name: 'Vercel', category: 'DevOps & Tools' },
];

export const projects: Project[] = [
  {
    id: 'swad-aurora-drmd-aid',
    title: 'SWAD Aurora DRMD AID',
    description: 'A dedicated disaster response and management system developed for a government agency in Aurora.',
    longDescription: 'SWAD Aurora DRMD AID is a comprehensive platform designed to streamline disaster response, relief distribution, and aid management. As it is a property of a government agency, the source code and live links are kept confidential to ensure data security and privacy.',
    image: 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?q=80&w=2000&auto=format&fit=crop',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    category: 'Fullstack',
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
    description: 'An AI-powered driving assistant focused on improving road safety and driver awareness.',
    longDescription: 'Drive Guard AI leverages artificial intelligence to analyze driving patterns and provide real-time feedback to drivers. The system helps in reducing accidents by alerting drivers to potential hazards and fatigue.',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop',
    tags: ['React', 'TypeScript', 'AI integration', 'Vite'],
    category: 'Frontend',
    demoUrl: 'https://drive-guard-ai.vercel.app',
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
    description: 'A community-focused web platform for cultural preservation and local engagement.',
    longDescription: 'CTTS Salinbanwa is a dedicated platform designed to document, share, and preserve local cultural heritage. It provides an interactive space for the community to engage with historical archives and cultural events.',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2000&auto=format&fit=crop',
    tags: ['Next.js', 'Supabase', 'Tailwind CSS', 'Vercel'],
    category: 'Fullstack',
    demoUrl: 'https://ctts-salinbanwa.vercel.app',
    features: [
      'Interactive cultural archives and galleries',
      'Community event management and tracking',
      'Secure content management system',
      'High-performance and SEO-optimized pages'
    ]
  },
  {
    id: 'aurora-tourism',
    title: 'Aurora Tourism',
    description: 'A digital gateway to explore the breathtaking tourist destinations of Aurora province.',
    longDescription: 'Aurora Tourism serves as an interactive portal showcasing the beautiful landscapes, historical sites, and local businesses in Aurora. It aims to boost local tourism by providing comprehensive guides and booking integrations.',
    image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=2000&auto=format&fit=crop',
    tags: ['React', 'Firebase', 'Framer Motion', 'Tailwind CSS'],
    category: 'Frontend',
    demoUrl: 'https://aurora-tourism.vercel.app',
    features: [
      'Interactive maps and destination guides',
      'Smooth page transitions and animations',
      'Integrated local business directory',
      'Mobile-first responsive layout'
    ]
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
