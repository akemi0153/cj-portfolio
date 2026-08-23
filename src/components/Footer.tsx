export default function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/5 py-16 mt-auto relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <span className="text-stone-400 dark:text-stone-500 text-sm font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} Kriyos.dev.
          </span>
        </div>
        <div className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
          <a href="#" className="hover:text-stone-900 dark:hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/christian-dev" target="_blank" rel="noreferrer" className="hover:text-stone-900 dark:hover:text-white transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
}
