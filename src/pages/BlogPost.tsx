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
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Post not found</h1>
        <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
          Return to blog
        </Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto space-y-12 pt-8"
    >
      <SEO 
        title={post.title} 
        description={post.excerpt}
      />
      
      <Link 
        to="/blog"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
      >
        <ArrowLeft size={16} />
        Back to writing
      </Link>

      <header className="space-y-6">
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
        <h1 className="text-4xl md:text-5xl font-display font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
          {post.title}
        </h1>
      </header>

      <div className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-700">
        <Markdown>{post.content}</Markdown>
      </div>
    </motion.article>
  );
}
