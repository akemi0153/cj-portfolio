import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Code2, Globe, Server, Database, Wrench, X, Mail } from 'lucide-react';
import { techStack, projects } from '../data';
import { Project, TechCategory } from '../types';
import { cn } from '../utils';
import ReactMarkdown from 'react-markdown';
import Hero from '../components/Hero';

export default function Home() {
  return (
    <div className="space-y-32">
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
        <h2 className="text-3xl font-display font-bold text-white tracking-tight">Technical Arsenal</h2>
        <p className="text-zinc-400 max-w-2xl">
          The tools and technologies I use to bring ideas to life.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
              activeCategory === category 
                ? "bg-white text-black" 
                : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
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
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <div className="text-indigo-400">
                {getCategoryIcon(tech.category)}
              </div>
              <span className="font-medium text-zinc-200">{tech.name}</span>
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
        <h2 className="text-3xl font-display font-bold text-white tracking-tight">Selected Work</h2>
        <p className="text-zinc-400 max-w-2xl">
          A showcase of my recent projects, highlighting my expertise in building scalable, user-centric applications.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
            className="group cursor-pointer rounded-3xl bg-[#121212] border border-white/5 overflow-hidden flex flex-col"
            onClick={() => setSelectedProject(project)}
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent z-10 opacity-60" />
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="p-8 flex flex-col flex-grow relative z-20 -mt-10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider">{project.category}</span>
                <div className="flex gap-2">
                  {project.repoUrl && (
                    <a href={project.repoUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
                      <Github size={18} />
                    </a>
                  )}
                  {project.demoUrl && (
                    <a href={project.demoUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">{project.title}</h3>
              <p className="text-zinc-400 mb-6 flex-grow">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 text-xs font-medium text-zinc-300">
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-3 py-1 rounded-lg bg-white/5 text-xs font-medium text-zinc-300">
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
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#121212] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-black/70 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="overflow-y-auto no-scrollbar flex-grow">
          <div className="aspect-[21/9] sm:aspect-[16/7] relative w-full">
             <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10" />
             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          </div>

          <div className="p-8 sm:p-12 -mt-20 relative z-20">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider mb-4 border border-indigo-500/20">
              {project.category}
            </span>
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">{project.title}</h2>
            
            <div className="flex flex-wrap gap-2 mb-10">
              {project.tags.map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-3 gap-12">
              <div className="sm:col-span-2 space-y-8">
                <div>
                  <h3 className="text-xl font-display font-semibold text-white mb-4">Overview</h3>
                  <p className="text-zinc-400 leading-relaxed text-lg">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {project.features && (
                  <div>
                    <h3 className="text-xl font-display font-semibold text-white mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {project.features.map((feature, i) => (
                        <li key={i} className="flex gap-3 text-zinc-400">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-4">
                  <h3 className="font-display font-semibold text-white">Links</h3>
                  
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors p-2 -mx-2 rounded-lg hover:bg-white/5"
                    >
                      <Globe size={18} />
                      <span className="font-medium">Live Demo</span>
                    </a>
                  )}
                  
                  {project.repoUrl && (
                    <a 
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors p-2 -mx-2 rounded-lg hover:bg-white/5"
                    >
                      <Github size={18} />
                      <span className="font-medium">Source Code</span>
                    </a>
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
    <section id="contact" className="py-24 border-t border-white/5 scroll-mt-20">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">
            Let's build something <br/> <span className="text-zinc-500">together.</span>
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-md">
            I'm currently looking for new opportunities. Whether you have a project in mind or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 text-zinc-300">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                <Mail size={20} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-sm text-zinc-500 font-medium">Email</p>
                <a href="mailto:christianjosephmarigmen39@gmail.com" className="hover:text-white transition-colors">
                  christianjosephmarigmen39@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-[#121212] p-8 rounded-3xl border border-white/5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-zinc-400">Name</label>
              <input 
                id="name"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-zinc-400">Email</label>
              <input 
                id="email"
                type="email"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                placeholder="john@example.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-zinc-400">Message</label>
            <textarea 
              id="message"
              required
              rows={5}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          <button
            type="submit"
            disabled={status !== 'idle'}
            className="w-full bg-white text-black font-semibold rounded-xl px-6 py-4 mt-4 hover:bg-zinc-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {status === 'submitting' ? (
              <span className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
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
