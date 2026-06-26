import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema, generateFAQSchema } from '../components/SEO';
import PageLayout, { Card, Breadcrumb } from '../components/layouts/PageLayout';
import { getComparisonBySlug, getRelatedComparisons } from '../data/comparisons';
import { 
  CheckIcon, XIcon, StarIcon, ArrowRightIcon
} from '../components/Icons';
import LastUpdated from '../components/LastUpdated';
import EditorialBlock from '../components/EditorialBlock';

export default function ComparisonPage() {
  const { slug } = useParams<{ slug: string }>();
  const comparison = getComparisonBySlug(slug || '');
  
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
    { name: 'Home', url: '/' },
    { name: 'Comparisons', url: '/compare' },
    { name: comparison.title, url: `/compare/${comparison.slug}` },
  ]);
  
  const faqSchema = generateFAQSchema(comparison.faq);

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

      <PageLayout maxWidth="5xl">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Comparisons', href: '/compare' },
          { label: `${comparison.toolA.name} vs ${comparison.toolB.name}` },
        ]} />

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 sm:gap-8 mb-6">
            <div className="text-center">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${comparison.toolA.gradient} flex items-center justify-center text-xl sm:text-2xl font-bold text-white border border-white/[0.08] mx-auto mb-2`}>
                {comparison.toolA.logo}
              </div>
              <span className="text-[14px] sm:text-[15px] font-semibold text-white">{comparison.toolA.name}</span>
            </div>
            
            <div className="text-2xl sm:text-3xl font-bold text-dark-400">VS</div>
            
            <div className="text-center">
              <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${comparison.toolB.gradient} flex items-center justify-center text-xl sm:text-2xl font-bold text-white border border-white/[0.08] mx-auto mb-2`}>
                {comparison.toolB.logo}
              </div>
              <span className="text-[14px] sm:text-[15px] font-semibold text-white">{comparison.toolB.name}</span>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            {comparison.title}
          </h1>
          
          <div className="mt-3 flex flex-col items-center gap-2">
            <LastUpdated date={comparison.updatedAt} />
            <p className="text-[13px] text-dark-300">
              Comparisons are research summaries based on public information and may change as products evolve.
            </p>
          </div>
        </motion.div>

        {/* Quick Verdict */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Card padding="lg" className={`border-2 ${
            comparison.winner === 'A' ? 'border-emerald-500/30' :
            comparison.winner === 'B' ? 'border-cyan-500/30' :
            'border-brand-500/30'
          }`}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                comparison.winner === 'A' ? 'bg-emerald-500/10 text-emerald-400' :
                comparison.winner === 'B' ? 'bg-cyan-500/10 text-cyan-400' :
                'bg-brand-500/10 text-brand-400'
              }`}>
                <StarIcon size={24} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white mb-2">
                  {comparison.winner === 'tie' 
                    ? 'Verdict: It\'s a Tie' 
                    : `Winner: ${comparison.winner === 'A' ? comparison.toolA.name : comparison.toolB.name}`}
                </h2>
                <p className="text-[14px] text-dark-200">{comparison.winnerReason}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-12"
        >
          <Card>
            <EditorialBlock className="mb-6" />
            <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
            <p className="text-[14px] text-dark-200 leading-relaxed">
              {comparison.introduction}
            </p>
          </Card>
        </motion.section>

        {/* Feature Comparison Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Feature Comparison</h2>
          <Card padding="sm" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-4 px-4 text-[13px] font-semibold text-dark-200">Feature</th>
                    <th className="text-center py-4 px-4 text-[13px] font-semibold text-white">{comparison.toolA.name}</th>
                    <th className="text-center py-4 px-4 text-[13px] font-semibold text-white">{comparison.toolB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.features.map((feature, index) => (
                    <tr key={index} className="border-b border-white/[0.04] last:border-0">
                      <td className="py-3 px-4 text-[13px] text-white font-medium">{feature.name}</td>
                      <td className={`py-3 px-4 text-center text-[13px] ${feature.winner === 'A' ? 'bg-emerald-500/5' : ''}`}>
                        {typeof feature.toolA === 'boolean' ? (
                          feature.toolA ? (
                            <CheckIcon size={16} className="text-emerald-400 mx-auto" />
                          ) : (
                            <XIcon size={16} className="text-dark-500 mx-auto" />
                          )
                        ) : (
                          <span className={feature.winner === 'A' ? 'text-emerald-400 font-medium' : 'text-dark-200'}>
                            {feature.toolA}
                          </span>
                        )}
                      </td>
                      <td className={`py-3 px-4 text-center text-[13px] ${feature.winner === 'B' ? 'bg-cyan-500/5' : ''}`}>
                        {typeof feature.toolB === 'boolean' ? (
                          feature.toolB ? (
                            <CheckIcon size={16} className="text-emerald-400 mx-auto" />
                          ) : (
                            <XIcon size={16} className="text-dark-500 mx-auto" />
                          )
                        ) : (
                          <span className={feature.winner === 'B' ? 'text-cyan-400 font-medium' : 'text-dark-200'}>
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

        {/* Pricing Comparison */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Pricing Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${comparison.toolA.gradient} flex items-center justify-center text-[12px] font-bold text-white`}>
                  {comparison.toolA.logo}
                </div>
                {comparison.toolA.name}
              </h3>
              <div className="space-y-2">
                {comparison.pricingComparison.toolA.map((plan, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-[13px] text-dark-200">{plan.plan}</span>
                    <span className="text-[13px] font-medium text-white">{plan.price}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card>
              <h3 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${comparison.toolB.gradient} flex items-center justify-center text-[12px] font-bold text-white`}>
                  {comparison.toolB.logo}
                </div>
                {comparison.toolB.name}
              </h3>
              <div className="space-y-2">
                {comparison.pricingComparison.toolB.map((plan, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-[13px] text-dark-200">{plan.plan}</span>
                    <span className="text-[13px] font-medium text-white">{plan.price}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.section>

        {/* Pros & Cons */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Pros & Cons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tool A */}
            <Card>
              <h3 className="text-[15px] font-semibold text-white mb-4">{comparison.toolA.name}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[12px] font-semibold text-emerald-400 uppercase tracking-wide mb-2">Pros</h4>
                  <ul className="space-y-1.5">
                    {comparison.prosConsA.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-dark-200">
                        <CheckIcon size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12px] font-semibold text-rose-400 uppercase tracking-wide mb-2">Cons</h4>
                  <ul className="space-y-1.5">
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
            <Card>
              <h3 className="text-[15px] font-semibold text-white mb-4">{comparison.toolB.name}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-[12px] font-semibold text-emerald-400 uppercase tracking-wide mb-2">Pros</h4>
                  <ul className="space-y-1.5">
                    {comparison.prosConsB.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-[13px] text-dark-200">
                        <CheckIcon size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-[12px] font-semibold text-rose-400 uppercase tracking-wide mb-2">Cons</h4>
                  <ul className="space-y-1.5">
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

        {/* Use Case Winners */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Best For Each Use Case</h2>
          <Card padding="sm">
            <div className="divide-y divide-white/[0.04]">
              {comparison.useCases.map((uc, index) => (
                <div key={index} className="flex items-start gap-4 p-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    uc.winner === 'A' ? 'bg-emerald-500/10 text-emerald-400' :
                    uc.winner === 'B' ? 'bg-cyan-500/10 text-cyan-400' :
                    'bg-brand-500/10 text-brand-400'
                  }`}>
                    <span className="text-[11px] font-bold">
                      {uc.winner === 'tie' ? '=' : uc.winner === 'A' ? comparison.toolA.logo : comparison.toolB.logo}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-semibold text-white">{uc.useCase}</h4>
                    <p className="text-[13px] text-dark-300">{uc.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>

        {/* Final Verdict */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Final Verdict</h2>
          <Card>
            <p className="text-[14px] text-dark-200 leading-relaxed mb-6">{comparison.verdict}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                to={`/tool/${comparison.toolA.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all"
              >
                View {comparison.toolA.name}
                <ArrowRightIcon size={14} />
              </Link>
              <Link
                to={`/tool/${comparison.toolB.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium text-white border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.02] transition-all"
              >
                View {comparison.toolB.name}
                <ArrowRightIcon size={14} />
              </Link>
            </div>
          </Card>
        </motion.section>

        {/* FAQ */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {comparison.faq.map((item, index) => (
              <Card key={index}>
                <h3 className="text-[15px] font-semibold text-white mb-2">{item.question}</h3>
                <p className="text-[13px] text-dark-200">{item.answer}</p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Related Comparisons</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedComparisons.map((comp) => (
                <Link
                  key={comp.id}
                  to={`/compare/${comp.slug}`}
                  className="group card-hover rounded-xl border border-white/[0.06] bg-surface-2/40 p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${comp.toolA.gradient} flex items-center justify-center text-[11px] font-bold text-white`}>
                      {comp.toolA.logo}
                    </div>
                    <span className="text-dark-400 text-[12px]">vs</span>
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${comp.toolB.gradient} flex items-center justify-center text-[11px] font-bold text-white`}>
                      {comp.toolB.logo}
                    </div>
                  </div>
                  <h3 className="text-[14px] font-medium text-white group-hover:text-brand-400 transition-colors">
                    {comp.toolA.name} vs {comp.toolB.name}
                  </h3>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </PageLayout>
    </>
  );
}
