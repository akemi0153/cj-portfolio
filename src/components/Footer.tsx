import { Github, Linkedin, Mail, Twitter, Terminal } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0a0a] py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-zinc-500" />
          <span className="text-zinc-500 text-sm font-medium tracking-tight">© {new Date().getFullYear()} Christian Joseph Marigmen. All rights reserved.</span>
        </div>
        
        <div className="flex items-center gap-4">
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
      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-zinc-400 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all border border-transparent hover:border-indigo-500/30"
    >
      {icon}
    </a>
  );
}
