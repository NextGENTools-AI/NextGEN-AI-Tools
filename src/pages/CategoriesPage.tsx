import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import { categories } from '../data/tools';
import {
  PenIcon, BotIcon, CodeIcon, ImageIcon, VideoIcon,
  ChartIcon, ZapIcon, BrainIcon, BriefcaseIcon, SearchIcon,
  ArrowRightIcon
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function CategoriesPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/categories' },
  ]);

  return (
    <>
      <SEO
        title="AI Tools Categories — Browse All 10 Categories"
        description="Explore AI tools by category. Browse AI Writing, Chatbots, Coding, Image Generation, Video, Marketing, Productivity, Education, Business, and Research tools."
        canonical="/categories"
        keywords="AI tool categories, AI writing tools, AI chatbots, AI coding tools, AI image generators, AI video tools"
        structuredData={breadcrumbSchema}
      />
      <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            Browse by Category
          </h1>
          <p className="text-base sm:text-lg text-dark-200 max-w-2xl mx-auto">
            Explore our comprehensive collection of AI tools organized into categories to help you find exactly what you need.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || BrainIcon;
            return (
              <motion.div key={category.slug} variants={cardVariants}>
                <Link
                  to={`/category/${category.slug}`}
                  className="group card-hover block h-full rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6 hover:bg-surface-2/60"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${category.bgColor} border ${category.borderColor} flex items-center justify-center shrink-0`}>
                      <Icon size={24} className={category.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-semibold text-white mb-1 group-hover:text-brand-400 transition-colors">
                        {category.name}
                      </h2>
                      <p className="text-[13px] text-dark-300 leading-relaxed line-clamp-2 mb-3">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[12px] font-medium text-dark-400">
                          {category.toolCount} tools
                        </span>
                        <span className="flex items-center gap-1 text-[12px] font-medium text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          Explore
                          <ArrowRightIcon size={14} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
    </>
  );
}
