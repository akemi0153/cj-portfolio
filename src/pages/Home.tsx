import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Code2, Globe, Server, Database, Wrench, X, Mail } from 'lucide-react';
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
        description="I'm Christian, a passionate software engineer focused on building robust, scalable backend architectures and intuitive, high-performance web applications."
      />
      <Hero />
      <TechStackSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

function TechStackSection() {
  const [activeCategory, setActiveCategory] = useState<TechCategory | 'All'>('All');
  
  const categories: (TechCategory | 'All')[] = ['All', 'Languages', 'Frontend', 'Backend', 'Database', 'DevOps & Tools'];
  
  const filteredTech = techStack.filter(
    (tech) => activeCategory === 'All' || tech.category === activeCategory
  );

  const getCategoryIcon = (category: TechCategory) => {
    switch (category) {
      case 'Languages': return <Code2 size={16} />;
      case 'Frontend': return <Globe size={16} />;
      case 'Backend': return <Server size={16} />;
      case 'Database': return <Database size={16} />;
      case 'DevOps & Tools': return <Wrench size={16} />;
    }
  };

  return (
    <section className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-display font-bold text-zinc-900 dark:text-white tracking-tight">Technical Arsenal</h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg font-light">
          The tools and technologies I use to bring ideas to life.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border",
              activeCategory === category 
                ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900 dark:border-zinc-100 shadow-sm" 
                : "bg-white dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredTech.map((tech) => (
            <motion.div
              key={tech.name}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
            >
              <div className="text-zinc-400 dark:text-zinc-500 bg-zinc-50 dark:bg-zinc-800/50 p-2 rounded-lg border border-zinc-100 dark:border-zinc-800">
                {getCategoryIcon(tech.category)}
              </div>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">{tech.name}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="space-y-12 scroll-mt-32">
      <div className="space-y-4">
        <h2 className="text-4xl font-display font-bold text-zinc-900 dark:text-white tracking-tight">Selected Work</h2>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-lg font-light">
          A showcase of my recent projects, highlighting my expertise in building scalable, user-centric applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/50 transition-all duration-300"
            onClick={() => setSelectedProject(project)}
          >
            <div className="aspect-[16/10] overflow-hidden relative border-b border-zinc-100 dark:border-zinc-800">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider font-semibold">{project.category}</span>
                <div className="flex gap-3">
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
                      <Github size={18} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-3">{project.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 flex-grow leading-relaxed font-light">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto no-scrollbar flex-grow">
          <div className="aspect-[21/9] sm:aspect-[16/7] relative w-full border-b border-zinc-100 dark:border-zinc-800">
             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="p-8 sm:p-12 relative z-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs font-mono uppercase tracking-wider mb-6 border border-zinc-200 dark:border-zinc-800 font-semibold">
              {project.category}
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-zinc-900 dark:text-white mb-6">{project.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-12">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-12">
              <div className="sm:col-span-2 space-y-10">
                <div>
                  <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-4">Overview</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg font-light">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {project.features && (
                  <div>
                    <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-4">Key Features</h3>
                    <ul className="space-y-4">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex gap-4 text-zinc-600 dark:text-zinc-400 font-light">
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white mt-2.5 flex-shrink-0" />
                          <span className="text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 space-y-4">
                  <h3 className="font-display font-bold text-zinc-900 dark:text-white text-xl mb-6">Links</h3>
                  
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-3 -mx-3 rounded-xl hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm"
                    >
                      <Globe size={20} />
                      <span className="font-medium">Live Demo</span>
                    </a>
                  )}
                  
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors p-3 -mx-3 rounded-xl hover:bg-white dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700 hover:shadow-sm"
                    >
                      <Github size={20} />
                      <span className="font-medium">Source Code</span>
                    </a>
                  )}

                  {!project.demoUrl && !project.repoUrl && (
                    <div className="text-sm text-zinc-500 dark:text-zinc-500 italic px-1">
                      Confidential project (No public links available)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ContactSection() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 border-t border-zinc-200 dark:border-zinc-800 scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-zinc-900 dark:text-white tracking-tight leading-[1.1]">
            Let's build something <br/> <span className="italic text-zinc-500 dark:text-zinc-400 font-normal">together.</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl leading-relaxed max-w-md font-light">
            I'm currently looking for new opportunities. Whether you have a project in mind or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 text-zinc-900 dark:text-white">
              <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900/50 flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
                <Mail size={24} className="text-zinc-700 dark:text-zinc-300" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider mb-1">Email</p>
                <a href="mailto:christianjosephmarigmen39@gmail.com" className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors font-medium text-lg">
                  christianjosephmarigmen39@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 bg-white dark:bg-zinc-900/80 p-8 md:p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Name</label>
              <input 
                id="name"
                required
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 focus:border-zinc-900 dark:focus:border-white transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Email</label>
              <input 
                id="email"
                type="email"
                required
                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 focus:border-zinc-900 dark:focus:border-white transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Message</label>
            <textarea 
              id="message"
              required
              rows={5}
              className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-white/10 focus:border-zinc-900 dark:focus:border-white transition-all resize-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold rounded-xl px-6 py-4 mt-2 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm shadow-zinc-900/10"
          >
            {status === 'submitting' ? (
              <span className="w-5 h-5 border-2 border-white/30 dark:border-zinc-900/30 border-t-white dark:border-t-zinc-900 rounded-full animate-spin" />
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
