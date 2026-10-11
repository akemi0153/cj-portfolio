import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Moon, Sun, Menu, X, Search } from 'lucide-react';
import { cn } from '../utils';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import CommandPalette from './CommandPalette';
import { Project } from '../types';

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
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

  const handleSelectProjectFromPalette = (project: Project) => {
    // If not on home, navigate to home first
    if (location.pathname !== '/') {
      window.location.href = `/#projects`;
    } else {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

      {/* Top Bar following Top Bar Contract (3 Zones, gap-8) */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-40 transition-all duration-700 ease-out',
          scrolled 
            ? 'bg-white/80 dark:bg-[#050505]/80 backdrop-blur-2xl border-b border-black/5 dark:border-white/5 py-3.5' 
            : 'bg-transparent py-7 border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <Link to="/" className="flex items-center gap-3 text-stone-900 dark:text-white group whitespace-nowrap shrink-0">
            <div className="w-9 h-9 rounded-xl bg-stone-900 dark:bg-white flex items-center justify-center text-white dark:text-black transition-transform group-hover:scale-105 duration-500">
              <Terminal size={17} strokeWidth={2.5} />
            </div>
            <span className="font-display font-bold tracking-tight text-xl">kriyos.</span>
          </Link>
          
          {/* Zone 2: Single-line Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-stone-600 dark:text-stone-400">
            <a href="/#projects" className="hover:text-stone-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              Work
            </a>
            <a href="/#tech-stack" className="hover:text-stone-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              Tech Stack
            </a>
            <a href="/#fast-track" className="hover:text-stone-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              Fast-Track
            </a>
            <a href="/#estimator" className="hover:text-stone-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0">
              Scope Estimator
            </a>
            <NavLink to="/blog">Journal</NavLink>
          </nav>
          
          {/* Zone 3: Fast Action & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Command Palette Button */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-600 dark:text-stone-300 text-xs font-semibold border border-black/5 dark:border-white/10 transition-colors"
              title="Fast Search & Navigate (Cmd+K)"
            >
              <Search size={13} />
              <span className="font-mono text-[11px] text-stone-400">⌘K</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 dark:bg-white/5 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-white/10 transition-all"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            
            {/* Primary Action Button */}
            <a 
              href="/#contact" 
              className="hidden sm:inline-flex text-xs font-bold text-white bg-black dark:bg-white dark:text-black px-5 py-2.5 rounded-full transition-all hover:scale-105 shadow-sm whitespace-nowrap shrink-0"
            >
              Start Project
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-stone-100 dark:bg-white/5 text-stone-900 dark:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-stone-50/98 dark:bg-[#050505]/98 backdrop-blur-2xl pt-28 px-8 md:hidden flex flex-col gap-6"
          >
             <a href="/#projects" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-bold text-stone-900 dark:text-white">Selected Work</a>
             <a href="/#tech-stack" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-bold text-stone-900 dark:text-white">Tech Stack</a>
             <a href="/#fast-track" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-bold text-stone-900 dark:text-white">Fast-Track Delivery</a>
             <a href="/#estimator" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-bold text-stone-900 dark:text-white">Scope Estimator</a>
             <Link to="/blog" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-bold text-stone-900 dark:text-white">Journal</Link>
             <a href="/#contact" onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-bold text-stone-900 dark:text-white">Contact & Inquiry</a>
             
             <div className="pt-6 mt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
               <button
                 onClick={() => {
                   setMobileMenuOpen(false);
                   setCommandPaletteOpen(true);
                 }}
                 className="flex items-center gap-2 text-sm font-bold text-stone-600 dark:text-stone-400"
               >
                 <Search size={16} />
                 Fast Search (⌘K)
               </button>
             </div>
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

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={handleSelectProjectFromPalette}
      />
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
        'text-sm font-semibold transition-all duration-300 relative group tracking-wide whitespace-nowrap shrink-0',
        isActive ? 'text-stone-900 dark:text-white' : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
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
