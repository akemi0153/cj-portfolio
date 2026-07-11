import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-3xl font-display font-bold text-white mb-4">Post not found</h1>
        <Link to="/blog" className="text-indigo-400 hover:underline inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to blog
        </Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto pt-12"
    >
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 text-sm font-medium"
      >
        <ArrowLeft size={16} /> Back to all posts
      </Link>

      <header className="mb-16">
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-6 font-mono">
          <div className="flex items-center gap-2">
            <Calendar size={14} />
            <span>{post.date}</span>
          </div>
          <span className="text-zinc-700">•</span>
          <div className="flex items-center gap-2">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight mb-8">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm font-medium text-zinc-300">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </motion.article>
  );
}
