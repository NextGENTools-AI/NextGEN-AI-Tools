import { useState } from 'react';
import { ImageIcon } from './Icons';

interface ScreenshotItem {
  alt: string;
  caption: string;
  gradient: string;
  accent: string;
}

interface ScreenshotGalleryProps {
  screenshots?: Array<string | ScreenshotItem>;
  altPrefix?: string;
  title?: string;
  className?: string;
}

export default function ScreenshotGallery({ screenshots = [], altPrefix = 'Tool screenshot', title = 'Screenshots', className = '' }: ScreenshotGalleryProps) {
  const hasScreenshots = screenshots.length > 0;

  if (!hasScreenshots) {
    return (
      <section className={`mb-8 ${className}`}>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <ImageIcon size={20} className="text-brand-400" />
          {title}
        </h2>
        <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
          <div className="flex aspect-video items-center justify-center rounded-xl border border-dashed border-white/[0.08] bg-dark-900/50">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
                <ImageIcon size={24} />
              </div>
              <p className="text-sm font-medium text-white">Screenshot coming soon</p>
              <p className="mt-1 text-[12px] text-dark-400">A real screenshot can be added to the public folder when available.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`mb-8 ${className}`}>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
        <ImageIcon size={20} className="text-brand-400" />
        {title}
      </h2>
      <div className={`grid gap-3 ${screenshots.length === 1 ? 'grid-cols-1' : screenshots.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
        {screenshots.map((screenshot, index) => {
          if (typeof screenshot === 'string') {
            return <ScreenshotCard key={`${screenshot}-${index}`} src={screenshot} alt={`${altPrefix} ${index + 1}`} />;
          }

          return (
            <div key={`${screenshot.alt}-${index}`} className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-2/50">
              <div className={`relative aspect-video bg-gradient-to-br ${screenshot.gradient}`}>
                <div className="absolute inset-x-0 top-0 flex h-7 items-center gap-1.5 bg-black/30 px-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                  <span className="ml-2 h-3.5 w-24 rounded bg-white/[0.06]" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-6 pt-10">
                  <div className="w-full max-w-[220px] space-y-2">
                    <div className="h-2 w-3/4 rounded-full" style={{ background: screenshot.accent, opacity: 0.35 }} />
                    <div className="h-2 w-full rounded-full bg-white/[0.06]" />
                    <div className="h-2 w-5/6 rounded-full bg-white/[0.06]" />
                    <div className="mt-3 h-6 w-1/2 rounded-lg" style={{ background: screenshot.accent, opacity: 0.25 }} />
                  </div>
                </div>
              </div>
              <div className="border-t border-white/[0.04] bg-surface-2/70 p-3">
                <p className="text-[12px] text-dark-300">{screenshot.caption}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ScreenshotCard({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-2/40">
        <div className="flex aspect-video items-center justify-center bg-dark-900/50 p-6 text-center">
          <div>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-500/10 text-brand-400">
              <ImageIcon size={24} />
            </div>
            <p className="text-sm font-medium text-white">Screenshot coming soon</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-2/40">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="aspect-video w-full object-cover"
        onError={() => setHasError(true)}
      />
    </div>
  );
}
