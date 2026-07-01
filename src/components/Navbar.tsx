import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogoIcon, MenuIcon, CloseIcon } from './Icons';
import LanguageSwitcher from './LanguageSwitcher';

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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-strong shadow-2xl shadow-black/30 border-b border-white/[0.05]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group transition-all duration-300 hover:scale-105">
              <LogoIcon size={34} />
              <span className="text-[17px] font-semibold tracking-tight text-white">
                NextGEN
                <span className="text-brand-400 ml-0.5">AI</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`px-5 py-2.5 text-[14px] font-medium transition-colors duration-200 rounded-lg hover:bg-white/[0.04 hover:-translate-y-0.5] ${
                    location.pathname === link.href
                      ? 'bg-white/[0.05] text-white'
                      : 'text-dark-100 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <LanguageSwitcher />
              <Link
                to="/tool-finder"
                className="px-5 py-2.5 text-[13px] font-medium text-dark-100 hover:text-white transition-colors duration-200 rounded-xl hover:bg-white/[0.04 hover:scale-[1.03]"
              >
                {t('nav.toolFinder')}
              </Link>
              <Link
                to="/submit"
                className="btn-primary px-6 py-2.5 rounded-lg text-[13px] font-semibold text-white"
              >
                <span className="relative z-10">{t('nav.submitTool')}</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-x1 text-dark-200 hover:text-white hover:bg-white/[0.05] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-dark-950/90 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-[320px] bg-dark-900 border-l border-white/[0.06] p-8 pt-20"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-4 py-3 text-[15px] font-medium transition-colors rounded-x1 hover:bg-white/[0.04] ${
                      location.pathname === link.href
                        ? 'text-white'
                        : 'text-dark-100 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-3">
                  <LanguageSwitcher />
                  <Link
                    to="/categories"
                    className="btn-primary block text-center px-6 py-3.5 rounded-x1 text-[14px] font-semibold text-white"
                  >
                    <span className="relative z-10">{t('nav.exploreTools')}</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
