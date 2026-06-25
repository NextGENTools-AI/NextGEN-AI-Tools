import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BrainIcon, ImageIcon, CodeIcon, PenIcon, VideoIcon,
  ChartIcon, BotIcon, ZapIcon, BriefcaseIcon, SearchIcon,
  ChevronRightIcon, ArrowRightIcon
} from './Icons';
import { categories as dataCategories } from '../data/tools';

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

// Show first 8 categories on homepage
const categories = dataCategories.slice(0, 8);

export default function Categories() {
  return (
    <section id="categories" className="relative py-20 sm:py-28">
      {/* Subtle section divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Browse by Category
          </h2>
          <p className="mt-3 text-[15px] text-dark-200 max-w-lg mx-auto">
            Explore AI tools organized into categories to find exactly what you need.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] || BrainIcon;
            return (
              <motion.div key={cat.slug} variants={cardVariants}>
                <Link
                  to={`/category/${cat.slug}`}
                  className="group card-hover flex items-center gap-4 p-4 rounded-xl border border-white/[0.06] bg-surface-2/30 hover:bg-surface-2/60"
                >
                  <div className={`w-10 h-10 rounded-lg ${cat.bgColor} border ${cat.borderColor} flex items-center justify-center shrink-0`}>
                    <Icon size={20} className={cat.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-semibold text-white truncate">{cat.name}</h3>
                    <span className="text-[12px] text-dark-300">{cat.toolCount} tools</span>
                  </div>
                  <ChevronRightIcon size={16} className="text-dark-400 group-hover:text-dark-200 transition-colors shrink-0" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            View all categories
            <ArrowRightIcon size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
