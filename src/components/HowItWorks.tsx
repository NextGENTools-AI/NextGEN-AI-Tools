import { TargetIcon, BrainIcon, LayersIcon, CompassIcon, ZapIcon, CheckIcon } from './Icons';
import { Section, SectionHeader, Reveal } from './ui';

const steps = [
  {
    icon: TargetIcon,
    step: '01',
    title: 'State your goal',
    description: 'Describe the outcome you want in plain language — no keywords, no filters.',
  },
  {
    icon: BrainIcon,
    step: '02',
    title: 'NextGEN understands',
    description: 'Your goal is parsed into intent, workflow, and constraints like budget and skill level.',
  },
  {
    icon: LayersIcon,
    step: '03',
    title: 'Get a plan',
    description: 'The path is broken into steps so you can see exactly how the pieces fit together.',
  },
  {
    icon: CompassIcon,
    step: '04',
    title: 'Matched tools',
    description: 'Each step points to vetted tools from the directory — with honest pros, cons, and pricing.',
  },
  {
    icon: ZapIcon,
    step: '05',
    title: 'Act with prompts',
    description: 'Ready-to-use prompts and comparisons help you start producing, not researching.',
  },
  {
    icon: CheckIcon,
    step: '06',
    title: 'Reach the result',
    description: 'Ship the outcome you came for — and reuse the same path next time.',
  },
];

export default function HowItWorks() {
  return (
    <Section id="how-it-works">
      <SectionHeader
        align="center"
        eyebrow="How NextGEN works"
        title={
          <>
            From goal to result,<br className="hidden sm:block" /> in one guided path
          </>
        }
        description="Most directories hand you a list and wish you luck. NextGEN treats your goal as the starting point and builds the route around it."
      />

      <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <Reveal key={item.step} as="li" delay={index * 70}>
              <div className="card-surface card-hover group relative h-full overflow-hidden rounded-2xl p-6">
                {/* Step marker */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-brand-500/20 bg-brand-500/[0.08] text-brand-300 transition-colors duration-300 group-hover:border-brand-400/40 group-hover:bg-brand-500/[0.14]">
                    <Icon size={21} />
                  </span>
                  <span className="font-mono text-[12px] font-medium tracking-widest text-dark-500 transition-colors duration-300 group-hover:text-brand-400/70">
                    {item.step}
                  </span>
                </div>

                <h3 className="text-[16px] font-semibold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-dark-300">
                  {item.description}
                </p>

                {/* Connector to next card (desktop only) */}
                {index < steps.length - 1 && (
                  <span
                    className="pointer-events-none absolute -right-4 top-1/2 hidden h-px w-8 bg-gradient-to-r from-brand-500/40 to-transparent lg:block"
                    aria-hidden="true"
                  />
                )}
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
