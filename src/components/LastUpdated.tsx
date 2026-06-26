interface LastUpdatedProps {
  date: string;
  className?: string;
}

export default function LastUpdated({ date, className = '' }: LastUpdatedProps) {
  const parsedDate = new Date(date);
  const isValidDate = !Number.isNaN(parsedDate.getTime());

  const formattedDate = isValidDate
    ? parsedDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'regularly';

  return (
    <div className={`inline-flex items-center gap-2 text-[13px] text-dark-400 ${className}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
      <span>Last updated {formattedDate}</span>
    </div>
  );
}
