import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import { getAllArticles } from '../data/articles';
import { ArrowRightIcon } from '../components/Icons';

type Article = ReturnType<typeof getAllArticles>[number];

const ARTICLES_PER_PAGE = 9;

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

function SearchIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21L16.65 16.65" />
    </svg>
  );
}

function CalendarIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2V6" />
      <path d="M8 2V6" />
      <path d="M3 10H21" />
    </svg>
  );
}

function SparkleIcon({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 2L14.8 8.2L21 11L14.8 13.8L12 20L9.2 13.8L3 11L9.2 8.2L12 2Z" />
      <path d="M19 3V7" />
      <path d="M21 5H17" />
      <path d="M5 17V21" />
      <path d="M7 19H3" />
    </svg>
  );
}

function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  return new Date(date).toLocaleDateString(
    'en-US',
    options || {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }
  );
}

function getArticleDateValue(article: Article) {
  return new Date(article.publishedAt).getTime();
}

function ArticleAuthor({
  article,
  compact = false,
}: {
  article: Article;
  compact?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`rounded-full bg-gradient-to-br from-brand-500/25 to-cyan-500/20 flex items-center justify-center font-semibold text-white border border-white/[0.08] ${
          compact ? 'w-7 h-7 text-[11px]' : 'w-10 h-10 text-[14px]'
        }`}
      >
        {article.author.charAt(0)}
      </div>

      <div className="min-w-0">
        <div
          className={`font-medium text-white truncate ${
            compact ? 'text-[12px]' : 'text-[13px]'
          }`}
        >
          {article.author}
        </div>

        <div
          className={`text-dark-400 flex items-center gap-1 ${
            compact ? 'text-[11px]' : 'text-[12px]'
          }`}
        >
          <CalendarIcon size={compact ? 11 : 12} />
          {formatDate(
            article.publishedAt,
            compact
              ? {
                  month: 'short',
                  day: 'numeric',
                }
              : undefined
          )}
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group block h-full rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6 transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:bg-white/[0.04]"
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-500/10 px-2.5 py-1 text-[11px] font-semibold text-brand-400 border border-brand-500/20">
          {article.category}
        </span>

        <span className="text-dark-500">·</span>

        <span className="text-[12px] text-dark-400">
          {article.readTime}
        </span>
      </div>

      <h3 className="mb-3 line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-brand-400">
        {article.title}
      </h3>

      <p className="mb-5 line-clamp-3 text-[13px] leading-relaxed text-dark-300">
        {article.excerpt}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/[0.04] pt-4">
        <ArticleAuthor article={article} compact />

        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-400 opacity-90 transition-all group-hover:gap-1.5">
          Read
          <ArrowRightIcon size={12} />
        </span>
      </div>
    </Link>
  );
}

