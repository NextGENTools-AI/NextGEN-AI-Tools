import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ZapIcon, UsersIcon, SparkleIcon } from './Icons';

const features = [
  {
    icon: ZapIcon,
    title: 'Regularly Updated',
    desc: 'New listings are added as the tool landscape changes.',
  },
  {
    icon: UsersIcon,
    title: 'Easy to Browse',
    desc: 'Compare tools by category, pricing, and use case.',
  },
  {
    icon: SparkleIcon,
    title: 'Organized by Use Case',
    desc: 'Find options for writing, coding, design, and more.',
  },
];

export default function CTA() {
  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #6d5cff 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Ready to find your next
            <br />
            <span className="gradient-text-brand">AI-powered tool?</span>
          </h2>
          <p className="mt-5 text-[15px] sm:text-base text-dark-200 max-w-xl mx-auto leading-relaxed">
            Explore a curated collection of AI tools and compare options by category, pricing, and use case.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/search"
              className="btn-primary group flex items-center gap-2.5 px-8 py-4 rounded-xl text-[15px] font-semibold text-white w-full sm:w-auto justify-center"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Start Exploring
                <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              to="/tool-finder"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-medium text-dark-100 hover:text-white border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-200 w-full sm:w-auto justify-center"
            >
              Find Your Perfect Tool
            </Link>
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.04] bg-surface-2/20"
              >
                <div className="w-9 h-9 rounded-lg bg-brand-500/8 border border-brand-500/15 flex items-center justify-center shrink-0">
                  <Icon size={17} className="text-brand-400" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-white">{f.title}</h3>
                  <p className="text-[11px] text-dark-300 leading-snug">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
