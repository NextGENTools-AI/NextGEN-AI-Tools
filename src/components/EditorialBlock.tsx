import { SparkleIcon, ShieldIcon, RotateCcwIcon, UsersIcon } from './Icons';

const points = [
  {
    title: 'Reviewed by NextGEN AI Tools',
    description: 'We review publicly available information and keep the content grounded in current product details.',
    icon: ShieldIcon,
  },
  {
    title: 'Research-based content',
    description: 'The guidance here is based on published product information, documentation, and practical comparison notes.',
    icon: SparkleIcon,
  },
  {
    title: 'Updated regularly',
    description: 'We refresh listings and guides as products, features, and pricing change.',
    icon: RotateCcwIcon,
  },
  {
    title: 'Community suggestions welcome',
    description: 'If you see outdated information, please let us know so we can review it.',
    icon: UsersIcon,
  },
];

export default function EditorialBlock({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5 sm:p-6 ${className}`}>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-400">
          Editorial Note
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {points.map((point) => {
          const Icon = point.icon;
          return (
            <div key={point.title} className="rounded-xl border border-white/[0.05] bg-dark-900/40 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10 text-brand-400">
                  <Icon size={16} />
                </div>
                <h3 className="text-[13px] font-semibold text-white">{point.title}</h3>
              </div>
              <p className="text-[12px] leading-relaxed text-dark-300">{point.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
