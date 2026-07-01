import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLinkIcon, ArrowRightIcon } from './Icons';
import { getFeaturedTools, type Tool } from '../data/tools';
import { ToolLogo } from './ToolLogos';

const tools = getFeaturedTools();

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <motion.div variants={cardVariants} className="group">
      <Link
        to={`/tool/${tool.slug}`}
        className="card-hover h-full rounded-3xl border border-white/[0.06] bg-surface-2/60 backdrop-blur-md p-6 flex flex-col block hover:-translate-y-1 hover:border-brand-500/20 transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-14 h-14 rounded-xl bg-dark-800 flex items-center justify-center shrink-0 border border-white/[0.06] overflow-hidden">
            <ToolLogo toolId={tool.id} size={34} fallbackLetter={tool.logo} fallbackGradient={tool.gradient} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-semibold text-white truncate group-hover:text-brand-400 transition-colors duration-300">{tool.name}</h3>
              <ExternalLinkIcon size={13} className="text-dark-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </div>
            <span className="text-[12px] font-medium text-brand-400">{tool.category}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-dark-200 leading-relaxed mb-4 line-clamp-2 flex-1">
          {tool.tagline}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
          <span className="text-[12px] text-dark-400">Pricing and category listed</span>
          <span className={`text-[11px] font-semibold px-3 py-1.5 rounded-md uppercase tracking-wide ${
            tool.pricing === 'Freemium'
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
              : tool.pricing === 'Free'
              ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
              : tool.pricing === 'Paid'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
          }`}>
            {tool.pricing}
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedTools() {
  return (
    <section id="featured" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Tools
            </h2>
            <p className="mt-2 text-base text-dark-200 max-w-2xl">
              A sample of tools from our directory, organized by category and pricing.
            </p>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-400 hover:text-brand-300 transition-colors shrink-0 group"
          >
            View all tools
            <ArrowRightIcon size={15} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
