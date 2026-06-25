import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Search from '../components/Search';
import FeaturedTools from '../components/FeaturedTools';
import Categories from '../components/Categories';
import Newsletter from '../components/Newsletter';
import CTA from '../components/CTA';

export default function HomePage() {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'NextGEN AI Tools — Discover the Best AI Tools in 2025',
    description: 'The most comprehensive directory of 2,400+ AI tools. Find, compare, and integrate the best AI solutions for writing, coding, image generation, video, marketing, and more.',
    url: 'https://nextgenai.tools',
  };

  return (
    <>
      <SEO
        title="Discover the Best AI Tools in 2025"
        description="The most comprehensive directory of 2,400+ AI tools. Find, compare, and integrate the best AI solutions for writing, coding, image generation, video, marketing, and more."
        canonical="/"
        keywords="AI tools, artificial intelligence, ChatGPT, Midjourney, AI writing, AI coding, AI image generator, machine learning tools, AI directory, best AI tools 2025"
        structuredData={homeSchema}
      />
      <main>
        <Hero />
        <Search />
        <FeaturedTools />
        <Categories />
        <Newsletter />
        <CTA />
      </main>
    </>
  );
}
