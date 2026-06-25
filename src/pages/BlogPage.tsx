import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import { getAllArticles } from '../data/articles';
import { ArrowRightIcon } from '../components/Icons';

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
    transition: { duration: 0.5 },
  },
};

export default function BlogPage() {
  const articles = getAllArticles();
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  return (
    <>
      <SEO
        title="Blog — AI Tools Guides & Insights"
        description="Expert guides, comparisons, and insights on AI tools. Learn how to leverage artificial intelligence for productivity, creativity, and business growth."
        canonical="/blog"
        keywords="AI blog, AI tools guide, AI tutorials, artificial intelligence tips, AI productivity"
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
              AI Tools Blog
            </h1>
            <p className="text-base sm:text-lg text-dark-200 max-w-2xl mx-auto">
              Expert guides, in-depth comparisons, and actionable insights to help you make the most of AI tools.
            </p>
          </motion.div>

          {/* Featured Article */}
          {featuredArticle && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-16"
            >
              <Link
                to={`/blog/${featuredArticle.slug}`}
                className="group block rounded-2xl border border-white/[0.06] bg-surface-2/40 overflow-hidden card-hover"
              >
                <div className="p-8 sm:p-10 lg:p-12">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                      Featured
                    </span>
                    <span className="text-[13px] text-dark-400">{featuredArticle.category}</span>
                    <span className="text-dark-500">·</span>
                    <span className="text-[13px] text-dark-400">{featuredArticle.readTime}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-brand-400 transition-colors">
                    {featuredArticle.title}
                  </h2>
                  <p className="text-[15px] text-dark-200 leading-relaxed mb-6 max-w-3xl">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500/20 to-cyan-500/20 flex items-center justify-center text-[14px] font-semibold text-white border border-white/[0.06]">
                        {featuredArticle.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-white">{featuredArticle.author}</div>
                        <div className="text-[12px] text-dark-400">
                          {new Date(featuredArticle.publishedAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                    <span className="hidden sm:flex items-center gap-1.5 text-[13px] font-medium text-brand-400 group-hover:gap-2 transition-all">
                      Read article
                      <ArrowRightIcon size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Articles Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {otherArticles.map((article) => (
              <motion.div key={article.id} variants={cardVariants}>
                <Link
                  to={`/blog/${article.slug}`}
                  className="group block h-full rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6 card-hover"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[12px] font-medium text-brand-400">{article.category}</span>
                    <span className="text-dark-500">·</span>
                    <span className="text-[12px] text-dark-400">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-brand-400 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-[13px] text-dark-300 leading-relaxed mb-4 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-2 pt-4 border-t border-white/[0.04]">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500/20 to-cyan-500/20 flex items-center justify-center text-[11px] font-semibold text-white border border-white/[0.06]">
                      {article.author.charAt(0)}
                    </div>
                    <span className="text-[12px] text-dark-400">{article.author}</span>
                    <span className="text-dark-500">·</span>
                    <span className="text-[12px] text-dark-400">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}
