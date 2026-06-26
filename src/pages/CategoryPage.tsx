import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema, generateToolListSchema } from '../components/SEO';
import { getCategoryBySlug, getToolsByCategory } from '../data/tools';
import { ToolLogo } from '../components/ToolLogos';
import {
  PenIcon, BotIcon, CodeIcon, ImageIcon, VideoIcon,
  ChartIcon, ZapIcon, BrainIcon, BriefcaseIcon, SearchIcon,
  ChevronLeftIcon, StarIcon, ExternalLinkIcon, ArrowRightIcon
} from '../components/Icons';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  pen: PenIcon,
  bot: BotIcon,
  code: CodeIcon,
  image: ImageIcon,
  video: VideoIcon,
  chart: ChartIcon,
  zap: ZapIcon,
  brain: BrainIcon,
  briefcase: BriefcaseIcon,
  search: SearchIcon,
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || '');
  const tools = getToolsByCategory(slug || '');

  if (!category) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Category Not Found</h1>
          <Link to="/categories" className="text-brand-400 hover:text-brand-300">
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[category.icon] || BrainIcon;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/categories' },
    { name: category.name, url: `/category/${category.slug}` },
  ]);

  const toolListSchema = generateToolListSchema(
    `Best ${category.name} Tools`,
    tools.map((tool, index) => ({
      name: tool.name,
      url: `https://nextgenai.tools/tool/${tool.slug}`,
      position: index + 1,
    }))
  );

  return (
    <>
      <SEO
        title={`${category.name} Tools — Best AI Tools for ${category.name.replace('AI ', '')}`}
        description={`Discover the best ${category.name.toLowerCase()} tools. ${category.description} Compare ${tools.length} top-rated tools with reviews and pricing.`}
        canonical={`/category/${category.slug}`}
        keywords={`${category.name}, ${category.name.toLowerCase()} tools, best ${category.name.toLowerCase()}, AI tools`}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [breadcrumbSchema, toolListSchema],
        }}
      />
      <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            to="/categories"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-dark-300 hover:text-white transition-colors"
          >
            <ChevronLeftIcon size={16} />
            All Categories
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-start gap-5 mb-4">
            <div className={`w-14 h-14 rounded-xl ${category.bgColor} border ${category.borderColor} flex items-center justify-center shrink-0`}>
              <Icon size={28} className={category.color} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                {category.name}
              </h1>
              <p className="mt-2 text-[15px] text-dark-200 max-w-2xl">
                {category.description}
              </p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-[13px] font-medium text-dark-300">
              {tools.length} tools available
            </span>
          </div>
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {tools.map((tool) => (
            <motion.div key={tool.id} variants={cardVariants}>
              <Link
                to={`/tool/${tool.slug}`}
                className="group card-hover block h-full rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5"
              >
                {/* Header */}
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center shrink-0 border border-white/[0.06] overflow-hidden">
                    <ToolLogo toolId={tool.id} size={30} fallbackLetter={tool.logo} fallbackGradient={tool.gradient} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-semibold text-white truncate group-hover:text-brand-400 transition-colors">
                        {tool.name}
                      </h3>
                      <ExternalLinkIcon size={13} className="text-dark-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                    <span className="text-[12px] font-medium text-dark-400">{tool.tagline}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[13px] text-dark-200 leading-relaxed mb-4 line-clamp-2">
                  {tool.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                  <span className="text-[12px] text-dark-400">See details</span>
                  <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide ${
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
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-dark-300 mb-4">
            Can't find what you're looking for?
          </p>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-brand-400 hover:text-brand-300 transition-colors"
          >
            Browse all categories
            <ArrowRightIcon size={16} />
          </Link>
        </motion.div>
      </div>
    </div>
    </>
  );
}
