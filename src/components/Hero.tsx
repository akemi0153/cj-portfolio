import { motion } from 'motion/react';
import { ArrowRight, Code2, Rocket, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-24 md:pt-36 pb-20 min-h-[75vh] flex flex-col justify-center relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 text-sm font-medium mb-8">
          <Sparkles size={16} className="text-zinc-900 dark:text-zinc-100" />
          <span>Software Engineer & Problem Solver</span>
        </div>
        
        <h1 className="text-5xl sm:text-7xl md:text-[5rem] font-display font-bold text-zinc-900 dark:text-white tracking-tight mb-8 leading-[1.05]">
          Architecting <br className="hidden sm:block" />
          <span className="italic text-zinc-500 dark:text-zinc-400 font-normal">
            the digital future.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12 font-light max-w-2xl">
          I'm Christian, a passionate software engineer focused on building robust, scalable backend architectures and intuitive, high-performance web applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-white transition-all active:scale-95 shadow-md shadow-zinc-900/10"
          >
            Explore My Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white dark:bg-zinc-900/80 text-zinc-900 dark:text-white font-medium border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all active:scale-95 shadow-sm"
          >
            <Code2 size={18} className="text-zinc-500 dark:text-zinc-400" />
            Let's Collaborate
          </a>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-8 text-zinc-400 dark:text-zinc-500 text-sm font-mono uppercase tracking-widest"
        >
          <div className="flex items-center gap-2">
            <Rocket size={16} />
            Fast Delivery
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Code2 size={16} />
            Clean Code
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
