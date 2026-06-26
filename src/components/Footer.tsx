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
    <footer className="relative border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-14 sm:py-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 mb-4 lg:mb-0">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <LogoIcon size={28} />
              <span className="text-[15px] font-semibold tracking-tight text-white">
                NextGEN<span className="text-brand-400 ml-0.5">AI</span>
              </span>
            </Link>
            <p className="text-[13px] text-dark-300 leading-relaxed max-w-xs mb-6">
              A curated directory for exploring AI tools by category, pricing, and use case. We aim to present information clearly and keep it grounded in public sources.
            </p>
            <p className="text-[12px] text-dark-400">We may earn a commission from some links at no extra cost to you.</p>
            <div className="mt-4">
              <TrustBadges className="justify-start" />
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[12px] font-semibold text-dark-200 uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.internal ? (
                      <Link
                        to={link.href}
                        className="text-[13px] text-dark-300 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-[13px] text-dark-300 hover:text-white transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-dark-400">
            &copy; {new Date().getFullYear()} NextGEN AI Tools. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[12px] text-dark-400">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
