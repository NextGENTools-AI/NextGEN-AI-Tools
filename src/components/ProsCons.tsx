import { CheckIcon, XIcon } from './Icons';

interface ProsConsProps {
  pros: string[];
  cons: string[];
  className?: string;
}

export default function ProsCons({ pros, cons, className = '' }: ProsConsProps) {
  return (
    <section className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${className}`}>
      <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/15">
            <CheckIcon size={14} className="text-emerald-400" />
          </div>
          Pros
        </h2>
        <ul className="space-y-2.5">
          {pros.map((pro, index) => (
            <li key={`${pro}-${index}`} className="flex items-start gap-2.5">
              <CheckIcon size={14} className="mt-0.5 shrink-0 text-emerald-400" />
              <span className="text-[13px] text-dark-200">{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/15">
            <XIcon size={14} className="text-rose-400" />
          </div>
          Cons
        </h2>
        <ul className="space-y-2.5">
          {cons.map((con, index) => (
            <li key={`${con}-${index}`} className="flex items-start gap-2.5">
              <XIcon size={14} className="mt-0.5 shrink-0 text-rose-400" />
              <span className="text-[13px] text-dark-200">{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
