import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import SEO, {
  generateBreadcrumbSchema,
  generateCollectionPageSchema,
  generateFAQSchema,
  generateToolListSchema,
} from '../components/SEO';

import PageLayout, { Card, Breadcrumb } from '../components/layouts/PageLayout';
import {
  getBestToolsPageBySlug,
  getToolsForPage,
  getRelatedPages,
} from '../data/bestToolsPages';

import { tools } from '../data/tools';
import { ToolLogo } from '../components/ToolLogos';

import {
  StarIcon,
  ArrowRightIcon,
  CheckIcon,
} from '../components/Icons';

import LastUpdated from '../components/LastUpdated';
import EditorialBlock from '../components/EditorialBlock';

type Tool = (typeof tools)[number];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getPricingStyle(pricing: string) {
  if (pricing === 'Free' || pricing === 'Freemium') {
    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  }

  return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
}

function AdSensePlaceholder({
  label = 'Advertisement',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-white/[0.10] bg-white/[0.02] p-6 text-center ${className}`}
    >
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-dark-300">
        AD
      </div>

      <p className="text-[12px] font-semibold uppercase tracking-wide text-dark-300">
        {label}
      </p>

      <p className="mt-1 text-[12px] text-dark-400">
        AdSense placeholder. Replace this block with your ad unit when ready.
      </p>
    </div>
  );
}

function AffiliateDisclosure() {
  return (
    <div className="rounded-2xl border border-brand-500/20 bg-brand-500/[0.06] p-4">
      <p className="text-[13px] leading-relaxed text-dark-200">
        <span className="font-semibold text-white">Affiliate disclosure:</span>{' '}
        Some links on this page may be affiliate links. If you buy through them,
        we may earn a commission at no extra cost to you. Our recommendations
        are based on usefulness, fit, and publicly available product information.
      </p>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
          {eyebrow}
        </div>
      )}

      <h2 className="text-2xl font-bold tracking-tight text-white">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-dark-300">
          {description}
        </p>
      )}
    </div>
  );
}

function ToolMiniCard({
  tool,
  index,
  pageSlug,
}: {
  tool: Tool;
  index: number;
  pageSlug: string;
}) {
  return (
    <Link
      to={`/tool/${tool.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-surface-2/50 p-5 transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:bg-white/[0.04]"
    >
      <div className="absolute right-4 top-4 rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] font-semibold text-dark-300">
        #{index + 1}
      </div>

      <div className="mb-4 flex items-start gap-3 pr-10">
        <ToolLogo
          toolId={tool.id}
          size={42}
          fallbackLetter={tool.logo}
          fallbackGradient={tool.gradient}
          className="rounded-xl"
        />

        <div className="min-w-0">
          <h3 className="truncate text-[16px] font-semibold text-white transition-colors group-hover:text-brand-400">
            {tool.name}
          </h3>

          <p className="mt-0.5 text-[12px] text-dark-400">
            {tool.category}
          </p>
        </div>
      </div>

      <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-dark-300">
        {tool.tagline}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <span
          className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold uppercase ${getPricingStyle(
            tool.pricing
          )}`}
        >
          {tool.pricing}
        </span>

        <span className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-dark-300">
          AI Tool
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-white/[0.05] pt-4">
        <span className="text-[12px] font-medium text-dark-300">
          View full review
        </span>

        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-400">
          Open
          <ArrowRightIcon size={12} />
        </span>
      </div>

      <div className="mt-3 rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] px-3 py-2">
        <p className="text-[11px] text-dark-400">
          Affiliate placeholder:{' '}
          <span className="text-dark-300">
            /tool/{tool.slug}?ref=best-{pageSlug}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default function BestToolsPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getBestToolsPageBySlug(slug || '');

  if (!page) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">
            Page Not Found
          </h1>

          <Link to="/categories" className="text-brand-400 hover:text-brand-300">
            Browse AI Tools
          </Link>
        </div>
      </PageLayout>
    );
  }

  const pageTools = getToolsForPage(page);
  const relatedPages = getRelatedPages(page.slug);

  const topTools = pageTools.slice(0, 5);
  const comparisonTools = pageTools.slice(0, 6);
  const featuredTools = pageTools.slice(0, 3);

  const tableOfContents = useMemo(() => {
    const baseItems = [
      { id: 'overview', label: 'Overview' },
      { id: 'top-picks', label: 'Top Picks' },
      { id: 'comparison', label: 'Comparison' },
      { id: 'buying-guide', label: 'Buying Guide' },
    ];

    const sectionItems = page.sections.map((section) => ({
      id: slugify(section.title),
      label: section.title,
    }));

    const endItems = [
      { id: 'related-tools', label: 'Related Tool Pages' },
      { id: 'faq', label: 'FAQ' },
      { id: 'related-guides', label: 'Related Guides' },
    ];

    return [...baseItems, ...sectionItems, ...endItems];
  }, [page.sections]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Best AI Tools', url: '/best' },
    {
      name: `Best AI Tools for ${page.audience}`,
      url: `/best/${page.slug}`,
    },
  ]);

  const faqSchema = generateFAQSchema(page.faqs);

  const collectionSchema = generateCollectionPageSchema({
    name: page.title,
    description: page.metaDescription,
    url: `/best/${page.slug}`,
  });

  const itemListSchema = generateToolListSchema(
    page.title,
    pageTools.map((tool, index) => ({
      name: tool.name,
      url: `https://nextgenai.tools/tool/${tool.slug}`,
      position: index + 1,
    }))
  );

  return (
    <>
      <SEO
        title={page.metaTitle}
        description={page.metaDescription}
        canonical={`/best/${page.slug}`}
        keywords={`best AI tools for ${page.audience.toLowerCase()}, AI tools ${page.audience.toLowerCase()}, ${page.audience.toLowerCase()} AI software`}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [
            breadcrumbSchema,
            faqSchema,
            collectionSchema,
            itemListSchema,
          ],
        }}
      />

      <PageLayout maxWidth="6xl">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Best AI Tools', href: '/best' },
            { label: `For ${page.audience}` },
          ]}
        />

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
                <span className="inline-flex items-center rounded-full border border-brand-500/25 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-400">
                  Premium Guide
                </span>

                <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-dark-200">
                  <StarIcon size={12} className="text-amber-400" />
                  Curated AI tools
                </span>

                <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-[12px] font-medium text-dark-300">
                  Updated for 2026
                </span>
              </div>

              <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                {page.heroTitle}
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-relaxed text-dark-200 sm:text-lg">
                {page.heroDescription}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#top-picks"
                  className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold text-white"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    See Top Picks
                    <ArrowRightIcon size={16} />
                  </span>
                </a>

                <a
                  href="#comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-5 py-3 text-[14px] font-semibold text-dark-100 transition-colors hover:border-white/[0.16] hover:bg-white/[0.06]"
                >
                  Compare Tools
                </a>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                <LastUpdated date={page.updatedAt} />

                <p className="text-[13px] text-dark-300">
                  These guides summarize public information and should be checked
                  against the latest official sources.
                </p>
              </div>
            </div>

            <Card className="relative">
              <div className="mb-4 text-[12px] font-semibold uppercase tracking-wide text-dark-300">
                Quick Stats
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                  <div className="text-2xl font-bold text-white">
                    {pageTools.length}
                  </div>
                  <div className="mt-1 text-[12px] text-dark-400">
                    Tools reviewed
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                  <div className="text-2xl font-bold text-white">
                    {page.sections.length}
                  </div>
                  <div className="mt-1 text-[12px] text-dark-400">
                    Categories
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                  <div className="text-2xl font-bold text-white">
                    {page.faqs.length}
                  </div>
                  <div className="mt-1 text-[12px] text-dark-400">
                    FAQ answers
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4">
                  <div className="text-2xl font-bold text-white">
                    2026
                  </div>
                  <div className="mt-1 text-[12px] text-dark-400">
                    Updated guide
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                {topTools.slice(0, 3).map((tool, index) => (
                  <Link
                    key={tool.id}
                    to={`/tool/${tool.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3 transition-colors hover:border-brand-500/25 hover:bg-white/[0.04]"
                  >
                    <div className="text-[12px] font-bold text-brand-400">
                      #{index + 1}
                    </div>

                    <ToolLogo
                      toolId={tool.id}
                      size={28}
                      fallbackLetter={tool.logo}
                      fallbackGradient={tool.gradient}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[13px] font-semibold text-white">
                        {tool.name}
                      </div>

                      <div className="truncate text-[11px] text-dark-400">
                        {tool.category}
                      </div>
                    </div>

                    <ArrowRightIcon size={12} className="text-dark-400" />
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </motion.section>

        <AffiliateDisclosure />

        {/* Table of Contents */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="my-10"
        >
          <Card>
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Table of Contents
                </h2>

                <p className="mt-1 text-[13px] text-dark-400">
                  Jump to the section that matters most for your workflow.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {tableOfContents.map((item, index) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 transition-all hover:border-brand-500/30 hover:bg-white/[0.04]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-[12px] font-bold text-brand-400">
                    {index + 1}
                  </span>

                  <span className="text-[13px] font-medium text-dark-200 group-hover:text-white">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </Card>
        </motion.section>

        <AdSensePlaceholder className="mb-12" />

        {/* Overview */}
        <motion.section
          id="overview"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mb-12 scroll-mt-28"
        >
          <Card>
            <EditorialBlock className="mb-6" />

            <SectionHeader
              eyebrow="Overview"
              title={`How to choose the best AI tools for ${page.audience}`}
              description={page.introduction}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                'Start with the workflow you want to improve first.',
                'Compare pricing, output quality, integrations, and learning curve.',
                'Test 2–3 tools with the same task before committing.',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4"
                >
                  <CheckIcon
                    size={16}
                    className="mb-3 text-emerald-400"
                  />

                  <p className="text-[13px] leading-relaxed text-dark-200">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Top Picks */}
        <motion.section
          id="top-picks"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="mb-12 scroll-mt-28"
        >
          <SectionHeader
            eyebrow="Top Picks"
            title={`Best AI tools for ${page.audience}`}
            description="A quick shortlist of the strongest tools to consider first."
          />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredTools.map((tool, index) => (
              <ToolMiniCard
                key={tool.id}
                tool={tool}
                index={index}
                pageSlug={page.slug}
              />
            ))}
          </div>
        </motion.section>

        {/* Comparison Cards */}
        <motion.section
          id="comparison"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mb-12 scroll-mt-28"
        >
          <SectionHeader
            eyebrow="Comparison"
            title="Quick Comparison"
            description="Compare the top tools by category, pricing, use case, and fit."
          />

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {comparisonTools.map((tool, index) => (
              <Card key={tool.id} className="relative overflow-hidden">
                <div className="absolute right-4 top-4 rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] font-bold text-dark-300">
                  #{index + 1}
                </div>

                <div className="mb-4 flex items-start gap-3 pr-10">
                  <ToolLogo
                    toolId={tool.id}
                    size={40}
                    fallbackLetter={tool.logo}
                    fallbackGradient={tool.gradient}
                    className="rounded-xl"
                  />

                  <div className="min-w-0">
                    <h3 className="truncate text-[15px] font-semibold text-white">
                      {tool.name}
                    </h3>

                    <p className="text-[12px] text-dark-400">
                      {tool.category}
                    </p>
                  </div>
                </div>

                <p className="mb-4 line-clamp-3 text-[13px] leading-relaxed text-dark-300">
                  {tool.tagline}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span
                    className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold uppercase ${getPricingStyle(
                      tool.pricing
                    )}`}
                  >
                    {tool.pricing}
                  </span>

                  <span className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] text-dark-300">
                    {tool.features.length} features
                  </span>
                </div>

                <Link
                  to={`/tool/${tool.slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-400 hover:text-brand-300"
                >
                  View tool page
                  <ArrowRightIcon size={13} />
                </Link>
              </Card>
            ))}
          </div>

          <Card padding="sm" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="px-4 py-4 text-left text-[13px] font-semibold text-dark-200">
                      Tool
                    </th>
                    <th className="px-4 py-4 text-left text-[13px] font-semibold text-dark-200">
                      Best For
                    </th>
                    <th className="px-4 py-4 text-left text-[13px] font-semibold text-dark-200">
                      Category
                    </th>
                    <th className="px-4 py-4 text-center text-[13px] font-semibold text-dark-200">
                      Pricing
                    </th>
                    <th className="px-4 py-4 text-center text-[13px] font-semibold text-dark-200">
                      Details
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {pageTools.map((tool) => (
                    <tr
                      key={tool.id}
                      className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <ToolLogo
                            toolId={tool.id}
                            size={32}
                            fallbackLetter={tool.logo}
                            fallbackGradient={tool.gradient}
                          />

                          <div>
                            <div className="text-[14px] font-medium text-white">
                              {tool.name}
                            </div>

                            <div className="text-[12px] text-dark-400">
                              /tool/{tool.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-[13px] text-dark-200">
                          {tool.tagline}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        <span className="text-[13px] text-dark-300">
                          {tool.category}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span
                          className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold uppercase ${getPricingStyle(
                            tool.pricing
                          )}`}
                        >
                          {tool.pricing}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <Link
                          to={`/tool/${tool.slug}`}
                          className="inline-flex items-center gap-1 text-[12px] font-medium text-brand-400 hover:text-brand-300"
                        >
                          View
                          <ArrowRightIcon size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.section>

        {/* Buying Guide */}
        <motion.section
          id="buying-guide"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mb-12 scroll-mt-28"
        >
          <SectionHeader
            eyebrow="Buying Guide"
            title="What to consider before choosing"
            description="Use these criteria to avoid buying a tool that looks impressive but does not fit your workflow."
          />

          <Card>
            <p className="text-[14px] leading-relaxed text-dark-200">
              {page.selectionGuide ||
                'Compare the tools below by fit, pricing, integrations, output quality, and the specific workflow you need to improve first. Start with a clear use case, test the same task across multiple tools, and choose the option that saves time or improves quality consistently.'}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  title: 'Workflow fit',
                  text: 'Does the tool solve a real recurring task or only feel interesting during a demo?',
                },
                {
                  title: 'Output quality',
                  text: 'Can it produce useful results with minimal editing, or does it create more review work?',
                },
                {
                  title: 'Pricing model',
                  text: 'Check usage limits, team seats, credits, exports, and upgrade requirements.',
                },
                {
                  title: 'Integrations',
                  text: 'Prioritize tools that connect with your existing stack and reduce manual copy-paste.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/[0.06] bg-dark-900/40 p-4"
                >
                  <h3 className="mb-2 text-[14px] font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-[13px] leading-relaxed text-dark-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        <AdSensePlaceholder label="Advertisement Placeholder — Mid Article" className="mb-12" />

        {/* Category Sections */}
        {page.sections.map((section, sectionIndex) => {
          const sectionId = slugify(section.title);

          const sectionTools = section.toolIds
            .map((toolId) => tools.find((tool) => tool.id === toolId))
            .filter((tool): tool is Tool => tool !== undefined);

          return (
            <motion.section
              id={sectionId}
              key={section.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.55,
                delay: 0.3 + sectionIndex * 0.05,
              }}
              className="mb-12 scroll-mt-28"
            >
              <SectionHeader
                eyebrow="Category"
                title={section.title}
                description={section.description}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {sectionTools.map((tool, index) => (
                  <Link
                    key={tool.id}
                    to={`/tool/${tool.slug}`}
                    className="group rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5 transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:bg-white/[0.04]"
                  >
                    <div className="mb-4 flex items-start gap-3">
                      <ToolLogo
                        toolId={tool.id}
                        size={42}
                        fallbackLetter={tool.logo}
                        fallbackGradient={tool.gradient}
                        className="rounded-xl"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="truncate text-[15px] font-semibold text-white transition-colors group-hover:text-brand-400">
                            {tool.name}
                          </h3>

                          <span className="shrink-0 text-[11px] font-bold text-brand-400">
                            #{index + 1}
                          </span>
                        </div>

                        <div className="mt-1 flex flex-wrap items-center gap-2">
                          <span className="text-[12px] text-dark-400">
                            {tool.category}
                          </span>

                          <span
                            className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${getPricingStyle(
                              tool.pricing
                            )}`}
                          >
                            {tool.pricing}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-dark-300">
                      {tool.tagline}
                    </p>

                    {tool.features.length > 0 && (
                      <ul className="mb-4 space-y-2">
                        {tool.features.slice(0, 3).map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start gap-2 text-[12px] text-dark-400"
                          >
                            <CheckIcon
                              size={12}
                              className="mt-0.5 shrink-0 text-emerald-400"
                            />

                            <span className="line-clamp-1">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="flex items-center justify-between border-t border-white/[0.05] pt-4">
                      <span className="text-[12px] font-medium text-dark-300">
                        Open listing
                      </span>

                      <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-400">
                        View
                        <ArrowRightIcon size={12} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* Internal Links / Related Resources */}
        {page.relatedResources && page.relatedResources.length > 0 && (
          <motion.section
            id="internal-links"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="mb-12 scroll-mt-28"
          >
            <SectionHeader
              eyebrow="Internal Links"
              title="Related Resources"
              description="Continue exploring guides, comparisons, and resources that help you choose better AI tools."
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {page.relatedResources.map((resource) => (
                <Link
                  key={resource.href}
                  to={resource.href}
                  className="group rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5 transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:bg-white/[0.04]"
                >
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-brand-400">
                    {resource.type}
                  </div>

                  <h3 className="mb-2 text-[15px] font-semibold text-white transition-colors group-hover:text-brand-400">
                    {resource.title}
                  </h3>

                  <p className="text-[13px] leading-relaxed text-dark-300">
                    {resource.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-400">
                    Read more
                    <ArrowRightIcon size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Related Tool Pages */}
        <motion.section
          id="related-tools"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4 }}
          className="mb-12 scroll-mt-28"
        >
          <SectionHeader
            eyebrow="Tool Pages"
            title="Related Tool Pages"
            description="Explore individual tool pages for more details, features, and alternatives."
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pageTools.slice(0, 6).map((tool) => (
              <Link
                key={tool.id}
                to={`/tool/${tool.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-surface-2/40 p-4 transition-all hover:border-brand-500/30 hover:bg-white/[0.04]"
              >
                <ToolLogo
                  toolId={tool.id}
                  size={40}
                  fallbackLetter={tool.logo}
                  fallbackGradient={tool.gradient}
                  className="rounded-xl"
                />

                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-[14px] font-semibold text-white group-hover:text-brand-400">
                    {tool.name}
                  </h3>

                  <p className="line-clamp-1 text-[12px] text-dark-400">
                    {tool.tagline}
                  </p>
                </div>

                <ArrowRightIcon size={14} className="shrink-0 text-dark-400" />
              </Link>
            ))}
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section
          id="faq"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.45 }}
          className="mb-12 scroll-mt-28"
        >
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            description={`Common questions about choosing AI tools for ${page.audience}.`}
          />

          <div className="space-y-4">
            {page.faqs.map((faq, index) => (
              <Card key={index}>
                <h3 className="mb-2 text-[15px] font-semibold text-white">
                  {faq.question}
                </h3>

                <p className="text-[13px] leading-relaxed text-dark-200">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Conclusion */}
        {page.conclusion && (
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.48 }}
            className="mb-12"
          >
            <Card>
              <SectionHeader
                eyebrow="Final Recommendation"
                title="Conclusion"
                description={page.conclusion}
              />
            </Card>
          </motion.section>
        )}

        <AdSensePlaceholder label="Advertisement Placeholder — Before Related Guides" className="mb-12" />

        {/* Related Best Pages */}
        {relatedPages.length > 0 && (
          <motion.section
            id="related-guides"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.5 }}
            className="mb-12 scroll-mt-28"
          >
            <SectionHeader
              eyebrow="Related Best Pages"
              title="Related Guides"
              description="Discover more curated AI tool guides for different use cases and audiences."
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.map((related) => (
                <Link
                  key={related.slug}
                  to={`/best/${related.slug}`}
                  className="group rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5 transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:bg-white/[0.04]"
                >
                  <div className="mb-3 inline-flex rounded-full border border-brand-500/20 bg-brand-500/10 px-2.5 py-1 text-[11px] font-semibold text-brand-400">
                    Best AI Tools
                  </div>

                  <h3 className="mb-2 text-[15px] font-semibold text-white transition-colors group-hover:text-brand-400">
                    Best AI Tools for {related.audience}
                  </h3>

                  <p className="line-clamp-3 text-[13px] leading-relaxed text-dark-300">
                    {related.heroDescription}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-[12px] font-semibold text-brand-400">
                    Read guide
                    <ArrowRightIcon size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* Newsletter */}
        <motion.section
          id="newsletter"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.55 }}
          className="mb-12"
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 sm:p-8">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />

            <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
              <div>
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
                  Newsletter
                </div>

                <h2 className="text-2xl font-bold text-white">
                  Get the best AI tools in your inbox
                </h2>

                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-dark-300">
                  Weekly AI tool picks, workflow ideas, comparison updates, and
                  practical guides for choosing better software.
                </p>
              </div>

              <form
                onSubmit={(event) => event.preventDefault()}
                className="rounded-2xl border border-white/[0.06] bg-dark-900/40 p-3"
              >
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="min-h-[46px] flex-1 rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 text-[14px] text-white placeholder-dark-400 outline-none transition-colors focus:border-brand-500/40"
                  />

                  <button
                    type="submit"
                    className="btn-primary inline-flex min-h-[46px] items-center justify-center rounded-xl px-5 text-[14px] font-semibold text-white"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Subscribe
                      <ArrowRightIcon size={14} />
                    </span>
                  </button>
                </div>

                <p className="mt-3 text-[11px] text-dark-400">
                  Placeholder form. Connect this to your email provider such as
                  Beehiiv, ConvertKit, Mailchimp, or Resend.
                </p>
              </form>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.6 }}
        >
          <Card className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400">
              <StarIcon size={20} />
            </div>

            <h2 className="mb-3 text-2xl font-bold text-white">
              Not sure which tool to choose?
            </h2>

            <p className="mx-auto mb-6 max-w-xl text-[14px] leading-relaxed text-dark-300">
              Take our quick quiz to get personalized AI tool recommendations
              based on your specific needs, budget, and workflow.
            </p>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/tool-finder"
                className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold text-white"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Find Your Perfect Tool
                  <ArrowRightIcon size={16} />
                </span>
              </Link>

              <Link
                to="/categories"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.04] px-6 py-3 text-[14px] font-semibold text-dark-100 transition-colors hover:border-white/[0.16] hover:bg-white/[0.06]"
              >
                Browse Categories
              </Link>
            </div>
          </Card>
        </motion.section>
      </PageLayout>
    </>
  );
}