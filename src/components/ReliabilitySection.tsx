import { Shield, Zap, Database, Lock, Quote } from 'lucide-react';
import { clientTestimonials } from '../data';

export default function ReliabilitySection() {
  const invariants = [
    {
      icon: <Lock className="w-5 h-5 text-stone-900 dark:text-white" strokeWidth={2} />,
      title: 'Gov-Grade Data Isolation',
      desc: 'Row-Level Security (RLS) and cryptographic access tokens ensuring sensitive institutional and user records remain leak-proof.',
    },
    {
      icon: <Database className="w-5 h-5 text-stone-900 dark:text-white" strokeWidth={2} />,
      title: 'ACID Relational Integrity',
      desc: 'PostgreSQL-backed transactional workflows with automated point-in-time recovery and zero data drift under high concurrency.',
    },
    {
      icon: <Zap className="w-5 h-5 text-stone-900 dark:text-white" strokeWidth={2} />,
      title: '< 140ms P99 Latency',
      desc: 'Edge-distributed asset caching, database connection pooling, and sub-50ms query execution across production environments.',
    },
    {
      icon: <Shield className="w-5 h-5 text-stone-900 dark:text-white" strokeWidth={2} />,
      title: 'Zero-Downtime Releases',
      desc: 'Automated CI/CD staging pipelines, automated pre-flight linting, and atomic container rollouts with zero operational downtime.',
    },
  ];

  return (
    <section className="scroll-mt-32 max-w-7xl mx-auto space-y-24">
      {/* Part 1: Engineering Guarantees */}
      <div>
        <h2 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em] mb-4">
          Reliability & Invariants
        </h2>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <h3 className="text-4xl md:text-5xl font-display font-bold text-stone-900 dark:text-white tracking-tighter max-w-2xl leading-[1.1]">
            Architected to eliminate failure in mission-critical environments.
          </h3>
          <p className="text-stone-600 dark:text-stone-400 text-base max-w-md font-medium leading-relaxed">
            Every application is built on strict engineering invariants designed to survive real-world strain, unexpected spikes, and network drops.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {invariants.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-[2rem] bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-white/5 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-display font-bold text-stone-900 dark:text-white tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Part 2: Client & Stakeholder Testimonials */}
      <div>
        <div className="mb-12">
          <h2 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.25em] mb-4">
            Client Verification
          </h2>
          <h3 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white tracking-tight">
            Endorsements from the field.
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {clientTestimonials.map(t => (
            <div
              key={t.id}
              className="p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 flex flex-col justify-between relative shadow-[0_4px_20px_rgb(0,0,0,0.02)]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <Quote size={20} className="text-stone-300 dark:text-stone-700" />
                  <span className="text-xs font-mono tabular-nums font-bold text-stone-900 dark:text-white px-3 py-1 bg-stone-100 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/10">
                    {t.metricHighlight}
                  </span>
                </div>

                <p className="text-stone-700 dark:text-stone-300 text-sm md:text-base leading-relaxed font-normal mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 border-t border-black/5 dark:border-white/5">
                <p className="text-sm font-bold text-stone-900 dark:text-white tracking-tight">
                  {t.clientName}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  {t.role} · {t.organization}
                </p>
                <p className="text-[11px] font-mono text-stone-400 dark:text-stone-500 mt-1">
                  Re: {t.projectRef}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
