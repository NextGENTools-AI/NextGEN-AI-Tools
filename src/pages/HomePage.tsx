import SEO from '../components/SEO';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import FeaturedTools from '../components/FeaturedTools';
import GoalDiscovery from '../components/GoalDiscovery';
import Categories from '../components/Categories';
import PromptTeaser from '../components/PromptTeaser';
import Newsletter from '../components/Newsletter';
import CTA from '../components/CTA';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../components/Icons';
import { Section, SectionHeader, Reveal } from '../components/ui';
import { getAllBestToolsPages } from '../data/bestToolsPages';

const bestPages = getAllBestToolsPages().slice(0, 6);

export default function HomePage() {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'NextGEN AI Tools — Your AI Goal Workspace',
    description:
      'Tell NextGEN what you want to achieve and get matched with the right AI tools, prompts, and comparisons — a curated directory organized around your goals.',
    url: 'https://nextgenai.tools',
  };

  return (
    <>
      <SEO
        title="NextGEN AI Tools — Tell Us Your Goal, Find Your AI Path"
        description="Tell NextGEN what you want to achieve and get matched with the right AI tools, prompts, and comparisons. A curated directory of AI tools for writing, coding, image generation, video, and more."
        canonical="/"
        keywords="AI tools, artificial intelligence, ChatGPT, Midjourney, AI writing, AI coding, AI image generator, machine learning tools, AI directory"
        structuredData={homeSchema}
      />
      <main id="main-content" className="overflow-x-hidden">
        <Hero />
        <HowItWorks />
        <FeaturedTools />
        <GoalDiscovery />
        <Categories />
        <PromptTeaser />

        {/* Best-of guides */}
        <Section id="best-guides">
          <SectionHeader
            eyebrow="Curated guides"
            title="Stacks, ready to adopt"
            description="Focused shortlists for the way you work — each guide compares the strongest options for a specific audience or budget."
            action={
              <Link
                to="/best"
                className="btn-secondary group rounded-xl px-5 py-2.5 text-[13.5px] font-semibold text-dark-100 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  All guides
                  <ArrowRightIcon size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            }
          />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {bestPages.map((page, index) => (
              <Reveal key={page.slug} delay={index * 45}>
                <Link
                  to={`/best/${page.slug}`}
                  className="card-surface card-hover group flex h-full items-center justify-between gap-4 rounded-xl px-5 py-4"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-semibold text-white transition-colors duration-300 group-hover:text-brand-300">
                      {page.title.replace(' in 2025', '')}
                    </span>
                    <span className="mt-1 block truncate text-[12.5px] text-dark-400">
                      {page.heroDescription}
                    </span>
                  </span>
                  <ArrowRightIcon
                    size={15}
                    className="shrink-0 -translate-x-1 text-dark-500 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-brand-300 group-hover:opacity-100"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </Section>

        <Newsletter />
        <CTA />
      </main>
    </>
  );
}
