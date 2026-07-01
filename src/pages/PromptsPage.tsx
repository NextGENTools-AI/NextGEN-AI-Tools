import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import SEO from '../components/SEO';
import PageLayout, { Breadcrumb, Card } from '../components/layouts/PageLayout';
import { ArrowRightIcon, SearchIcon } from '../components/Icons';
import {
  promptCategories as sharedPromptCategories,
  prompts as sharedPrompts,
  type Prompt as SharedPrompt,
  type PromptCategory as SharedPromptCategory,
} from '../data/prompts';

export type PromptDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface PromptVariable {
  name: string;
  description: string;
  example: string;
}

export interface Prompt extends Omit<SharedPrompt, 'difficulty'> {
  difficulty: PromptDifficulty;
}

export interface PromptCategory extends Omit<SharedPromptCategory, 'count'> {}

export const promptCategories: PromptCategory[] = sharedPromptCategories.map(
  ({ slug, name, description, icon }) => ({
    slug,
    name,
    description,
    icon,
  })
);

export const prompts: Prompt[] = sharedPrompts.map((prompt) => ({
  ...prompt,
  difficulty: (prompt.difficulty as PromptDifficulty) ?? 'Intermediate',
}));

export function getAllPrompts(): Prompt[] {
  return prompts;
}

export function getPromptById(id: string): Prompt | undefined {
  return prompts.find((prompt) => prompt.id === id);
}

export function getPromptsByCategory(categorySlugOrName: string): Prompt[] {
  const normalized = categorySlugOrName.toLowerCase();

  return prompts.filter(
    (prompt) =>
      prompt.categorySlug.toLowerCase() === normalized ||
      prompt.category.toLowerCase() === normalized
  );
}

export function getPromptsByDifficulty(difficulty: PromptDifficulty): Prompt[] {
  return prompts.filter((prompt) => prompt.difficulty === difficulty);
}

export function searchPrompts(query: string): Prompt[] {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return prompts;
  }

  return prompts.filter((prompt) => {
    return (
      prompt.title.toLowerCase().includes(normalized) ||
      prompt.description.toLowerCase().includes(normalized) ||
      prompt.prompt.toLowerCase().includes(normalized) ||
      prompt.category.toLowerCase().includes(normalized) ||
      prompt.difficulty.toLowerCase().includes(normalized) ||
      prompt.tags.some((tag) => tag.toLowerCase().includes(normalized))
    );
  });
}

export function getFeaturedPrompts(limit = 12): Prompt[] {
  return [...prompts]
    .sort((a, b) => b.rating - a.rating || b.copyCount - a.copyCount)
    .slice(0, limit);
}

export function getPopularPrompts(limit = 12): Prompt[] {
  return [...prompts].sort((a, b) => b.copyCount - a.copyCount).slice(0, limit);
}

export function getRelatedPrompts(promptId: string, limit = 3): Prompt[] {
  const prompt = getPromptById(promptId);

  if (!prompt) {
    return [];
  }

  return prompts
    .filter(
      (item) =>
        item.id !== prompt.id &&
        (item.categorySlug === prompt.categorySlug ||
          item.tags.some((tag) => prompt.tags.includes(tag)))
    )
    .slice(0, limit);
}

export function getPromptStats() {
  return {
    totalPrompts: prompts.length,
    totalCategories: promptCategories.length,
    categories: promptCategories.map((category) => ({
      ...category,
      count: getPromptsByCategory(category.slug).length,
    })),
  };
}

export default function PromptsPage() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredPrompts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return prompts.filter((prompt) => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        prompt.title.toLowerCase().includes(normalizedQuery) ||
        prompt.description.toLowerCase().includes(normalizedQuery) ||
        prompt.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
        prompt.category.toLowerCase().includes(normalizedQuery);

      const matchesCategory =
        selectedCategory === 'all' || prompt.categorySlug === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === 'all' || prompt.difficulty === selectedDifficulty;

      return matchesQuery && matchesCategory && matchesDifficulty;
    });
  }, [query, selectedCategory, selectedDifficulty]);

  return (
    <>
      <SEO
        title="Prompt Library — AI Prompts for Writing, Coding, Marketing, and More"
        description="Browse a curated collection of high-performing AI prompts for writing, coding, marketing, research, and productivity."
        canonical="/prompts"
      />

      <PageLayout>
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Prompt Library' }]}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Prompt Library
          </h1>
          <p className="text-dark-300 max-w-2xl">
            Find ready-to-use prompts for writing, coding, marketing, design, and research.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-8 grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr]"
        >
          <label className="relative block">
            <span className="sr-only">Search prompts</span>
            <SearchIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search prompts"
              className="w-full rounded-2xl border border-white/[0.06] bg-surface-2/40 py-3 pl-11 pr-4 text-sm text-white outline-none ring-0"
            />
          </label>

          <label className="block">
            <span className="sr-only">Filter by category</span>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="w-full rounded-2xl border border-white/[0.06] bg-surface-2/40 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">All categories</option>
              {promptCategories.map((category) => (
                <option key={category.slug} value={category.slug}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Filter by difficulty</span>
            <select
              value={selectedDifficulty}
              onChange={(event) => setSelectedDifficulty(event.target.value)}
              className="w-full rounded-2xl border border-white/[0.06] bg-surface-2/40 px-4 py-3 text-sm text-white outline-none"
            >
              <option value="all">All difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </label>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-2">
          {filteredPrompts.map((prompt) => (
            <motion.article
              key={prompt.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-brand-400 mb-2">
                      {prompt.category}
                    </p>
                    <h2 className="text-lg font-semibold text-white">{prompt.title}</h2>
                  </div>
                  <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-[11px] text-dark-300">
                    {prompt.difficulty}
                  </span>
                </div>

                <p className="mt-3 text-sm text-dark-300 leading-relaxed">
                  {prompt.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {prompt.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px] text-dark-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-dark-400">
                    {prompt.copyCount.toLocaleString()} copies
                  </span>
                  <Link
                    to={`/prompts/${prompt.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-400 hover:text-brand-300"
                  >
                    View prompt
                    <ArrowRightIcon size={14} />
                  </Link>
                </div>
              </Card>
            </motion.article>
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="mt-8 rounded-2xl border border-white/[0.06] bg-surface-2/40 p-8 text-center text-dark-300">
            No prompts match your current filters.
          </div>
        )}
      </PageLayout>
    </>
  );
}
