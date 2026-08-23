import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Moon, Sun, Menu, X } from 'lucide-react';
import { cn } from '../utils';
import { useEffect, useState } from 'react';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#050505] text-stone-900 dark:text-stone-100 font-sans flex flex-col relative overflow-hidden transition-colors duration-700 selection:bg-indigo-500/30">
      
      {/* Global 3D Background from Unsplash */}
      <div className="fixed inset-0 z-[-3] pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=3000&auto=format&fit=crop" 
          alt="Abstract 3D Background" 
          className="w-full h-full object-cover opacity-50 dark:opacity-30 mix-blend-luminosity transition-opacity duration-700"
        />
        <div className="absolute inset-0 bg-stone-50/85 dark:bg-[#050505]/90 backdrop-blur-[1px] transition-colors duration-700" />
      </div>

      {/* Ultra-premium Grain & Ambient Light (Dark Mode) */}
      <div className="fixed inset-0 z-[-2] hidden dark:block opacity-40 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 blur-[150px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-[40%] right-[-10%] w-[40%] h-[60%] bg-fuchsia-500/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-out',
          scrolled 
            ? 'bg-white/70 dark:bg-[#050505]/70 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 py-4' 
            : 'bg-transparent py-8 border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-stone-900 dark:text-white group">
            <div className="w-10 h-10 rounded-xl bg-stone-900 dark:bg-white flex items-center justify-center text-white dark:text-black transition-transform group-hover:scale-105 duration-500">
              <Terminal size={18} strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold tracking-tight text-xl">kriyos.</span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/">Work</NavLink>
              <NavLink to="/blog">Journal</NavLink>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-stone-200/50 dark:bg-white/5 text-stone-600 dark:text-stone-400 hover:bg-stone-300/50 dark:hover:bg-white/10 transition-all hover:scale-105"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <a 
                href="#contact" 
                className="hidden md:inline-flex text-sm font-bold text-white bg-black dark:bg-white dark:text-black px-6 py-2.5 rounded-full transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,0,0,0.1)] dark:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
              >
                Start a conversation
              </a>

              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-stone-200/50 dark:bg-white/5 text-stone-900 dark:text-white"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-stone-50/95 dark:bg-[#050505]/95 backdrop-blur-2xl pt-28 px-6 md:hidden flex flex-col gap-6"
          >
             <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold text-stone-900 dark:text-white">Work</Link>
             <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold text-stone-900 dark:text-white">Journal</Link>
             <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-4xl font-display font-bold text-stone-900 dark:text-white">Contact</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 md:px-12 flex-grow w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
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
        'text-sm font-semibold transition-all duration-300 relative group tracking-wide',
        isActive ? 'text-stone-900 dark:text-white' : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
      )}
    >
      {children}
      <span className={cn(
        "absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full transition-all duration-500",
        isActive ? "bg-stone-900 dark:bg-white scale-100" : "bg-transparent scale-0 group-hover:bg-stone-300 dark:group-hover:bg-stone-700 group-hover:scale-100"
      )} />
    </Link>
  );
}
