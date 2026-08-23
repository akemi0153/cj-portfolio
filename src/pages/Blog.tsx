import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Blog() {
  return (
    <div className="space-y-24 max-w-5xl mx-auto pt-10">
      <SEO 
        title="Journal" 
        description="Thoughts, learnings, and technical deep-dives from my journey as a software engineer."
      />
      <div className="space-y-6">
        <h2 className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-[0.2em] mb-4">Journal</h2>
        <h1 className="text-6xl md:text-7xl font-display font-bold text-stone-900 dark:text-white tracking-tighter leading-tight">
          Thoughts & <br /> Observations.
        </h1>
      </div>

      <div className="grid gap-10">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link 
              to={`/blog/${post.id}`}
              className="group block p-10 md:p-12 rounded-[2.5rem] bg-white dark:bg-[#0A0A0A] border border-black/5 dark:border-white/10 hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
                <div className="space-y-6 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock size={16} />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-stone-900 dark:text-white group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors tracking-tight">
                    {post.title}
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400 font-medium text-lg leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="shrink-0 pt-2 hidden md:block">
                  <div className="w-14 h-14 rounded-full bg-stone-100 dark:bg-white/5 flex items-center justify-center text-stone-600 dark:text-stone-300 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-all group-hover:scale-110">
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
