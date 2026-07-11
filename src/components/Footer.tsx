import { Github, Linkedin, Mail, Twitter, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-[#FAFAFA]/50 dark:bg-zinc-950/50 py-16 mt-auto">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400">
             <Terminal size={16} />
          </div>
          <span className="text-zinc-500 dark:text-zinc-400 text-sm font-medium tracking-tight">© {new Date().getFullYear()} Christian Joseph Marigmen.</span>
        </div>
        
        <div className="flex items-center gap-3">
          <SocialLink href="https://github.com/" icon={<Github size={18} />} />
          <SocialLink href="https://linkedin.com/" icon={<Linkedin size={18} />} />
          <SocialLink href="https://twitter.com/" icon={<Twitter size={18} />} />
          <SocialLink href="mailto:christianjosephmarigmen39@gmail.com" icon={<Mail size={18} />} />
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-all border border-transparent"
    >
      {icon}
    </a>
  );
}
