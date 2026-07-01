import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO, { generateBreadcrumbSchema, generateFAQSchema } from '../components/SEO';
import PageLayout, { Card, Breadcrumb } from '../components/layouts/PageLayout';
import { getComparisonBySlug, getRelatedComparisons } from '../data/comparisons';
import {
  CheckIcon, XIcon, StarIcon, ArrowRightIcon
} from '../components/Icons';
import LastUpdated from '../components/LastUpdated';
import EditorialBlock from '../components/EditorialBlock';

// ─── Types ────────────────────────────────────────────────────────────────────
interface TocItem {
  id: string;
  label: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const TOC_ITEMS: TocItem[] = [
  { id: 'overview',    label: 'Overview'          },
  { id: 'features',   label: 'Feature Comparison' },
  { id: 'pricing',    label: 'Pricing'            },
  { id: 'pros-cons',  label: 'Pros & Cons'        },
  { id: 'best-for',   label: 'Best For'           },
  { id: 'verdict',    label: 'Final Verdict'      },
  { id: 'faq',        label: 'FAQ'                },
  { id: 'related',    label: 'Related'            },
];

// ─── Small helpers ────────────────────────────────────────────────────────────
function AdSensePlaceholder({ label = 'Advertisement' }: { label?: string }) {
  return (
    <div className="w-full flex items-center justify-center rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] py-6 text-[11px] font-medium uppercase tracking-widest text-dark-500">
      {label}
    </div>
  );
}

function WinnerBadge({ label, color }: { label: string; color: 'emerald' | 'cyan' | 'violet' }) {
  const map = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    cyan:    'bg-cyan-500/10    text-cyan-400    border-cyan-500/20',
    violet:  'bg-violet-500/10 text-violet-400  border-violet-500/20',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${map[color]}`}>
      <StarIcon size={10} />
      {label}
    </span>
  );
}

function SectionHeading({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-24 text-xl font-bold text-white mb-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-gradient-to-r from-white/[0.06] to-transparent" />
      {children}
      <span className="h-px flex-1 bg-gradient-to-l from-white/[0.06] to-transparent" />
    </h2>
  );
}

// ─── Table of Contents ────────────────────────────────────────────────────────
function TableOfContents({ active }: { active: string }) {
  return (
    <nav className="sticky top-24 w-56 shrink-0 hidden xl:block self-start">
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-dark-400">
        On this page
      </p>
      <ul className="space-y-0.5">
        {TOC_ITEMS.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block rounded-lg px-3 py-1.5 text-[13px] transition-all duration-150 ${
                active === item.id
                  ? 'bg-brand-500/10 text-brand-400 font-medium'
                  : 'text-dark-300 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      {/* Sidebar ad */}
      <div className="mt-6">
        <AdSensePlaceholder label="Sidebar Ad" />
      </div>

      {/* Affiliate CTA */}
      <div className="mt-4 rounded-xl border border-brand-500/20 bg-brand-500/5 p-4">
        <p className="text-[12px] text-dark-200 mb-3 leading-relaxed">
          Try the top-rated tool free for 14 days — no credit card needed.
        </p>
        <a
          href="#affiliate-cta"
          className="block w-full rounded-lg bg-brand-500 py-2 text-center text-[12px] font-semibold text-white hover:bg-brand-400 transition-colors"
        >
          Start Free Trial →
        </a>
        <p className="mt-2 text-[10px] text-dark-500 text-center">
          Affiliate link · We may earn a commission
        </p>
      </div>
    </nav>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const comparison = getComparisonBySlug(slug || '');
  const [activeSection, setActiveSection] = useState('overview');
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Intersection observer for TOC highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    TOC_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [comparison]);

  if (!comparison) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">Comparison Not Found</h1>
          <Link to="/compare" className="text-brand-400 hover:text-brand-300">
            View All Comparisons
          </Link>
        </div>
      </PageLayout>
    );
  }

  const relatedComparisons = getRelatedComparisons(comparison.slug);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home',        url: '/'                            },
    { name: 'Comparisons', url: '/compare'                     },
    { name: comparison.title, url: `/compare/${comparison.slug}` },
  ]);
  const faqSchema = generateFAQSchema(comparison.faq);

  const winnerName =
    comparison.winner === 'A' ? comparison.toolA.name :
    comparison.winner === 'B' ? comparison.toolB.name :
    null;

  const winnerColor: 'emerald' | 'cyan' | 'violet' =
    comparison.winner === 'A' ? 'emerald' :
    comparison.winner === 'B' ? 'cyan'    :
    'violet';

  return (
    <>
      <SEO
        title={comparison.metaTitle}
        description={comparison.metaDescription}
        canonical={`/compare/${comparison.slug}`}
        keywords={`${comparison.toolA.name} vs ${comparison.toolB.name}, AI comparison, ${comparison.toolA.name} alternative, ${comparison.toolB.name} alternative`}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [breadcrumbSchema, faqSchema],
        }}
      />

      {/* Reading-progress bar */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-brand-500 via-cyan-400 to-emerald-400 z-50 origin-left"
      />

      <PageLayout maxWidth="7xl">
        <Breadcrumb items={[
          { label: 'Home',        href: '/'        },
          { label: 'Comparisons', href: '/compare' },
          { label: `${comparison.toolA.name} vs ${comparison.toolB.name}` },
        ]} />

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative mb-16 overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-br from-surface-2/80 via-surface-2/40 to-transparent px-6 py-12 sm:px-12 sm:py-16 text-center"
        >
          {/* Glow blobs */}
          <div className="pointer-events-none absolute -top-24 left-1/4 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Tool logos */}
          <div className="relative flex items-center justify-center gap-6 sm:gap-12 mb-8">
            {/* Tool A */}
            <div className="text-center">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${comparison.toolA.gradient} flex items-center justify-center text-2xl sm:text-3xl font-bold text-white border border-white/[0.08] mx-auto mb-3 shadow-lg`}
              >
                {comparison.toolA.logo}
              </div>
              <span className="text-[15px] sm:text-[16px] font-semibold text-white block">
                {comparison.toolA.name}
              </span>
              {comparison.winner === 'A' && (
                <div className="mt-1.5 flex justify-center">
                  <WinnerBadge label="Winner" color="emerald" />
                </div>
              )}
            </div>

