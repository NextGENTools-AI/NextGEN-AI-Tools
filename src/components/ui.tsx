import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { cn } from '../utils/cn';

/* ------------------------------------------------------------------
   Reveal — lightweight scroll-reveal built on IntersectionObserver.
   Pairs with the `.reveal` CSS class (respects prefers-reduced-motion).
------------------------------------------------------------------- */

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in milliseconds */
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'article';
}

export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref as never}
      className={cn('reveal', visible && 'is-visible', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------
   SectionHeader — consistent eyebrow / title / description / action
------------------------------------------------------------------- */

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  action?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = 'left',
  className,
}: SectionHeaderProps) {
  const centered = align === 'center';

  return (
    <div
      className={cn(
        'mb-10 sm:mb-14 flex flex-col gap-5',
        centered
          ? 'items-center text-center'
          : 'sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', centered && 'mx-auto')}>
        {eyebrow && (
          <p className={cn('eyebrow mb-3.5 flex items-center gap-2.5', centered && 'justify-center')}>
            {!centered && <span className="inline-block h-px w-6 bg-brand-400/50" aria-hidden="true" />}
            {eyebrow}
          </p>
        )}
        <h2 className="text-[26px] sm:text-3xl lg:text-[34px] font-bold tracking-[-0.02em] leading-[1.15] text-white">
          {title}
        </h2>
        {description && (
          <p className="mt-3.5 text-[15px] sm:text-base leading-relaxed text-dark-200">
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------
   Section shell — consistent vertical rhythm + optional hairline
------------------------------------------------------------------- */

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  hairline?: boolean;
}

export function Section({ children, className, id, hairline = true }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-16 sm:py-24', className)}>
      {hairline && (
        <div className="hairline absolute top-0 left-1/2 w-[70%] -translate-x-1/2" aria-hidden="true" />
      )}
      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------
   Badge — small status labels (pricing, difficulty, meta)
------------------------------------------------------------------- */

type BadgeTone = 'brand' | 'emerald' | 'sky' | 'amber' | 'violet' | 'rose' | 'neutral' | 'cyan';

const badgeTones: Record<BadgeTone, string> = {
  brand: 'bg-brand-500/10 text-brand-300 border-brand-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  sky: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  neutral: 'bg-white/[0.04] text-dark-200 border-white/[0.08]',
};

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}

export function Badge({ children, tone = 'neutral', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide',
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Maps a tool pricing tier to a badge tone. Shared across pages. */
export function pricingTone(pricing: string): BadgeTone {
  switch (pricing) {
    case 'Freemium':
      return 'emerald';
    case 'Free':
      return 'sky';
    case 'Paid':
      return 'amber';
    default:
      return 'violet';
  }
}
