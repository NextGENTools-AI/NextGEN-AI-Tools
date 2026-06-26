const badges = [
  'Curated Resources',
  'Independent Research',
  'Updated Regularly',
  'Community Suggestions Welcome',
];

export default function TrustBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {badges.map((badge) => (
        <span
          key={badge}
          className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-dark-300"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}
