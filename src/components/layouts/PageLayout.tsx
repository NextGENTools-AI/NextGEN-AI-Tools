import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '5xl' | '7xl';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '7xl': 'max-w-7xl',
};

export default function PageLayout({ 
  children, 
  className = '', 
  maxWidth = '7xl' 
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen pt-24 pb-20 ${className}`}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        {children}
      </div>
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
  centered = true 
}: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`mb-12 sm:mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : ''}`}
    >
      {badge && (
        <span className="inline-flex items-center px-3 py-1 text-[11px] font-semibold uppercase tracking-wide rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-4">
          {badge}
        </span>
      )}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-base sm:text-lg text-dark-200 leading-relaxed">
          {description}
        </p>
      )}
      {children}
    </motion.div>
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
    lg: 'gap-6',
  };

  return (
    <div className={`grid ${colClasses[columns]} ${gapClasses[gap]}`}>
      {children}
    </div>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', hover = true, padding = 'md' }: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div className={`
      rounded-2xl border border-white/[0.06] bg-surface-2/40 
      ${paddingClasses[padding]}
      ${hover ? 'card-hover' : ''}
      ${className}
    `}>
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap gap-2 text-[13px]">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && <span className="text-dark-500">/</span>}
            {item.href ? (
              <a 
                href={item.href} 
                className="text-dark-300 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-dark-400">{item.label}</span>
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
  sidebarPosition = 'right' 
}: SidebarLayoutProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {sidebarPosition === 'left' && (
        <div className="lg:col-span-1 space-y-6">{sidebar}</div>
      )}
      <div className={sidebarPosition === 'left' ? 'lg:col-span-2' : 'lg:col-span-2'}>{content}</div>
      {sidebarPosition === 'right' && (
        <div className="lg:col-span-1 space-y-6">{sidebar}</div>
      )}
    </div>
  );
}
