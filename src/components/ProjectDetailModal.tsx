import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, ShieldAlert, Cpu, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { Project } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onInquireSimilar?: (projectTitle: string) => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
  onInquireSimilar,
}: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-8 py-5 border-b border-black/5 dark:border-white/5 bg-stone-50/50 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                {project.category}
              </span>
              <span className="text-stone-300 dark:text-stone-600">/</span>
              <span className="text-xs font-mono tabular-nums text-stone-500 dark:text-stone-400">
                {project.turnaroundTime || '2-4 Week Delivery'}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 flex items-center justify-center transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-8 md:p-10 space-y-8 no-scrollbar">
            {/* Visual Header */}
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                category={project.category}
                title={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-2">
                  {project.title}
                </h2>
                <p className="text-stone-300 text-sm md:text-base max-w-2xl font-medium">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Client Impact Banner */}
            {project.clientImpact && (
              <div className="p-5 rounded-2xl bg-stone-100/80 dark:bg-white/5 border border-black/5 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black shrink-0 mt-0.5">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                      Measurable Client Impact
                    </span>
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                      {project.clientImpact}
                    </p>
                  </div>
                </div>
                {project.reliabilityTier && (
                  <div className="text-xs font-mono tabular-nums px-3 py-1.5 rounded-lg bg-stone-200/60 dark:bg-white/10 text-stone-800 dark:text-stone-200 whitespace-nowrap self-start sm:self-center">
                    {project.reliabilityTier}
                  </div>
                )}
              </div>
            )}

            {/* In-depth Overview */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                System Overview & Problem Space
              </h3>
              <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-normal text-base">
                {project.longDescription || project.description}
              </p>
            </div>

            {/* Architecture Highlights */}
            {project.architectureNotes && project.architectureNotes.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Cpu size={16} className="text-stone-500 dark:text-stone-400" />
                  <h3 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                    Reliability & Architectural Invariants
                  </h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {project.architectureNotes.map((note, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-stone-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-start gap-3"
                    >
                      <CheckCircle2 size={16} className="text-stone-600 dark:text-stone-300 shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm font-medium text-stone-700 dark:text-stone-300 leading-snug">
                        {note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Capabilities */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                  Key Capabilities
                </h3>
                <ul className="grid sm:grid-cols-2 gap-2 text-sm text-stone-600 dark:text-stone-400">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-stone-400 dark:bg-stone-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack Unboxed */}
            <div className="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
              <h3 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-3">
                Engineered With
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
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

            {/* Confidential notice if government */}
            {project.confidential && (
              <div className="p-4 rounded-xl bg-stone-100 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center gap-3 text-xs text-stone-600 dark:text-stone-400">
                <ShieldAlert size={16} className="text-stone-800 dark:text-stone-200 shrink-0" />
                <span>
                  Source code and live database endpoints are protected under Philippine government data privacy protocols. Demonstrations available upon authorized request.
                </span>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-black/5 dark:border-white/5 bg-stone-50/50 dark:bg-white/[0.02] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold hover:scale-105 transition-transform"
                >
                  <ExternalLink size={14} />
                  Launch Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-200 dark:bg-white/10 text-stone-900 dark:text-white text-xs font-bold hover:scale-105 transition-transform"
                >
                  <Github size={14} />
                  Inspect Source Code
                </a>
              )}
            </div>

            {onInquireSimilar && (
              <button
                onClick={() => {
                  onClose();
                  onInquireSimilar(project.title);
                }}
                className="text-xs font-bold text-stone-900 dark:text-white hover:underline underline-offset-4 flex items-center gap-1.5"
              >
                Inquire about similar architecture
                <Clock size={12} />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
