import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema, generateCollectionPageSchema, generateFAQSchema, generateToolListSchema } from '../components/SEO';
import PageLayout, { Card, Breadcrumb } from '../components/layouts/PageLayout';
import { getBestToolsPageBySlug, getToolsForPage, getRelatedPages } from '../data/bestToolsPages';
import { tools } from '../data/tools';
import { ToolLogo } from '../components/ToolLogos';
import { 
  StarIcon, ArrowRightIcon, CheckIcon
} from '../components/Icons';
import LastUpdated from '../components/LastUpdated';
import EditorialBlock from '../components/EditorialBlock';

export default function BestToolsPage() {
  const { slug } = useParams<{ slug: string }>();
  const page = getBestToolsPageBySlug(slug || '');
  
  if (!page) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
          <Link to="/categories" className="text-brand-400 hover:text-brand-300">
            Browse AI Tools
          </Link>
        </div>
      </PageLayout>
    );
  }
  
  const pageTools = getToolsForPage(page);
  const relatedPages = getRelatedPages(page.slug);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Best AI Tools', url: '/best' },
    { name: `Best AI Tools for ${page.audience}`, url: `/best/${page.slug}` },
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
          '@graph': [breadcrumbSchema, faqSchema, collectionSchema, itemListSchema],
        }}
      />

      <PageLayout maxWidth="5xl">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Best AI Tools', href: '/best' },
          { label: `For ${page.audience}` },
        ]} />

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-3 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
            Updated January 2025
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            {page.heroTitle}
          </h1>
          <p className="text-base sm:text-lg text-dark-200 max-w-2xl mx-auto">
            {page.heroDescription}
          </p>
          <div className="mt-4 flex flex-col items-center gap-2">
            <LastUpdated date={page.updatedAt} />
            <p className="text-[13px] text-dark-300">
              These guides summarize public information and should be checked against the latest official sources.
            </p>
          </div>
        </motion.div>

        {/* Quick Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Card>
            <h2 className="text-sm font-semibold text-dark-300 uppercase tracking-wide mb-4">Top Picks</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {pageTools.slice(0, 5).map((tool, index) => (
                <Link
                  key={tool.id}
                  to={`/tool/${tool.slug}`}
                  className="flex items-center gap-2 p-3 rounded-lg border border-white/[0.04] hover:border-brand-500/30 hover:bg-white/[0.02] transition-all group"
                >
                  <ToolLogo 
                    toolId={tool.id} 
                    size={24} 
                    fallbackLetter={tool.logo}
                    fallbackGradient={tool.gradient}
                  />
                  <div className="min-w-0">
                    <div className="text-[13px] font-medium text-white truncate group-hover:text-brand-400 transition-colors">
                      {tool.name}
                    </div>
                    <div className="text-[11px] text-dark-400">#{index + 1}</div>
                  </div>
                </Link>
              ))}
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
              {page.introduction}
            </p>
          </Card>
        </motion.section>

        {/* Buying Guide */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Buying Guide</h2>
          <Card>
            <p className="text-[14px] text-dark-200 leading-relaxed">
              {page.selectionGuide || 'Compare the tools below by fit, pricing, and the specific workflow you need to improve first.'}
            </p>
          </Card>
        </motion.section>

        {/* Comparison Table */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Quick Comparison</h2>
          <Card padding="sm" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    <th className="text-left py-4 px-4 text-[13px] font-semibold text-dark-200">Tool</th>
                    <th className="text-left py-4 px-4 text-[13px] font-semibold text-dark-200">Best For</th>
                    <th className="text-center py-4 px-4 text-[13px] font-semibold text-dark-200">Rating</th>
                    <th className="text-center py-4 px-4 text-[13px] font-semibold text-dark-200">Pricing</th>
                    <th className="text-center py-4 px-4 text-[13px] font-semibold text-dark-200"></th>
                  </tr>
                </thead>
                <tbody>
                  {pageTools.map((tool) => (
                    <tr key={tool.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <ToolLogo 
                            toolId={tool.id} 
                            size={32} 
                            fallbackLetter={tool.logo}
                            fallbackGradient={tool.gradient}
                          />
                          <div>
                            <div className="text-[14px] font-medium text-white">{tool.name}</div>
                            <div className="text-[12px] text-dark-400">{tool.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-[13px] text-dark-200">{tool.tagline}</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className="text-[12px] text-dark-400">View details</span>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-md uppercase ${
                          tool.pricing === 'Free' || tool.pricing === 'Freemium'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {tool.pricing}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-center">
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

        {/* Detailed Sections */}
        {page.sections.map((section, sectionIndex) => {
          const sectionTools = section.toolIds
            .map(id => tools.find(t => t.id === id))
            .filter((t): t is typeof tools[0] => t !== undefined);
          
          return (
            <motion.section
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + sectionIndex * 0.05 }}
              className="mb-12"
            >
              <h2 className="text-xl font-semibold text-white mb-2">{section.title}</h2>
              <p className="text-[14px] text-dark-300 mb-6">{section.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sectionTools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={`/tool/${tool.slug}`}
                    className="group card-hover rounded-xl border border-white/[0.06] bg-surface-2/40 p-5"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <ToolLogo 
                        toolId={tool.id} 
                        size={40} 
                        fallbackLetter={tool.logo}
                        fallbackGradient={tool.gradient}
                        className="rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[15px] font-semibold text-white group-hover:text-brand-400 transition-colors">
                          {tool.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[12px] text-dark-400">Open listing</span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase ${
                            tool.pricing === 'Free' || tool.pricing === 'Freemium'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {tool.pricing}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-[13px] text-dark-300 line-clamp-2 mb-3">
                      {tool.tagline}
                    </p>
                    <ul className="space-y-1">
                      {tool.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-[12px] text-dark-400">
                          <CheckIcon size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Link>
                ))}
              </div>
            </motion.section>
          );
        })}

        {/* Related Resources */}
        {page.relatedResources && page.relatedResources.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Related Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {page.relatedResources.map((resource) => (
                <Link
                  key={resource.href}
                  to={resource.href}
                  className="group card-hover rounded-xl border border-white/[0.06] bg-surface-2/40 p-5"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-wide text-brand-400 mb-2">
                    {resource.type}
                  </div>
                  <h3 className="text-[15px] font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-[13px] text-dark-300">{resource.description}</p>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* FAQs */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {page.faqs.map((faq, index) => (
              <Card key={index}>
                <h3 className="text-[15px] font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-[13px] text-dark-200 leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Conclusion */}
        {page.conclusion && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mb-12"
          >
            <Card>
              <h2 className="text-xl font-semibold text-white mb-3">Conclusion</h2>
              <p className="text-[14px] text-dark-200 leading-relaxed">{page.conclusion}</p>
            </Card>
          </motion.section>
        )}

        {/* Related Pages */}
        {relatedPages.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mb-12"
          >
            <h2 className="text-xl font-semibold text-white mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedPages.map((related) => (
                <Link
                  key={related.slug}
                  to={`/best/${related.slug}`}
                  className="group card-hover rounded-xl border border-white/[0.06] bg-surface-2/40 p-5"
                >
                  <h3 className="text-[15px] font-semibold text-white mb-2 group-hover:text-brand-400 transition-colors">
                    Best AI Tools for {related.audience}
                  </h3>
                  <p className="text-[13px] text-dark-300 line-clamp-2">
                    {related.heroDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-3 text-[12px] font-medium text-brand-400">
                    Read guide
                    <ArrowRightIcon size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="text-center">
            <h2 className="text-xl font-semibold text-white mb-3">
              Not sure which tool to choose?
            </h2>
            <p className="text-[14px] text-dark-300 mb-6 max-w-lg mx-auto">
              Take our quick quiz to get personalized AI tool recommendations based on your specific needs.
            </p>
            <Link
              to="/tool-finder"
              className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white"
            >
              <span className="relative z-10 flex items-center gap-2">
                Find Your Perfect Tool
                <ArrowRightIcon size={16} />
              </span>
            </Link>
          </Card>
        </motion.section>
      </PageLayout>
    </>
  );
}
