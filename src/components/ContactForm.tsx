import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../utils';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    }, 1500);
  };

  const InputWrapper = ({ label, error, children }: { label: string, error?: string, children: React.ReactNode }) => (
    <div className="space-y-1.5 w-full relative">
      <label className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{label}</label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -5 }}
            className="absolute -bottom-6 right-0 flex items-center gap-1.5 text-xs text-red-500 font-semibold"
          >
            <AlertCircle size={12} />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section id="contact" className="py-32 scroll-mt-20">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-20 items-start">
        <div className="space-y-8">
          <h2 className="text-5xl md:text-6xl font-display font-bold text-stone-900 dark:text-white tracking-tighter leading-[1.1]">
            Let's build something <br/> <span className="text-stone-400 dark:text-stone-500">extraordinary.</span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed max-w-md font-medium">
            I'm currently looking for new opportunities. Whether you have a project in mind or just want to say hi, I'll try my best to get back to you.
          </p>
          
          <div className="pt-8 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-white/5 flex items-center justify-center border border-black/5 dark:border-white/10">
              <Mail size={24} className="text-stone-900 dark:text-white" />
            </div>
            <div>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-bold uppercase tracking-wider mb-1">Direct Email</p>
              <a href="mailto:christianjosephmarigmen39@gmail.com" className="text-stone-900 dark:text-white hover:text-stone-600 dark:hover:text-stone-300 transition-colors font-bold text-xl tracking-tight">
                christianjosephmarigmen39@gmail.com
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative w-full bg-white dark:bg-[#0A0A0A] p-8 md:p-12 rounded-3xl border border-black/5 dark:border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.05)] dark:shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden">
          {/* Subtle glow effect behind form */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -z-10 pointer-events-none" />
          
          <div className="space-y-10 relative z-10">
            <div className="grid sm:grid-cols-2 gap-8">
              <InputWrapper label="Name" error={errors.name}>
                <input 
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className={cn(
                    "w-full bg-transparent border-b-2 py-3 text-stone-900 dark:text-white focus:outline-none transition-all placeholder:text-stone-300 dark:placeholder:text-stone-700 font-medium",
                    errors.name ? "border-red-500 focus:border-red-500" : "border-stone-200 dark:border-white/10 focus:border-black dark:focus:border-white"
                  )}
                  placeholder="John Doe"
                />
              </InputWrapper>
              <InputWrapper label="Email" error={errors.email}>
                <input 
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  type="email"
                  className={cn(
                    "w-full bg-transparent border-b-2 py-3 text-stone-900 dark:text-white focus:outline-none transition-all placeholder:text-stone-300 dark:placeholder:text-stone-700 font-medium",
                    errors.email ? "border-red-500 focus:border-red-500" : "border-stone-200 dark:border-white/10 focus:border-black dark:focus:border-white"
                  )}
                  placeholder="john@example.com"
                />
              </InputWrapper>
            </div>
            
            <InputWrapper label="Message" error={errors.message}>
              <textarea 
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className={cn(
                  "w-full bg-transparent border-b-2 py-3 text-stone-900 dark:text-white focus:outline-none transition-all resize-none placeholder:text-stone-300 dark:placeholder:text-stone-700 font-medium",
                  errors.message ? "border-red-500 focus:border-red-500" : "border-stone-200 dark:border-white/10 focus:border-black dark:focus:border-white"
                )}
                placeholder="Tell me about your project..."
              />
            </InputWrapper>

            <button
              type="submit"
              disabled={status !== 'idle'}
              className="w-full bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl px-8 py-5 mt-4 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:hover:scale-100 flex items-center justify-center gap-3 overflow-hidden relative"
            >
              <AnimatePresence mode="wait">
                {status === 'submitting' ? (
                  <motion.div key="submitting" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <span className="w-5 h-5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin block" />
                  </motion.div>
                ) : status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    <span>Message Sent</span>
                  </motion.div>
                ) : (
                  <motion.span key="idle" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    Send Message
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
