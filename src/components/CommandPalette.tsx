import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Terminal, ArrowRight, X, ExternalLink, Cpu, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects, blogPosts, techStack } from '../data';
import { Project } from '../types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onSelectProject,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredProjects = projects.filter(
    p =>
      p.title.toLowerCase().includes(normalizedQuery) ||
      p.description.toLowerCase().includes(normalizedQuery) ||
      p.tags.some(t => t.toLowerCase().includes(normalizedQuery))
  );

  const filteredTech = techStack.filter(t =>
    t.name.toLowerCase().includes(normalizedQuery) ||
    t.category.toLowerCase().includes(normalizedQuery)
  ).slice(0, 4);

  const filteredPosts = blogPosts.filter(
    b =>
      b.title.toLowerCase().includes(normalizedQuery) ||
      b.excerpt.toLowerCase().includes(normalizedQuery)
  );

  const quickActions = [
    { label: 'Filter Technology Stack & Skills', target: '#tech-stack' },
    { label: 'Jump to Fast-Track Roadmap', target: '#fast-track' },
    { label: 'Calculate Project Scope', target: '#estimator' },
    { label: 'View Reliability Invariants', target: '#reliability' },
    { label: 'Direct Client Inquiries', target: '#contact' },
  ].filter(a => a.label.toLowerCase().includes(normalizedQuery));

  const handleActionClick = (target: string) => {
    onClose();
    if (target.startsWith('#')) {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else navigate('/' + target);
    } else {
      navigate(target);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden z-10 flex flex-col"
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 px-6 py-4.5 border-b border-black/5 dark:border-white/5 bg-stone-50/50 dark:bg-white/[0.02]">
            <Search size={18} className="text-stone-400 dark:text-stone-500 shrink-0" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Fast-track search projects, tech stack, or roadmap..."
              className="w-full bg-transparent text-sm md:text-base font-medium text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 dark:bg-white/10 text-stone-600 dark:text-stone-300">
                ESC
              </span>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full flex items-center justify-center text-stone-400 hover:text-stone-900 dark:hover:text-white"
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6 no-scrollbar">
            {/* Quick Actions */}
            {quickActions.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 px-3">
                  Quick Actions
                </span>
                {quickActions.map(action => (
                  <button
                    key={action.target}
                    onClick={() => handleActionClick(action.target)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-white/5 transition-colors group"
                  >
                    <span>{action.label}</span>
                    <ArrowRight size={14} className="text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            )}

            {/* Projects Results */}
            {filteredProjects.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 px-3">
                  Projects & Systems
                </span>
                {filteredProjects.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectProject(p);
                    }}
                    className="w-full flex items-center justify-between px-3 py-3 rounded-xl text-left hover:bg-stone-100 dark:hover:bg-white/5 transition-colors group"
                  >
                    <div>
                      <p className="text-sm font-bold text-stone-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {p.title}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate max-w-md">
                        {p.clientImpact || p.description}
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-stone-400 dark:text-stone-500 shrink-0">
                      {p.category}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Technologies */}
            {filteredTech.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 px-3">
                  Toolkit & Stack
                </span>
                <div className="grid grid-cols-2 gap-2 px-1">
                  {filteredTech.map(t => (
                    <button
                      key={t.name}
                      onClick={() => handleActionClick('#tech-stack')}
                      className="p-2.5 rounded-xl bg-stone-50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex items-center gap-2.5 text-left hover:bg-stone-100 dark:hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                      {t.icon ? (
                        <img src={t.icon} alt={t.name} className="w-4 h-4 object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                      ) : (
                        <Cpu size={14} className="text-stone-400" />
                      )}
                      <div>
                        <p className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-stone-950 dark:group-hover:text-white">
                          {t.name}
                        </p>
                        <p className="text-[10px] text-stone-400">{t.category}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Articles */}
            {filteredPosts.length > 0 && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 px-3">
                  Technical Journal
                </span>
                {filteredPosts.map(post => (
                  <button
                    key={post.id}
                    onClick={() => {
                      onClose();
                      navigate(`/blog/${post.id}`);
                    }}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-stone-100 dark:hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText size={14} className="text-stone-400" />
                      <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                        {post.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-stone-400">{post.readTime}</span>
                  </button>
                ))}
              </div>
            )}

            {filteredProjects.length === 0 && filteredPosts.length === 0 && quickActions.length === 0 && (
              <div className="py-12 text-center text-stone-500 text-sm">
                No matching results for "{query}"
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
