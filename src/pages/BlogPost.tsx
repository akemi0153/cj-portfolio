import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="py-32 text-center">
        <SEO title="Post Not Found" />
        <h1 className="text-3xl font-display font-bold text-zinc-900 dark:text-white mb-4">Post not found</h1>
        <Link to="/blog" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-medium inline-flex items-center gap-2 transition-colors">
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
      <SEO 
        title={post.title}
        description={post.excerpt}
      />
      <Link 
        to="/blog" 
        className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors mb-12 text-sm font-semibold tracking-wide uppercase"
      >
        <ArrowLeft size={16} /> Back to all posts
      </Link>

      <header className="mb-16">
        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-6 font-mono font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{post.date}</span>
          </div>
          <span className="text-zinc-300 dark:text-zinc-600">•</span>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-zinc-900 dark:text-white leading-[1.1] mb-8">
          {post.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-600 dark:text-zinc-400">
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
