import { Link } from 'react-router-dom';
import { ArrowRightIcon, CopyIcon, StarIcon } from './Icons';
import { getFeaturedPrompts } from '../data/prompts';
import { Section, SectionHeader, Reveal, Badge } from './ui';

const prompts = getFeaturedPrompts()
  .slice()
  .sort((a, b) => b.rating - a.rating || b.copyCount - a.copyCount)
  .slice(0, 3);

function difficultyTone(difficulty: string | undefined): 'sky' | 'emerald' | 'amber' | 'rose' {
  switch (difficulty) {
    case 'Beginner':
      return 'sky';
    case 'Intermediate':
      return 'emerald';
    case 'Advanced':
      return 'amber';
    default:
      return 'rose';
  }
}

export default function PromptTeaser() {
  return (
    <Section id="prompts">
      <SectionHeader
        eyebrow="Prompt library"
        title="Don't start from a blank prompt"
        description="Battle-tested prompts with variables, tips, and examples — copy one, fill in your context, and get a usable first draft in seconds."
        action={
          <Link
            to="/prompts"
            className="btn-secondary group rounded-xl px-5 py-2.5 text-[13.5px] font-semibold text-dark-100 hover:text-white"
          >
            <span className="flex items-center gap-2">
              Open the library
              <ArrowRightIcon size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
        {prompts.map((prompt, index) => (
          <Reveal key={prompt.id} delay={index * 70}>
            <Link
              to={`/prompts/${prompt.id}`}
              className="card-surface card-hover group flex h-full flex-col rounded-2xl p-5 sm:p-6"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">
                  {prompt.category}
                </span>
                <Badge tone={difficultyTone(prompt.difficulty)}>
                  {prompt.difficulty ?? 'Intermediate'}
                </Badge>
              </div>

              <h3 className="text-[16px] font-semibold leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-brand-300">
                {prompt.title}
              </h3>

              {/* Prompt preview — mono, like a real prompt */}
              <div className="mt-4 flex-1 rounded-xl border border-white/[0.05] bg-dark-950/60 p-4">
                <p className="font-mono text-[12px] leading-relaxed text-dark-300 line-clamp-4">
                  {prompt.prompt.trim().split('\n')[0]}
                  <span className="text-dark-500"> …</span>
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-4">
                <span className="inline-flex items-center gap-3 text-[12px] text-dark-400">
                  <span className="inline-flex items-center gap-1.5">
                    <CopyIcon size={13} />
                    {prompt.copyCount.toLocaleString()} copies
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <StarIcon size={13} className="text-amber-400" />
                    {prompt.rating.toFixed(1)}
                  </span>
                </span>
                <ArrowRightIcon
                  size={15}
                  className="text-dark-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-brand-300"
                />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
