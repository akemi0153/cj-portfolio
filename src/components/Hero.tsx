import { motion } from 'motion/react';
import { ArrowRight, Code2, Rocket, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-20 md:pt-32 pb-16 min-h-[80vh] flex flex-col justify-center relative">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium mb-8 backdrop-blur-sm">
          <Sparkles size={16} className="text-indigo-400" />
          <span>Software Engineer & Problem Solver</span>
        </div>
        
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-white tracking-tight mb-8 leading-[1.1]">
          Architecting <br className="hidden sm:block" />
          <span className="relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              the digital future.
            </span>
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl leading-relaxed mb-12 font-light">
          I'm Christian, a passionate software engineer focused on building robust, scalable backend architectures and intuitive, high-performance web applications.
        </p>

        <div className="flex flex-col sm:flex-row gap-5">
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all active:scale-95"
          >
            Explore My Work
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all active:scale-95 backdrop-blur-sm"
          >
            <Code2 size={18} className="text-zinc-400" />
            Let's Collaborate
          </a>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-20 pt-8 border-t border-white/5 flex items-center gap-8 text-zinc-500 text-sm font-mono uppercase tracking-widest"
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
