import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import PageLayout from '../components/layouts/PageLayout';
import { tools, categories } from '../data/tools';
import { ToolLogo } from '../components/ToolLogos';
import { SearchIcon, ArrowRightIcon, GridIcon } from '../components/Icons';

type SortOption = 'rating' | 'name' | 'reviews';
type PricingFilter = '' | 'Free' | 'Freemium' | 'Paid' | 'Enterprise';

const popularSearches = [
  'ChatGPT', 'Claude', 'Midjourney', 'Cursor', 'Grammarly',
  'Writing', 'Coding', 'Image', 'Video', 'Productivity',
];

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
        description="Search and filter 50+ AI tools by category, pricing, and rating. Find the perfect AI tool for writing, coding, design, marketing, and more."
        canonical="/search"
      />

      <PageLayout>
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-5">Search AI Tools</h1>
          <p className="text-dark-300 text-lg max-w-2xl mx-auto leading-relaxed">Find the perfect AI tool from our directory. Filter by category, pricing, and more.</p>
        </motion.div>

        {/* Search + Filters Bar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8 space-y-4">
          {/* Search Input */}
          <div className="relative max-w-3xl mx-auto">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search tools by name, category, or description..."
              className="w-full bg-dark-800/80 border border-white/[0.06] rounded-2xl pl-12 pr-4 py-5 text-[15px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20 transition-all"
            />
          </div>

          {/* Popular Searches */}
          {!hasFilters && (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-[13px] text-dark-400 mr-1">Popular:</span>
              {popularSearches.map(s => (
                <button key={s} onClick={() => setQuery(s)} className="px-4 py-2 text-[13px] transition-colors font-medium text-dark-200 hover:text-white rounded-lg border border-white/[0.05] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Category */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-dark-800/60 border border-white/[0.06] rounded-lg px-3 py-2 text-[13px] text-white focus:outline-none focus:border-brand-500/40"
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>

            {/* Pricing */}
            <select
              value={pricingFilter}
              onChange={(e) => setPricingFilter(e.target.value as PricingFilter)}
              className="bg-dark-800/80 border border-white/[0.06] rounded-xl px-3 py-2 text-[13px] text-white focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="">All Pricing</option>
              <option value="Free">Free</option>
              <option value="Freemium">Freemium</option>
              <option value="Paid">Paid</option>
              <option value="Enterprise">Enterprise</option>
            </select>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="bg-dark-800/80 border border-white/[0.06] rounded-xl px-3 py-2 text-[13px] text-white focus:outline-none focus:border-brand-500/50 focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="rating">Sort: Highest Rated</option>
              <option value="name">Sort: A-Z</option>
              <option value="reviews">Sort: Most Reviewed</option>
            </select>

            {hasFilters && (
              <button
                onClick={() => { setQuery(''); setCategoryFilter(''); setPricingFilter(''); }}
                className="text-[13px] font-medium text-brand-400 hover:text-brand-300 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[14px] text-dark-400">
            {filtered.length} tool{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
              >
                <Link to={`/tool/${tool.slug}`} className="group card-hover block h-full rounded-2xl border border-white/[0.06] bg-surface-2/50 p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-dark-800 flex items-center justify-center shrink-0 border border-white/[0.06] overflow-hidden">
                      <ToolLogo toolId={tool.id} size={28} fallbackLetter={tool.logo} fallbackGradient={tool.gradient} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-white truncate group-hover:text-brand-400 transition-colors">{tool.name}</h3>
                      <span className="text-[12px] text-dark-400">{tool.category}</span>
                    </div>
                  </div>
                  <p className="text-[13px] text-dark-300 mb-3 line-clamp-2">{tool.tagline}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                    <span className="text-[12px] text-dark-400">Open listing</span>
                    <span className={`text-[11px] font-semibold px-3 py-1 rounded-md uppercase ${
                      tool.pricing === 'Free' || tool.pricing === 'Freemium'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : tool.pricing === 'Paid'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-purple-500/10 text-purple-400'
                    }`}>{tool.pricing}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-28">
            <div className="w-20 h-20 rounded-2xl bg-dark-800 border border-white/[0.06] flex items-center justify-center mx-auto mb-6">
              <GridIcon size={34} className="text-dark-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No tools found</h2>
            <p className="text-dark-300 mb-6 max-w-md mx-auto">Try adjusting your search or filters. Here are some popular tools you might like:</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {['ChatGPT', 'Claude', 'Midjourney', 'Cursor'].map(s => (
                <button key={s} onClick={() => { setQuery(s); setCategoryFilter(''); setPricingFilter(''); }} className="px-4 py-2 text-[13px] font-medium text-brand-400 rounded-lg border border-brand-500/20 bg-brand-500/5 hover:bg-brand-500/15 transition-all">
                  {s}
                </button>
              ))}
            </div>
            <Link to="/categories" className="inline-flex items-center gap-2 text-[15px] font-medium text-brand-400 hover:text-brand-300">
              Browse all categories<ArrowRightIcon size={14} />
            </Link>
          </div>
        )}
      </PageLayout>
    </>
  );
}