            {/* VS divider */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <span className="text-2xl sm:text-3xl font-black text-dark-400 tracking-tight">VS</span>
              <div className="w-px h-10 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            </div>

            {/* Tool B */}
            <div className="text-center">
              <div
                className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br ${comparison.toolB.gradient} flex items-center justify-center text-2xl sm:text-3xl font-bold text-white border border-white/[0.08] mx-auto mb-3 shadow-lg`}
              >
                {comparison.toolB.logo}
              </div>
              <span className="text-[15px] sm:text-[16px] font-semibold text-white block">
                {comparison.toolB.name}
              </span>
              {comparison.winner === 'B' && (
                <div className="mt-1.5 flex justify-center">
                  <WinnerBadge label="Winner" color="cyan" />
                </div>
              )}
            </div>
          </div>

          <h1 className="relative text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
            {comparison.title}
          </h1>

          {/* Quick verdict pill */}
          <div className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-semibold mb-6 ${
            winnerColor === 'emerald' ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' :
            winnerColor === 'cyan'    ? 'border-cyan-500/30    bg-cyan-500/10    text-cyan-400'    :
                                        'border-violet-500/30  bg-violet-500/10  text-violet-400'
          }`}>
            <StarIcon size={14} />
            {winnerName ? `${winnerName} wins this comparison` : 'It\'s a tie — both have strengths'}
          </div>

