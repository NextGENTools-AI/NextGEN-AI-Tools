import { useState } from 'react';
import { motion } from 'framer-motion';
import { MailIcon, ShieldIcon, CheckIcon } from './Icons';
import { Reveal } from './ui';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section id="newsletter" className="relative overflow-hidden py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="relative mx-auto max-w-3xl">
          <div className="card-surface relative overflow-hidden rounded-3xl p-8 sm:p-12">
            {/* Top glow */}
            <div
              className="pointer-events-none absolute left-1/2 top-0 h-[220px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12]"
              style={{ background: 'radial-gradient(closest-side, #2e86ff 0%, transparent 100%)' }}
              aria-hidden="true"
            />

            <div className="relative text-center">
              <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-brand-500/25 bg-brand-500/10">
                <MailIcon size={22} className="text-brand-300" />
              </div>

              <h2 className="mb-3 text-2xl font-bold tracking-[-0.02em] text-white sm:text-3xl">
                Stay ahead of the AI curve
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-dark-200">
                Occasional updates about new tool listings, directory changes, and useful AI
                resources. No noise.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mx-auto mt-8 inline-flex items-center gap-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-5 py-3"
                  role="status"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                    <CheckIcon size={13} className="text-emerald-400" />
                  </span>
                  <span className="text-[14px] font-medium text-emerald-300">
                    You're on the list. We'll share occasional updates.
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="field min-w-0 flex-1 px-4 py-3.5 text-[14px]"
                  />
                  <button
                    type="submit"
                    className="btn-primary shrink-0 rounded-xl px-6 py-3.5 text-[14px] font-semibold text-white"
                  >
                    <span>Subscribe</span>
                  </button>
                </form>
              )}

              <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-dark-400">
                <ShieldIcon size={13} />
                <span>No spam, unsubscribe anytime. We respect your privacy.</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
