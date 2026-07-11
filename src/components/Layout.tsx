import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal } from 'lucide-react';
import { cn } from '../utils';
import { useEffect, useState } from 'react';
import Footer from './Footer';

export default function Layout() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-300 font-sans selection:bg-indigo-500/30">
      {/* Navigation */}
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent',
          scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-white/5 py-4' : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-white group">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 group-hover:bg-indigo-500/30 transition-colors">
              <Terminal size={18} className="text-indigo-400" />
            </div>
            <span className="font-semibold tracking-tight text-lg">christian.dev</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink to="/">Work</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <a 
              href="#contact" 
              className="text-sm font-medium text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors"
            >
              Contact Me
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20 max-w-6xl mx-auto px-6 md:px-12">
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

      {/* Footer */}
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
        'text-sm font-medium transition-colors hover:text-white',
        isActive ? 'text-white' : 'text-zinc-400'
      )}
    >
      {children}
    </Link>
  );
}
