import { Helmet } from 'react-helmet-async';

type OGType = 'website' | 'article' | 'product' | 'profile';

type JsonLd = Record<string, unknown>;

interface SEOArticle {
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

interface SEOFAQ {
  question: string;
  answer: string;
}

interface SEOHowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

interface SEOHowTo {
  name: string;
  description: string;
  steps: SEOHowToStep[];
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: string | number;
  };
}

interface SEOSoftwareApplication {
  name: string;
  description: string;
  url: string;
  image?: string;
  applicationCategory?: string;
  operatingSystem?: string;
  pricing?: string;
  ratingValue?: number;
  reviewCount?: number;
  offers?: {
    price?: string | number;
    priceCurrency?: string;
    availability?: string;
    url?: string;
  };
}

interface SEOBreadcrumbItem {
  name: string;
  url: string;
}

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogType?: OGType;
  ogImage?: string;
  ogImageAlt?: string;
  article?: SEOArticle;

  /**
   * Backward compatible custom JSON-LD.
   * Can be a single schema object or an array of schema objects.
   */
  structuredData?: JsonLd | JsonLd[];

  /**
   * Optional direct schema props.
   * These are merged into JSON-LD automatically.
   */
  breadcrumbs?: SEOBreadcrumbItem[];
  faqs?: SEOFAQ[];
  howTo?: SEOHowTo;
  softwareApplication?: SEOSoftwareApplication;

  noindex?: boolean;
  nofollow?: boolean;
}

const SITE_NAME = 'NextGEN AI Tools';
const SITE_URL = 'https://nextgenai.tools';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
  'A curated directory of AI tools for writing, coding, image generation, video, and more. Browse by category and compare options.';
const DEFAULT_KEYWORDS =
  'AI tools, artificial intelligence, ChatGPT, Midjourney, AI writing, AI coding';

function buildAbsoluteUrl(url?: string): string {
  if (!url) {
    return SITE_URL;
  }

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  if (url.startsWith('/')) {
    return `${SITE_URL}${url}`;
  }

  return `${SITE_URL}/${url}`;
}

function cleanJsonLd(schema: JsonLd): JsonLd {
  return JSON.parse(
    JSON.stringify(schema, (_key, value) => {
      if (value === undefined || value === null || value === '') {
        return undefined;
      }

      return value;
    })
  );
}

