import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema, generateToolListSchema } from '../components/SEO';
import { getCategoryBySlug, getToolsByCategory } from '../data/tools';
import CategoryIcon from '../components/CategoryIcon';
import ToolCard from '../components/ToolCard';
import { ChevronLeftIcon, ArrowRightIcon } from '../components/Icons';

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
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || '');
  const tools = getToolsByCategory(slug || '');

  if (!category) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-24 pb-20">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-white">Category Not Found</h1>
          <Link to="/categories" className="text-brand-300 transition-colors hover:text-brand-200">
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

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
      <div className="relative min-h-screen pb-24 pt-28 sm:pt-32">
        {/* Ambient page light */}
        <div
          className="aurora left-1/2 top-[-260px] h-[360px] w-[680px] -translate-x-1/2 opacity-[0.07]"
          style={{ background: 'radial-gradient(closest-side, #2e86ff 0%, transparent 100%)' }}
          aria-hidden="true"
        />

        <main id="main-content" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-10"
          >
            <Link
              to="/categories"
              className="inline-flex items-center gap-1.5 rounded text-[13px] font-medium text-dark-300 transition-colors hover:text-white"
            >
              <ChevronLeftIcon size={15} />
              All Categories
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mb-14"
          >
            <div className="mb-5 flex items-start gap-5">
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${category.bgColor} ${category.borderColor}`}
              >
                <CategoryIcon icon={category.icon} size={27} className={category.color} />
              </div>
              <div>
                <p className="eyebrow mb-2">Category</p>
                <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-white sm:text-4xl">
                  {category.name}
                </h1>
                <p className="mt-2.5 max-w-2xl text-[15px] leading-relaxed text-dark-300">
                  {category.description}
                </p>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-2.5">
              <div className="card-surface flex items-center gap-2.5 rounded-xl px-4 py-2.5">
                <span className="text-[15px] font-bold text-white">{tools.length}</span>
                <span className="text-[12.5px] text-dark-300">tools</span>
              </div>

              <div className="card-surface flex items-center gap-2.5 rounded-xl px-4 py-2.5">
                <span className="text-[15px] font-bold text-white">Curated</span>
                <span className="text-[12.5px] text-dark-300">selection</span>
              </div>

              <div className="card-surface flex items-center gap-2.5 rounded-xl px-4 py-2.5">
                <span className="text-[15px] font-bold text-white">Pricing</span>
                <span className="text-[12.5px] text-dark-300">clearly listed</span>
              </div>
            </div>
          </motion.header>

          {/* Tools Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3"
          >
            {tools.map((tool) => (
              <motion.div key={tool.id} variants={cardVariants}>
                <ToolCard tool={tool} />
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
            <h2 className="mb-3 text-xl font-semibold tracking-tight text-white">
              Exploring something else?
            </h2>
            <p className="mb-6 text-[14.5px] text-dark-300">
              Every category in the directory is one click away.
            </p>
            <Link
              to="/categories"
              className="btn-primary group rounded-xl px-6 py-3 text-[14px] font-semibold text-white"
            >
              <span className="flex items-center gap-2">
                Browse all categories
                <ArrowRightIcon size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </Link>
          </motion.div>
        </main>
      </div>
    </>
  );
}
