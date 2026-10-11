import { motion } from 'motion/react';
import { ArrowRight, Code2 } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    show: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: "easeOut" as const },
    },
  };

  return (
    <section className="pt-20 pb-32 min-h-[85vh] flex items-center relative">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em]">
            Public Service & Mission-Critical Architecture
          </span>
        </motion.div>
        
        <div className="overflow-hidden mb-4">
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl md:text-[5.5rem] font-display font-bold text-stone-900 dark:text-white tracking-tighter leading-[1.05] text-balance">
            Building resilient
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl md:text-[5.5rem] font-display font-bold text-stone-400 dark:text-stone-500 tracking-tighter leading-[1.05] text-balance">
            digital infrastructure.
          </motion.h1>
        </div>
        
        <motion.p variants={itemVariants} className="text-lg md:text-2xl text-stone-600 dark:text-stone-400 leading-relaxed font-medium max-w-2xl mx-auto mb-6 text-balance">
          I'm Kriyos, a software engineer and government technology specialist architecting high-reliability backends, edge AI systems, and responsive web platforms.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mb-10">
          <p className="text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-400 italic bg-stone-100/80 dark:bg-white/[0.04] px-6 py-2.5 rounded-full border border-black/5 dark:border-white/10 shadow-sm inline-flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold text-stone-900 dark:text-white uppercase tracking-widest text-xs not-italic">Kriyos</span>
            <span className="text-stone-300 dark:text-stone-600" aria-hidden="true">·</span>
            <span>Follower of Christ whom God will bless ( Χριστιανός Ἰωσήφ )</span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold transition-all active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 overflow-hidden text-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Selected Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-black dark:from-stone-200 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity z-0" />
          </a>
          <a
            href="#estimator"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-transparent text-stone-900 dark:text-white font-bold border border-stone-200 dark:border-white/10 hover:bg-stone-50 dark:hover:bg-white/5 transition-all active:scale-95 hover:scale-105 text-sm"
          >
            <Code2 size={18} className="text-stone-400" />
            Fast-Track Estimator
          </a>
        </motion.div>

        {/* Client Trust & Reliability Metrics Strip */}
        <motion.div
          variants={itemVariants}
          className="pt-8 border-t border-black/5 dark:border-white/5 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-4xl mx-auto"
        >
          <div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-white tracking-tight tabular-nums">
              99.98%
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider mt-0.5">
              SLA High Availability
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-white tracking-tight tabular-nums">
              &lt; 140ms
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider mt-0.5">
              P99 Edge Latency
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-white tracking-tight">
              Gov-Grade
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider mt-0.5">
              Strict RBAC & Privacy
            </p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-display font-bold text-stone-900 dark:text-white tracking-tight tabular-nums">
              2–4 Wks
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium uppercase tracking-wider mt-0.5">
              Fast-Track Sprint MVP
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
