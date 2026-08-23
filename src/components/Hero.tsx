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
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
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
        <motion.div variants={itemVariants} className="mb-8 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-stone-100 dark:bg-white/5 border border-black/5 dark:border-white/10 text-stone-600 dark:text-stone-300 text-xs font-bold uppercase tracking-[0.2em] shadow-sm">
          <span>Public Service & Digital Architecture</span>
        </motion.div>
        
        <div className="overflow-hidden mb-6">
          <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl md:text-[5.5rem] font-display font-bold text-stone-900 dark:text-white tracking-tighter leading-[1.05]">
            Building resilient
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl md:text-[5.5rem] font-display font-bold text-stone-400 dark:text-stone-500 tracking-tighter leading-[1.05]">
            digital infrastructure.
          </motion.h1>
        </div>
        
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-stone-600 dark:text-stone-400 leading-relaxed font-medium max-w-2xl mx-auto mb-6">
          I'm Kriyos, a passionate software engineer and dedicated government employee, focused on architecting robust backend systems and intuitive web applications serving the public and beyond.
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center mb-12">
          <p className="text-sm font-medium text-stone-500 dark:text-stone-400 italic bg-stone-100 dark:bg-white/5 px-6 py-3 rounded-full border border-black/5 dark:border-white/10 shadow-sm inline-flex items-center gap-3">
            <span className="font-bold text-stone-900 dark:text-white uppercase tracking-widest text-xs not-italic">Kriyos</span>
            <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-600"></span>
            <span>Follower of Christ whom God will bless ( Χριστιανός Ἰωσήφ )</span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold transition-all active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-stone-800 to-black dark:from-stone-200 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity z-0" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-transparent text-stone-900 dark:text-white font-bold border border-stone-200 dark:border-white/10 hover:bg-stone-50 dark:hover:bg-white/5 transition-all active:scale-95 hover:scale-105"
          >
            <Code2 size={18} className="text-stone-400" />
            Let's Collaborate
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
