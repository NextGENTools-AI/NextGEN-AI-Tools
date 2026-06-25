/**
 * Ad Slot Architecture
 * Clean, production-ready ad placements.
 * Enable ads by setting `adsEnabled = true` in the config below.
 * Slots render nothing when disabled — zero layout shift.
 */

import React from 'react';

const adsEnabled = false; // flip to true when AdSense is approved

type SlotVariant = 'header-banner' | 'sidebar' | 'in-content' | 'footer-banner';

interface AdSlotProps {
  variant: SlotVariant;
  className?: string;
}

const dimensions: Record<SlotVariant, { label: string; className: string }> = {
  'header-banner':  { label: 'Header Banner — 728 x 90',   className: 'h-[90px] max-w-[728px]' },
  'sidebar':        { label: 'Sidebar — 300 x 250',         className: 'h-[250px] w-[300px]' },
  'in-content':     { label: 'In-Content — 728 x 90',       className: 'h-[90px] max-w-[728px]' },
  'footer-banner':  { label: 'Footer Banner — 970 x 90',    className: 'h-[90px] max-w-[970px]' },
};

const AdSlot: React.FC<AdSlotProps> = ({ variant, className = '' }) => {
  if (!adsEnabled) return null;

  const { label, className: sizeClass } = dimensions[variant];

  return (
    <div
      className={`mx-auto flex items-center justify-center rounded-lg border border-dashed border-white/[0.06] bg-surface-2/20 text-dark-500 text-[11px] ${sizeClass} ${className}`}
      data-ad-slot={variant}
      aria-hidden="true"
    >
      {label}
    </div>
  );
};

export default AdSlot;
