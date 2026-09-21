import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { SparkleIcon, ArrowRightIcon, SendIcon } from './Icons';
import TrustBadges from './TrustBadges';
import { cn } from '../utils/cn';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Example goals shown as one-tap shortcuts. Each routes into the live search. */
const exampleGoals = [
  'Write a launch blog post',
  'Ship code faster',
  'Design a product logo',
  'Edit video for social',
  'Automate my inbox',
];

const placeholderGoals = [
  'I want to grow my newsletter…',
  'I need to build a landing page…',
  'I want to turn sketches into art…',
  'I have to summarize research papers…',
];

/* Cycles through example goals as an animated placeholder. */
function useTypewriterPlaceholder(enabled: boolean) {
  const [text, setText] = useState(enabled ? '' : placeholderGoals[0]);

  useEffect(() => {
    if (!enabled) return;

    let phrase = 0;
    let char = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = placeholderGoals[phrase];
      if (!deleting) {
        char += 1;
        setText(current.slice(0, char));
        if (char === current.length) {
          deleting = true;
          timer = setTimeout(tick, 2200);
          return;
        }
      } else {
        char -= 1;
        setText(current.slice(0, char));
        if (char === 0) {
          deleting = false;
          phrase = (phrase + 1) % placeholderGoals.length;
        }
      }
      timer = setTimeout(tick, deleting ? 24 : 46);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [enabled]);

  return text;
}

export default function Hero() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const placeholder = useTypewriterPlaceholder(!reduceMotion && !focused && goal === '');

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const q = goal.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  const handleExample = (example: string) => {
    setGoal(example);
    inputRef.current?.focus();
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-noise">
      {/* ---- Ambient background ---- */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div
          className="aurora left-1/2 top-[-420px] h-[680px] w-[900px] -translate-x-1/2 opacity-[0.16]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(46,134,255,0.75) 0%, rgba(46,134,255,0.18) 55%, transparent 100%)',
            animation: reduceMotion ? undefined : 'drift 18s ease-in-out infinite',
          }}
        />
        <div
          className="aurora right-[-160px] top-[30%] h-[420px] w-[420px] opacity-[0.08]"
          style={{
            background:
              'radial-gradient(closest-side, rgba(34,211,238,0.7) 0%, transparent 100%)',
            animation: reduceMotion ? undefined : 'drift 22s ease-in-out infinite reverse',
          }}
        />
        <div
          className="aurora left-[-180px] bottom-[-120px] h-[380px] w-[380px] opacity-[0.06]"
          style={{ background: 'radial-gradient(closest-side, #5a7bff 0%, transparent 100%)' }}
        />
        {/* Horizon glow line */}
        <div
          className="absolute left-1/2 top-0 h-px w-[min(900px,90%)] -translate-x-1/2"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(90,169,255,0.5), rgba(34,211,238,0.4), transparent)',
          }}
        />
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
            className="mb-7 inline-flex"
          >
            <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-1.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-dark-100">
                Your AI goal workspace
              </span>
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="text-[42px] font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-6xl lg:text-[76px]"
          >
            What do you want
            <br />
            to <span className="gradient-text">achieve?</span>
          </motion.h1>

          {/* Supporting copy */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.28 }}
            className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-dark-200 sm:text-lg"
          >
            Tell NextGEN your goal. It maps you to the right tools, prompts, and comparisons —
            so you start doing, not searching.
          </motion.p>

          {/* ---- Goal console ---- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.4 }}
            className="mx-auto mt-10 max-w-2xl"
          >
            <form
              onSubmit={handleSubmit}
              className={cn(
                'group relative rounded-2xl transition-all duration-500',
                focused && 'glow-brand-strong',
              )}
            >
              <div
                className={cn(
                  'glass-strong flex items-center gap-3 rounded-2xl p-2 pl-2.5 transition-colors duration-300 sm:gap-4 sm:pl-4',
                  focused ? 'border-brand-400/40' : 'border-white/[0.08]',
                )}
              >
                <span
                  className={cn(
                    'hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 sm:flex',
                    focused
                      ? 'border-brand-400/40 bg-brand-500/15 text-brand-300'
                      : 'border-white/[0.07] bg-white/[0.04] text-dark-300',
                  )}
                >
                  <SparkleIcon size={18} />
                </span>

                <label htmlFor="hero-goal" className="sr-only">
                  What do you want to achieve?
                </label>
                <input
                  ref={inputRef}
                  id="hero-goal"
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  placeholder={placeholder ? `Try: ${placeholder}` : 'Try: I want to grow my newsletter…'}
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent py-3 text-[15px] text-white placeholder-dark-400 focus:outline-none sm:text-base"
                />

                <button
                  type="submit"
                  className="btn-primary h-11 shrink-0 rounded-xl px-4 text-[13.5px] font-semibold text-white sm:px-6"
                  aria-label="Find tools for my goal"
                >
                  <span className="flex items-center gap-2">
                    <span className="hidden sm:inline">Find my path</span>
                    <SendIcon size={16} className="sm:hidden" />
                    <ArrowRightIcon size={16} className="hidden sm:inline" />
                  </span>
                </button>
              </div>
            </form>

            {/* Example goals */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {exampleGoals.map((example) => (
                <button
                  key={example}
                  type="button"
                  onClick={() => handleExample(example)}
                  className="chip"
                >
                  {example}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Pipeline hint — ties the hero to the workspace idea */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-14 hidden items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-dark-400 sm:flex"
            aria-hidden="true"
          >
            {['Goal', 'Understood', 'Plan', 'Tools', 'Result'].map((step, i, arr) => (
              <span key={step} className="flex items-center gap-3">
                <span>{step}</span>
                {i < arr.length - 1 && (
                  <span className="h-px w-8 bg-gradient-to-r from-dark-500 to-dark-700" />
                )}
              </span>
            ))}
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.75 }}
            className="mt-10"
          >
            <TrustBadges />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into the page */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-dark-950 to-transparent"
        aria-hidden="true"
      />
    </section>
  );
}
