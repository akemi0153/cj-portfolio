import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { blogPosts } from '../data';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import Markdown from 'react-markdown';

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-3xl font-display font-bold text-stone-900 dark:text-white mb-6">Post not found</h1>
        <Link to="/blog" className="text-stone-500 hover:text-stone-900 dark:hover:text-white font-bold uppercase tracking-widest transition-colors">
          Return to journal
        </Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-3xl mx-auto space-y-16 pt-10"
    >
      <SEO 
        title={post.title} 
        description={post.excerpt}
      />
      
      <Link 
        to="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white uppercase tracking-[0.2em] transition-colors group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to journal
      </Link>

      <header className="space-y-8">
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
        <h1 className="text-4xl md:text-6xl font-display font-bold text-stone-900 dark:text-white tracking-tighter leading-[1.1]">
          {post.title}
        </h1>
      </header>

      <div className="prose prose-stone dark:prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-a:font-bold prose-a:underline-offset-4 hover:prose-a:text-stone-600 dark:hover:prose-a:text-stone-300">
        <Markdown>{post.content}</Markdown>
      </div>
    </motion.article>
  );
}
