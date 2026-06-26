import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema, generateCollectionPageSchema } from '../components/SEO';
import PageLayout, { Card, Breadcrumb } from '../components/layouts/PageLayout';
import { getAllBestToolsPages } from '../data/bestToolsPages';
import { ArrowRightIcon } from '../components/Icons';

export default function BestToolsIndexPage() {
  const pages = getAllBestToolsPages();

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Best AI Tools', url: '/best' },
  ]);

  const collectionSchema = generateCollectionPageSchema({
    name: 'Best AI Tools',
    description: 'Browse SEO-focused landing pages for the best AI tools by audience, use case, and budget.',
    url: '/best',
  });

  return (
    <>
      <SEO
        title="Best AI Tools by Use Case and Audience"
        description="Explore SEO-focused AI tool landing pages for students, developers, marketers, designers, creators, small business, productivity, and free tools."
        canonical="/best"
        keywords="best AI tools, AI tools directory, best AI tools for students, best AI tools for developers, free AI tools"
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [breadcrumbSchema, collectionSchema],
        }}
      />

      <PageLayout maxWidth="5xl">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Best AI Tools' }]} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-12 text-center">
          <span className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-400">
            SEO landing pages
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Best AI Tools by Use Case
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-dark-200">
            Use these focused guides to compare AI tools by audience, workflow, and budget without leaving the current directory experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {pages.map((page, index) => (
            <motion.div key={page.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.05 * index }}>
              <Link to={`/best/${page.slug}`} className="group block h-full rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6 transition-colors hover:border-brand-500/30 hover:bg-surface-2/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">{page.title}</h2>
                    <p className="mt-2 text-sm text-dark-300">{page.heroDescription}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-400">
                    Explore
                    <ArrowRightIcon size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="mt-12">
          <Card>
            <h2 className="text-xl font-semibold text-white">Why these pages matter</h2>
            <p className="mt-3 text-[14px] text-dark-200 leading-relaxed">
              These landing pages help the site capture higher-intent search terms while preserving the existing UI and navigation. They also create stronger internal linking between tools, comparisons, categories, and blog content.
            </p>
          </Card>
        </motion.section>
      </PageLayout>
    </>
  );
}
