import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import PageLayout, { Card, Breadcrumb } from '../components/layouts/PageLayout';
import { getPromptBySlugOrId, getPromptsByCategory } from '../data/prompts';

import {
  StarIcon,
  CheckIcon,
  ArrowRightIcon,
  LightbulbIcon,
} from '../components/Icons';

import LastUpdated from '../components/LastUpdated';

function CopyIcon({
  size = 16,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5" />
    </svg>
  );
}

export default function PromptDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const prompt = getPromptBySlugOrId(slug || '');

  const [copied, setCopied] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  useEffect(() => {
    if (!prompt) return;

    let initialPrompt = prompt.prompt;

    prompt.variables?.forEach((variable) => {
      initialPrompt = initialPrompt.split(`[${variable.name}]`).join(
        `[${variable.example}]`
      );
    });

    setCustomPrompt(initialPrompt);
  }, [prompt]);

  if (!prompt) {
    return (
      <PageLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-white mb-4">
            Prompt Not Found
          </h1>

          <Link to="/prompts" className="text-brand-400 hover:text-brand-300">
            Back to Prompt Library
          </Link>
        </div>
      </PageLayout>
    );
  }

  const relatedPrompts = getPromptsByCategory(prompt.categorySlug)
    .filter((item) => item.id !== prompt.id)
    .slice(0, 3);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(customPrompt || prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Prompt Library', url: '/prompts' },
    { name: prompt.title, url: `/prompts/${prompt.id}` },
  ]);

  return (
    <>
      <SEO
        title={`${prompt.title} — AI Prompt Template`}
        description={prompt.description}
        canonical={`/prompts/${prompt.id}`}
        keywords={`AI prompt, ${prompt.tool} prompt, ${prompt.tags.join(', ')}`}
        structuredData={breadcrumbSchema}
      />

      <PageLayout maxWidth="5xl">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Prompts', href: '/prompts' },
            { label: prompt.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  {prompt.tool}
                </span>

                <span className="text-[13px] text-dark-400">
                  {prompt.category}
                </span>

                <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/[0.03] text-dark-300 border border-white/[0.06]">
                  {prompt.difficulty ?? 'Intermediate'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                {prompt.title}
              </h1>

              <p className="text-[15px] text-dark-200 leading-relaxed">
                {prompt.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 mt-4">
                <span className="text-[13px] text-dark-300">
                  Template ready to adapt
                </span>

                <span className="text-dark-500">·</span>

                <span className="text-[13px] text-dark-300">
                  {prompt.copyCount.toLocaleString()} copies
                </span>

                <span className="text-dark-500">·</span>

                <span className="flex items-center gap-1 text-[13px] text-dark-300">
                  <StarIcon size={12} className="text-amber-400" />
                  {prompt.rating}
                </span>
              </div>

              <div className="mt-4">
                <LastUpdated date={new Date().toISOString()} />
              </div>
            </motion.div>

            {/* Prompt Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <h2 className="text-[15px] font-semibold text-white">
                    Prompt Template
                  </h2>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-semibold transition-all ${
                      copied
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'btn-primary text-white'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {copied ? (
                        <CheckIcon size={14} />
                      ) : (
                        <CopyIcon size={14} />
                      )}

                      {copied ? 'Copied!' : 'Copy Prompt'}
                    </span>
                  </button>
                </div>

                <textarea
                  value={customPrompt}
                  onChange={(event) => setCustomPrompt(event.target.value)}
                  rows={14}
                  className="w-full bg-dark-900/50 border border-white/[0.06] rounded-xl px-4 py-3 text-[13px] text-dark-100 font-mono leading-relaxed focus:outline-none focus:border-brand-500/40 resize-y min-h-[320px]"
                />

                <p className="mt-3 text-[12px] text-dark-400">
                  Edit the prompt above to customize it for your needs, then
                  copy it to use in your favorite AI tool.
                </p>
              </Card>
            </motion.div>

            {/* Variables */}
            {prompt.variables && prompt.variables.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Card>
                  <h2 className="text-[15px] font-semibold text-white mb-4">
                    Variables to Customize
                  </h2>

                  <div className="space-y-3">
                    {prompt.variables.map((variable) => (
                      <div
                        key={variable.name}
                        className="p-3 rounded-lg bg-dark-900/50 border border-white/[0.04]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <code className="text-[13px] font-mono text-brand-400">
                              [{variable.name}]
                            </code>

                            <p className="text-[12px] text-dark-300 mt-1">
                              {variable.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-2">
                          <span className="text-[11px] text-dark-400">
                            Example:{' '}
                          </span>

                          <span className="text-[12px] text-dark-200">
                            {variable.example}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Tips */}
            {prompt.tips && prompt.tips.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <h2 className="text-[15px] font-semibold text-white mb-4 flex items-center gap-2">
                    <LightbulbIcon size={18} className="text-amber-400" />
                    Pro Tips
                  </h2>

                  <ul className="space-y-2">
                    {prompt.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-[13px] text-dark-200"
                      >
                        <CheckIcon
                          size={14}
                          className="text-emerald-400 shrink-0 mt-0.5"
                        />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <h3 className="text-[14px] font-semibold text-white mb-4">
                  Details
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.04]">
                    <span className="text-[13px] text-dark-300">
                      Best for
                    </span>

                    <Link
                      to={`/tool/${prompt.toolSlug}`}
                      className="text-[13px] font-medium text-brand-400 hover:text-brand-300"
                    >
                      {prompt.tool}
                    </Link>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.04]">
                    <span className="text-[13px] text-dark-300">
                      Category
                    </span>

                    <span className="text-[13px] font-medium text-white">
                      {prompt.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.04]">
                    <span className="text-[13px] text-dark-300">
                      Difficulty
                    </span>

                    <span className="text-[13px] font-medium text-white">
                      {prompt.difficulty ?? 'Intermediate'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2">
                    <span className="text-[13px] text-dark-300">
                      Rating
                    </span>

                    <div className="flex items-center gap-1">
                      <StarIcon size={12} className="text-amber-400" />

                      <span className="text-[13px] font-medium text-white">
                        {prompt.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Use Cases */}
            {prompt.useCases && prompt.useCases.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <Card>
                  <h3 className="text-[14px] font-semibold text-white mb-4">
                    Best For
                  </h3>

                  <ul className="space-y-2">
                    {prompt.useCases.map((useCase, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 text-[13px] text-dark-200"
                      >
                        <CheckIcon size={12} className="text-brand-400" />
                        {useCase}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            )}

            {/* Tags */}
            {prompt.tags && prompt.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <h3 className="text-[14px] font-semibold text-white mb-4">
                    Tags
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {prompt.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 text-[11px] font-medium text-dark-300 rounded-lg bg-white/[0.03] border border-white/[0.06]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Related Prompts */}
            {relatedPrompts.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
              >
                <Card>
                  <h3 className="text-[14px] font-semibold text-white mb-4">
                    Related Prompts
                  </h3>

                  <div className="space-y-3">
                    {relatedPrompts.map((related) => (
                      <Link
                        key={related.id}
                        to={`/prompts/${related.id}`}
                        className="block p-3 -mx-1 rounded-lg hover:bg-white/[0.03] transition-colors"
                      >
                        <h4 className="text-[13px] font-medium text-white hover:text-brand-400 transition-colors line-clamp-1">
                          {related.title}
                        </h4>

                        <span className="text-[11px] text-dark-400">
                          {related.tool}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <Link
                    to="/prompts"
                    className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-white/[0.04] text-[12px] font-medium text-brand-400 hover:text-brand-300"
                  >
                    View all prompts
                    <ArrowRightIcon size={12} />
                  </Link>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </PageLayout>
    </>
  );
}
  