function SidebarPost({
  article,
  index,
  label,
}: {
  article: Article;
  index: number;
  label?: string;
}) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className="group flex gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 transition-all hover:border-brand-500/25 hover:bg-white/[0.04]"
    >
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-[12px] font-bold text-brand-400">
        {index + 1}
      </div>

      <div className="min-w-0">
        {label && (
          <div className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-dark-400">
            {label}
          </div>
        )}

        <h4 className="line-clamp-2 text-[13px] font-semibold text-white transition-colors group-hover:text-brand-400">
          {article.title}
        </h4>

        <div className="mt-1 flex items-center gap-2 text-[11px] text-dark-400">
          <span>{article.category}</span>
          <span>·</span>
          <span>{article.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const articles = getAllArticles();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedArticles = useMemo(() => {
    return [...articles].sort((a, b) => getArticleDateValue(b) - getArticleDateValue(a));
  }, [articles]);

  const featuredArticle = sortedArticles[0];

  const categories = useMemo(() => {
    const categoryList = Array.from(new Set(articles.map((article) => article.category)));

    return [
      {
        name: 'All',
        count: articles.length,
      },
      ...categoryList.map((category) => ({
        name: category,
        count: articles.filter((article) => article.category === category).length,
      })),
    ];
  }, [articles]);

  const filteredArticles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return sortedArticles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [sortedArticles, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE));

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const trendingPosts = useMemo(() => {
    return [...articles]
      .sort((a, b) => {
        const aScore = a.title.length + a.excerpt.length + getArticleDateValue(a) / 100000000000;
        const bScore = b.title.length + b.excerpt.length + getArticleDateValue(b) / 100000000000;

        return bScore - aScore;
      })
      .slice(0, 5);
  }, [articles]);

  const recentlyPublished = sortedArticles.slice(0, 5);

  const relatedPosts = useMemo(() => {
    if (!featuredArticle) {
      return [];
    }

    const sameCategory = sortedArticles.filter(
      (article) =>
        article.id !== featuredArticle.id &&
        article.category === featuredArticle.category
    );

    const fallback = sortedArticles.filter((article) => article.id !== featuredArticle.id);

    return [...sameCategory, ...fallback]
      .filter((article, index, array) => array.findIndex((item) => item.id === article.id) === index)
      .slice(0, 3);
  }, [featuredArticle, sortedArticles]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'AI Tools Blog',
    description:
      'Research-based guides, comparisons, and insights on AI tools for productivity, creativity, and business workflows.',
    url: 'https://nextgenai.tools/blog',
    blogPost: sortedArticles.slice(0, 10).map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      datePublished: article.publishedAt,
      author: {
        '@type': 'Person',
        name: article.author,
      },
      url: `https://nextgenai.tools/blog/${article.slug}`,
    })),
  };

  return (
    <>
      <SEO
        title="Blog — AI Tools Guides, Reviews & Insights"
        description="Premium AI blog with research-based guides, tool comparisons, workflow tutorials, and practical insights to help you choose and use the best AI tools."
        canonical="/blog"
        keywords="AI blog, AI tools guide, AI tutorials, artificial intelligence tips, AI productivity, AI tool reviews, AI software comparisons"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [breadcrumbSchema, blogSchema],
        }}
      />

      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Premium Hero */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="relative mb-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.20),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-8 md:p-10"
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
            <div className="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.8fr] lg:items-center">
              <div>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/25 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-400">
                    <SparkleIcon size={13} />
                    AI Insights
                  </span>

                  <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-dark-300">
                    Guides
                  </span>

                  <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-dark-300">
                    Reviews
                  </span>

                  <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-dark-300">
                    Comparisons
                  </span>
                </div>

                <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  AI Tools Blog
                </h1>

                <p className="mt-5 max-w-3xl text-base leading-relaxed text-dark-200 sm:text-lg">
                  Research-based guides, comparisons, tutorials, and practical
                  insights to help you evaluate AI tools with more context and
                  build better workflows.
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href="#articles"
                    className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold text-white"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Browse Articles
                      <ArrowRightIcon size={16} />
                    </span>
                  </a>

                  <a
                    href="#newsletter"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-[14px] font-semibold text-dark-100 transition-colors hover:border-white/[0.16] hover:bg-white/[0.06]"
                  >
                    Join Newsletter
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.08] bg-dark-900/40 p-5 backdrop-blur">
                <div className="mb-4 text-[12px] font-semibold uppercase tracking-wide text-dark-300">
                  Blog Stats
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="text-2xl font-bold text-white">
                      {articles.length}
                    </div>
                    <div className="mt-1 text-[12px] text-dark-400">
                      Articles
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="text-2xl font-bold text-white">
                      {categories.length - 1}
                    </div>
                    <div className="mt-1 text-[12px] text-dark-400">
                      Categories
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="text-2xl font-bold text-white">
                      Weekly
                    </div>
                    <div className="mt-1 text-[12px] text-dark-400">
                      Updates
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                    <div className="text-2xl font-bold text-white">
                      2026
                    </div>
                    <div className="mt-1 text-[12px] text-dark-400">
                      Fresh guides
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Search + Categories */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="mb-12"
          >
            <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5">
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                <div className="relative">
                  <SearchIcon
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400"
                  />

                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search AI guides, reviews, comparisons..."
                    className="w-full rounded-xl border border-white/[0.06] bg-dark-900/50 py-3 pl-11 pr-4 text-[14px] text-white placeholder-dark-400 outline-none transition-colors focus:border-brand-500/40"
                  />
                </div>

                <div className="flex flex-wrap gap-2 lg:justify-end">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => setSelectedCategory(category.name)}
                      className={`rounded-xl border px-3 py-2 text-[12px] font-semibold transition-all ${
                        selectedCategory === category.name
                          ? 'border-brand-500/30 bg-brand-500/15 text-brand-400'
                          : 'border-white/[0.06] bg-white/[0.02] text-dark-300 hover:border-white/[0.14] hover:text-white'
                      }`}
                    >
                      {category.name}
                      <span className="ml-1 text-dark-500">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Featured Article */}
          {featuredArticle && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mb-14"
            >
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
                    Featured Article
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    Editor&apos;s Pick
                  </h2>
                </div>

                <Link
                  to={`/blog/${featuredArticle.slug}`}
                  className="hidden items-center gap-1.5 text-[13px] font-semibold text-brand-400 hover:text-brand-300 sm:inline-flex"
                >
                  Read featured
                  <ArrowRightIcon size={14} />
                </Link>
              </div>

              <Link
                to={`/blog/${featuredArticle.slug}`}
                className="group relative block overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.055),rgba(255,255,255,0.02))] transition-all hover:-translate-y-1 hover:border-brand-500/30"
              >
                <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.2fr_0.8fr]">
                  <div className="p-7 sm:p-9 lg:p-10">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                      <span className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-400">
                        Featured
                      </span>

                      <span className="text-[13px] text-dark-400">
                        {featuredArticle.category}
                      </span>

                      <span className="text-dark-500">·</span>

                      <span className="text-[13px] text-dark-400">
                        {featuredArticle.readTime}
                      </span>
                    </div>

                    <h2 className="mb-4 max-w-3xl text-2xl font-bold text-white transition-colors group-hover:text-brand-400 sm:text-3xl">
                      {featuredArticle.title}
                    </h2>

                    <p className="mb-7 max-w-3xl text-[15px] leading-relaxed text-dark-200">
                      {featuredArticle.excerpt}
                    </p>

                    <div className="flex items-center justify-between gap-4">
                      <ArticleAuthor article={featuredArticle} />

                      <span className="hidden items-center gap-1.5 text-[13px] font-semibold text-brand-400 transition-all group-hover:gap-2 sm:flex">
                        Read article
                        <ArrowRightIcon size={14} />
                      </span>
                    </div>
                  </div>

                  <div className="relative min-h-[260px] border-t border-white/[0.06] bg-dark-900/30 p-7 lg:border-l lg:border-t-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.12),transparent_40%)]" />

                    <div className="relative flex h-full flex-col justify-between">
                      <div>
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.04] text-brand-400">
                          <SparkleIcon size={22} />
                        </div>

                        <h3 className="text-lg font-semibold text-white">
                          Why read this?
                        </h3>

                        <p className="mt-2 text-[13px] leading-relaxed text-dark-300">
                          Get a practical breakdown, decision criteria, and
                          examples you can use when comparing AI tools.
                        </p>
                      </div>

                      <div className="mt-8 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                          <div className="text-xl font-bold text-white">
                            Guide
                          </div>
                          <div className="mt-1 text-[12px] text-dark-400">
                            Article type
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                          <div className="text-xl font-bold text-white">
                            {featuredArticle.readTime}
                          </div>
                          <div className="mt-1 text-[12px] text-dark-400">
                            Reading time
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.section>
          )}

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
            <main>
              {/* Articles */}
              <section id="articles" className="scroll-mt-28">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
                      Latest Insights
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-white">
                      Browse Articles
                    </h2>

                    <p className="mt-2 text-[14px] text-dark-300">
                      Showing {paginatedArticles.length} of {filteredArticles.length}{' '}
                      articles
                      {selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}
                      {searchQuery ? ` matching “${searchQuery}”` : ''}.
                    </p>
                  </div>

                  {(searchQuery || selectedCategory !== 'All') && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="self-start rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-dark-200 transition-colors hover:border-white/[0.16] hover:text-white sm:self-auto"
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                {paginatedArticles.length > 0 ? (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 gap-6 md:grid-cols-2"
                  >
                    {paginatedArticles.map((article) => (
                      <motion.div key={article.id} variants={cardVariants}>
                        <ArticleCard article={article} />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-8 text-center">
                    <h3 className="text-lg font-semibold text-white">
                      No articles found
                    </h3>

                    <p className="mt-2 text-[14px] text-dark-300">
                      Try a different keyword or select another category.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                      }}
                      className="mt-5 rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-[13px] font-semibold text-brand-400"
                    >
                      Reset search
                    </button>
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-surface-2/40 p-4 sm:flex-row">
                    <p className="text-[13px] text-dark-400">
                      Page{' '}
                      <span className="font-semibold text-white">
                        {currentPage}
                      </span>{' '}
                      of{' '}
                      <span className="font-semibold text-white">
                        {totalPages}
                      </span>
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2">
                      <button
                        type="button"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-dark-200 transition-colors hover:border-white/[0.16] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Previous
                      </button>

                      {Array.from({ length: totalPages }).map((_, index) => {
                        const pageNumber = index + 1;

                        return (
                          <button
                            key={pageNumber}
                            type="button"
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`h-9 w-9 rounded-xl border text-[13px] font-semibold transition-colors ${
                              currentPage === pageNumber
                                ? 'border-brand-500/30 bg-brand-500/15 text-brand-400'
                                : 'border-white/[0.08] bg-white/[0.03] text-dark-300 hover:border-white/[0.16] hover:text-white'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      })}

                      <button
                        type="button"
                        disabled={currentPage === totalPages}
                        onClick={() =>
                          setCurrentPage((page) => Math.min(totalPages, page + 1))
                        }
                        className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-dark-200 transition-colors hover:border-white/[0.16] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </section>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <section className="mt-14">
                  <div className="mb-6">
                    <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
                      Related Posts
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight text-white">
                      More posts you may like
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {relatedPosts.map((article) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                  </div>
                </section>
              )}
            </main>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              {/* Trending Posts */}
              <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-brand-400">
                      Trending
                    </div>

                    <h2 className="text-lg font-semibold text-white">
                      Trending Posts
                    </h2>
                  </div>

                  <SparkleIcon size={18} className="text-brand-400" />
                </div>

                <div className="space-y-3">
                  {trendingPosts.map((article, index) => (
                    <SidebarPost
                      key={article.id}
                      article={article}
                      index={index}
                    />
                  ))}
                </div>
              </div>

              {/* Recently Published */}
              <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5">
                <div className="mb-4">
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-brand-400">
                    Fresh
                  </div>

                  <h2 className="text-lg font-semibold text-white">
                    Recently Published
                  </h2>
                </div>

                <div className="space-y-3">
                  {recentlyPublished.map((article, index) => (
                    <SidebarPost
                      key={article.id}
                      article={article}
                      index={index}
                      label={formatDate(article.publishedAt, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    />
                  ))}
                </div>
              </div>

              {/* Categories */}
              <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5">
                <div className="mb-4">
                  <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-brand-400">
                    Topics
                  </div>

                  <h2 className="text-lg font-semibold text-white">
                    Categories
                  </h2>
                </div>

                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => setSelectedCategory(category.name)}
                      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left transition-colors ${
                        selectedCategory === category.name
                          ? 'border-brand-500/30 bg-brand-500/10'
                          : 'border-white/[0.05] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]'
                      }`}
                    >
                      <span
                        className={`text-[13px] font-medium ${
                          selectedCategory === category.name
                            ? 'text-brand-400'
                            : 'text-dark-200'
                        }`}
                      >
                        {category.name}
                      </span>

                      <span className="rounded-lg bg-white/[0.04] px-2 py-0.5 text-[11px] text-dark-400">
                        {category.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div
                id="newsletter"
                className="scroll-mt-28 overflow-hidden rounded-2xl border border-brand-500/20 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_35%),rgba(99,102,241,0.06)] p-5"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-400">
                  <SparkleIcon size={18} />
                </div>

                <h2 className="text-lg font-semibold text-white">
                  Join the AI tools newsletter
                </h2>

                <p className="mt-2 text-[13px] leading-relaxed text-dark-300">
                  Get weekly AI tool picks, practical workflow ideas, and new
                  guide alerts.
                </p>

                <form
                  onSubmit={(event) => event.preventDefault()}
                  className="mt-4 space-y-3"
                >
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full rounded-xl border border-white/[0.08] bg-dark-900/50 px-4 py-3 text-[14px] text-white placeholder-dark-400 outline-none transition-colors focus:border-brand-500/40"
                  />

                  <button
                    type="submit"
                    className="btn-primary inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[14px] font-semibold text-white"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Subscribe
                      <ArrowRightIcon size={14} />
                    </span>
                  </button>
                </form>

                <p className="mt-3 text-[11px] text-dark-400">
                  Placeholder form. Connect this to your newsletter provider.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}