function normalizeStructuredData(data?: JsonLd | JsonLd[]): JsonLd[] {
  if (!data) {
    return [];
  }

  return Array.isArray(data) ? data : [data];
}

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  ogImageAlt,
  article,
  structuredData,
  breadcrumbs,
  faqs,
  howTo,
  softwareApplication,
  noindex = false,
  nofollow = false,
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} — Curated AI Tool Directory`;

  const fullCanonical = buildAbsoluteUrl(canonical);
  const fullOgImage = buildAbsoluteUrl(ogImage);

  const robots = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-snippet:-1',
    'max-image-preview:large',
    'max-video-preview:-1',
  ].join(', ');

  const generatedSchemas: JsonLd[] = [
    ...(breadcrumbs ? [generateBreadcrumbSchema(breadcrumbs)] : []),
    ...(faqs && faqs.length > 0 ? [generateFAQSchema(faqs)] : []),
    ...(howTo ? [generateHowToSchema(howTo)] : []),
    ...(softwareApplication
      ? [generateSoftwareApplicationSchema(softwareApplication)]
      : []),
  ];

  const allSchemas = [
    ...normalizeStructuredData(structuredData),
    ...generatedSchemas,
  ].map(cleanJsonLd);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={fullCanonical} />

      {/* Useful SEO Metadata */}
      <meta name="author" content={SITE_NAME} />
      <meta name="publisher" content={SITE_NAME} />
      <meta name="application-name" content={SITE_NAME} />
      <meta name="theme-color" content="#0B0F19" />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:secure_url" content={fullOgImage} />
      <meta property="og:image:alt" content={ogImageAlt || fullTitle} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt || fullTitle} />

      {/* Article Specific Meta Tags */}
      {article && (
        <>
          {article.publishedTime && (
            <meta
              property="article:published_time"
              content={article.publishedTime}
            />
          )}

          {article.modifiedTime && (
            <meta
              property="article:modified_time"
              content={article.modifiedTime}
            />
          )}

          {article.author && (
            <meta property="article:author" content={article.author} />
          )}

          {article.section && (
            <meta property="article:section" content={article.section} />
          )}

          {article.tags?.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* JSON-LD Structured Data */}
      {allSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

/**
 * Article Schema
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  publishedTime,
  modifiedTime,
  author = 'NextGEN AI Editorial Team',
  image,
  section,
  tags,
}: {
  title: string;
  description: string;
  slug: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  image?: string;
  section?: string;
  tags?: string[];
}) {
  const articleUrl = buildAbsoluteUrl(`/blog/${slug}`);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: buildAbsoluteUrl(image || DEFAULT_IMAGE),
    author: {
      '@type': 'Organization',
      name: author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    url: articleUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    articleSection: section,
    keywords: tags?.join(', '),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.url),
    })),
  };
}

/**
 * FAQPage Schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * HowTo Schema
 */
export function generateHowToSchema({
  name,
  description,
  steps,
  totalTime,
  estimatedCost,
}: SEOHowTo) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    estimatedCost: estimatedCost
      ? {
          '@type': 'MonetaryAmount',
          currency: estimatedCost.currency,
          value: estimatedCost.value,
        }
      : undefined,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url ? buildAbsoluteUrl(step.url) : undefined,
      image: step.image ? buildAbsoluteUrl(step.image) : undefined,
    })),
  };
}

/**
 * SoftwareApplication Schema
 */
export function generateSoftwareApplicationSchema({
  name,
  description,
  url,
  image,
  applicationCategory = 'AI Tool',
  operatingSystem = 'Web',
  pricing,
  ratingValue,
  reviewCount,
  offers,
}: SEOSoftwareApplication) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: buildAbsoluteUrl(url),
    image: image ? buildAbsoluteUrl(image) : DEFAULT_IMAGE,
    applicationCategory,
    operatingSystem,
    offers: offers || pricing
      ? {
          '@type': 'Offer',
          price: offers?.price || pricing || '0',
          priceCurrency: offers?.priceCurrency || 'USD',
          availability:
            offers?.availability || 'https://schema.org/InStock',
          url: buildAbsoluteUrl(offers?.url || url),
        }
      : undefined,
    aggregateRating:
      ratingValue && reviewCount
        ? {
            '@type': 'AggregateRating',
            ratingValue,
            reviewCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
  };
}

/**
 * CollectionPage Schema
 */
export function generateCollectionPageSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: buildAbsoluteUrl(url),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * ItemList Schema for AI tool lists
 */
export function generateToolListSchema(
  listName: string,
  tools: { name: string; url: string; position: number }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: tools.map((tool) => ({
      '@type': 'ListItem',
      position: tool.position,
      item: {
        '@type': 'SoftwareApplication',
        name: tool.name,
        url: buildAbsoluteUrl(tool.url),
        applicationCategory: 'AI Tool',
        operatingSystem: 'Web',
      },
    })),
  };
}

/**
 * WebSite Schema
 */
export function generateWebsiteSchema({
  name = SITE_NAME,
  url = SITE_URL,
  description = DEFAULT_DESCRIPTION,
}: {
  name?: string;
  url?: string;
  description?: string;
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    url: buildAbsoluteUrl(url),
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    sameAs: [],
  };
}

/**
 * WebPage Schema
 */
export function generateWebPageSchema({
  name,
  description,
  url,
  image = DEFAULT_IMAGE,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: buildAbsoluteUrl(url),
    image: buildAbsoluteUrl(image),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * Review Schema
 */
export function generateReviewSchema({
  itemName,
  itemUrl,
  reviewBody,
  ratingValue,
  author = 'NextGEN AI Editorial Team',
}: {
  itemName: string;
  itemUrl: string;
  reviewBody: string;
  ratingValue: number;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'SoftwareApplication',
      name: itemName,
      url: buildAbsoluteUrl(itemUrl),
      applicationCategory: 'AI Tool',
      operatingSystem: 'Web',
    },
    reviewBody,
    reviewRating: {
      '@type': 'Rating',
      ratingValue,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export {
  SITE_NAME,
  SITE_URL,
  DEFAULT_IMAGE,
};