import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Moon, Sun } from 'lucide-react';
import { cn } from '../utils';
import { useEffect, useState } from 'react';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode.toString());
  }, [isDarkMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans flex flex-col relative overflow-hidden transition-colors duration-500">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-[-2]">
        <div className="absolute top-0 -left-1/4 w-full h-[500px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse" />
        <div className="absolute top-1/2 -right-1/4 w-full h-[500px] bg-purple-500/10 dark:bg-purple-600/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled 
            ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 py-4 shadow-sm' 
            : 'bg-transparent py-6 border-b border-transparent'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-slate-900 dark:text-white group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105 group-hover:rotate-3 duration-300">
              <Terminal size={20} />
            </div>
            <span className="font-bold tracking-tight text-xl">christian.dev</span>
          </Link>
          <nav className="flex items-center gap-6 md:gap-8">
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/">Work</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-all hover:scale-105"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <a 
                href="#contact" 
                className="hidden md:inline-flex text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-6 py-2.5 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Contact Me
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className="pt-28 pb-20 max-w-6xl mx-auto px-6 md:px-12 flex-grow w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  
  return (
    <Link
      to={to}
      className={cn(
        'text-sm font-semibold transition-all duration-300 relative group',
        isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
      )}
    >
      {children}
      <span className={cn(
        "absolute -bottom-1 left-0 w-full h-0.5 rounded-full transition-all duration-300",
        isActive ? "bg-blue-600 dark:bg-blue-400 scale-x-100" : "bg-slate-900 dark:bg-white scale-x-0 group-hover:scale-x-100"
      )} />
    </Link>
  );
}
