import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './Icons';
import { getFeaturedTools } from '../data/tools';
import ToolCard from './ToolCard';
import { Section, SectionHeader, Reveal } from './ui';

const tools = getFeaturedTools();

export default function FeaturedTools() {
  return (
    <Section id="featured">
      <SectionHeader
        eyebrow="Vetted directory"
        title="Tools worth your time"
        description="A sample of the directory — every listing is organized by category and pricing, with honest strengths and trade-offs."
        action={
          <Link
            to="/categories"
            className="btn-secondary group rounded-xl px-5 py-2.5 text-[13.5px] font-semibold text-dark-100 hover:text-white"
          >
            <span className="flex items-center gap-2">
              Browse all tools
              <ArrowRightIcon size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {tools.map((tool, index) => (
          <Reveal key={tool.id} delay={index * 60}>
            <ToolCard tool={tool} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
