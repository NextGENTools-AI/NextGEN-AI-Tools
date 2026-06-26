import { Card } from '../components/layouts/PageLayout';
import { StarIcon } from '../components/Icons';

interface ComparisonVerdictProps {
  summary: {
    overall: string;
    beginner: string;
    value: string;
    enterprise: string;
  };
}

export default function ComparisonVerdict({ summary }: ComparisonVerdictProps) {
  const items = [
    {
      title: 'Best overall',
      description: summary.overall,
      accent: 'bg-brand-500/10 text-brand-400',
    },
    {
      title: 'Best for beginners',
      description: summary.beginner,
      accent: 'bg-emerald-500/10 text-emerald-400',
    },
    {
      title: 'Best value',
      description: summary.value,
      accent: 'bg-cyan-500/10 text-cyan-400',
    },
    {
      title: 'Best enterprise choice',
      description: summary.enterprise,
      accent: 'bg-violet-500/10 text-violet-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item) => (
        <Card key={item.title} className="border border-white/[0.06]">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.accent}`}>
              <StarIcon size={18} />
            </div>
            <div>
              <h3 className="text-[14px] font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-[13px] text-dark-200 leading-relaxed">{item.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
