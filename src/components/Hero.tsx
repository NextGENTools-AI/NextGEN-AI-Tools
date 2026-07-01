import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparkleIcon } from './Icons';
import TrustBadges from './TrustBadges';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden noise-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large gradient orbs */}
        <div
          className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] rounded-full opacity-[0.07]"
          style={{
            background: 'radial-gradient(circle, #6d5cff 0%, transparent 70%)',
            animation: 'float 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite 2s',
          }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial fade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, #04060b 100%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-brand-500/20 bg-brand-500/[0.08] backdrop-blur-md shadow-lg mb-8"
          >
            <SparkleIcon size={16} className="text-brand-400" />
            <span className="text-[12px] font-medium tracking-wide text-brand-300 uppercase">
              Curated AI Tool Directory
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.02] mb-8"
          >
            <span className="text-white">Discover the</span>
            <br />
            <span className="gradient-text">Next Generation</span>
            <br />
            <span className="text-white">of AI Tools</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-lg sm:text-xl md:text-2xl text-dark-200 max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          >
            A curated directory of AI tools for writing, coding, image generation, video, and more.
            Browse by category and compare options without the usual hype.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/search"
              className="btn-primary group flex items-center gap-2.5 px-8 py-4 rounded-xl text-[15px] font-semibold text-white w-full sm:w-auto justify-center shadow-xl hover:shadow-2xl"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Browse All Tools
                <ArrowRightIcon size={18} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
            <Link
              to="/categories"
              className="flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-medium text-dark-100 hover:text-white border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.04] transition-all duration-200 w-full sm:w-auto justify-center"
            >
              View Categories
            </Link>
          </motion.div>

          {/* Trust badges row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-16"
          >
            <TrustBadges />
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-dark-950 to-transparent" />
    </section>
  );
}
