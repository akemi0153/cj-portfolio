import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { fastTrackPhases } from '../data';
import { FastTrackPhase } from '../types';
import { Clock, ShieldCheck, Zap, ArrowRight, Check, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';
import { cn } from '../utils';

interface FastTrackEstimatorProps {
  onApplyScopeToContact?: (scopeText: string) => void;
}

export default function FastTrackEstimator({ onApplyScopeToContact }: FastTrackEstimatorProps) {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const activePhase: FastTrackPhase = fastTrackPhases[activePhaseIndex];

  // Interactive Scope Calculator State
  const [projectType, setProjectType] = useState<'govtech' | 'saas' | 'ai' | 'portal'>('govtech');
  const [speedPriority, setSpeedPriority] = useState<'express' | 'standard' | 'retainer'>('express');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'Role-Based Access Control (RBAC)',
    'PostgreSQL / Supabase RLS',
  ]);

  const featureOptions = [
    'Role-Based Access Control (RBAC)',
    'PostgreSQL / Supabase RLS',
    'Real-time Sync & WebSockets',
    'Custom REST / GraphQL APIs',
    'Edge AI & Client Inference',
    'Tamper-evident Audit Trails',
  ];

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  // Calculate estimated turnaround
  const calculateEstimate = () => {
    let baseDays = 14;
    if (projectType === 'govtech') baseDays = 21;
    if (projectType === 'saas') baseDays = 18;
    if (projectType === 'ai') baseDays = 16;
    if (projectType === 'portal') baseDays = 12;

    if (speedPriority === 'express') baseDays = Math.max(10, Math.round(baseDays * 0.75));
    if (speedPriority === 'retainer') baseDays = Math.round(baseDays * 1.5);

    const featureBonus = selectedFeatures.length * 2;
    const totalDays = baseDays + featureBonus;
    const weeks = (totalDays / 7).toFixed(1);

    let architecture = 'Next.js Edge + Supabase PostgreSQL RLS';
    if (projectType === 'govtech') architecture = 'Node.js Microservices + PostgreSQL RBAC + React Client';
    if (projectType === 'ai') architecture = 'Vite + WebWorkers + Edge Telemetry Pipeline';

    return { totalDays, weeks, architecture };
  };

  const estimate = calculateEstimate();

  const handleApplyScope = () => {
    const typeLabel =
      projectType === 'govtech'
        ? 'Mission-Critical GovTech / Enterprise Platform'
        : projectType === 'saas'
        ? 'Scalable SaaS Application'
        : projectType === 'ai'
        ? 'Edge AI & Telemetry Tool'
        : 'High-Performance Public Web Portal';

    const speedLabel =
      speedPriority === 'express'
        ? 'Express Fast-Track Sprint'
        : speedPriority === 'standard'
        ? 'Standard Agile Milestone'
        : 'Dedicated Engineering Retainer';

    const text = `Project Scope Request:
• System Type: ${typeLabel}
• Speed Priority: ${speedLabel} (Estimated ${estimate.weeks} weeks / ~${estimate.totalDays} working days)
• Recommended Architecture: ${estimate.architecture}
• Core Invariants: ${selectedFeatures.join(', ')}

I would like to discuss engineering milestones, delivery schedule, and technical requirements.`;

    if (onApplyScopeToContact) {
      onApplyScopeToContact(text);
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="fast-track" className="scroll-mt-32 max-w-7xl mx-auto space-y-24">
      {/* Section Header */}
      <div>
        <h2 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em] mb-4">
          Fast-Track Delivery Lifecycle
        </h2>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h3 className="text-4xl md:text-5xl font-display font-bold text-stone-900 dark:text-white tracking-tighter max-w-2xl leading-[1.1]">
            Engineering with transparent speed & guaranteed reliability.
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-base max-w-md font-medium leading-relaxed">
            Eliminating agency bloat. From architectural discovery to production deployment with daily staging transparency and clear quality gates.
          </p>
        </div>
      </div>

      {/* Part 1: Interactive 4-Phase Roadmap */}
      <div className="bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] border border-black/5 dark:border-white/10 p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        {/* Phase Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pb-8 border-b border-black/5 dark:border-white/5">
          {fastTrackPhases.map((phase, idx) => (
            <button
              key={phase.phase}
              onClick={() => setActivePhaseIndex(idx)}
              className={cn(
                'text-left p-5 rounded-2xl transition-all relative border',
                activePhaseIndex === idx
                  ? 'bg-stone-100 dark:bg-white/5 border-black/10 dark:border-white/15 shadow-sm'
                  : 'bg-transparent border-transparent hover:bg-black/[0.02] dark:hover:bg-white/[0.02] text-stone-500'
              )}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-stone-400 dark:text-stone-500">
                  PHASE {phase.phase}
                </span>
                <span className="text-xs font-mono tabular-nums text-stone-500 dark:text-stone-400 font-semibold">
                  {phase.duration}
                </span>
              </div>
              <p
                className={cn(
                  'text-sm font-bold truncate tracking-tight',
                  activePhaseIndex === idx
                    ? 'text-stone-900 dark:text-white'
                    : 'text-stone-600 dark:text-stone-400'
                )}
              >
                {phase.title.split('&')[0]}
              </p>
              {activePhaseIndex === idx && (
                <motion.div
                  layoutId="phaseUnderline"
                  className="absolute bottom-0 inset-x-4 h-0.5 bg-black dark:bg-white rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        {/* Phase Detail Viewer */}
        <div className="pt-8 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-display font-bold text-stone-400 dark:text-stone-600">
                {activePhase.phase}
              </span>
              <div>
                <h4 className="text-2xl font-display font-bold text-stone-900 dark:text-white tracking-tight">
                  {activePhase.title}
                </h4>
                <p className="text-xs font-mono font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest mt-1">
                  Timeline: {activePhase.duration}
                </p>
              </div>
            </div>

            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-normal text-base">
              {activePhase.summary}
            </p>

            <div className="space-y-3 pt-2">
              <h5 className="text-xs font-bold text-stone-400 dark:text-stone-500 uppercase tracking-widest">
                Sprint Deliverables
              </h5>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {activePhase.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-stone-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 flex items-start gap-3"
                  >
                    <CheckCircle2 size={16} className="text-stone-700 dark:text-stone-300 shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 md:p-8 rounded-2xl bg-stone-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black">
                <ShieldCheck size={18} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Client Checkpoint Guarantee
                </span>
                <p className="text-xs font-bold text-stone-900 dark:text-white">
                  Zero Surprise Policy
                </p>
              </div>
            </div>

            <p className="text-sm text-stone-700 dark:text-stone-300 font-medium leading-relaxed bg-white dark:bg-[#0A0A0A] p-4 rounded-xl border border-black/5 dark:border-white/5">
              "{activePhase.clientCheckpoint}"
            </p>

            <div className="space-y-2 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex items-center justify-between py-1 border-b border-black/5 dark:border-white/5">
                <span>Staging Deployment</span>
                <span className="font-mono font-bold text-stone-800 dark:text-stone-200">Continuous CI/CD</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-black/5 dark:border-white/5">
                <span>Codebase Review</span>
                <span className="font-mono font-bold text-stone-800 dark:text-stone-200">Full Repository Access</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span>Direct Slack/Discord Sync</span>
                <span className="font-mono font-bold text-stone-800 dark:text-stone-200">&lt; 2hr Response Time</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Interactive Fast-Track Scope & Sprint Estimator */}
      <div id="estimator" className="scroll-mt-32">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Calculator size={18} className="text-stone-600 dark:text-stone-400" />
            <h2 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em]">
              Fast-Track Scope Calculator
            </h2>
          </div>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white tracking-tight">
            Estimate your project timeline & architecture.
          </h3>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-white dark:bg-[#0A0A0A] p-8 md:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/10 space-y-8">
            {/* Step 1: Project Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                1. System Category
              </label>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'govtech', label: 'GovTech / Enterprise System', desc: 'Secure, high-reliability backend' },
                  { id: 'saas', label: 'Scalable SaaS Application', desc: 'Multi-tenant, real-time sync' },
                  { id: 'ai', label: 'Edge AI & Telemetry Tool', desc: 'Sub-50ms browser intelligence' },
                  { id: 'portal', label: 'High-Performance Web Portal', desc: 'SEO-tuned, sub-second load' },
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setProjectType(type.id as any)}
                    className={cn(
                      'p-4 rounded-xl text-left border transition-all',
                      projectType === type.id
                        ? 'border-black dark:border-white bg-stone-50 dark:bg-white/5'
                        : 'border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-stone-900 dark:text-white">
                        {type.label}
                      </span>
                      {projectType === type.id && <Check size={16} className="text-stone-900 dark:text-white" />}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {type.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Speed Priority */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                2. Sprint Speed Priority
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'express', label: 'Express Sprint', desc: '2–3 Wk Rapid MVP' },
                  { id: 'standard', label: 'Standard Cycle', desc: '4–5 Wk Full Build' },
                  { id: 'retainer', label: 'Deep Architecture', desc: 'Ongoing Retainer' },
                ].map(speed => (
                  <button
                    key={speed.id}
                    onClick={() => setSpeedPriority(speed.id as any)}
                    className={cn(
                      'p-3.5 rounded-xl text-center border transition-all',
                      speedPriority === speed.id
                        ? 'border-black dark:border-white bg-stone-50 dark:bg-white/5'
                        : 'border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20'
                    )}
                  >
                    <span className="text-xs font-bold block text-stone-900 dark:text-white">
                      {speed.label}
                    </span>
                    <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 mt-0.5 block">
                      {speed.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Critical Requirements */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                3. Architecture Requirements (Select all that apply)
              </label>
              <div className="grid sm:grid-cols-2 gap-2">
                {featureOptions.map(feat => {
                  const isChecked = selectedFeatures.includes(feat);
                  return (
                    <button
                      key={feat}
                      onClick={() => toggleFeature(feat)}
                      className={cn(
                        'flex items-center gap-3 p-3 rounded-xl border text-left transition-all text-xs font-semibold',
                        isChecked
                          ? 'border-black/40 dark:border-white/40 bg-stone-50 dark:bg-white/5 text-stone-900 dark:text-white'
                          : 'border-black/5 dark:border-white/5 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
                      )}
                    >
                      <div
                        className={cn(
                          'w-4 h-4 rounded border flex items-center justify-center transition-colors',
                          isChecked
                            ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
                            : 'border-stone-300 dark:border-stone-700'
                        )}
                      >
                        {isChecked && <Check size={12} strokeWidth={3} />}
                      </div>
                      <span className="truncate">{feat}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Calculation Column */}
          <div className="lg:col-span-5 bg-white dark:bg-[#0A0A0A] p-8 md:p-10 rounded-[2.5rem] border border-black/5 dark:border-white/10 space-y-8 sticky top-28">
            <div className="border-b border-black/5 dark:border-white/5 pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
                Calculated Scope Output
              </span>
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-5xl md:text-6xl font-display font-bold tracking-tight text-stone-900 dark:text-white tabular-nums">
                  ~{estimate.weeks}
                </span>
                <span className="text-lg font-bold text-stone-500 dark:text-stone-400">
                  Weeks to Production
                </span>
              </div>
              <p className="text-xs font-mono tabular-nums text-stone-500 dark:text-stone-400 mt-1">
                Estimated {estimate.totalDays} business days for milestone readiness
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Recommended Stack
                </span>
                <p className="text-sm font-bold text-stone-900 dark:text-white mt-1">
                  {estimate.architecture}
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Reliability SLA
                </span>
                <p className="text-xs font-mono tabular-nums font-semibold text-stone-700 dark:text-stone-300 mt-1">
                  99.98% High Availability · Zero-Downtime Deployments
                </p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                  Included Invariants
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selectedFeatures.map(f => (
                    <span
                      key={f}
                      className="text-[11px] font-semibold text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-white/5 px-2.5 py-1 rounded-md"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/5 dark:border-white/5">
              <button
                onClick={handleApplyScope}
                className="w-full bg-black dark:bg-white text-white dark:text-black font-bold rounded-2xl py-4.5 px-6 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 text-sm shadow-md"
              >
                <span>Prefill Scope Into Contact Inquiry</span>
                <ArrowRight size={16} />
              </button>
              <p className="text-[11px] text-center text-stone-400 dark:text-stone-500 mt-3">
                Auto-fills message below for immediate project kick-off.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
