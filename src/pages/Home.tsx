import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Globe, Mail } from 'lucide-react';
import { techStack, projects } from '../data';
import { Project, TechCategory } from '../types';
import { cn } from '../utils';
import Hero from '../components/Hero';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <div className="space-y-32">
      <SEO 
        title="Software Engineer" 
        description="I'm Christian, a passionate software engineer and dedicated government employee, focused on building robust, scalable backend architectures and intuitive, high-performance web applications serving the public and beyond."
      />
      <Hero />
      <TechStackSection />
      <ProjectsSection />
      <MusicSection />
      <ContactSection />
    </div>
  );
}

function TechStackSection() {
  const categories = Array.from(new Set(techStack.map(item => item.category)));
  const [activeCategory, setActiveCategory] = useState<TechCategory>(categories[0] as TechCategory || 'Frontend');

  return (
    <section className="space-y-12 scroll-mt-32">
      <div className="space-y-4">
        <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Tech Stack</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium">
          The tools and technologies I use to build robust, scalable applications.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 no-scrollbar md:w-48 shrink-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as TechCategory)}
              className={cn(
                "px-5 py-3 text-left rounded-xl transition-all whitespace-nowrap text-sm font-semibold relative overflow-hidden group",
                activeCategory === category 
                  ? "text-blue-600 dark:text-blue-400 shadow-sm" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50"
              )}
            >
              {activeCategory === category && (
                <motion.div 
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl -z-10"
                />
              )}
              {category}
            </button>
          ))}
        </div>

        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {techStack.filter(tech => tech.category === activeCategory).map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all hover:-translate-y-1"
                >
                  {tech.icon && <img src={tech.icon} alt={tech.name} className="w-8 h-8 object-contain" />}
                  <span className="font-semibold text-slate-700 dark:text-slate-300 text-sm">{tech.name}</span>
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
    <section id="projects" className="space-y-12 scroll-mt-32">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-4">
          <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Selected Work</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium">
            A collection of projects showcasing my expertise in building scalable architectures and intuitive interfaces.
          </p>
        </div>
        <a 
          href="https://github.com/christian-dev" 
          target="_blank" 
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors group"
        >
          View all on GitHub
          <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 dark:hover:shadow-black/50 transition-all duration-500 hover:-translate-y-2"
    >
      <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-800/50">
        <div className="absolute inset-0 bg-slate-900/20 dark:bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-8 flex flex-col flex-grow relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">{project.category}</span>
          <div className="flex gap-3">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
                <Github size={20} />
              </a>
            )}
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        <h3 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 mb-8 flex-grow leading-relaxed font-medium">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm">
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm">
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MusicSection() {
  return (
    <section className="space-y-12 scroll-mt-32">
      <div className="space-y-4">
        <h2 className="text-4xl font-display font-bold text-slate-900 dark:text-white tracking-tight">On Repeat</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-lg font-medium">
          The soundtrack to my coding sessions and late-night debugging.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
        className="rounded-2xl overflow-hidden bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 shadow-sm p-4 md:p-6"
      >
        <iframe 
          style={{ borderRadius: '16px' }}
          src="https://open.spotify.com/embed/album/7onvGPxX3SF77hLJKGm9ev?utm_source=generator&theme=0" 
          width="100%" 
          height="352" 
          frameBorder="0" 
          allowFullScreen 
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
          loading="lazy"
        />
      </motion.div>
    </section>
  );
}

function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 border-t border-slate-200/50 dark:border-slate-800/50 scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
            Let's build something <br/> <span className="italic text-slate-500 dark:text-slate-400 font-medium">together.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed max-w-md font-medium">
            I'm currently looking for new opportunities. Whether you have a project in mind or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 text-slate-900 dark:text-white">
              <div className="w-14 h-14 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center border border-blue-100 dark:border-blue-800/50">
                <Mail size={24} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:christianjosephmarigmen39@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold text-lg">
                  christianjosephmarigmen39@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-slate-900/50 p-8 md:p-10 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-black/20">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-bold text-slate-700 dark:text-slate-300">Name</label>
              <input 
                id="name"
                required
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-bold text-slate-700 dark:text-slate-300">Email</label>
              <input 
                id="email"
                type="email"
                required
                className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-400 font-medium"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-bold text-slate-700 dark:text-slate-300">Message</label>
            <textarea 
              id="message"
              required
              rows={5}
              className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none placeholder:text-slate-400 font-medium"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full bg-blue-600 text-white font-bold rounded-xl px-6 py-4 mt-2 hover:bg-blue-700 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-[0.98]"
          >
            {status === 'submitting' ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : status === 'success' ? (
              'Message Sent!'
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
