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
}

export type TechCategory = 'Languages' | 'Frontend' | 'Backend' | 'Database' | 'DevOps & Tools';

export interface TechItem {
  name: string;
  category: TechCategory;
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
