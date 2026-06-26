import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO, { generateArticleSchema, generateBreadcrumbSchema } from '../components/SEO';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import { getToolBySlug } from '../data/tools';
import { ChevronLeftIcon, TwitterIcon, LinkedInIcon } from '../components/Icons';
import EditorialBlock from '../components/EditorialBlock';
import LastUpdated from '../components/LastUpdated';

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug || '');

  if (!article) {
    return (
      <div className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-brand-400 hover:text-brand-300">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.slug);
  const relatedTools = article.relatedTools
    .map(slug => getToolBySlug(slug))
    .filter(Boolean);

  const articleSchema = generateArticleSchema({
    title: article.title,
    description: article.metaDescription,
    slug: article.slug,
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    author: article.author,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: article.title, url: `/blog/${article.slug}` },
  ]);

  // Parse content for rendering
  const contentSections = article.content.trim().split('\n\n').filter(Boolean);

  return (
    <>
      <SEO
        title={article.metaTitle}
        description={article.metaDescription}
        canonical={`/blog/${article.slug}`}
        keywords={article.tags.join(', ')}
        ogType="article"
        article={{
          publishedTime: article.publishedAt,
          modifiedTime: article.updatedAt,
          author: article.author,
          section: article.category,
          tags: article.tags,
        }}
        structuredData={{
          '@context': 'https://schema.org',
          '@graph': [articleSchema, breadcrumbSchema],
        }}
      />

      <article className="min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center gap-2 text-[13px]">
              <li>
                <Link to="/" className="text-dark-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li className="text-dark-500">/</li>
              <li>
                <Link to="/blog" className="text-dark-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li className="text-dark-500">/</li>
              <li className="text-dark-300 truncate max-w-[200px]">{article.title}</li>
            </ol>
          </motion.nav>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                {article.category}
              </span>
              <span className="text-[13px] text-dark-400">{article.readTime}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-[42px] font-bold text-white tracking-tight leading-tight mb-6">
              {article.title}
            </h1>

            <p className="text-lg text-dark-200 leading-relaxed mb-8">
              {article.excerpt}
            </p>

            <div className="mb-8">
              <LastUpdated date={article.updatedAt} />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500/20 to-cyan-500/20 flex items-center justify-center text-[16px] font-semibold text-white border border-white/[0.06]">
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div className="text-[14px] font-medium text-white">{article.author}</div>
                  <div className="text-[13px] text-dark-400">{article.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <time dateTime={article.publishedAt} className="text-[13px] text-dark-400">
                  Published {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
                <div className="hidden sm:flex items-center gap-2">
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(`https://nextgenai.tools/blog/${article.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] flex items-center justify-center text-dark-300 hover:text-white transition-all"
                    aria-label="Share on Twitter"
                  >
                    <TwitterIcon size={14} />
                  </a>
                  <a
                    href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(`https://nextgenai.tools/blog/${article.slug}`)}&title=${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] flex items-center justify-center text-dark-300 hover:text-white transition-all"
                    aria-label="Share on LinkedIn"
                  >
                    <LinkedInIcon size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.header>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08 }} className="mb-10">
            <EditorialBlock />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-invert prose-lg max-w-none mb-16"
          >
            {contentSections.map((section, index) => {
              const trimmedSection = section.trim();
              
              if (trimmedSection.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold text-white mt-12 mb-4 first:mt-0">
                    {trimmedSection.replace('## ', '')}
                  </h2>
                );
              }
              
              if (trimmedSection.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-semibold text-white mt-8 mb-3">
                    {trimmedSection.replace('### ', '')}
                  </h3>
                );
              }
              
              if (trimmedSection.startsWith('**') && trimmedSection.includes('**:')) {
                const parts = trimmedSection.split('**:');
                const title = parts[0].replace('**', '');
                const content = parts[1];
                return (
                  <p key={index} className="text-[15px] text-dark-200 leading-relaxed mb-4">
                    <strong className="text-white">{title}:</strong>{content}
                  </p>
                );
              }
              
              if (trimmedSection.startsWith('- ')) {
                const items = trimmedSection.split('\n').filter(line => line.startsWith('- '));
                return (
                  <ul key={index} className="list-disc list-inside space-y-2 mb-4">
                    {items.map((item, i) => (
                      <li key={i} className="text-[15px] text-dark-200">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              
              if (trimmedSection.startsWith('1. ') || trimmedSection.startsWith('| ')) {
                // Handle numbered lists and tables
                if (trimmedSection.startsWith('| ')) {
                  const rows = trimmedSection.split('\n').filter(row => row.startsWith('|'));
                  if (rows.length > 1) {
                    return (
                      <div key={index} className="overflow-x-auto mb-6">
                        <table className="w-full text-[13px] border-collapse">
                          <thead>
                            <tr className="border-b border-white/[0.08]">
                              {rows[0].split('|').filter(Boolean).map((cell, i) => (
                                <th key={i} className="px-4 py-3 text-left font-semibold text-white">
                                  {cell.trim()}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {rows.slice(2).map((row, i) => (
                              <tr key={i} className="border-b border-white/[0.04]">
                                {row.split('|').filter(Boolean).map((cell, j) => (
                                  <td key={j} className="px-4 py-3 text-dark-200">
                                    {cell.trim()}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );
                  }
                }
                const items = trimmedSection.split('\n').filter(line => /^\d+\.\s/.test(line));
                return (
                  <ol key={index} className="list-decimal list-inside space-y-2 mb-4">
                    {items.map((item, i) => (
                      <li key={i} className="text-[15px] text-dark-200">
                        {item.replace(/^\d+\.\s/, '')}
                      </li>
                    ))}
                  </ol>
                );
              }
              
              return (
                <p key={index} className="text-[15px] text-dark-200 leading-relaxed mb-4">
                  {trimmedSection}
                </p>
              );
            })}
          </motion.div>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-12 pb-12 border-b border-white/[0.06]"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[13px] text-dark-400 mr-2">Tags:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[12px] font-medium text-dark-300 rounded-lg border border-white/[0.06] bg-white/[0.02]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Related Tools */}
          {relatedTools.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Tools Mentioned in This Article</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedTools.map((tool) => tool && (
                  <Link
                    key={tool.id}
                    to={`/tool/${tool.slug}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-surface-2/40 hover:bg-surface-2/60 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-[13px] font-bold text-white border border-white/[0.06]`}>
                      {tool.logo}
                    </div>
                    <div>
                      <div className="text-[14px] font-medium text-white">{tool.name}</div>
                      <div className="text-[12px] text-dark-400">{tool.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <h2 className="text-xl font-semibold text-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    to={`/blog/${related.slug}`}
                    className="group block rounded-xl border border-white/[0.06] bg-surface-2/40 p-5 hover:bg-surface-2/60 transition-colors"
                  >
                    <span className="text-[11px] font-medium text-brand-400 uppercase tracking-wide">
                      {related.category}
                    </span>
                    <h3 className="text-[15px] font-semibold text-white mt-2 mb-2 group-hover:text-brand-400 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <span className="text-[12px] text-dark-400">{related.readTime}</span>
                  </Link>
                ))}
              </div>
            </motion.section>
          )}

          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 text-center"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-brand-400 hover:text-brand-300 transition-colors"
            >
              <ChevronLeftIcon size={16} />
              Back to all articles
            </Link>
          </motion.div>
        </div>
      </article>
    </>
  );
}
