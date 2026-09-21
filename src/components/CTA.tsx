import { Link } from 'react-router-dom';
import { ArrowRightIcon, CompassIcon } from './Icons';
import { cn } from '../utils/cn';

interface CTAProps {
  /** Opt out of the outer vertical padding when embedded in a page */
  className?: string;
}

export default function CTA({ className }: CTAProps) {
  return (
    <section className={cn('relative overflow-hidden py-20 sm:py-28', className)}>
      {/* Ambient light */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="aurora left-1/2 top-1/2 h-[420px] w-[840px] -translate-x-1/2 -translate-y-1/2 opacity-[0.1]"
          style={{ background: 'radial-gradient(closest-side, #2e86ff 0%, transparent 100%)' }}
        />
        <div
          className="absolute left-1/2 top-0 h-px w-[min(760px,86%)] -translate-x-1/2"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(90,169,255,0.45), rgba(34,211,238,0.35), transparent)',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 justify-center">Ready when you are</p>
          <h2 className="text-[32px] font-extrabold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
            Your goal is the
            <span className="gradient-text"> starting line</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-dark-200 sm:text-base">
            Tell NextGEN what you want to accomplish and get a clear path — the right tools,
            the right prompts, and honest trade-offs at every step.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Link
              to="/tool-finder"
              className="btn-primary group w-full rounded-xl px-7 py-3.5 text-[14.5px] font-semibold text-white sm:w-auto"
            >
              <span className="flex items-center gap-2.5">
                Start with your goal
                <ArrowRightIcon size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              to="/categories"
              className="btn-secondary w-full rounded-xl px-7 py-3.5 text-[14.5px] font-semibold text-dark-100 hover:text-white sm:w-auto"
            >
              <span className="flex items-center gap-2.5">
                <CompassIcon size={16} />
                Explore the directory
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
