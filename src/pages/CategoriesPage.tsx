import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import { categories } from '../data/tools';
import CategoryIcon from '../components/CategoryIcon';
import { ArrowRightIcon } from '../components/Icons';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
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
        title="AI Tools Categories — Browse All Categories"
        description="Explore AI tools by category. Browse AI Writing, Chatbots, Coding, Image Generation, Video, Marketing, Productivity, Education, Business, and Research tools."
        canonical="/categories"
        keywords="AI tool categories, AI writing tools, AI chatbots, AI coding tools, AI image generators, AI video tools"
        structuredData={breadcrumbSchema}
      />
      <div className="relative min-h-screen pb-24 pt-28 sm:pt-32">
        {/* Ambient page light */}
        <div
          className="aurora left-1/2 top-[-260px] h-[360px] w-[680px] -translate-x-1/2 opacity-[0.07]"
          style={{ background: 'radial-gradient(closest-side, #2e86ff 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        <main id="main-content" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-14 max-w-2xl text-center sm:mb-16"
          >
            <p className="eyebrow mb-4 justify-center">The directory</p>
            <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">
              Browse by category
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-dark-300">
              A curated map of the AI landscape — organized by discipline so you can go straight
              to what you need.
            </p>
          </motion.header>

          {/* Categories Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {categories.map((category) => (
              <motion.div key={category.slug} variants={cardVariants}>
                <Link
                  to={`/category/${category.slug}`}
                  className="card-surface card-hover group block h-full rounded-2xl p-6"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${category.bgColor} ${category.borderColor}`}
                    >
                      <CategoryIcon icon={category.icon} size={23} className={category.color} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="mb-1 text-[17px] font-semibold tracking-tight text-white transition-colors group-hover:text-brand-300">
                        {category.name}
                      </h2>
                      <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-dark-300">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dark-400">
                          {category.toolCount} tools
                        </span>
                        <span className="flex items-center gap-1.5 text-[12px] font-semibold text-brand-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:-translate-x-1">
                          Explore
                          <ArrowRightIcon size={13} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </>
  );
}
