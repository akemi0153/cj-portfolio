import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export default function Blog() {
  return (
    <div className="space-y-16">
      <div className="space-y-4 pt-12">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tight">Writing</h1>
        <p className="text-zinc-400 max-w-2xl text-lg">
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
              className="group block p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-zinc-500 mb-4 font-mono">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <span className="hidden md:block text-zinc-700">•</span>
                <div className="flex items-center gap-2">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <h2 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h2>
              
              <p className="text-zinc-400 mb-6 leading-relaxed max-w-3xl">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-lg bg-white/5 text-xs font-medium text-zinc-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-indigo-400 font-medium text-sm group-hover:gap-3 transition-all">
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
