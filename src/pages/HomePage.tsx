import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Search from '../components/Search';
import FeaturedTools from '../components/FeaturedTools';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';
import CTA from '../components/CTA';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'NextGEN AI Tools — Curated AI Tool Directory',
    description: 'A curated directory of AI tools for writing, coding, image generation, video, and more. Browse by category and compare options.',
    url: 'https://nextgenai.tools',
  };

  return (
    <>
      <SEO
        title="Curated AI Tool Directory"
        description="A curated directory of AI tools for writing, coding, image generation, video, and more. Browse by category and compare options."
        canonical="/"
        keywords="AI tools, artificial intelligence, ChatGPT, Midjourney, AI writing, AI coding, AI image generator, machine learning tools, AI directory"
        structuredData={homeSchema}
      />
      <main>
        <Hero />
        <Search />
        <FeaturedTools />
        <Categories />
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6 sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-white">SEO-focused AI tool guides</h2>
                <p className="mt-2 text-sm text-dark-300">Browse curated landing pages for students, developers, marketers, creators, and more.</p>
              </div>
              <Link to="/best" className="inline-flex items-center gap-2 text-sm font-medium text-brand-400 hover:text-brand-300">
                Explore best tools pages
              </Link>
            </div>
          </div>
        </section>
        <Newsletter />
        <CTA />
      </main>
    </>
  );
}
