import { useState } from 'react';
import { VideoIcon } from './Icons';

interface VideoTutorialProps {
  youtubeId?: string;
  title?: string;
  description?: string;
  duration?: string;
  className?: string;
}

export default function VideoTutorial({ youtubeId, title, description, duration, className = '' }: VideoTutorialProps) {
  const [hasError, setHasError] = useState(false);

  if (!youtubeId || hasError) {
    return null;
  }

  return (
    <section className={`mb-8 ${className}`}>
      <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <VideoIcon size={20} className="text-brand-400" />
          Video Tutorial
        </h2>
        <div className="mb-4 overflow-hidden rounded-xl border border-white/[0.06] bg-dark-900">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
              title={title || 'Video tutorial'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="h-full w-full"
              onError={() => setHasError(true)}
            />
          </div>
        </div>
        {title && <h3 className="text-[15px] font-semibold text-white">{title}</h3>}
        {description && <p className="mt-1 text-[13px] text-dark-300">{description}</p>}
        {duration && <span className="mt-1 inline-block text-[12px] text-dark-400">Duration: {duration}</span>}
      </div>
    </section>
  );
}
