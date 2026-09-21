import { Link } from 'react-router-dom';
import { LogoIcon } from './Icons';
import TrustBadges from './TrustBadges';

const footerLinks = {
  Product: [
    { label: 'All Categories', href: '/categories', internal: true },
    { label: 'Tool Finder', href: '/tool-finder', internal: true },
    { label: 'Comparisons', href: '/compare', internal: true },
    { label: 'Prompt Library', href: '/prompts', internal: true },
    { label: 'Submit Tool', href: '/submit', internal: true },
  ],
  Categories: [
    { label: 'AI Writing', href: '/category/ai-writing', internal: true },
    { label: 'AI Chatbots', href: '/category/ai-chatbots', internal: true },
    { label: 'AI Coding', href: '/category/ai-coding', internal: true },
    { label: 'AI Image', href: '/category/ai-image-generation', internal: true },
    { label: 'AI Video', href: '/category/ai-video-generation', internal: true },
  ],
  Resources: [
    { label: 'Best AI Tools', href: '/best', internal: true },
    { label: 'Best Free AI Tools', href: '/best/free', internal: true },
    { label: 'ChatGPT vs Claude', href: '/compare/chatgpt-vs-claude', internal: true },
    { label: 'Prompt Library', href: '/prompts', internal: true },
  ],
  Company: [
    { label: 'About', href: '/about', internal: true },
    { label: 'Editorial Policy', href: '/editorial-policy', internal: true },
    { label: 'Affiliate Disclosure', href: '/editorial-policy#affiliate-disclosure', internal: true },
    { label: 'Contact', href: '/contact', internal: true },
    { label: 'Privacy Policy', href: '/privacy', internal: true },
    { label: 'Terms of Service', href: '/terms', internal: true },
  ],
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.05] bg-dark-950">
      {/* Ambient bottom light */}
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-32 mx-auto h-64 w-[720px] max-w-full rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(closest-side, #2e86ff 0%, transparent 100%)' }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="grid grid-cols-2 gap-8 py-14 sm:grid-cols-3 sm:py-16 lg:grid-cols-6 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 mb-2 sm:col-span-3 lg:col-span-2 lg:mb-0">
            <Link to="/" className="mb-5 inline-flex items-center gap-2.5" aria-label="NextGEN AI Tools — Home">
              <LogoIcon size={28} />
              <span className="text-[15px] font-bold tracking-tight text-white">
                NextGEN
                <span className="font-semibold gradient-text-brand"> AI</span>
              </span>
            </Link>
            <p className="mb-6 max-w-xs text-[13px] leading-relaxed text-dark-300">
              A curated directory for exploring AI tools by category, pricing, and use case. We aim to
              present information clearly and keep it grounded in public sources.
            </p>
            <p className="text-[12px] text-dark-400">
              We may earn a commission from some links at no extra cost to you.
            </p>
            <div className="mt-5">
              <TrustBadges className="justify-start" />
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <nav key={title} aria-label={title}>
              <h3 className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-dark-300">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.internal ? (
                      <Link
                        to={link.href}
                        className="text-[13px] text-dark-300 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[13px] text-dark-300 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] py-6 sm:flex-row">
          <p className="text-[12px] text-dark-400">
            &copy; {new Date().getFullYear()} NextGEN AI Tools. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[12px] text-dark-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
