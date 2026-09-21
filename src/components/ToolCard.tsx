import { Link } from 'react-router-dom';
import { ArrowRightIcon, StarIcon } from './Icons';
import { ToolLogo } from './ToolLogos';
import { Badge, pricingTone } from './ui';
import type { Tool } from '../data/tools';
import { cn } from '../utils/cn';

interface ToolCardProps {
  tool: Tool;
  className?: string;
  /** Hide the footer meta row (used in compact contexts) */
  compact?: boolean;
}

/**
 * The single canonical card for representing a tool anywhere in the product:
 * homepage, category pages, search results, finder results.
 */
export default function ToolCard({ tool, className, compact = false }: ToolCardProps) {
  return (
    <Link
      to={`/tool/${tool.slug}`}
      aria-label={`${tool.name} — ${tool.category}`}
      className={cn(
        'card-surface card-hover group flex h-full flex-col rounded-2xl p-5 sm:p-6',
        className,
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-start gap-3.5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-dark-800">
          <ToolLogo toolId={tool.id} size={30} fallbackLetter={tool.logo} fallbackGradient={tool.gradient} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[15.5px] font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-brand-300">
              {tool.name}
            </h3>
            <ArrowRightIcon
              size={14}
              className="shrink-0 -translate-x-1 text-brand-300 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            />
          </div>
          <span className="mt-0.5 block text-[12px] font-medium text-dark-300">{tool.category}</span>
        </div>
      </div>

      {/* Body */}
      <p className="mb-5 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-dark-200">
        {tool.tagline}
      </p>

      {/* Footer */}
      {!compact && (
        <div className="flex items-center justify-between border-t border-white/[0.05] pt-4">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-dark-300">
            <StarIcon size={13} className="text-amber-400" />
            {tool.rating.toFixed(1)}
            <span className="font-normal text-dark-400">· {tool.reviews} reviews</span>
          </span>
          <Badge tone={pricingTone(tool.pricing)}>{tool.pricing}</Badge>
        </div>
      )}
    </Link>
  );
}
