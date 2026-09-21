import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageLayout from '../components/layouts/PageLayout';
import { tools, categories } from '../data/tools';
import ToolCard from '../components/ToolCard';
import { SearchIcon, ArrowRightIcon, GridIcon } from '../components/Icons';

type SortOption = 'rating' | 'name' | 'reviews';
type PricingFilter = '' | 'Free' | 'Freemium' | 'Paid' | 'Enterprise';

const popularSearches = [
  'ChatGPT', 'Claude', 'Midjourney', 'Cursor', 'Grammarly',
  'Writing', 'Coding', 'Image', 'Video', 'Productivity',
];

const selectClass =
  'field rounded-xl px-3.5 py-2.5 text-[13px] font-medium text-white cursor-pointer hover:border-white/[0.14]';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [pricingFilter, setPricingFilter] = useState<PricingFilter>('');
  const [sort, setSort] = useState<SortOption>('rating');

  const filtered = useMemo(() => {
    let result = [...tools];

    // Text search
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (categoryFilter) {
      result = result.filter(t => t.categorySlug === categoryFilter);
    }

    // Pricing filter
    if (pricingFilter) {
      result = result.filter(t => t.pricing === pricingFilter);
    }

    // Sort
    if (sort === 'rating') result.sort((a, b) => b.rating - a.rating);
    if (sort === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'reviews') {
      const parseReviews = (r: string) => parseFloat(r.replace('K', '')) * 1000;
      result.sort((a, b) => parseReviews(b.reviews) - parseReviews(a.reviews));
    }

    return result;
  }, [query, categoryFilter, pricingFilter, sort]);

  const hasFilters = query || categoryFilter || pricingFilter;

  return (
    <>
      <SEO
        title="Search AI Tools — Find the Perfect AI Solution"
        description="Search and filter the full AI tool directory by category, pricing, and rating. Find the perfect AI tool for writing, coding, design, marketing, and more."
        canonical="/search"
      />

      <PageLayout>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <p className="eyebrow mb-4 justify-center">Search the directory</p>
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">
            Find the right tool
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-dark-300">
            Search the full catalog and narrow by category, pricing, and rating.
          </p>
        </motion.div>

        {/* Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 space-y-5"
        >
          {/* Search Input */}
          <div className="relative mx-auto max-w-3xl">
            <SearchIcon
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-dark-400"
              size={19}
            />
            <label htmlFor="search-page-input" className="sr-only">
              Search tools by name, category, or description
            </label>
            <input
              id="search-page-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools by name, category, or description…"
              className="field w-full rounded-2xl py-4 pl-13 pr-4 text-[15px]"
            />
          </div>

          {/* Popular Searches */}
          {!hasFilters && (
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="mr-1 font-mono text-[11px] uppercase tracking-wider text-dark-400">
                Popular
              </span>
              {popularSearches.map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="chip normal-case tracking-normal"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <label className="sr-only" htmlFor="filter-category">Category</label>
            <select
              id="filter-category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={selectClass}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>

            <label className="sr-only" htmlFor="filter-pricing">Pricing</label>
            <select
              id="filter-pricing"
              value={pricingFilter}
              onChange={(e) => setPricingFilter(e.target.value as PricingFilter)}
              className={selectClass}
            >
              <option value="">All Pricing</option>
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
              <option value="Enterprise">Enterprise</option>
            </select>

            <label className="sr-only" htmlFor="filter-sort">Sort</label>
            <select
              id="filter-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className={selectClass}
            >
              <option value="rating">Sort: Highest Rated</option>
              <option value="name">Sort: A-Z</option>
              <option value="reviews">Sort: Most Reviewed</option>
            </select>

            {hasFilters && (
              <button
                onClick={() => { setQuery(''); setCategoryFilter(''); setPricingFilter(''); }}
                className="rounded-lg px-3 py-2 text-[13px] font-semibold text-brand-300 transition-colors hover:text-brand-200"
              >
                Clear all
              </button>
            )}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.18em] text-dark-400" role="status">
            {filtered.length} tool{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {filtered.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="py-24 text-center"
          >
            <div className="card-surface mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl">
              <GridIcon size={32} className="text-dark-400" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">No tools found</h2>
            <p className="mx-auto mb-6 max-w-md text-[14px] leading-relaxed text-dark-300">
              Try adjusting your search or filters. Here are some popular tools you might like:
            </p>
            <div className="mb-8 flex flex-wrap justify-center gap-2">
              {['ChatGPT', 'Claude', 'Midjourney', 'Cursor'].map(s => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); setCategoryFilter(''); setPricingFilter(''); }}
                  className="chip normal-case tracking-normal !border-brand-500/25 !bg-brand-500/[0.08] !text-brand-300"
                >
                  {s}
                </button>
              ))}
            </div>
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-brand-300 transition-colors hover:text-brand-200"
            >
              Browse all categories
              <ArrowRightIcon size={15} />
            </Link>
          </motion.div>
        )}
      </PageLayout>
    </>
  );
}
