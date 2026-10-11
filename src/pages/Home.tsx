import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, ArrowRight, Search, SlidersHorizontal, Sparkles, Cpu } from 'lucide-react';
import { projects } from '../data';
import { Project } from '../types';
import { cn } from '../utils';
import Hero from '../components/Hero';
import SEO from '../components/SEO';
import TechStackSection from '../components/TechStackSection';
import ContactForm from '../components/ContactForm';
import FastTrackEstimator from '../components/FastTrackEstimator';
import ReliabilitySection from '../components/ReliabilitySection';
import ProjectDetailModal from '../components/ProjectDetailModal';
import ImageWithFallback from '../components/ImageWithFallback';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [initialContactMessage, setInitialContactMessage] = useState<string>('');

  const handleInquireSimilar = (title: string) => {
    setInitialContactMessage(
      `Hello Kriyos,\n\nI am impressed with your architecture on "${title}" and would like to inquire about building a system with similar reliability, security, and performance standards.\n\nKey requirements:\n• High availability & robust database design\n• Clean staging milestones\n• Fast turnaround delivery`
    );
    const contactEl = document.getElementById('contact');
    if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-32 md:space-y-48">
      <SEO
        title="Software Engineer & Systems Architect"
        description="I'm Kriyos, a software engineer and government technology employee focused on building robust, scalable backend architectures and intuitive, high-performance web applications serving the public and beyond."
      />
      <Hero />
      <TechStackSection />
      <ProjectsSection onOpenProject={setSelectedProject} />
      <FastTrackEstimator onApplyScopeToContact={setInitialContactMessage} />
      <ReliabilitySection />
      <MusicSection />
      <ContactForm initialMessage={initialContactMessage} />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquireSimilar={handleInquireSimilar}
      />
    </div>
  );
}

function ProjectsSection({ onOpenProject }: { onOpenProject: (project: Project) => void }) {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = ['All', 'Fullstack', 'Frontend', 'GovTech', 'AI'];

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesCategory =
        filterCategory === 'All'
          ? true
          : filterCategory === 'GovTech'
          ? project.tags.includes('GovTech') || project.confidential
          : filterCategory === 'AI'
          ? project.tags.includes('Computer Vision AI') || project.tags.includes('AI integration')
          : project.category === filterCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.tags.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [filterCategory, searchQuery]);

  return (
    <section id="projects" className="scroll-mt-32 max-w-7xl mx-auto space-y-12">
      {/* Header with Title and Fast Tracking Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em] mb-4">
            Selected Work
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-bold text-stone-900 dark:text-white tracking-tighter">
            Featured Systems & Deployments.
          </h3>
        </div>
        <a
          href="https://github.com/christian-dev"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-sm font-bold text-stone-900 dark:text-white transition-all hover:scale-105 group self-start md:self-end"
        >
          View GitHub Repository
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Fast Tracking Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-2 bg-white/70 dark:bg-[#0A0A0A]/70 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl">
        {/* Segmented Filter Buttons */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar p-1">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setFilterCategory(tab)}
              className={cn(
                'px-4 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap',
                filterCategory === tab
                  ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Live Search Input */}
        <div className="relative min-w-[240px] px-2">
          <Search size={15} className="absolute left-4.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Fast search stack or title..."
            className="w-full bg-stone-100 dark:bg-white/5 rounded-xl pl-9 pr-4 py-2 text-xs font-medium text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
          />
        </div>
      </div>

      {/* Projects List */}
      <div className="grid gap-10">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onInspect={() => onOpenProject(project)}
            />
          ))
        ) : (
          <div className="py-20 text-center bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] border border-black/5 dark:border-white/10 p-8">
            <p className="text-base font-bold text-stone-700 dark:text-stone-300">
              No matching projects found
            </p>
            <p className="text-xs text-stone-400 mt-1">
              Try adjusting your filter or search query.
            </p>
            <button
              onClick={() => {
                setFilterCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 text-xs font-bold text-stone-900 dark:text-white underline"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  onInspect,
}: {
  project: Project;
  index: number;
  onInspect: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group grid md:grid-cols-2 gap-0 bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-700"
    >
      <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-between order-2 md:order-1 space-y-8">
        <div>
          {/* Unboxed Metadata with Typographic Separators */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.turnaroundTime || '2–4 Wk Sprint'}</span>
            {project.reliabilityTier && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-stone-700 dark:text-stone-300">{project.reliabilityTier.split('·')[0]}</span>
              </>
            )}
          </div>

          <h3 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white mb-4 tracking-tight group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-stone-600 dark:text-stone-400 leading-relaxed font-normal text-base mb-6">
            {project.description}
          </p>

          {/* Client Impact Callout */}
          {project.clientImpact && (
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-start gap-3 mb-6">
              <Sparkles size={16} className="text-stone-700 dark:text-stone-300 shrink-0 mt-0.5" />
              <p className="text-xs font-medium text-stone-700 dark:text-stone-300 leading-relaxed">
                <strong className="text-stone-900 dark:text-white font-bold">Client Impact:</strong> {project.clientImpact}
              </p>
            </div>
          )}

          {/* Unboxed Tech Stack Line */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-stone-500 dark:text-stone-400">
            {project.tags.map((tag, idx) => (
              <span key={tag} className="flex items-center gap-2">
                <span>{tag}</span>
                {idx < project.tags.length - 1 && (
                  <span className="text-stone-300 dark:text-stone-700" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-black/5 dark:border-white/5">
          <button
            onClick={onInspect}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-black text-xs font-bold hover:scale-105 transition-transform"
          >
            <Cpu size={14} />
            Inspect Architecture & Specs
          </button>

          <div className="flex items-center gap-2">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-stone-100 dark:bg-white/5 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                aria-label="View code on GitHub"
              >
                <Github size={16} />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-stone-100 dark:bg-white/5 flex items-center justify-center text-stone-700 dark:text-stone-300 hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                aria-label="Launch live demo"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="relative h-64 md:h-full min-h-[320px] overflow-hidden order-1 md:order-2 bg-stone-100 dark:bg-white/5">
        <ImageWithFallback
          src={project.image}
          alt={project.title}
          category={project.category}
          title={project.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
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
        <h2 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em] mb-4">
          On Repeat
        </h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold text-stone-900 dark:text-white tracking-tighter">
          The soundtrack to late nights.
        </h3>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-100px' }}
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
