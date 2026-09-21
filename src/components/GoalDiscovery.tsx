import { Link } from 'react-router-dom';
import {
  PenIcon, CodeIcon, VideoIcon, TrendingUpIcon, BriefcaseIcon, BrainIcon,
  ArrowRightIcon,
} from './Icons';
import { categories } from '../data/tools';
import { Section, SectionHeader, Reveal } from './ui';

function toolCount(slug: string): number {
  return categories.find((c) => c.slug === slug)?.toolCount ?? 0;
}

const goals = [
  {
    icon: PenIcon,
    title: 'Write and publish',
    description: 'Draft articles, copy, and docs with AI writing tools built for the job.',
    href: '/category/ai-writing',
    meta: () => `${toolCount('ai-writing')} writing tools`,
  },
  {
    icon: CodeIcon,
    title: 'Build and ship software',
    description: 'Code faster with assistants for generation, review, and debugging.',
    href: '/category/ai-coding',
    meta: () => `${toolCount('ai-coding')} coding tools`,
  },
  {
    icon: VideoIcon,
    title: 'Create video and visuals',
    description: 'Produce edits, avatars, thumbnails, and graphics without a studio.',
    href: '/category/ai-video-generation',
    meta: () => `${toolCount('ai-video-generation')} video tools`,
  },
  {
    icon: TrendingUpIcon,
    title: 'Grow an audience',
    description: 'Run marketing, SEO, and social with tools that compound your effort.',
    href: '/best/marketing',
    meta: () => 'Curated marketer stack',
  },
  {
    icon: BriefcaseIcon,
    title: 'Run a business',
    description: 'Automate operations, sales, support, and analysis end to end.',
    href: '/best/businesses',
    meta: () => 'Curated business stack',
  },
  {
    icon: BrainIcon,
    title: 'Learn something new',
    description: 'Study, summarize, and tutor with research-ready AI companions.',
    href: '/best/students',
    meta: () => 'Curated student stack',
  },
];

export default function GoalDiscovery() {
  return (
    <Section id="goals">
      <SectionHeader
        eyebrow="Start with a goal"
        title="What are you trying to get done?"
        description="Pick a goal and NextGEN takes you straight to the relevant corner of the directory — no wandering through a giant list."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {goals.map((goal, index) => {
          const Icon = goal.icon;
          return (
            <Reveal key={goal.title} delay={index * 60}>
              <Link
                to={goal.href}
                className="card-surface card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
              >
                {/* Hover light */}
                <span
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-500/[0.12] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />

                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-dark-100 transition-colors duration-300 group-hover:border-brand-400/40 group-hover:text-brand-300">
                  <Icon size={21} />
                </span>

                <h3 className="text-[17px] font-semibold tracking-tight text-white">
                  {goal.title}
                </h3>
                <p className="mt-2 flex-1 text-[13.5px] leading-relaxed text-dark-300">
                  {goal.description}
                </p>

                <span className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-dark-400">
                    {goal.meta()}
                  </span>
                  <ArrowRightIcon
                    size={15}
                    className="text-dark-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-300"
                  />
                </span>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
