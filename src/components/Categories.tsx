import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';
import CategoryIcon from './CategoryIcon';
import { categories as dataCategories } from '../data/tools';
import { Section, SectionHeader, Reveal } from './ui';

// Show first 8 categories on homepage
const categories = dataCategories.slice(0, 8);

export default function Categories() {
  return (
    <Section id="categories">
      <SectionHeader
        eyebrow="Explore the directory"
        title="Every category, one standard of quality"
        description="Browse the full landscape by discipline — each category is curated, described in plain language, and kept current."
        action={
          <Link
            to="/categories"
            className="btn-secondary group rounded-xl px-5 py-2.5 text-[13.5px] font-semibold text-dark-100 hover:text-white"
          >
            <span className="flex items-center gap-2">
              All categories
              <ArrowRightIcon size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, index) => (
          <Reveal key={cat.slug} delay={index * 50}>
            <Link
              to={`/category/${cat.slug}`}
              className="card-surface card-hover group flex h-full items-center gap-4 rounded-2xl p-5"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105 ${cat.bgColor} ${cat.borderColor}`}
              >
                <CategoryIcon icon={cat.icon} size={22} className={cat.color} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14.5px] font-semibold tracking-tight text-white">
                  {cat.name}
                </span>
                <span className="mt-0.5 block font-mono text-[11.5px] uppercase tracking-wider text-dark-400">
                  {cat.toolCount} tools
                </span>
              </span>
              <ArrowRightIcon
                size={16}
                className="shrink-0 -translate-x-1 text-dark-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-brand-300 group-hover:opacity-100"
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
