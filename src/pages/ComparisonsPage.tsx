import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import PageLayout, { PageHeader, CardGrid, Card } from '../components/layouts/PageLayout';
import { getAllComparisons } from '../data/comparisons';
import { ArrowRightIcon } from '../components/Icons';

export default function ComparisonsPage() {
  const comparisons = getAllComparisons();
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Comparisons', url: '/compare' },
  ]);

  return (
    <>
      <SEO
        title="AI Tool Comparisons — Head-to-Head Analysis"
        description="Compare the best AI tools head-to-head. In-depth comparisons of ChatGPT vs Claude, Midjourney vs Flux, and more. Make informed decisions with our detailed analysis."
        canonical="/compare"
        keywords="AI tool comparison, ChatGPT vs Claude, Midjourney vs Flux, AI comparison, best AI tools"
        structuredData={breadcrumbSchema}
      />

      <PageLayout>
        <PageHeader
          title="AI Tool Comparisons"
          description="Head-to-head comparisons of the best AI tools. Detailed analysis of features, pricing, pros, cons, and which tool is best for your specific needs."
        />

        <CardGrid columns={2} gap="lg">
          {comparisons.map((comp, index) => (
            <motion.div
              key={comp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                to={`/compare/${comp.slug}`}
                className="group card-hover block rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6 hover:bg-surface-2/60"
              >
                {/* Tools */}
                <div className="flex items-center justify-center gap-4 mb-5">
                  <div className="text-center">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${comp.toolA.gradient} flex items-center justify-center text-lg font-bold text-white border border-white/[0.08] mx-auto mb-2`}>
                      {comp.toolA.logo}
                    </div>
                    <span className="text-[13px] font-medium text-white">{comp.toolA.name}</span>
                  </div>
                  
                  <span className="text-lg font-bold text-dark-400 pb-6">VS</span>
                  
                  <div className="text-center">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${comp.toolB.gradient} flex items-center justify-center text-lg font-bold text-white border border-white/[0.08] mx-auto mb-2`}>
                      {comp.toolB.logo}
                    </div>
                    <span className="text-[13px] font-medium text-white">{comp.toolB.name}</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-white text-center mb-3 group-hover:text-brand-400 transition-colors">
                  {comp.toolA.name} vs {comp.toolB.name}
                </h2>

                {/* Winner badge */}
                <div className="text-center mb-4">
                  <span className={`inline-flex items-center px-3 py-1 text-[11px] font-semibold rounded-full ${
                    comp.winner === 'tie' 
                      ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                      : comp.winner === 'A'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  }`}>
                    {comp.winner === 'tie' 
                      ? 'Tie — Both Excel' 
                      : `Winner: ${comp.winner === 'A' ? comp.toolA.name : comp.toolB.name}`}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[13px] text-dark-300 text-center mb-4 line-clamp-2">
                  {comp.winnerReason}
                </p>

                {/* CTA */}
                <div className="flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-400 group-hover:gap-2 transition-all">
                    Read full comparison
                    <ArrowRightIcon size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </CardGrid>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-2">Can't find the comparison you need?</h3>
            <p className="text-[14px] text-dark-300 mb-4">
              We're constantly adding new comparisons. Let us know which tools you'd like us to compare.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-brand-400 hover:text-brand-300"
            >
              Request a comparison
              <ArrowRightIcon size={14} />
            </Link>
          </Card>
        </motion.div>
      </PageLayout>
    </>
  );
}
