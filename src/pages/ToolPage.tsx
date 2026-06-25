import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import { getToolBySlug, getToolsByCategory, tools } from '../data/tools';
import { getToolMedia } from '../data/toolMedia';
import { ToolLogo } from '../components/ToolLogos';
import {
  StarIcon, ExternalLinkIcon, CheckIcon,
  XIcon, GlobeIcon, LayersIcon, TargetIcon, LightbulbIcon,
  ArrowRightIcon, VideoIcon, ImageIcon
} from '../components/Icons';

export default function ToolPage() {
  const { slug } = useParams<{ slug: string }>();
  const tool = getToolBySlug(slug || '');

  if (!tool) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
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
      <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8 flex items-center flex-wrap gap-2 text-[13px]"
          aria-label="Breadcrumb"
        >
          <Link to="/categories" className="text-dark-300 hover:text-white transition-colors">Categories</Link>
          <span className="text-dark-500">/</span>
          <Link to={`/category/${tool.categorySlug}`} className="text-dark-300 hover:text-white transition-colors">{tool.category}</Link>
          <span className="text-dark-500">/</span>
          <span className="text-dark-400">{tool.name}</span>
        </motion.nav>

        {/* ── Hero ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-dark-800 border border-white/[0.08] flex items-center justify-center shrink-0 overflow-hidden">
              <ToolLogo toolId={tool.id} size={48} fallbackLetter={tool.logo} fallbackGradient={tool.gradient} />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">{tool.name}</h1>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase tracking-wide ${
                  tool.pricing === 'Freemium' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : tool.pricing === 'Free' ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                  : tool.pricing === 'Paid' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                }`}>{tool.pricing}</span>
              </div>
              <p className="text-base sm:text-lg text-brand-400 font-medium mb-3">{tool.tagline}</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <StarIcon size={16} className="text-amber-400" />
                  <span className="text-[15px] font-semibold text-white">{tool.rating}</span>
                  <span className="text-[14px] text-dark-300">({tool.reviews} reviews)</span>
                </div>
                <Link to={`/category/${tool.categorySlug}`} className="text-[13px] font-medium text-dark-300 hover:text-brand-400 transition-colors">{tool.category}</Link>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={tool.website} target="_blank" rel="noopener noreferrer" className="btn-primary group flex items-center gap-2.5 px-6 py-3 rounded-xl text-[14px] font-semibold text-white">
              <span className="relative z-10 flex items-center gap-2">
                <GlobeIcon size={18} />Visit Official Website<ExternalLinkIcon size={14} />
              </span>
            </a>
          </div>
        </motion.div>

        {/* ── Screenshots Gallery ── */}
        {media && media.screenshots.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }} className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ImageIcon size={20} className="text-brand-400" />
              Screenshots
            </h2>
            <div className={`grid gap-3 ${media.screenshots.length === 1 ? 'grid-cols-1' : media.screenshots.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
              {media.screenshots.map((ss, i) => (
                <div key={i} className="group rounded-xl overflow-hidden border border-white/[0.06]">
                  {/* Mock screenshot */}
                  <div className={`aspect-video bg-gradient-to-br ${ss.gradient} relative`}>
                    {/* Mock window chrome */}
                    <div className="absolute inset-x-0 top-0 h-7 bg-black/30 flex items-center gap-1.5 px-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="w-2.5 h-2.5 rounded-full bg-white/10" />
                      <span className="ml-2 h-3.5 w-28 rounded bg-white/[0.06]" />
                    </div>
                    {/* Mock content lines */}
                    <div className="absolute inset-0 flex items-center justify-center p-6 pt-10">
                      <div className="w-full max-w-[200px] space-y-2">
                        <div className="h-2 rounded-full w-3/4" style={{ background: ss.accent, opacity: 0.35 }} />
                        <div className="h-2 rounded-full w-full bg-white/[0.06]" />
                        <div className="h-2 rounded-full w-5/6 bg-white/[0.06]" />
                        <div className="h-6 rounded-lg w-1/2 mt-3" style={{ background: ss.accent, opacity: 0.25 }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-surface-2/60">
                    <p className="text-[12px] text-dark-300">{ss.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* ── Video Tutorial ── */}
        {media?.video && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }} className="mb-8">
            <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <VideoIcon size={20} className="text-brand-400" />
                Video Tutorial
              </h2>
              <div className="aspect-video rounded-xl overflow-hidden bg-dark-900 border border-white/[0.06] mb-4">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${media.video.youtubeId}`}
                  title={media.video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <h3 className="text-[15px] font-semibold text-white">{media.video.title}</h3>
              <p className="text-[13px] text-dark-300 mt-1">{media.video.description}</p>
              <span className="text-[12px] text-dark-400 mt-1 inline-block">Duration: {media.video.duration}</span>
            </div>
          </motion.section>
        )}

        {/* ── Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <LayersIcon size={20} className="text-brand-400" />Overview
              </h2>
              <p className="text-[14px] text-dark-200 leading-relaxed">{tool.description}</p>
            </motion.section>

            {/* Features */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <SparklesIcon size={20} className="text-brand-400" />Key Features
              </h2>
              <ul className="space-y-3">
                {tool.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckIcon size={12} className="text-brand-400" />
                    </div>
                    <span className="text-[14px] text-dark-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Use Cases */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
              <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TargetIcon size={20} className="text-brand-400" />Use Cases
              </h2>
              <ul className="space-y-3">
                {tool.useCases.map((uc, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <LightbulbIcon size={12} className="text-cyan-400" />
                    </div>
                    <span className="text-[14px] text-dark-200">{uc}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            {/* Pros & Cons */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center"><CheckIcon size={14} className="text-emerald-400" /></div>Pros
                </h2>
                <ul className="space-y-2.5">
                  {tool.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-2.5"><CheckIcon size={14} className="text-emerald-400 shrink-0 mt-0.5" /><span className="text-[13px] text-dark-200">{pro}</span></li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-rose-500/15 flex items-center justify-center"><XIcon size={14} className="text-rose-400" /></div>Cons
                </h2>
                <ul className="space-y-2.5">
                  {tool.cons.map((con, i) => (
                    <li key={i} className="flex items-start gap-2.5"><XIcon size={14} className="text-rose-400 shrink-0 mt-0.5" /><span className="text-[13px] text-dark-200">{con}</span></li>
                  ))}
                </ul>
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Quick Info</h3>
              <div className="space-y-3">
                {[
                  ['Pricing', tool.pricing],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <span className="text-[13px] text-dark-300">{label}</span>
                    <span className="text-[13px] font-medium text-white">{value}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                  <span className="text-[13px] text-dark-300">Category</span>
                  <Link to={`/category/${tool.categorySlug}`} className="text-[13px] font-medium text-brand-400 hover:text-brand-300">{tool.category}</Link>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                  <span className="text-[13px] text-dark-300">Rating</span>
                  <div className="flex items-center gap-1"><StarIcon size={12} className="text-amber-400" /><span className="text-[13px] font-medium text-white">{tool.rating}</span></div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[13px] text-dark-300">Reviews</span>
                  <span className="text-[13px] font-medium text-white">{tool.reviews}</span>
                </div>
              </div>
              <a href={tool.website} target="_blank" rel="noopener noreferrer" className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium text-white border border-white/[0.08] hover:border-white/[0.15] bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                Visit Website<ExternalLinkIcon size={13} />
              </a>
            </motion.div>

            {/* Alternatives */}
            {tool.alternatives.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5">
                <h3 className="text-sm font-semibold text-white mb-4">Alternatives</h3>
                <ul className="space-y-2">
                  {tool.alternatives.map((alt, i) => {
                    const altTool = tools.find(t => t.name.toLowerCase() === alt.toLowerCase());
                    if (altTool) {
                      return (
                        <li key={i}>
                          <Link to={`/tool/${altTool.slug}`} className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-dark-800 border border-white/[0.06]">
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5">
                <h3 className="text-sm font-semibold text-white mb-4">More in {tool.category}</h3>
                <ul className="space-y-2">
                  {relatedTools.map((r) => (
                    <li key={r.id}>
                      <Link to={`/tool/${r.slug}`} className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-white/[0.03] transition-colors">
                        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-dark-800 border border-white/[0.06]">
                          <ToolLogo toolId={r.id} size={24} fallbackLetter={r.logo} fallbackGradient={r.gradient} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[13px] font-medium text-white truncate">{r.name}</div>
                          <div className="flex items-center gap-1"><StarIcon size={10} className="text-amber-400" /><span className="text-[11px] text-dark-400">{r.rating}</span></div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to={`/category/${tool.categorySlug}`} className="mt-4 flex items-center justify-center gap-1.5 text-[12px] font-medium text-brand-400 hover:text-brand-300">
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3L14.5 8.5L20 11L14.5 13.5L12 19L9.5 13.5L4 11L9.5 8.5L12 3Z" />
      <path d="M19 3L20 5L22 6L20 7L19 9L18 7L16 6L18 5L19 3Z" />
    </svg>
  );
}
