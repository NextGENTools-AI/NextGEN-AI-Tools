import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronRightIcon } from '../Icons';
import { cn } from '../../utils/cn';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl' | '6xl' | '7xl';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

/**
 * Standard page shell: clears the fixed navbar, adds the ambient page glow,
 * and centers content at a consistent measure. Every inner page uses this.
 */
export default function PageLayout({
  children,
  className = '',
  maxWidth = '7xl',
}: PageLayoutProps) {
  return (
    <div className={cn('relative min-h-screen pb-24 pt-28 sm:pt-32', className)}>
      {/* Ambient page light */}
      <div className="pointer-events-none absolute inset-x-0 top-0 overflow-hidden" aria-hidden="true">
        <div
          className="aurora left-1/2 top-[-260px] h-[380px] w-[720px] -translate-x-1/2 opacity-[0.07]"
          style={{ background: 'radial-gradient(closest-side, #2e86ff 0%, transparent 100%)' }}
        />
      </div>

      <main id="main-content" className="relative">
        <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', maxWidthClasses[maxWidth])}>
          {children}
        </div>
      </main>
    </div>
  );
}

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  children?: ReactNode;
  centered?: boolean;
}

export function PageHeader({
  title,
  description,
  badge,
  children,
  centered = true,
}: PageHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={cn('mb-12 sm:mb-16', centered && 'mx-auto max-w-3xl text-center')}
    >
      {badge && (
        <span className="glass mb-5 inline-flex items-center rounded-full px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-brand-300">
          {badge}
        </span>
      )}
      <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-dark-200 sm:text-lg">
          {description}
        </p>
      )}
      {children}
    </motion.header>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Section({ children, className = '', delay = 0 }: SectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

interface CardGridProps {
  children: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

export function CardGrid({ children, columns = 3, gap = 'md' }: CardGridProps) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-3',
    md: 'gap-4 sm:gap-5',
    lg: 'gap-5 sm:gap-6',
  };

  return (
    <div className={cn('grid', colClasses[columns], gapClasses[gap])}>{children}</div>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({
  children,
  className = '',
  hover = true,
  padding = 'md',
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={cn(
        'card-surface rounded-2xl',
        paddingClasses[padding],
        hover && 'card-hover',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-10"
      aria-label="Breadcrumb"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px]">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRightIcon size={13} className="text-dark-500" aria-hidden="true" />
            )}
            {item.href ? (
              <a
                href={item.href}
                className="rounded text-dark-300 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-dark-400" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </motion.nav>
  );
}

interface SidebarLayoutProps {
  sidebar: ReactNode;
  content: ReactNode;
  sidebarPosition?: 'left' | 'right';
}

export function SidebarLayout({
  sidebar,
  content,
  sidebarPosition = 'right',
}: SidebarLayoutProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {sidebarPosition === 'left' && (
        <div className="space-y-6 lg:col-span-1">{sidebar}</div>
      )}
      <div className="lg:col-span-2">{content}</div>
      {sidebarPosition === 'right' && (
        <div className="space-y-6 lg:col-span-1">{sidebar}</div>
      )}
    </div>
  );
}
