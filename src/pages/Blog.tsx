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
        <h1 className="text-5xl md:text-6xl font-display font-bold text-zinc-900 dark:text-white tracking-tight">Writing</h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl text-xl font-light leading-relaxed">
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
              className="group block p-8 md:p-10 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:shadow-zinc-900/5 dark:hover:shadow-black/50 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-mono font-medium tracking-wide">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <span className="hidden md:block text-zinc-300 dark:text-zinc-600">•</span>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <h2 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-4 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed max-w-3xl text-lg font-light">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm group-hover:gap-3 transition-all">
                  Read article <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
