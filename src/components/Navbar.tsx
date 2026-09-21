import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogoIcon, MenuIcon, CloseIcon, ArrowRightIcon } from './Icons';
import LanguageSwitcher from './LanguageSwitcher';
import { cn } from '../utils/cn';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const { t } = useTranslation();
  const navLinks = [
    { label: t('nav.tools'), href: '/categories' },
    { label: t('nav.bestTools'), href: '/best' },
    { label: t('nav.compare'), href: '/compare' },
    { label: t('nav.prompts'), href: '/prompts' },
    { label: t('nav.blog'), href: '/blog' },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const isActive = useCallback(
    (href: string) => location.pathname === href || location.pathname.startsWith(`${href}/`),
    [location.pathname],
  );

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass-strong shadow-[0_8px_32px_-12px_rgba(0,0,0,0.6)] border-b border-white/[0.06]'
            : 'border-b border-transparent bg-transparent',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-[72px]">
            {/* Logo */}
            <Link to="/" className="group flex items-center gap-2.5" aria-label="NextGEN AI Tools — Home">
              <span className="transition-transform duration-300 group-hover:scale-105">
                <LogoIcon size={32} />
              </span>
              <span className="text-[16.5px] font-bold tracking-tight text-white">
                NextGEN
                <span className="font-semibold gradient-text-brand"> AI</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative rounded-lg px-4 py-2 text-[13.5px] font-medium transition-colors duration-200',
                      active ? 'text-white' : 'text-dark-200 hover:text-white',
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        transition={{ duration: 0.4, ease: EASE }}
                        className="absolute inset-0 rounded-lg border border-white/[0.07] bg-white/[0.05]"
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2.5 md:flex">
              <Link
                to="/search"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-dark-200 transition-all duration-200 hover:border-white/[0.16] hover:text-white"
                aria-label="Search AI tools"
                title="Search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21L16.65 16.65" />
                </svg>
              </Link>
              <LanguageSwitcher />
              <Link
                to="/tool-finder"
                className="btn-secondary rounded-lg px-4 py-2 text-[13px] font-semibold text-dark-100 hover:text-white"
              >
                {t('nav.toolFinder')}
              </Link>
              <Link
                to="/submit"
                className="btn-primary rounded-lg px-4.5 py-2 text-[13px] font-semibold text-white"
              >
                <span>{t('nav.submitTool')}</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-dark-100 transition-colors hover:text-white md:hidden"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div
              className="absolute inset-0 bg-dark-950/92 backdrop-blur-xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-x-3 top-[72px] overflow-hidden rounded-2xl border border-white/[0.08] bg-dark-900/95 p-3 shadow-2xl shadow-black/60"
              aria-label="Mobile"
            >
              <ul className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + index * 0.045, duration: 0.3, ease: EASE }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        'flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors',
                        isActive(link.href)
                          ? 'bg-white/[0.06] text-white'
                          : 'text-dark-200 hover:bg-white/[0.04] hover:text-white',
                      )}
                    >
                      {link.label}
                      <ArrowRightIcon size={15} className="text-dark-400" />
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-3 space-y-3 border-t border-white/[0.06] p-3">
                <div className="flex items-center justify-between gap-3">
                  <LanguageSwitcher />
                  <Link
                    to="/search"
                    className="text-[13px] font-medium text-dark-200 transition-colors hover:text-white"
                  >
                    Search tools
                  </Link>
                </div>
                <Link
                  to="/submit"
                  className="btn-primary block w-full rounded-xl px-6 py-3 text-[14px] font-semibold text-white"
                >
                  <span>{t('nav.submitTool')}</span>
                </Link>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