          <div className="relative flex flex-col items-center gap-2">
            <LastUpdated date={comparison.updatedAt} />
            <p className="text-[12px] text-dark-400 max-w-md">
              Comparisons are research summaries based on public information and may change as products evolve.
            </p>
          </div>

          {/* Hero CTAs */}
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#affiliate-a"
              className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${comparison.toolA.gradient} px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg hover:opacity-90 transition-opacity`}
            >
              Try {comparison.toolA.name} Free
              <ArrowRightIcon size={14} />
            </a>
            <a
              href="#affiliate-b"
              className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${comparison.toolB.gradient} px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg hover:opacity-90 transition-opacity`}
            >
              Try {comparison.toolB.name} Free
              <ArrowRightIcon size={14} />
            </a>
          </div>
          <p className="relative mt-2 text-[10px] text-dark-500">
            Affiliate links · We may earn a commission at no cost to you
          </p>
        </motion.div>

        {/* ── TOP AD ───────────────────────────────────────────────────────── */}
        <div className="mb-10">
          <AdSensePlaceholder label="Top Banner Ad — 728×90" />
        </div>

        {/* ── CONTENT + TOC LAYOUT ─────────────────────────────────────────── */}
        <div className="flex gap-10 items-start" ref={mainRef}>
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-16">

            {/* ── QUICK VERDICT CARD ──────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card padding="lg" className={`border-2 ${
                comparison.winner === 'A' ? 'border-emerald-500/30' :
                comparison.winner === 'B' ? 'border-cyan-500/30'    :
                                            'border-violet-500/30'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                    comparison.winner === 'A' ? 'bg-emerald-500/10 text-emerald-400' :
                    comparison.winner === 'B' ? 'bg-cyan-500/10    text-cyan-400'    :
                                                'bg-violet-500/10  text-violet-400'
                  }`}>
                    <StarIcon size={24} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-dark-400 mb-1">
                      Quick Verdict
                    </p>
                    <h2 className="text-lg font-bold text-white mb-2">
                      {winnerName ? `${winnerName} is the better choice for most users` : 'Both tools are excellent — choose by use case'}
                    </h2>
                    <p className="text-[14px] text-dark-200 leading-relaxed">
                      {comparison.winnerReason}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* ── OVERVIEW ────────────────────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <SectionHeading id="overview">Overview</SectionHeading>
              <Card>
                <EditorialBlock className="mb-5" />
                <p className="text-[14px] text-dark-200 leading-relaxed">
                  {comparison.introduction}
                </p>

                {/* Internal links row */}
                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                  <span className="text-[12px] text-dark-400 mr-1">More about:</span>
                  <Link
                    to={`/tool/${comparison.toolA.id}`}
                    className="text-[12px] text-brand-400 hover:text-brand-300 underline underline-offset-2"
                  >
                    {comparison.toolA.name} Review
                  </Link>
                  <span className="text-dark-600">·</span>
                  <Link
                    to={`/tool/${comparison.toolB.id}`}
                    className="text-[12px] text-brand-400 hover:text-brand-300 underline underline-offset-2"
                  >
                    {comparison.toolB.name} Review
                  </Link>
                  <span className="text-dark-600">·</span>
                  <Link
                    to="/compare"
                    className="text-[12px] text-brand-400 hover:text-brand-300 underline underline-offset-2"
                  >
                    All AI Comparisons
                  </Link>
                </div>
              </Card>
            </motion.section>

            {/* ── MID AD ──────────────────────────────────────────────────── */}
            <AdSensePlaceholder label="In-Content Ad — 336×280" />

            {/* ── FEATURE COMPARISON ──────────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <SectionHeading id="features">Feature Comparison</SectionHeading>
              <Card padding="sm" className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="text-left py-4 px-5 text-[12px] font-semibold uppercase tracking-wide text-dark-400 w-2/5">
                          Feature
                        </th>
                        <th className="text-center py-4 px-5 text-[13px] font-semibold text-white">
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${comparison.toolA.gradient} flex items-center justify-center text-[11px] font-bold text-white`}>
                              {comparison.toolA.logo}
                            </div>
                            {comparison.toolA.name}
                          </div>
                        </th>
                        <th className="text-center py-4 px-5 text-[13px] font-semibold text-white">
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${comparison.toolB.gradient} flex items-center justify-center text-[11px] font-bold text-white`}>
                              {comparison.toolB.logo}
                            </div>
                            {comparison.toolB.name}
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparison.features.map((feature, index) => (
                        <tr
                          key={index}
                          className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-3.5 px-5 text-[13px] text-white font-medium">
                            {feature.name}
                          </td>

                          {/* Tool A cell */}
                          <td className={`py-3.5 px-5 text-center text-[13px] relative ${feature.winner === 'A' ? 'bg-emerald-500/5' : ''}`}>
                            {feature.winner === 'A' && (
                              <span className="absolute top-1.5 right-1.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 rounded px-1">
                                ✓ Best
                              </span>
                            )}
                            {typeof feature.toolA === 'boolean' ? (
                              feature.toolA
                                ? <CheckIcon size={16} className="text-emerald-400 mx-auto" />
                                : <XIcon size={16} className="text-dark-500 mx-auto" />
                            ) : (
                              <span className={feature.winner === 'A' ? 'text-emerald-400 font-semibold' : 'text-dark-200'}>
                                {feature.toolA}
                              </span>
                            )}
                          </td>

                          {/* Tool B cell */}
                          <td className={`py-3.5 px-5 text-center text-[13px] relative ${feature.winner === 'B' ? 'bg-cyan-500/5' : ''}`}>
                            {feature.winner === 'B' && (
                              <span className="absolute top-1.5 right-1.5 text-[9px] font-bold text-cyan-400 bg-cyan-500/10 rounded px-1">
                                ✓ Best
                              </span>
                            )}
                            {typeof feature.toolB === 'boolean' ? (
                              feature.toolB
                                ? <CheckIcon size={16} className="text-emerald-400 mx-auto" />
                                : <XIcon size={16} className="text-dark-500 mx-auto" />
                            ) : (
                              <span className={feature.winner === 'B' ? 'text-cyan-400 font-semibold' : 'text-dark-200'}>
                                {feature.toolB}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </motion.section>

            {/* ── PRICING ─────────────────────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <SectionHeading id="pricing">Pricing Comparison</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Tool A pricing */}
                <Card className="relative overflow-hidden">
                  {comparison.winner === 'A' && (
                    <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0" />
                  )}
                  <h3 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${comparison.toolA.gradient} flex items-center justify-center text-[11px] font-bold text-white`}>
                      {comparison.toolA.logo}
                    </div>
                    {comparison.toolA.name}
                    {comparison.winner === 'A' && <WinnerBadge label="Best Value" color="emerald" />}
                  </h3>
                  <div className="space-y-0">
                    {comparison.pricingComparison.toolA.map((plan, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                        <span className="text-[13px] text-dark-200">{plan.plan}</span>
                        <span className="text-[13px] font-semibold text-white">{plan.price}</span>
                      </div>
                    ))}
                  </div>
                  {/* Affiliate CTA */}
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <a
                      id="affiliate-a"
                      href="#"
                      className={`flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-to-r ${comparison.toolA.gradient} py-2.5 text-[13px] font-semibold text-white hover:opacity-90 transition-opacity`}
                    >
                      Get {comparison.toolA.name} →
                    </a>
                    <p className="mt-1.5 text-center text-[10px] text-dark-500">
                      Affiliate link · We may earn a commission
                    </p>
                  </div>
                </Card>

                {/* Tool B pricing */}
                <Card className="relative overflow-hidden">
                  {comparison.winner === 'B' && (
                    <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0" />
                  )}
                  <h3 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${comparison.toolB.gradient} flex items-center justify-center text-[11px] font-bold text-white`}>
                      {comparison.toolB.logo}
                    </div>
                    {comparison.toolB.name}
                    {comparison.winner === 'B' && <WinnerBadge label="Best Value" color="cyan" />}
                  </h3>
                  <div className="space-y-0">
                    {comparison.pricingComparison.toolB.map((plan, i) => (
                      <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/[0.04] last:border-0">
                        <span className="text-[13px] text-dark-200">{plan.plan}</span>
                        <span className="text-[13px] font-semibold text-white">{plan.price}</span>
                      </div>
                    ))}
                  </div>
                  {/* Affiliate CTA */}
                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <a
                      id="affiliate-b"
                      href="#"
                      className={`flex items-center justify-center gap-2 w-full rounded-lg bg-gradient-to-r ${comparison.toolB.gradient} py-2.5 text-[13px] font-semibold text-white hover:opacity-90 transition-opacity`}
                    >
                      Get {comparison.toolB.name} →
                    </a>
                    <p className="mt-1.5 text-center text-[10px] text-dark-500">
                      Affiliate link · We may earn a commission
                    </p>
                  </div>
                </Card>
              </div>
            </motion.section>

            {/* ── PROS & CONS ─────────────────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SectionHeading id="pros-cons">Pros &amp; Cons</SectionHeading>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tool A */}
                <Card className="relative overflow-hidden">
                  {comparison.winner === 'A' && (
                    <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0" />
                  )}
                  <div className="flex items-center gap-2 mb-5">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${comparison.toolA.gradient} flex items-center justify-center text-[12px] font-bold text-white`}>
                      {comparison.toolA.logo}
                    </div>
                    <h3 className="text-[15px] font-semibold text-white">{comparison.toolA.name}</h3>
                    {comparison.winner === 'A' && <WinnerBadge label="Winner" color="emerald" />}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
                        Pros
                      </h4>
                      <ul className="space-y-2">
                        {comparison.prosConsA.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-dark-200">
                            <CheckIcon size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-white/[0.04] pt-4">
                      <h4 className="text-[11px] font-bold text-rose-400 uppercase tracking-widest mb-2">
                        Cons
                      </h4>
                      <ul className="space-y-2">
                        {comparison.prosConsA.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-dark-200">
                            <XIcon size={14} className="text-rose-400 shrink-0 mt-0.5" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Tool B */}
                <Card className="relative overflow-hidden">
                  {comparison.winner === 'B' && (
                    <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-cyan-500/0 via-cyan-500 to-cyan-500/0" />
                  )}
                  <div className="flex items-center gap-2 mb-5">
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${comparison.toolB.gradient} flex items-center justify-center text-[12px] font-bold text-white`}>
                      {comparison.toolB.logo}
                    </div>
                    <h3 className="text-[15px] font-semibold text-white">{comparison.toolB.name}</h3>
                    {comparison.winner === 'B' && <WinnerBadge label="Winner" color="cyan" />}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
                        Pros
                      </h4>
                      <ul className="space-y-2">
                        {comparison.prosConsB.pros.map((pro, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-dark-200">
                            <CheckIcon size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t border-white/[0.04] pt-4">
                      <h4 className="text-[11px] font-bold text-rose-400 uppercase tracking-widest mb-2">
                        Cons
                      </h4>
                      <ul className="space-y-2">
                        {comparison.prosConsB.cons.map((con, i) => (
                          <li key={i} className="flex items-start gap-2 text-[13px] text-dark-200">
                            <XIcon size={14} className="text-rose-400 shrink-0 mt-0.5" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.section>

            {/* ── BEST FOR ────────────────────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <SectionHeading id="best-for">Best For Each Use Case</SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {comparison.useCases.map((uc, index) => {
                  const isA    = uc.winner === 'A';
                  const isB    = uc.winner === 'B';
                  const isTie  = uc.winner === 'tie';
                  const tool   = isA ? comparison.toolA : isB ? comparison.toolB : null;
                  const color  = isA ? 'emerald' : isB ? 'cyan' : 'violet';
                  const colorMap = {
                    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                    cyan:    'bg-cyan-500/10    text-cyan-400    border-cyan-500/20',
                    violet:  'bg-violet-500/10  text-violet-400  border-violet-500/20',
                  };

                  return (
                    <div
                      key={index}
                      className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-surface-2/40 p-4"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border ${colorMap[color]}`}>
                        {isTie ? (
                          <span className="text-[13px] font-bold">=</span>
                        ) : tool ? (
                          <div className={`w-6 h-6 rounded bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-[10px] font-bold text-white`}>
                            {tool.logo}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-[14px] font-semibold text-white">{uc.useCase}</h4>
                          <span className={`text-[10px] font-semibold rounded px-1.5 py-0.5 border ${colorMap[color]}`}>
                            {isTie ? 'Tie' : tool?.name}
                          </span>
                        </div>
                        <p className="text-[12px] text-dark-300 leading-relaxed">{uc.reason}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* ── MID-CONTENT AD ──────────────────────────────────────────── */}
            <AdSensePlaceholder label="In-Content Ad — 728×90" />

            {/* ── FINAL VERDICT ───────────────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SectionHeading id="verdict">Final Verdict</SectionHeading>
              <Card className={`relative overflow-hidden border-2 ${
                comparison.winner === 'A' ? 'border-emerald-500/20' :
                comparison.winner === 'B' ? 'border-cyan-500/20'    :
                                            'border-violet-500/20'
              }`}>
                <div className={`absolute inset-0 bg-gradient-to-br opacity-5 ${
                  comparison.winner === 'A' ? 'from-emerald-500' :
                  comparison.winner === 'B' ? 'from-cyan-500'    :
                                              'from-violet-500'
                } to-transparent pointer-events-none`} />

                <p className="relative text-[14px] text-dark-200 leading-relaxed mb-6">
                  {comparison.verdict}
                </p>

                {/* Affiliate CTA box */}
                <div id="affiliate-cta" className="relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 mb-6">
                  <p className="text-[13px] font-semibold text-white mb-3">
                    Ready to get started? Try the winner risk-free:
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#affiliate-a"
                      className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${comparison.toolA.gradient} px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90 transition-opacity`}
                    >
                      Try {comparison.toolA.name} Free →
                    </a>
                    <a
                      href="#affiliate-b"
                      className={`inline-flex items-center gap-2 rounded-lg bg-gradient-to-r ${comparison.toolB.gradient} px-4 py-2 text-[13px] font-semibold text-white hover:opacity-90 transition-opacity`}
                    >
                      Try {comparison.toolB.name} Free →
                    </a>
                  </div>
                  <p className="mt-2 text-[10px] text-dark-500">
                    Affiliate links · We may earn a commission at no cost to you
                  </p>
                </div>

                <div className="relative flex flex-wrap gap-3">
                  <Link
                    to={`/tool/${comparison.toolA.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all"
                  >
                    Full {comparison.toolA.name} Review
                    <ArrowRightIcon size={14} />
                  </Link>
                  <Link
                    to={`/tool/${comparison.toolB.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all"
                  >
                    Full {comparison.toolB.name} Review
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </Card>
            </motion.section>

            {/* ── FAQ ─────────────────────────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <SectionHeading id="faq">Frequently Asked Questions</SectionHeading>
              <div className="space-y-3">
                {comparison.faq.map((item, index) => (
                  <FaqItem key={index} question={item.question} answer={item.answer} index={index} />
                ))}
              </div>
            </motion.section>

            {/* ── NEWSLETTER ──────────────────────────────────────────────── */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.48 }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-brand-500/20 bg-gradient-to-br from-brand-500/10 via-brand-500/5 to-transparent p-8 text-center">
                <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold text-brand-400 mb-4">
                    📬 Free Weekly Newsletter
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Stay ahead of AI tool updates
                  </h3>
                  <p className="text-[13px] text-dark-300 mb-6 max-w-sm mx-auto">
                    We review the latest AI tools every week. Get our comparisons, deals and breakdowns — straight to your inbox.
                  </p>
                  <form
                    className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="flex-1 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2.5 text-[13px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40"
                    />
                    <button
                      type="submit"
                      className="rounded-lg bg-brand-500 px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-brand-400 transition-colors whitespace-nowrap"
                    >
                      Subscribe Free
                    </button>
                  </form>
                  <p className="mt-3 text-[11px] text-dark-500">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* ── RELATED COMPARISONS ─────────────────────────────────────── */}
            {relatedComparisons.length > 0 && (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <SectionHeading id="related">Related Comparisons</SectionHeading>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {relatedComparisons.map((comp) => (
                    <Link
                      key={comp.id}
                      to={`/compare/${comp.slug}`}
                      className="group relative flex flex-col gap-3 rounded-xl border border-white/[0.06] bg-surface-2/40 p-4 hover:border-brand-500/30 hover:bg-surface-2/60 transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${comp.toolA.gradient} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                          {comp.toolA.logo}
                        </div>
                        <span className="text-dark-400 text-[12px] font-semibold">vs</span>
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${comp.toolB.gradient} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>
                          {comp.toolB.logo}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-[14px] font-semibold text-white group-hover:text-brand-400 transition-colors">
                          {comp.toolA.name} vs {comp.toolB.name}
                        </h3>
                        <p className="text-[12px] text-dark-400 mt-0.5">
                          In-depth comparison
                        </p>
                      </div>
                      <ArrowRightIcon size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 group-hover:text-brand-400 transition-colors" />
                    </Link>
                  ))}
                </div>

                {/* Also see tool pages */}
                <div className="rounded-xl border border-white/[0.06] bg-surface-2/30 p-5">
                  <p className="text-[13px] font-semibold text-white mb-3">
                    Also see individual tool reviews:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/tool/${comparison.toolA.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[12px] text-dark-200 hover:text-white hover:border-white/[0.12] transition-all"
                    >
                      {comparison.toolA.logo} {comparison.toolA.name} Review
                    </Link>
                    <Link
                      to={`/tool/${comparison.toolB.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[12px] text-dark-200 hover:text-white hover:border-white/[0.12] transition-all"
                    >
                      {comparison.toolB.logo} {comparison.toolB.name} Review
                    </Link>
                    <Link
                      to="/compare"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[12px] text-dark-200 hover:text-white hover:border-white/[0.12] transition-all"
                    >
                      🔍 All AI Comparisons
                    </Link>
                    <Link
                      to="/search"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[12px] text-dark-200 hover:text-white hover:border-white/[0.12] transition-all"
                    >
                      🧰 Browse All AI Tools
                    </Link>
                  </div>
                </div>
              </motion.section>
            )}

            {/* ── BOTTOM AD ───────────────────────────────────────────────── */}
            <AdSensePlaceholder label="Bottom Banner Ad — 728×90" />

          </div>
          {/* ── END MAIN CONTENT ─────────────────────────────────────────── */}

          {/* ── STICKY TOC ───────────────────────────────────────────────── */}
          <TableOfContents active={activeSection} />
        </div>
      </PageLayout>
    </>
  );
}

// ─── FAQ accordion item ───────────────────────────────────────────────────────
function FaqItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div className="rounded-xl border border-white/[0.06] bg-surface-2/40 overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-[14px] font-semibold text-white">{question}</span>
        <span className={`shrink-0 text-dark-400 transition-transform duration-200 ${open ? 'rotate-45' : 'rotate-0'}`}>
          ✕
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="px-5 pb-5 text-[13px] text-dark-200 leading-relaxed">
          {answer}
        </p>
      </motion.div>
    </div>
  );
}