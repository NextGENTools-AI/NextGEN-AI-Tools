import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import PageLayout, { Breadcrumb, Card } from '../components/layouts/PageLayout';
import EditorialBlock from '../components/EditorialBlock';
import LastUpdated from '../components/LastUpdated';

const methodologyPoints = [
  'We review public product pages, pricing pages, help centers, and comparable sources when building a listing or comparison.',
  'Categories are organized by practical use case and capability so visitors can compare tools in a more consistent way.',
  'Comparisons are written as research summaries rather than endorsements, and we note where information may be incomplete or change over time.',
  'Recommendations are based on research and publicly available information, and they may change as the tools evolve.',
  'We encourage readers to verify the latest pricing, feature limits, and availability on the official websites before making a decision.',
];

export default function EditorialPolicyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Editorial Policy', url: '/editorial-policy' },
  ]);

  return (
    <>
      <SEO
        title="Editorial Policy — Research-Based AI Tool Guidance"
        description="Read how NextGEN AI Tools selects resources, writes comparisons, and handles disclosures with a transparent editorial process."
        canonical="/editorial-policy"
        keywords="editorial policy, AI tools methodology, affiliate disclosure, research-based content"
        structuredData={breadcrumbSchema}
      />

      <PageLayout maxWidth="4xl">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Editorial Policy' }]} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
              Editorial Policy
            </span>
            <LastUpdated date="2025-01-24T00:00:00Z" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Transparent editorial standards for AI tool discovery
          </h1>
          <p className="text-base text-dark-200 leading-relaxed">
            Our goal is to help people compare AI tools with clear context and fewer unsupported claims. The information here is meant to be practical and research-based, not promotional.
          </p>
        </motion.div>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }} className="mb-8">
          <EditorialBlock />
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }} className="mb-8">
          <Card>
            <h2 className="text-xl font-semibold text-white mb-4">How we select AI tools</h2>
            <ul className="space-y-3 text-[14px] leading-relaxed text-dark-200">
              {methodologyPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-400" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.section>

        <motion.section id="affiliate-disclosure" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }} className="mb-8">
          <Card>
            <h2 className="text-xl font-semibold text-white mb-4">Affiliate disclosure</h2>
            <p className="text-[14px] leading-relaxed text-dark-200">
              We may earn a commission from some links at no extra cost to you. This disclosure is included because links may appear in the future and we want to be transparent about that possibility.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-dark-200">
              Our editorial approach is based on research and public information. If affiliate relationships are present, they do not change our commitment to clear, factual descriptions.
            </p>
          </Card>
        </motion.section>
      </PageLayout>
    </>
  );
}
