import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';

export default function Blog() {
  return (
    <div className="space-y-16">
      <SEO 
        title="Blog" 
        description="Thoughts, learnings, and technical deep-dives from my journey as a software engineer."
      />
      <div className="space-y-6 pt-12">
        <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 dark:text-white tracking-tight">Writing</h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-xl font-medium leading-relaxed">
          Thoughts, learnings, and technical deep-dives from my journey as a software engineer.
        </p>
      </div>

      <div className="grid gap-8">
        {blogPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link 
              to={`/blog/${post.id}`}
              className="group block p-8 rounded-3xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:shadow-2xl hover:shadow-blue-900/10 dark:hover:shadow-black/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={16} />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 font-medium">
                    {post.excerpt}
                  </p>
                </div>
                
                <div className="shrink-0 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-colors">
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
