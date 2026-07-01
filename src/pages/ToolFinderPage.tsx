import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import PageLayout from '../components/layouts/PageLayout';
import { tools } from '../data/tools';

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  StarIcon,
  CheckIcon,
  SparkleIcon,
  ZapIcon,
} from '../components/Icons';

type Tool = (typeof tools)[number];

interface Question {
  id: string;
  question: string;
  subtitle: string;
  options: {
    value: string;
    label: string;
    description: string;
    icon?: string;
  }[];
}

interface RecommendationResult {
  tool: Tool;
  score: number;
  reasons: string[];
}

const questions: Question[] = [
  {
    id: 'purpose',
    question: 'What do you primarily need AI for?',
    subtitle: 'Choose the workflow you want to improve first.',
    options: [
      {
        value: 'writing',
        label: 'Writing & Content',
        description: 'Blog posts, emails, captions, copywriting, and editing.',
      },
      {
        value: 'coding',
        label: 'Coding & Development',
        description: 'Code generation, debugging, review, and engineering help.',
      },
      {
        value: 'images',
        label: 'Image Generation',
        description: 'AI art, product visuals, graphics, and creative assets.',
      },
      {
        value: 'video',
        label: 'Video Creation',
        description: 'Video editing, avatars, clips, scripts, and production.',
      },
      {
        value: 'chat',
        label: 'Chat & Assistance',
        description: 'General AI assistants, reasoning, planning, and Q&A.',
      },
      {
        value: 'business',
        label: 'Business & Marketing',
        description: 'Analytics, operations, campaigns, sales, and strategy.',
      },
      {
        value: 'research',
        label: 'Research & Learning',
        description: 'Summaries, academic work, search, analysis, and studying.',
      },
      {
        value: 'productivity',
        label: 'Productivity',
        description: 'Task management, automation, meetings, and workflows.',
      },
    ],
  },
  {
    id: 'experience',
    question: "What's your experience level with AI tools?",
    subtitle: 'This helps us match tools by ease of use and depth.',
    options: [
      {
        value: 'beginner',
        label: 'Complete beginner',
        description: 'I want something simple and easy to start with.',
      },
      {
        value: 'some',
        label: 'Used a few tools',
        description: 'I understand the basics and want better recommendations.',
      },
      {
        value: 'experienced',
        label: 'Experienced user',
        description: 'I need strong output, features, and flexibility.',
      },
      {
        value: 'expert',
        label: 'Power user / Developer',
        description: 'I want advanced features, APIs, automation, or pro workflows.',
      },
    ],
  },
  {
    id: 'budget',
    question: "What's your budget preference?",
    subtitle: 'We will prioritize tools that match your pricing comfort zone.',
    options: [
      {
        value: 'free',
        label: 'Free tools only',
        description: 'Only show free or freemium options.',
      },
      {
        value: 'low',
        label: 'Under $20/month',
        description: 'Affordable tools with a strong free or starter plan.',
      },
      {
        value: 'medium',
        label: '$20–50/month',
        description: 'I can pay for better quality and more features.',
      },
      {
        value: 'high',
        label: 'No budget limit',
        description: 'Recommend the best fit, including premium and enterprise tools.',
      },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    subtitle: 'Pick the main factor that should influence your results.',
    options: [
      {
        value: 'quality',
        label: 'Best quality output',
        description: 'I care most about excellent results.',
      },
      {
        value: 'speed',
        label: 'Fastest results',
        description: 'I need quick answers and efficient workflows.',
      },
      {
        value: 'ease',
        label: 'Easiest to use',
        description: 'I want a simple interface and low learning curve.',
      },
      {
        value: 'features',
        label: 'Most features',
        description: 'I want advanced options and flexible capabilities.',
      },
      {
        value: 'value',
        label: 'Best value for money',
        description: 'I want the strongest tool for the price.',
      },
    ],
  },
];

const purposeCategoryMap: Record<string, string[]> = {
  writing: ['ai-writing', 'ai-copywriting', 'ai-content', 'ai-email'],
  coding: ['ai-coding', 'ai-development', 'ai-code-assistants'],
  images: ['ai-image-generation', 'ai-design', 'ai-art'],
  video: ['ai-video-generation', 'ai-video-editing'],
  chat: ['ai-chatbots', 'ai-assistants'],
  business: ['ai-business', 'ai-marketing', 'ai-sales', 'ai-analytics'],
  research: ['ai-research', 'ai-education', 'ai-search'],
  productivity: ['ai-productivity', 'ai-automation', 'ai-meetings'],
};

const purposeKeywordMap: Record<string, string[]> = {
  writing: ['writing', 'content', 'copy', 'email', 'blog', 'writer'],
  coding: ['coding', 'code', 'developer', 'programming', 'engineering'],
  images: ['image', 'design', 'art', 'visual', 'photo', 'creative'],
  video: ['video', 'avatar', 'editing', 'clips', 'media'],
  chat: ['chat', 'assistant', 'conversation', 'general'],
  business: ['business', 'marketing', 'sales', 'analytics', 'growth'],
  research: ['research', 'search', 'learning', 'education', 'study'],
  productivity: ['productivity', 'automation', 'workflow', 'meeting', 'tasks'],
};

const budgetPricingMap: Record<string, string[]> = {
  free: ['Free', 'Freemium'],
  low: ['Free', 'Freemium', 'Paid'],
  medium: ['Free', 'Freemium', 'Paid'],
  high: ['Free', 'Freemium', 'Paid', 'Enterprise'],
};

function priceBadgeClass(pricing: string) {
  if (pricing === 'Free' || pricing === 'Freemium') {
    return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
  }

  if (pricing === 'Enterprise') {
    return 'bg-violet-500/10 text-violet-400 border-violet-500/20';
  }

  return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
}

function getToolText(tool: Tool) {
  return [
    tool.name,
    tool.category,
    tool.categorySlug,
    tool.tagline,
    ...(tool.features || []),
  ]
    .join(' ')
    .toLowerCase();
}

function scoreTool(tool: Tool, answers: Record<string, string>): RecommendationResult {
  let score = tool.rating ? tool.rating * 10 : 40;
  const reasons: string[] = [];

  const toolText = getToolText(tool);

  if (answers.purpose) {
    const matchingCategories = purposeCategoryMap[answers.purpose] || [];
    const matchingKeywords = purposeKeywordMap[answers.purpose] || [];

    if (matchingCategories.includes(tool.categorySlug)) {
      score += 45;
      reasons.push('Strong category match');
    }

    const keywordMatches = matchingKeywords.filter((keyword) =>
      toolText.includes(keyword)
    );

    if (keywordMatches.length > 0) {
      score += Math.min(keywordMatches.length * 8, 32);
      reasons.push('Matches your workflow');
    }
  }

  if (answers.budget) {
    const allowedPricing = budgetPricingMap[answers.budget] || [];

    if (allowedPricing.includes(tool.pricing)) {
      score += 25;
      reasons.push('Fits your budget');
    } else {
      score -= 35;
    }

    if (answers.budget === 'free' && tool.pricing === 'Free') {
      score += 12;
      reasons.push('Free option');
    }

    if (answers.budget === 'low' && tool.pricing === 'Freemium') {
      score += 10;
      reasons.push('Good starter plan');
    }
  }

  if (answers.experience) {
    if (answers.experience === 'beginner') {
      if (tool.pricing === 'Free' || tool.pricing === 'Freemium') score += 8;
      if (toolText.includes('easy') || toolText.includes('simple')) score += 10;
      reasons.push('Beginner-friendly fit');
    }

    if (answers.experience === 'expert') {
      if (
        toolText.includes('api') ||
        toolText.includes('developer') ||
        toolText.includes('automation') ||
        toolText.includes('advanced')
      ) {
        score += 18;
        reasons.push('Advanced capabilities');
      }
    }

    if (answers.experience === 'experienced') {
      if (tool.features && tool.features.length >= 3) {
        score += 10;
        reasons.push('Feature-rich option');
      }
    }
  }

  if (answers.priority) {
    if (answers.priority === 'quality') {
      score += tool.rating ? tool.rating * 3 : 0;
      reasons.push('High-quality output potential');
    }

    if (answers.priority === 'features') {
      score += Math.min((tool.features?.length || 0) * 4, 20);
      reasons.push('Strong feature set');
    }

    if (answers.priority === 'value') {
      if (tool.pricing === 'Free' || tool.pricing === 'Freemium') {
        score += 18;
        reasons.push('Strong value');
      }
    }

    if (answers.priority === 'ease') {
      if (tool.pricing === 'Free' || tool.pricing === 'Freemium') score += 8;
      reasons.push('Easy to evaluate');
    }

    if (answers.priority === 'speed') {
      if (
        toolText.includes('fast') ||
        toolText.includes('instant') ||
        toolText.includes('automation') ||
        toolText.includes('workflow')
      ) {
        score += 14;
        reasons.push('Speed-focused fit');
      }
    }
  }

  return {
    tool,
    score,
    reasons: Array.from(new Set(reasons)).slice(0, 3),
  };
}

function getRecommendations(answers: Record<string, string>): RecommendationResult[] {
  const scored = tools
    .map((tool) => scoreTool(tool, answers))
    .sort((a, b) => b.score - a.score || b.tool.rating - a.tool.rating);

  return scored.slice(0, 12);
}

function getMatchLabel(score: number) {
  if (score >= 120) return 'Excellent match';
  if (score >= 95) return 'Strong match';
  if (score >= 75) return 'Good match';
  return 'Possible fit';
}

function getMatchPercent(score: number) {
  return Math.max(68, Math.min(99, Math.round(score / 1.35)));
}

function ToolCard({
  result,
  index,
  highlighted = false,
}: {
  result: RecommendationResult;
  index: number;
  highlighted?: boolean;
}) {
  const { tool, score, reasons } = result;
  const matchPercent = getMatchPercent(score);

  return (
    <Link
      to={`/tool/${tool.slug}`}
      className={`group relative block h-full overflow-hidden rounded-2xl border p-5 transition-all hover:-translate-y-1 hover:bg-white/[0.04] ${
        highlighted
          ? 'border-amber-500/25 bg-amber-500/[0.04]'
          : 'border-white/[0.06] bg-surface-2/40 hover:border-brand-500/30'
      }`}
    >
      {index === 0 && (
        <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-400">
          <ZapIcon size={10} />
          Suggested First
        </span>
      )}

      <div className="absolute right-4 top-4 rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[11px] font-semibold text-dark-300">
        {matchPercent}% match
      </div>

      <div className="mb-4 flex items-start gap-3 pr-20">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} border border-white/[0.08] text-[15px] font-bold text-white`}
        >
          {tool.logo}
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[16px] font-semibold text-white transition-colors group-hover:text-brand-400">
            {tool.name}
          </h3>

          <p className="mt-0.5 text-[12px] text-dark-400">
            {tool.category}
          </p>
        </div>
      </div>

      <p className="mb-4 line-clamp-3 text-[13px] leading-relaxed text-dark-300">
        {tool.tagline}
      </p>

      <div className="mb-4 flex flex-wrap gap-2">
        <span
          className={`rounded-lg border px-2.5 py-1 text-[11px] font-semibold uppercase ${priceBadgeClass(
            tool.pricing
          )}`}
        >
          {tool.pricing}
        </span>

        <span className="inline-flex items-center gap-1 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-dark-300">
          <StarIcon size={11} className="text-amber-400" />
          {tool.rating}
        </span>

        <span className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] font-medium text-dark-300">
          {getMatchLabel(score)}
        </span>
      </div>

      {reasons.length > 0 && (
        <ul className="mb-5 space-y-2">
          {reasons.map((reason) => (
            <li
              key={reason}
              className="flex items-start gap-2 text-[12px] text-dark-300"
            >
              <CheckIcon
                size={12}
                className="mt-0.5 shrink-0 text-emerald-400"
              />
              {reason}
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between border-t border-white/[0.05] pt-4">
        <span className="text-[12px] font-medium text-dark-300">
          Open tool page
        </span>

        <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-brand-400 transition-all group-hover:gap-1.5">
          View
          <ArrowRightIcon size={12} />
        </span>
      </div>
    </Link>
  );
}

export default function ToolFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [pricingFilter, setPricingFilter] = useState('all');

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  const recommendations = useMemo(() => {
    return showResults ? getRecommendations(answers) : [];
  }, [answers, showResults]);

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter(({ tool }) => {
      const matchesCategory =
        categoryFilter === 'all' || tool.categorySlug === categoryFilter;

      const matchesPricing =
        pricingFilter === 'all' || tool.pricing === pricingFilter;

      return matchesCategory && matchesPricing;
    });
  }, [recommendations, categoryFilter, pricingFilter]);

  const relatedTools = useMemo(() => {
    const selectedToolIds = new Set(recommendations.slice(0, 6).map((item) => item.tool.id));
    const topCategory = recommendations[0]?.tool.categorySlug;

    return tools
      .filter((tool) => !selectedToolIds.has(tool.id))
      .filter((tool) => !topCategory || tool.categorySlug === topCategory)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, [recommendations]);

  const availableCategories = useMemo(() => {
    const categoryMap = new Map<string, string>();

    recommendations.forEach(({ tool }) => {
      categoryMap.set(tool.categorySlug, tool.category);
    });

    return Array.from(categoryMap.entries()).map(([slug, name]) => ({
      slug,
      name,
    }));
  }, [recommendations]);

  const availablePricing = useMemo(() => {
    return Array.from(new Set(recommendations.map(({ tool }) => tool.pricing)));
  }, [recommendations]);

  const selectedPurposeLabel =
    questions[0].options.find((option) => option.value === answers.purpose)?.label ||
    'your workflow';

  const handleAnswer = (value: string) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value,
    };

    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep((currentStep) => currentStep + 1);
    } else {
      setShowResults(true);
      setCategoryFilter('all');
      setPricingFilter('all');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((currentStep) => currentStep - 1);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
    setCategoryFilter('all');
    setPricingFilter('all');
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'AI Tool Finder', url: '/tool-finder' },
  ]);

  return (
    <>
      <SEO
        title="AI Tool Finder — Find Your Perfect AI Tool"
        description="Answer a few quick questions and get personalized AI tool recommendations by category, pricing, experience level, and workflow priority."
        canonical="/tool-finder"
        keywords="AI tool finder, AI tool quiz, find AI tools, AI tool recommendations, best AI tool for me, AI software finder"
        structuredData={breadcrumbSchema}
      />

      <PageLayout maxWidth="6xl">
        {!showResults ? (
          <>
            {/* Premium Hero */}
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="relative mb-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.20),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 text-center sm:p-8 md:p-10"
            >
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="absolute -bottom-28 left-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

              <div className="relative mx-auto max-w-3xl">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-500/20 bg-brand-500/10">
                  <SparkleIcon size={28} className="text-brand-400" />
                </div>

                <span className="mb-4 inline-flex rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-400">
                  Personalized AI Tool Quiz
                </span>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Find your perfect AI tool in under 60 seconds
                </h1>

                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-dark-200 sm:text-lg">
                  Answer a few questions and get smart recommendations based on
                  your workflow, budget, experience level, and top priority.
                </p>
              </div>
            </motion.section>

            {/* Progress */}
            <div className="mx-auto mb-8 max-w-3xl">
              <div className="mb-2 flex items-center justify-between text-[13px] text-dark-400">
                <span>
                  Question {step + 1} of {questions.length}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-dark-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Questionnaire */}
            <AnimatePresence mode="wait">
              <motion.section
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.3 }}
                className="mx-auto max-w-4xl"
              >
                <div className="mb-8 text-center">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    {currentQuestion.question}
                  </h2>

                  <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-dark-300">
                    {currentQuestion.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleAnswer(option.value)}
                      className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5 text-left transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:bg-white/[0.04]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10">
                        <span className="text-[14px] font-bold text-brand-400">
                          {option.label.charAt(0)}
                        </span>
                      </div>

                      <div>
                        <span className="block text-[15px] font-semibold text-white transition-colors group-hover:text-brand-400">
                          {option.label}
                        </span>

                        <span className="mt-1 block text-[13px] leading-relaxed text-dark-400">
                          {option.description}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="inline-flex items-center gap-2 text-[14px] font-medium text-dark-300 transition-colors hover:text-white"
                    >
                      <ChevronLeftIcon size={16} />
                      Back
                    </button>
                  </div>
                )}
              </motion.section>
            </AnimatePresence>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            {/* Results Hero */}
            <section className="relative mb-10 overflow-hidden rounded-3xl border border-white/[0.08] bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 text-center sm:p-8 md:p-10">
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

              <div className="relative mx-auto max-w-3xl">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10">
                  <CheckIcon size={28} className="text-emerald-400" />
                </div>

                <span className="mb-4 inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
                  Personalized Results
                </span>

                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Your recommended AI tools
                </h1>

                <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-dark-200">
                  Based on your answers, we matched you with tools for{' '}
                  <span className="font-semibold text-white">
                    {selectedPurposeLabel}
                  </span>
                  . Use the filters below to narrow by category or pricing.
                </p>
              </div>
            </section>

            {/* Filters */}
            <section className="mb-8 rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end">
                <div>
                  <label className="mb-2 block text-[12px] font-semibold uppercase tracking-wide text-dark-300">
                    Category
                  </label>

                  <select
                    value={categoryFilter}
                    onChange={(event) => setCategoryFilter(event.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-dark-900/60 px-4 py-3 text-[14px] text-white outline-none transition-colors focus:border-brand-500/40"
                  >
                    <option value="all">All recommended categories</option>
                    {availableCategories.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-[12px] font-semibold uppercase tracking-wide text-dark-300">
                    Pricing
                  </label>

                  <select
                    value={pricingFilter}
                    onChange={(event) => setPricingFilter(event.target.value)}
                    className="w-full rounded-xl border border-white/[0.06] bg-dark-900/60 px-4 py-3 text-[14px] text-white outline-none transition-colors focus:border-brand-500/40"
                  >
                    <option value="all">All pricing</option>
                    {availablePricing.map((pricing) => (
                      <option key={pricing} value={pricing}>
                        {pricing}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCategoryFilter('all');
                    setPricingFilter('all');
                  }}
                  className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-[14px] font-semibold text-dark-200 transition-colors hover:border-white/[0.16] hover:text-white"
                >
                  Reset filters
                </button>
              </div>
            </section>

            {/* Recommended Tools */}
            <section className="mb-12">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
                    Recommended Tools
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    Best matches for you
                  </h2>

                  <p className="mt-2 text-[14px] text-dark-300">
                    Showing {filteredRecommendations.length} personalized
                    recommendations.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="self-start rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-3 text-[14px] font-semibold text-dark-200 transition-colors hover:border-white/[0.16] hover:text-white sm:self-auto"
                >
                  Start Over
                </button>
              </div>

              {filteredRecommendations.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredRecommendations.slice(0, 9).map((result, index) => (
                    <motion.div
                      key={result.tool.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ToolCard
                        result={result}
                        index={index}
                        highlighted={index === 0}
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-8 text-center">
                  <h3 className="text-lg font-semibold text-white">
                    No tools match these filters
                  </h3>

                  <p className="mt-2 text-[14px] text-dark-300">
                    Try removing a filter or restarting the quiz.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setCategoryFilter('all');
                      setPricingFilter('all');
                    }}
                    className="mt-5 rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-[13px] font-semibold text-brand-400"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <section className="mb-12">
                <div className="mb-6">
                  <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
                    Related Tools
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-white">
                    More tools to explore
                  </h2>

                  <p className="mt-2 text-[14px] text-dark-300">
                    Similar tools from the same category that may also fit your
                    workflow.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {relatedTools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/tool/${tool.slug}`}
                      className="group rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5 transition-all hover:-translate-y-1 hover:border-brand-500/30 hover:bg-white/[0.04]"
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} border border-white/[0.08] text-[13px] font-bold text-white`}
                        >
                          {tool.logo}
                        </div>

                        <div className="min-w-0">
                          <h3 className="truncate text-[14px] font-semibold text-white group-hover:text-brand-400">
                            {tool.name}
                          </h3>

                          <p className="text-[11px] text-dark-400">
                            {tool.category}
                          </p>
                        </div>
                      </div>

                      <p className="line-clamp-2 text-[12px] leading-relaxed text-dark-300">
                        {tool.tagline}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Newsletter */}
            <section className="mb-12 overflow-hidden rounded-3xl border border-brand-500/20 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.18),transparent_35%),rgba(99,102,241,0.06)] p-6 sm:p-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                <div>
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/10 text-brand-400">
                    <SparkleIcon size={20} />
                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    Get better AI tool recommendations weekly
                  </h2>

                  <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-dark-300">
                    Join our newsletter for new AI tools, comparisons, workflow
                    tips, and practical buying guides.
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
                    Placeholder form. Connect this to your newsletter provider.
                  </p>
                </form>
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-3xl border border-white/[0.08] bg-surface-2/40 p-6 text-center sm:p-8">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-400">
                <StarIcon size={20} />
              </div>

              <h2 className="text-2xl font-bold text-white">
                Want to compare everything manually?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-[14px] leading-relaxed text-dark-300">
                Browse all AI tool categories, compare pricing, and explore
                individual tool pages.
              </p>

              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/categories"
                  className="btn-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[14px] font-semibold text-white"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Browse All Tools
                    <ArrowRightIcon size={16} />
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-3 text-[14px] font-semibold text-dark-200 transition-colors hover:border-white/[0.16] hover:text-white"
                >
                  Retake Quiz
                </button>
              </div>
            </section>
          </motion.div>
        )}
      </PageLayout>
    </>
  );
}