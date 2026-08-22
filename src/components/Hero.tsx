import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, Code2, Landmark, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={containerRef} className="pt-12 pb-24 min-h-[80vh] flex items-center relative perspective-1000">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 text-sm font-medium mb-8 shadow-sm">
            <Landmark size={16} className="text-blue-600 dark:text-blue-400" />
            <span className="uppercase tracking-wider text-xs font-bold">Public Service & Digital Architecture</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-[5rem] font-display font-bold text-slate-900 dark:text-white tracking-tight mb-6 leading-[1.05]">
            Building resilient <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              digital infrastructure.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10 font-medium max-w-lg">
            I'm Christian, a passionate software engineer and dedicated government employee, focused on architecting robust backend systems and intuitive web applications serving the public and beyond.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:-translate-y-1"
            >
              Explore My Work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white dark:bg-slate-900/80 text-slate-900 dark:text-white font-semibold border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <Code2 size={18} className="text-slate-500 dark:text-slate-400" />
              Let's Collaborate
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="relative hidden lg:flex justify-center items-center h-[500px]"
          style={{ y: y1 }}
        >
          {/* Dynamic Floating 3D Elements */}
          <motion.div
            animate={{ 
              y: [-15, 15, -15],
              rotateX: [-5, 5, -5],
              rotateY: [-5, 5, -5]
            }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
            className="relative w-[420px] h-[420px] z-10 perspective-1000"
          >
            {/* Using a high-quality abstract 3D architecture / shapes image from Unsplash to fit the 'architecture' theme */}
            <motion.img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1500&auto=format&fit=crop" 
              alt="3D Architectural Abstraction" 
              className="w-full h-full object-cover rounded-3xl shadow-2xl dark:opacity-90"
              style={{ borderRadius: '40px 10px 40px 10px' }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            {/* Glass decoration overlays */}
            <motion.div 
              style={{ y: y2, rotate }}
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-2xl bg-white/20 dark:bg-white/10 backdrop-blur-2xl border border-white/30 dark:border-white/20 shadow-xl flex items-center justify-center"
            >
               <Landmark size={40} className="text-blue-600 dark:text-blue-400" />
            </motion.div>
            <motion.div 
              animate={{ rotate: 360, y: [0, 20, 0] }}
              transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" }, y: { repeat: Infinity, duration: 5, ease: "easeInOut" } }}
              className="absolute -top-12 -right-8 w-28 h-28 rounded-full bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center"
            >
              <ShieldCheck size={32} className="text-slate-800/50 dark:text-white/50" />
            </motion.div>
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50 dark:from-slate-950 via-transparent to-transparent z-20 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
