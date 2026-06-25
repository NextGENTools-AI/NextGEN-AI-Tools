import { useState } from 'react';
import { motion } from 'framer-motion';
import { MailIcon, ShieldIcon } from './Icons';

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
    <section id="newsletter" className="relative py-20 sm:py-28">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl mx-auto"
        >
          {/* Card */}
          <div className="relative rounded-2xl border border-white/[0.06] bg-surface-2/40 p-8 sm:p-12 overflow-hidden">
            {/* Background glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full opacity-[0.06]"
              style={{ background: 'radial-gradient(circle, #6d5cff 0%, transparent 70%)' }}
            />

            <div className="relative text-center">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 mb-6">
                <MailIcon size={22} className="text-brand-400" />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-3">
                Stay ahead of the AI curve
              </h2>
              <p className="text-[14px] sm:text-[15px] text-dark-200 mb-8 max-w-md mx-auto leading-relaxed">
                Get weekly curated picks of the best new AI tools, industry insights, and exclusive reviews delivered to your inbox.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 py-4"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <span className="text-[14px] font-medium text-emerald-400">
                    You're subscribed. Welcome aboard!
                  </span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-dark-800/70 border border-white/[0.06] rounded-xl px-4 py-3.5 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all"
                  />
                  <button
                    type="submit"
                    className="btn-primary px-6 py-3.5 rounded-xl text-[14px] font-semibold text-white shrink-0"
                  >
                    <span className="relative z-10">Subscribe</span>
                  </button>
                </form>
              )}

              {/* Privacy note */}
              <div className="mt-5 flex items-center justify-center gap-1.5 text-[11px] text-dark-400">
                <ShieldIcon size={13} className="text-dark-400" />
                <span>No spam, unsubscribe anytime. We respect your privacy.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
