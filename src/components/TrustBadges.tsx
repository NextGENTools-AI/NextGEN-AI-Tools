const badges = [
  'Curated Resources',
  'Independent Research',
  'Updated Regularly',
  'Community Suggestions Welcome',
];

export default function TrustBadges({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {badges.map((badge) => (
        <li
          key={badge}
          className="flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3.5 py-1.5"
        >
          <span className="h-1 w-1 rounded-full bg-brand-400/80" aria-hidden="true" />
          <span className="font-mono text-[10.5px] font-medium uppercase tracking-[0.16em] text-dark-300">
            {badge}
          </span>
        </li>
      ))}
    </ul>
  );
}
