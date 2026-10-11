import { useState } from 'react';
import { ShieldCheck, Activity, Globe, Compass, Code } from 'lucide-react';
import { cn } from '../utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  category?: string;
  title?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  className,
  category,
  title,
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getFallbackIcon = () => {
    switch (category) {
      case 'Fullstack':
        return <ShieldCheck className="w-12 h-12 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />;
      case 'Frontend':
        if (title?.toLowerCase().includes('drive')) {
          return <Activity className="w-12 h-12 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />;
        }
        return <Compass className="w-12 h-12 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />;
      default:
        return <Code className="w-12 h-12 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />;
    }
  };

  if (hasError) {
    return (
      <div
        className={cn(
          'w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-stone-100 to-stone-200 dark:from-[#111111] dark:to-[#090909] border border-black/5 dark:border-white/5 relative overflow-hidden',
          className
        )}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          <div className="p-4 rounded-2xl bg-white/80 dark:bg-white/5 shadow-sm border border-black/5 dark:border-white/10">
            {getFallbackIcon()}
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
            {category || 'Architecture'}
          </span>
          <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 max-w-[200px] truncate">
            {title || alt}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('relative w-full h-full overflow-hidden bg-stone-100 dark:bg-[#111111]', className)}>
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-stone-200/50 dark:bg-white/5 flex items-center justify-center">
          <span className="sr-only">Loading visual preview...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-700',
          isLoaded ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
}
