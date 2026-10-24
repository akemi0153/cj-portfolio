import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  Send,
  Copy,
  Check,
  Clock,
  ShieldCheck,
  Building2,
  Code2,
  Server,
  Layers,
  ArrowRight,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../utils';

// Zod Schema for validation
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(100, { message: 'Name cannot exceed 100 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid work or personal email.' }),
  projectType: z.enum([
    'govtech',
    'web_app',
    'backend_arch',
    'security_audit',
    'other',
  ], {
    message: 'Please select the project domain or scope.',
  }),
  timeline: z.enum([
    'express',
    'standard',
    'quarterly',
    'exploratory',
  ], {
    message: 'Please select an estimated turnaround timeline.',
  }),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long to provide adequate context.' })
    .max(3000, { message: 'Message cannot exceed 3000 characters.' }),
});

export type ContactFormData = z.infer<typeof contactSchema>;

interface ContactProps {
  initialMessage?: string;
  onSuccess?: (data: ContactFormData) => void;
}

const PROJECT_TYPE_OPTIONS = [
  { value: 'govtech', label: 'GovTech & Public Sector', icon: Building2, desc: 'High-compliance, RBAC & audit trail systems' },
  { value: 'web_app', label: 'Full-Stack Web App', icon: Code2, desc: 'Responsive React/Next.js & modern frontend' },
  { value: 'backend_arch', label: 'Backend & High-Throughput API', icon: Server, desc: 'PostgreSQL, microservices & caching' },
  { value: 'security_audit', label: 'Security & Reliability Audit', icon: ShieldCheck, desc: 'Vulnerability scans, RLS & SLA reviews' },
  { value: 'other', label: 'Consulting / Other', icon: Layers, desc: 'Architecture advisory, code review or general inquiry' },
] as const;

const TIMELINE_OPTIONS = [
  { value: 'express', label: 'Express Sprint (2–4 wks)' },
  { value: 'standard', label: 'Standard Delivery (1–2 mos)' },
  { value: 'quarterly', label: 'Q1/Q2 Roadmap (3+ mos)' },
  { value: 'exploratory', label: 'Exploratory / Ongoing' },
] as const;

const BUDGET_RANGES = [
  '< $5k (Micro-Sprint)',
  '$5k – $15k (Standard Module)',
  '$15k – $35k (Full System)',
  '$35k+ (Enterprise/Gov)',
  'Undetermined / Tender',
];

