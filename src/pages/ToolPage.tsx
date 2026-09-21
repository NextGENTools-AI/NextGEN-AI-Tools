import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import { getToolBySlug, getToolsByCategory, tools } from '../data/tools';
import { getToolMedia } from '../data/toolMedia';
import { ToolLogo } from '../components/ToolLogos';
import {
  StarIcon, ExternalLinkIcon, CheckIcon,
  GlobeIcon, LayersIcon, TargetIcon, LightbulbIcon,
  ArrowRightIcon, ChevronRightIcon, SearchIcon,
} from '../components/Icons';
import { Badge, pricingTone } from '../components/ui';
import LastUpdated from '../components/LastUpdated';
import EditorialBlock from '../components/EditorialBlock';
import ScreenshotGallery from '../components/ScreenshotGallery';
import VideoTutorial from '../components/VideoTutorial';
import ProsCons from '../components/ProsCons';

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug || '');

  if (!tool) {
    return (
      <div className="relative min-h-screen pb-24 pt-28 sm:pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Tool Not Found</h1>
          <Link to="/categories" className="text-brand-400 hover:text-brand-300">
            Browse Categories
          </Link>
        </div>
      </div>
    );
  }

  const relatedTools = getToolsByCategory(tool.categorySlug)
    .filter(t => t.id !== tool.id)
    .slice(0, 3);

  const media = getToolMedia(tool.id);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/categories' },
    { name: tool.category, url: `/category/${tool.categorySlug}` },
    { name: tool.name, url: `/tool/${tool.slug}` },
  ]);

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.website,
    applicationCategory: 'AI Tool',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: tool.rating,
      reviewCount: parseInt(tool.reviews.replace(/[^0-9]/g, '')) * 100,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'Free' ? '0' : undefined,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <>
      <SEO
        title={`${tool.name} Review — Features, Pricing & Alternatives`}
        description={`${tool.tagline}. Read our in-depth ${tool.name} review covering features, use cases, pros, cons, and the best alternatives. Rating: ${tool.rating}/5.`}
        canonical={`/tool/${tool.slug}`}
        keywords={`${tool.name}, ${tool.name} review, ${tool.name} pricing, ${tool.name} alternatives, ${tool.category}`}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [breadcrumbSchema, softwareSchema],
        }}
      />
      <div className="relative min-h-screen pb-24 pt-28 sm:pt-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 flex flex-wrap items-center gap-1.5 text-[13px]"
            aria-label="Breadcrumb"
          >
            <Link to="/categories" className="rounded text-dark-300 transition-colors hover:text-white">Categories</Link>
            <ChevronRightIcon size={13} className="text-dark-500" />
            <Link to={`/category/${tool.categorySlug}`} className="rounded text-dark-300 transition-colors hover:text-white">{tool.category}</Link>
            <ChevronRightIcon size={13} className="text-dark-500" />
            <span className="text-dark-400" aria-current="page">{tool.name}</span>
          </motion.nav>

          {/* ── Hero ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="card-surface relative mb-14 overflow-hidden rounded-3xl p-6 sm:p-9"
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="bg-grid-faint absolute inset-0 opacity-50" />
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-brand-500/[0.1] blur-3xl" />
            </div>

            <div className="relative">
              <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/[0.08] bg-dark-800 shadow-xl sm:h-24 sm:w-24 sm:rounded-3xl">
                  <ToolLogo toolId={tool.id} size={48} fallbackLetter={tool.logo} fallbackGradient={tool.gradient} />
                </div>
                <div className="flex-1">
                  <div className="mb-2.5 flex flex-wrap items-center gap-3">
                    <h1 className="text-3xl font-extrabold leading-tight tracking-[-0.03em] text-white sm:text-4xl md:text-[44px]">
                      {tool.name}
                    </h1>
                    <Badge tone={pricingTone(tool.pricing)}>{tool.pricing}</Badge>
                  </div>
                  <p className="mb-5 max-w-3xl text-lg font-medium leading-relaxed text-brand-300 sm:text-xl">
                    {tool.tagline}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] text-dark-200">
                      <StarIcon size={13} className="text-amber-400" />
                      {tool.rating}/5 rated by {tool.reviews} reviewers
                    </span>
                    <Link
                      to={`/category/${tool.categorySlug}`}
                      className="rounded font-mono text-[11.5px] uppercase tracking-[0.16em] text-dark-300 transition-colors hover:text-brand-300"
                    >
                      {tool.category}
                    </Link>
                  </div>
                  <div className="mt-4">
                    <LastUpdated date={new Date().toISOString()} className="text-[13px]" />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3.5">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary group rounded-xl px-6 py-3 text-[14px] font-semibold text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <GlobeIcon size={17} />
                    Visit Official Website
                    <ExternalLinkIcon size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </a>
                <Link
                  to="/search"
                  className="btn-secondary rounded-xl px-6 py-3 text-[14px] font-semibold text-dark-100 hover:text-white"
                >
                  <span className="flex items-center gap-2.5">
                    <SearchIcon size={16} />
                    Compare alternatives
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ── Screenshots Gallery ── */}
          {media && media.screenshots.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="mb-14 pb-4 border-b border-white/[0.06]"
            >
              <ScreenshotGallery screenshots={media.screenshots as Array<{ alt: string; caption: string; gradient: string; accent: string }>} />
            </motion.section>
          )}

          {/* ── Video Tutorial ── */}
          {media?.video && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="mb-14 pb-4 border-b border-white/[0.06]"
            >
              <VideoTutorial
                youtubeId={media.video.youtubeId}
                title={media.video.title}
                description={media.video.description}
                duration={media.video.duration}
              />
            </motion.section>
          )}

          {/* ── Content Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-10 items-start">

            {/* Main Column */}
            <div className="lg:col-span-2 space-y-6">

              {/* Disclaimer */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl card-surface p-6 shadow-lg hover:shadow-xl hover:border-white/10 transition-all duration-300"
              >
                <p className="mb-4 text-[13px] text-dark-300">
                  We base listings on publicly available information and encourage readers to verify pricing, limits, and availability on the official website before subscribing.
                </p>
                <EditorialBlock className="mt-2" />
              </motion.section>

              {/* Overview */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl card-surface p-6 shadow-lg hover:shadow-xl hover:border-white/10 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <LayersIcon size={22} className="text-brand-400" />Overview
                </h2>
                <p className="text-[15px] leading-8 text-dark-200">{tool.description}</p>
              </motion.section>

              {/* Features */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-2xl card-surface p-6 shadow-lg hover:shadow-xl hover:border-white/10 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <SparklesIcon size={22} className="text-brand-400" />Key Features
                </h2>
                <ul className="space-y-4">
                  {tool.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon size={12} className="text-brand-400" />
                      </div>
                      <span className="text-[15px] leading-7 text-dark-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* Use Cases */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="rounded-2xl card-surface p-6 shadow-lg hover:shadow-xl hover:border-white/10 transition-all duration-300"
              >
                <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                  <TargetIcon size={22} className="text-brand-400" />Use Cases
                </h2>
                <ul className="space-y-4">
                  {tool.useCases.map((uc, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <LightbulbIcon size={12} className="text-cyan-400" />
                      </div>
                      <span className="text-[15px] leading-7 text-dark-200">{uc}</span>
                    </li>
                  ))}
                </ul>
              </motion.section>

              {/* Pros & Cons */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-6"
              >
                <ProsCons pros={tool.pros} cons={tool.cons} className="mt-2" />
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 lg:sticky lg:top-24 self-start">

              {/* Quick Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl card-surface p-5 hover:border-white/10 transition-all duration-300"
              >
                <h3 className="mb-4 text-sm font-semibold text-white">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/[0.04] py-2">
                    <span className="text-[13px] text-dark-300">Pricing</span>
                    <span className="text-[13px] font-medium text-white">{tool.pricing}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/[0.04] py-2">
                    <span className="text-[13px] text-dark-300">Category</span>
                    <Link to={`/category/${tool.categorySlug}`} className="text-[13px] font-medium text-brand-400 hover:text-brand-300">
                      {tool.category}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/[0.04] py-2">
                    <span className="text-[13px] text-dark-300">Rating</span>
                    <span className="text-[13px] font-medium text-white">{tool.rating}/5</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-[13px] text-dark-300">Reviews</span>
                    <span className="text-[13px] font-medium text-white">{tool.reviews}</span>
                  </div>
                </div>
                <div className="mt-5 rounded-2xl border border-brand-500/10 bg-dark-500/5 p-4">
                  <p className="text-[13px] text-dark-300">Best for: {tool.useCases[0] || 'Teams and creators looking to move faster.'}</p>
                </div>
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-[13px] font-medium text-white transition-all hover:border-white/[0.15] hover:bg-white/[0.04] hover:-translate-y-0.5"
                >
                  Visit Website<ExternalLinkIcon size={13} />
                </a>
              </motion.div>

              {/* Alternatives */}
              {tool.alternatives.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="rounded-2xl card-surface p-5 shadow-lg hover:shadow-xl hover:border-white/10 transition-all duration-300"
                >
                  <h3 className="text-base font-bold text-white mb-4">Alternatives</h3>
                  <ul className="space-y-3">
                    {tool.alternatives.map((alt, i) => {
                      const altTool = tools.find(t => t.name.toLowerCase() === alt.toLowerCase());
                      if (altTool) {
                        return (
                          <li key={i}>
                            <Link
                              to={`/tool/${altTool.slug}`}
                              className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-white/[0.03] transition-all duration-300"
                            >
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-dark-800 border border-white/[0.06]">
                                <ToolLogo toolId={altTool.id} size={24} fallbackLetter={altTool.logo} fallbackGradient={altTool.gradient} />
                              </div>
                              <div>
                                <div className="text-[13px] font-medium text-white">{altTool.name}</div>
                                <div className="text-[11px] text-dark-400">{altTool.pricing}</div>
                              </div>
                            </Link>
                          </li>
                        );
                      }
                      return <li key={i} className="text-[13px] text-dark-300 py-1">{alt}</li>;
                    })}
                  </ul>
                </motion.div>
              )}

              {/* Related Tools */}
              {relatedTools.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                  className="rounded-2xl card-surface p-5 shadow-lg hover:shadow-xl hover:border-white/10 transition-all duration-300"
                >
                  <h3 className="text-sm font-semibold text-white mb-4">More in {tool.category}</h3>
                  <ul className="space-y-3">
                    {relatedTools.map((r) => (
                      <li key={r.id}>
                        <Link
                          to={`/tool/${r.slug}`}
                          className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-white/[0.03] transition-all duration-300"
                        >
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-dark-800 border border-white/[0.06]">
                            <ToolLogo toolId={r.id} size={24} fallbackLetter={r.logo} fallbackGradient={r.gradient} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-medium text-white truncate">{r.name}</div>
                            <div className="text-[11px] text-dark-400">{r.pricing}</div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/category/${tool.categorySlug}`}
                    className="mt-4 flex items-center justify-center gap-1.5 text-[13px] font-medium text-brand-400 hover:text-brand-300"
                  >
                    View all in {tool.category}<ArrowRightIcon size={12} />
                  </Link>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SparklesIcon({ size = 20, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 3L14.5 8.5L20 11L14.5 13.5L12 19L9.5 13.5L4 11L9.5 8.5L12 3Z" />
      <path d="M19 3L20 5L22 6L20 7L19 9L18 7L16 6L18 5L19 3Z" />
    </svg>
  );
}
