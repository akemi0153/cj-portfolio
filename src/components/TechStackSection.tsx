import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Layers, Cpu, Wrench, Database, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { techStack } from '../data';
import { TechItem, TechCategory } from '../types';
import { cn } from '../utils';

type FilterCategory = 'All' | 'Frontend' | 'Backend' | 'Tools' | 'Database' | 'Languages';

const categoryIcons: Record<FilterCategory, React.ReactNode> = {
  All: <Layers className="w-3.5 h-3.5" />,
  Frontend: <Cpu className="w-3.5 h-3.5" />,
  Backend: <Code2 className="w-3.5 h-3.5" />,
  Tools: <Wrench className="w-3.5 h-3.5" />,
  Database: <Database className="w-3.5 h-3.5" />,
  Languages: <Sparkles className="w-3.5 h-3.5" />
};

export default function TechStackSection() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<TechItem | null>(null);

  const categories: FilterCategory[] = [
    'All',
    'Frontend',
    'Backend',
    'Tools',
    'Database',
    'Languages'
  ];

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: techStack.length };
    for (const tech of techStack) {
      const cat = tech.category === 'DevOps & Tools' ? 'Tools' : tech.category;
      counts[cat] = (counts[cat] || 0) + 1;
    }
    return counts;
  }, []);

  // Filter skills based on category toggle and search query
  const filteredSkills = useMemo(() => {
    return techStack.filter(tech => {
      const normalizedCat = tech.category === 'DevOps & Tools' ? 'Tools' : tech.category;
      const matchesCategory =
        selectedCategory === 'All' || normalizedCat === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tech.name.toLowerCase().includes(q) ||
        (tech.role && tech.role.toLowerCase().includes(q)) ||
        (tech.proficiency && tech.proficiency.toLowerCase().includes(q)) ||
        (tech.usedIn && tech.usedIn.some(p => p.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="tech-stack" className="scroll-mt-32 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header zone */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em]">
              Toolkit & Architecture Stack
            </h2>
          </div>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-stone-900 dark:text-white tracking-tighter">
            Technologies leveraged in production.
          </h3>
          <p className="mt-3 text-sm md:text-base text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
            Strictly vetted frameworks, runtimes, and engineering tooling optimized for zero-downtime scalability, deterministic security, and rapid development cycles.
          </p>
        </div>

        {/* Quick Stack Stats */}
        <div className="flex items-center gap-6 p-4 rounded-2xl bg-white/70 dark:bg-[#0A0A0A]/80 backdrop-blur-md border border-black/5 dark:border-white/10 shrink-0">
          <div>
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase">Tracked Stack</div>
            <div className="text-xl font-bold font-display text-stone-900 dark:text-white">
              {techStack.length} Technologies
            </div>
          </div>
          <div className="w-[1px] h-8 bg-black/10 dark:bg-white/10" />
          <div>
            <div className="text-xs font-mono text-stone-500 dark:text-stone-400 uppercase">Core Standard</div>
            <div className="text-xl font-bold font-display text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> 100% Type-Safe
            </div>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-4 border-b border-black/5 dark:border-white/10">
        {/* Category Toggles with smooth active indicator */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map(category => {
            const isSelected = selectedCategory === category;
            const count = categoryCounts[category] || 0;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'relative px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 flex items-center gap-2 whitespace-nowrap cursor-pointer select-none',
                  isSelected
                    ? 'text-stone-900 dark:text-white shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                )}
              >
                {isSelected && (
                  <motion.div
                    layoutId="techFilterActive"
                    className="absolute inset-0 rounded-xl bg-white dark:bg-[#161616] border border-black/10 dark:border-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.5)] z-0"
                    transition={{ type: 'spring', bounce: 0.18, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className={cn('transition-colors', isSelected ? 'text-stone-900 dark:text-white' : 'text-stone-400 dark:text-stone-500')}>
                    {categoryIcons[category]}
                  </span>
                  <span>{category}</span>
                  <span
                    className={cn(
                      'text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors',
                      isSelected
                        ? 'bg-stone-100 dark:bg-white/10 text-stone-900 dark:text-white font-bold'
                        : 'bg-black/5 dark:bg-white/5 text-stone-400 dark:text-stone-500'
                    )}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Search & Filter Bar */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search skills, tools, roles..."
            className="w-full pl-10 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-white/80 dark:bg-[#0A0A0A]/90 border border-black/10 dark:border-white/10 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-600 transition-all shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Showing count indicator if filtered */}
      {(selectedCategory !== 'All' || searchQuery) && (
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-6">
          <div className="flex items-center gap-2">
            <span>Showing <strong className="text-stone-900 dark:text-white">{filteredSkills.length}</strong> of {techStack.length} skills</span>
            {selectedCategory !== 'All' && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-stone-600 dark:text-stone-300">
                Category: {selectedCategory}
              </span>
            )}
            {searchQuery && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-stone-600 dark:text-stone-300">
                Query: "{searchQuery}"
              </span>
            )}
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white hover:underline transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Filterable Grid with Hardware-Accelerated Smooth Layout Transitions */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 min-h-[380px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map(tech => (
            <SkillCard
              key={tech.name}
              tech={tech}
              isSelected={selectedSkill?.name === tech.name}
              onSelect={() =>
                setSelectedSkill(prev => (prev?.name === tech.name ? null : tech))
              }
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-4 rounded-3xl bg-white/50 dark:bg-[#0A0A0A]/50 border border-black/5 dark:border-white/10"
        >
          <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-stone-100 dark:bg-white/5 flex items-center justify-center text-stone-400">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-stone-900 dark:text-white mb-1">
            No matching skills found
          </h4>
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 max-w-sm mx-auto">
            No technologies match "{searchQuery}" in {selectedCategory}. Try another keyword or reset the category filters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-900 dark:bg-white text-white dark:text-black hover:opacity-90 transition-opacity"
          >
            Show All Technologies
          </button>
        </motion.div>
      )}
    </section>
  );
}

function SkillCard({
  tech,
  isSelected,
  onSelect
}: {
  tech: TechItem;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  // Category badge color accents
  const categoryAccents: Record<string, string> = {
    Frontend: 'text-sky-600 dark:text-sky-400 border-sky-500/20 bg-sky-500/5',
    Backend: 'text-indigo-600 dark:text-indigo-400 border-indigo-500/20 bg-indigo-500/5',
    Tools: 'text-amber-600 dark:text-amber-400 border-amber-500/20 bg-amber-500/5',
    Database: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
    Languages: 'text-violet-600 dark:text-violet-400 border-violet-500/20 bg-violet-500/5',
  };

  const accentClass =
    categoryAccents[tech.category] ||
    'text-stone-600 dark:text-stone-400 border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5';

  return (
    <motion.div
      layout
      layoutId={tech.name}
      initial={{ opacity: 0, scale: 0.88, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: -10 }}
      transition={{
        layout: { type: 'spring', stiffness: 380, damping: 30 },
        opacity: { duration: 0.22 },
        scale: { duration: 0.22 }
      }}
      onClick={onSelect}
      className={cn(
        'group relative flex flex-col justify-between p-6 rounded-3xl transition-all duration-300 text-left cursor-pointer select-none',
        'bg-white dark:bg-[#0A0A0A] border',
        isSelected
          ? 'border-stone-900 dark:border-white ring-1 ring-stone-900 dark:ring-white shadow-lg'
          : 'border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/25 hover:-translate-y-1 shadow-[0_4px_24px_rgb(0,0,0,0.02)] dark:shadow-none'
      )}
    >
      <div>
        {/* Top bar with Icon and Category Tag */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-stone-50 dark:bg-white/[0.04] border border-black/5 dark:border-white/10 transition-transform duration-300 group-hover:scale-105 shrink-0">
            {tech.icon && !imgError ? (
              <img
                src={tech.icon}
                alt={tech.name}
                loading="lazy"
                onError={() => setImgError(true)}
                className="w-6 h-6 object-contain filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            ) : (
              <span className="font-mono font-bold text-xs text-stone-700 dark:text-stone-300">
                {tech.name.slice(0, 2).toUpperCase()}
              </span>
            )}
          </div>

          <div className="flex flex-col items-end gap-1">
            <span
              className={cn(
                'text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border',
                accentClass
              )}
            >
              {tech.category}
            </span>
            {tech.proficiency && (
              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono tracking-wider">
                {tech.proficiency}
              </span>
            )}
          </div>
        </div>

        {/* Tech Title & Role */}
        <h4 className="text-base font-bold text-stone-900 dark:text-white tracking-tight mb-1.5 group-hover:text-stone-950 dark:group-hover:text-white transition-colors">
          {tech.name}
        </h4>
        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-2">
          {tech.role || 'High-performance production stack module.'}
        </p>
      </div>

      {/* Used in projects footer */}
      {tech.usedIn && tech.usedIn.length > 0 && (
        <div className="mt-5 pt-3.5 border-t border-black/5 dark:border-white/10 flex items-center gap-1.5 overflow-hidden">
          <span className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400 shrink-0">
            Applied:
          </span>
          <span className="text-[11px] text-stone-700 dark:text-stone-300 font-medium truncate">
            {tech.usedIn.join(' · ')}
          </span>
        </div>
      )}
    </motion.div>
  );
}