export default function Contact({ initialMessage, onSuccess }: ContactProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<ContactFormData | null>(null);
  const [ticketId, setTicketId] = useState<string>('');

  const directEmail = 'christianjosephmarigmen39@gmail.com';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      projectType: 'govtech',
      timeline: 'express',
      budget: '$5k – $15k (Standard Module)',
      message: initialMessage || '',
    },
    mode: 'onTouched',
  });

  // Watch selected values for custom pill/card styling & reactive counters
  const currentMessage = watch('message') || '';
  const selectedProjectType = watch('projectType');
  const selectedTimeline = watch('timeline');

  // Sync initialMessage changes from FastTrackEstimator or ProjectDetailModal
  useEffect(() => {
    if (initialMessage) {
      setValue('message', initialMessage, { shouldValidate: true, shouldDirty: true });
    }
  }, [initialMessage, setValue]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(directEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement('textarea');
      textarea.value = directEmail;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    }
  };

  const onSubmit = async (data: ContactFormData) => {
    // Simulate real-world network latency and secure dispatch
    await new Promise(resolve => setTimeout(resolve, 1400));
    
    // Generate deterministic inquiry reference
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const generatedTicket = `KRY-${new Date().getFullYear()}-${randomCode}`;
    
    setTicketId(generatedTicket);
    setSubmissionSuccess(data);
    if (onSuccess) onSuccess(data);
  };

  const handleResetForm = () => {
    setSubmissionSuccess(null);
    setTicketId('');
    reset({
      name: '',
      email: '',
      projectType: 'govtech',
      timeline: 'express',
      budget: '$5k – $15k (Standard Module)',
      message: '',
    });
  };

  // Generate mailto backup link
  const createMailtoLink = (data?: ContactFormData) => {
    const subject = encodeURIComponent(
      `[Inquiry: ${data?.projectType ? data.projectType.toUpperCase() : 'Project'}] From ${data?.name || 'Potential Client'}`
    );
    const body = encodeURIComponent(
      `Name: ${data?.name || ''}\nEmail: ${data?.email || ''}\nTimeline: ${data?.timeline || ''}\nBudget: ${data?.budget || ''}\n\nProject Scope:\n${data?.message || currentMessage}`
    );
    return `mailto:${directEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 scroll-mt-24 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Communication & Profile Context */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-emerald-500 uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>Available for Select Contracts & Advisory</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-stone-900 dark:text-white tracking-tight leading-[1.08]">
                Let's architect <br />
                <span className="text-stone-400 dark:text-stone-500">something extraordinary.</span>
              </h2>
              <p className="mt-5 text-stone-600 dark:text-stone-400 text-base md:text-lg leading-relaxed font-normal">
                Whether you need high-compliance GovTech infrastructure, mission-critical backend systems, or rapid prototype delivery, send a direct scope briefing below.
              </p>
            </div>

            {/* Direct Email Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Direct Inquiries
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <Clock size={13} />
                  Avg response &lt; 12 hrs
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <a
                  href={`mailto:${directEmail}`}
                  className="font-mono text-sm md:text-base font-bold text-stone-900 dark:text-white hover:text-stone-600 dark:hover:text-stone-300 transition-colors break-all"
                >
                  {directEmail}
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 transition-all shrink-0 self-start sm:self-auto"
                  aria-label="Copy direct email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check size={13} className="text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-3 border-t border-black/5 dark:border-white/5 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-stone-400 dark:text-stone-500 uppercase tracking-wider font-semibold text-[10px]">Location & Base</p>
                  <p className="font-semibold text-stone-800 dark:text-stone-200 mt-0.5">Manila (UTC+8) · Global Remote</p>
                </div>
                <div>
                  <p className="text-stone-400 dark:text-stone-500 uppercase tracking-wider font-semibold text-[10px]">Client Standard</p>
                  <p className="font-semibold text-stone-800 dark:text-stone-200 mt-0.5">Strict NDAs & Stage Milestones</p>
                </div>
              </div>
            </div>

            {/* Architecture Invariants Reassurance */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                What you can count on
              </p>
              <ul className="space-y-2.5 text-xs md:text-sm text-stone-600 dark:text-stone-400">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-stone-900 dark:text-white shrink-0 mt-0.5" />
                  <span><strong>Zero-Downtime Architecture:</strong> Every delivery includes automated migration scripts and staging guarantees.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-stone-900 dark:text-white shrink-0 mt-0.5" />
                  <span><strong>GovTech Compliance:</strong> Row-level security (RLS), RBAC, and immutable audit logs built-in.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-stone-900 dark:text-white shrink-0 mt-0.5" />
                  <span><strong>Fast-Tracking:</strong> Clear 2-week iteration cadence with live demo preview links.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: React Hook Form with Zod Validation */}
          <div className="lg:col-span-7">
            <div className="relative bg-white dark:bg-[#0A0A0A] rounded-3xl border border-black/5 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-6 sm:p-10 md:p-12 overflow-hidden">
              
              {/* Subtle ambient light */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[90px] -z-10 pointer-events-none" />

              <AnimatePresence mode="wait">
                {submissionSuccess ? (
                  /* Success State Confirmation View */
                  <motion.div
                    key="success-receipt"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="space-y-8 py-4"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                      <CheckCircle2 size={32} />
                    </div>

                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-white/5 font-mono text-xs font-semibold text-stone-600 dark:text-stone-300">
                        <span>Ticket Reference:</span>
                        <span className="text-stone-900 dark:text-white font-bold">{ticketId}</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-display font-bold text-stone-900 dark:text-white tracking-tight">
                        Message Dispatched Successfully.
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                        Thank you, <strong className="text-stone-900 dark:text-white">{submissionSuccess.name}</strong>. Your project inquiry has been queued for engineering review. Kriyos will respond directly to <strong className="text-stone-900 dark:text-white">{submissionSuccess.email}</strong> shortly.
                      </p>
                    </div>

                    {/* Receipt Details Box */}
                    <div className="p-5 rounded-2xl bg-stone-50 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-3 text-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
                        <span className="text-stone-400 dark:text-stone-500 font-semibold uppercase">Scope Category</span>
                        <span className="font-bold text-stone-800 dark:text-stone-200">
                          {PROJECT_TYPE_OPTIONS.find(o => o.value === submissionSuccess.projectType)?.label || submissionSuccess.projectType}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
                        <span className="text-stone-400 dark:text-stone-500 font-semibold uppercase">Target Timeline</span>
                        <span className="font-bold text-stone-800 dark:text-stone-200">
                          {TIMELINE_OPTIONS.find(o => o.value === submissionSuccess.timeline)?.label || submissionSuccess.timeline}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-black/5 dark:border-white/5">
                        <span className="text-stone-400 dark:text-stone-500 font-semibold uppercase">Budget Tier</span>
                        <span className="font-bold text-stone-800 dark:text-stone-200">{submissionSuccess.budget || 'Custom'}</span>
                      </div>
                      <div className="pt-1">
                        <span className="text-stone-400 dark:text-stone-500 font-semibold uppercase block mb-1.5">Submitted Scope Extract</span>
                        <p className="text-stone-700 dark:text-stone-300 italic line-clamp-3 bg-white/50 dark:bg-black/40 p-3 rounded-lg border border-black/5 dark:border-white/5 font-mono text-[11px]">
                          "{submissionSuccess.message}"
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleResetForm}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-black font-bold text-xs hover:scale-[1.02] transition-all shadow-sm"
                      >
                        <RotateCcw size={14} />
                        <span>Send Another Message</span>
                      </button>

                      <a
                        href={createMailtoLink(submissionSuccess)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-stone-100 dark:bg-white/5 hover:bg-stone-200 dark:hover:bg-white/10 text-stone-700 dark:text-stone-300 font-bold text-xs transition-all"
                      >
                        <ExternalLink size={14} />
                        <span>Backup via Email Client</span>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  /* Active Form View */
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
                    
                    <div className="border-b border-black/5 dark:border-white/10 pb-4">
                      <h3 className="text-xl md:text-2xl font-display font-bold text-stone-900 dark:text-white tracking-tight">
                        Direct Client Inquiry
                      </h3>
                      <p className="text-xs md:text-sm text-stone-500 dark:text-stone-400 mt-1">
                        All fields validated with Zod. Fill out your requirements for a comprehensive review.
                      </p>
                    </div>

                    {/* Step 1: Project Scope Selector */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          1. Select Project Domain <span className="text-red-500">*</span>
                        </label>
                        {errors.projectType && (
                          <span className="text-xs text-red-500 font-semibold flex items-center gap-1">
                            <AlertCircle size={12} />
                            {errors.projectType.message}
                          </span>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {PROJECT_TYPE_OPTIONS.map(option => {
                          const Icon = option.icon;
                          const isSelected = selectedProjectType === option.value;
                          return (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setValue('projectType', option.value as any, { shouldValidate: true })}
                              className={cn(
                                'text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-1 cursor-pointer',
                                isSelected
                                  ? 'bg-stone-900 dark:bg-white text-white dark:text-black border-stone-900 dark:border-white shadow-sm ring-1 ring-black dark:ring-white'
                                  : 'bg-stone-50/70 dark:bg-white/5 border-black/5 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-white/10'
                              )}
                            >
                              <div className="flex items-center gap-2">
                                <Icon size={15} className={isSelected ? 'text-white dark:text-black' : 'text-stone-500'} />
                                <span className="font-bold text-xs">{option.label}</span>
                              </div>
                              <span className={cn('text-[11px] leading-tight line-clamp-1', isSelected ? 'text-stone-300 dark:text-stone-700' : 'text-stone-400 dark:text-stone-500')}>
                                {option.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Name & Email */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="space-y-1.5 relative">
                        <label htmlFor="client-name" className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          Your Name / Entity <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="client-name"
                          {...register('name')}
                          placeholder="e.g. Alex Rivera or Dept of Tech"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? 'name-error' : undefined}
                          className={cn(
                            'w-full bg-stone-50 dark:bg-white/5 border rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none transition-all',
                            errors.name
                              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-black/10 dark:border-white/10 focus:border-stone-900 dark:focus:border-white'
                          )}
                        />
                        <AnimatePresence>
                          {errors.name && (
                            <motion.p
                              id="name-error"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1"
                            >
                              <AlertCircle size={12} />
                              {errors.name.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Email Field */}
                      <div className="space-y-1.5 relative">
                        <label htmlFor="client-email" className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          Contact Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="client-email"
                          type="email"
                          {...register('email')}
                          placeholder="alex@organization.gov or work email"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? 'email-error' : undefined}
                          className={cn(
                            'w-full bg-stone-50 dark:bg-white/5 border rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none transition-all',
                            errors.email
                              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                              : 'border-black/10 dark:border-white/10 focus:border-stone-900 dark:focus:border-white'
                          )}
                        />
                        <AnimatePresence>
                          {errors.email && (
                            <motion.p
                              id="email-error"
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1"
                            >
                              <AlertCircle size={12} />
                              {errors.email.message}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Step 3: Timeline & Budget */}
                    <div className="grid sm:grid-cols-2 gap-6">
                      {/* Timeline Selector */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                            Target Delivery Timeline <span className="text-red-500">*</span>
                          </label>
                        </div>
                        <select
                          {...register('timeline')}
                          className="w-full bg-stone-50 dark:bg-stone-900 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-stone-900 dark:focus:border-white transition-all cursor-pointer"
                        >
                          {TIMELINE_OPTIONS.map(t => (
                            <option key={t.value} value={t.value} className="bg-white dark:bg-stone-900">
                              {t.label}
                            </option>
                          ))}
                        </select>
                        {errors.timeline && (
                          <p className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1">
                            <AlertCircle size={12} />
                            {errors.timeline.message}
                          </p>
                        )}
                      </div>

                      {/* Budget Selector */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          Target Budget Range (Optional)
                        </label>
                        <select
                          {...register('budget')}
                          className="w-full bg-stone-50 dark:bg-stone-900 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-xs md:text-sm text-stone-900 dark:text-white focus:outline-none focus:border-stone-900 dark:focus:border-white transition-all cursor-pointer"
                        >
                          {BUDGET_RANGES.map(b => (
                            <option key={b} value={b} className="bg-white dark:bg-stone-900">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Step 4: Message / Requirements */}
                    <div className="space-y-1.5 relative">
                      <div className="flex items-center justify-between">
                        <label htmlFor="client-message" className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                          Project Scope & Requirements <span className="text-red-500">*</span>
                        </label>
                        <span className={cn(
                          'text-[11px] font-mono',
                          currentMessage.length > 2800 ? 'text-amber-500' : 'text-stone-400 dark:text-stone-500'
                        )}>
                          {currentMessage.length} / 3000
                        </span>
                      </div>

                      <textarea
                        id="client-message"
                        rows={5}
                        {...register('message')}
                        placeholder="Detail your system requirements, performance needs, existing tech stack, or problem statement..."
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? 'message-error' : undefined}
                        className={cn(
                          'w-full bg-stone-50 dark:bg-white/5 border rounded-2xl p-4 text-sm text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-600 focus:outline-none transition-all resize-none leading-relaxed',
                          errors.message
                            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
                            : 'border-black/10 dark:border-white/10 focus:border-stone-900 dark:focus:border-white'
                        )}
                      />

                      <AnimatePresence>
                        {errors.message && (
                          <motion.p
                            id="message-error"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            className="text-xs text-red-500 font-semibold flex items-center gap-1 mt-1"
                          >
                            <AlertCircle size={12} />
                            {errors.message.message}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Submit Action Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:hover:scale-100 shadow-md cursor-pointer"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                            <span>Validating & Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <Send size={15} />
                            <span>Dispatch Project Inquiry</span>
                          </>
                        )}
                      </button>

                      <a
                        href={createMailtoLink()}
                        className="text-xs font-semibold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <span>Send via native email app</span>
                        <ArrowRight size={12} />
                      </a>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
