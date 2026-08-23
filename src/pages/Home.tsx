import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { techStack, projects } from '../data';
import { Project, TechCategory } from '../types';
import { cn } from '../utils';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <div className="space-y-32 md:space-y-48">
      <SEO 
        title="Software Engineer" 
        description="I'm Kriyos, a passionate software engineer and dedicated government employee, focused on building robust, scalable backend architectures and intuitive, high-performance web applications serving the public and beyond."
      />
      <Hero />
      <TechStackSection />
      <ProjectsSection />
      <MusicSection />
      <ContactForm />
    </div>
  );
}

function TechStackSection() {
  const categories = Array.from(new Set(techStack.map(item => item.category)));
  const [activeCategory, setActiveCategory] = useState<TechCategory>(categories[0] as TechCategory || 'Frontend');

  return (
    <section className="scroll-mt-32 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.2em] mb-4">Toolkit</h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold text-stone-900 dark:text-white tracking-tighter">
          Technologies I leverage.
        </h3>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-12 lg:gap-20">
        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as TechCategory)}
              className={cn(
                "px-6 py-4 text-left rounded-2xl transition-all whitespace-nowrap text-sm font-bold relative overflow-hidden group border border-transparent",
                activeCategory === category 
                  ? "text-stone-900 dark:text-white bg-white dark:bg-[#0A0A0A] border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)]" 
                  : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              {activeCategory === category && (
                <motion.div 
                  layoutId="activeCategoryIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-black dark:bg-white rounded-r-full hidden lg:block"
                />
              )}
              {category}
            </button>
          ))}
        </div>

        <div className="flex-grow min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
              animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
            >
              {techStack.filter(tech => tech.category === activeCategory).map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="flex flex-col items-center justify-center gap-4 p-8 rounded-3xl bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all hover:-translate-y-2 group shadow-[0_4px_20px_rgb(0,0,0,0.02)] dark:shadow-none"
                >
                  {tech.icon ? (
                    <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-white/10" />
                  )}
                  <span className="font-bold text-stone-700 dark:text-stone-300 text-sm tracking-wide">{tech.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-32 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2 className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.2em] mb-4">Selected Work</h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-stone-900 dark:text-white tracking-tighter">
            Featured Projects.
          </h3>
        </div>
        <a 
          href="https://github.com/christian-dev" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-sm font-bold text-stone-900 dark:text-white transition-all hover:scale-105 group"
        >
          View GitHub
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="grid gap-8">
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group grid md:grid-cols-2 gap-0 bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-700"
    >
      <div className="p-10 lg:p-16 flex flex-col justify-center order-2 md:order-1">
        <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.2em] mb-4">{project.category}</span>
        <h3 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white mb-6 tracking-tight group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">{project.title}</h3>
        <p className="text-stone-600 dark:text-stone-400 mb-10 leading-relaxed font-medium text-lg">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-12">
          {project.tags.map(tag => (
            <span key={tag} className="px-4 py-2 rounded-full bg-stone-100 dark:bg-white/5 text-xs font-bold text-stone-600 dark:text-stone-300">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-auto">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-stone-100 dark:bg-white/10 flex items-center justify-center text-stone-900 dark:text-white hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
              <Github size={20} />
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-stone-100 dark:bg-white/10 flex items-center justify-center text-stone-900 dark:text-white hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
              <ExternalLink size={20} />
            </a>
          )}
        </div>
      </div>
      <div className="relative h-64 md:h-full min-h-[300px] overflow-hidden order-1 md:order-2 bg-stone-100 dark:bg-white/5">
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30 group-hover:bg-transparent transition-colors duration-700" />
      </div>
    </motion.div>
  );
}

function MusicSection() {
  return (
    <section className="scroll-mt-32 max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.2em] mb-4">On Repeat</h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold text-stone-900 dark:text-white tracking-tighter">
          The soundtrack to late nights.
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-[2.5rem] overflow-hidden bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none"
      >
        <iframe 
          style={{ borderRadius: '24px' }}
          src="https://open.spotify.com/embed/album/7onvGPxX3SF77hLJKGm9ev?utm_source=generator&theme=0" 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
          className="bg-stone-100 dark:bg-white/5"
        />
      </motion.div>
    </section>
  );
}
