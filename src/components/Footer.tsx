export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 py-12 mt-auto relative z-10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <span className="text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-tight">
            © {new Date().getFullYear()} christian.dev. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
