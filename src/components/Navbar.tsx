import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { LogoIcon, MenuIcon, CloseIcon } from './Icons';

const navLinks = [
  { label: 'Tools', href: '/categories' },
  { label: 'Best Tools', href: '/best' },
  { label: 'Compare', href: '/compare' },
  { label: 'Prompts', href: '/prompts' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
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
            ? 'glass-strong shadow-lg shadow-black/20'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <LogoIcon size={30} />
              <span className="text-[15px] font-semibold tracking-tight text-white">
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
                  className={`px-4 py-2 text-[13px] font-medium transition-colors duration-200 rounded-lg hover:bg-white/[0.04] ${
                    location.pathname === link.href
                      ? 'text-white'
                      : 'text-dark-100 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/tool-finder"
                className="px-4 py-2 text-[13px] font-medium text-dark-100 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/[0.04]"
              >
                Tool Finder
              </Link>
              <Link
                to="/submit"
                className="btn-primary px-4 py-2 rounded-lg text-[13px] font-semibold text-white"
              >
                <span className="relative z-10">Submit Tool</span>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-dark-200 hover:text-white hover:bg-white/[0.05] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
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
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-dark-900 border-l border-white/[0.06] p-6 pt-20"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className={`px-4 py-3 text-[15px] font-medium transition-colors rounded-lg hover:bg-white/[0.04] ${
                      location.pathname === link.href
                        ? 'text-white'
                        : 'text-dark-100 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-white/[0.06]">
                  <Link
                    to="/categories"
                    className="btn-primary block text-center px-4 py-3 rounded-lg text-[14px] font-semibold text-white"
                  >
                    <span className="relative z-10">Explore Tools</span>
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
