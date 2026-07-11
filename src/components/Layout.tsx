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
    // Check local storage or system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100 font-sans flex flex-col relative">
      {/* Scenic Background Image */}
      <div 
        className="fixed inset-0 z-[-2] w-full h-full object-cover transition-opacity duration-1000"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=3000&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Background Overlay */}
      <div className="fixed inset-0 z-[-1] bg-[#FAFAFA]/90 dark:bg-zinc-950/90 backdrop-blur-[2px] transition-colors duration-500" />

      {/* Navigation */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b',
          scrolled 
            ? 'bg-[#FAFAFA]/80 dark:bg-zinc-950/80 backdrop-blur-md border-zinc-200 dark:border-zinc-800 py-4 shadow-sm' 
            : 'bg-transparent border-transparent py-6'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-zinc-900 dark:text-white group">
            <div className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 transition-transform group-hover:scale-105">
              <Terminal size={18} />
            </div>
            <span className="font-semibold tracking-tight text-lg">christian.dev</span>
          </Link>

          <nav className="flex items-center gap-6 md:gap-8">
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/">Work</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <a 
                href="#contact" 
                className="hidden md:inline-flex text-sm font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-100 px-5 py-2.5 rounded-full transition-colors shadow-sm"
              >
                Contact Me
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20 max-w-6xl mx-auto px-6 md:px-12 flex-grow w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
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
        'text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-white',
        isActive ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'
      )}
    >
      {children}
    </Link>
  );
}
