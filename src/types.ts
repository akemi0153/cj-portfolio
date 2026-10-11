export type ProjectCategory = 'Frontend' | 'Backend' | 'Fullstack' | 'Mobile';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  tags: string[];
  category: ProjectCategory;
  demoUrl?: string;
  repoUrl?: string;
  features?: string[];
  clientImpact?: string;
  architectureNotes?: string[];
  reliabilityTier?: string;
  turnaroundTime?: string;
  confidential?: boolean;
}

export type TechCategory = 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'Tools' | 'DevOps & Tools';

export interface TechItem {
  name: string;
  category: TechCategory;
  icon?: string;
  role?: string;
  proficiency?: 'Production Lead' | 'Core Daily' | 'Specialist' | 'Production Ready';
  usedIn?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface ClientTestimonial {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  organization: string;
  projectRef: string;
  metricHighlight: string;
}

export interface FastTrackPhase {
  phase: string;
  duration: string;
  title: string;
  summary: string;
  deliverables: string[];
  clientCheckpoint: string;
}
