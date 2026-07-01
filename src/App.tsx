import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { getInitialLanguage } from './i18n/languageUtils';

// Pages
import HomePage from './pages/HomePage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryPage from './pages/CategoryPage';
import ToolPage from './pages/ToolPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import EditorialPolicyPage from './pages/EditorialPolicyPage';

// Growth Features
import ToolFinderPage from './pages/ToolFinderPage';
import ComparisonsPage from './pages/ComparisonsPage';
import ComparisonPage from './pages/ComparisonPage';
import PromptsPage from './pages/PromptsPage';
import PromptDetailPage from './pages/PromptDetailPage';
import SubmitToolPage from './pages/SubmitToolPage';
import BestToolsIndexPage from './pages/BestToolsIndexPage';
import BestToolsPage from './pages/BestToolsPage';
import SearchPage from './pages/SearchPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const { i18n } = useTranslation();
  const location = useLocation();

  const initialLanguage = useMemo(() => getInitialLanguage(), []);

  useEffect(() => {
    if (i18n.language !== initialLanguage) {
      void i18n.changeLanguage(initialLanguage);
    }
  }, [i18n, initialLanguage]);

  return (
    <div className="min-h-screen bg-dark-950">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:locale" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/'} replace />} />
        <Route path="/:locale/categories" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/categories'} replace />} />
        <Route path="/:locale/category/:slug" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/'} replace />} />
        <Route path="/:locale/tool/:slug" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/'} replace />} />
        <Route path="/:locale/blog" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/blog'} replace />} />
        <Route path="/:locale/blog/:slug" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/blog'} replace />} />
        <Route path="/:locale/about" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/about'} replace />} />
        <Route path="/:locale/contact" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/contact'} replace />} />
        <Route path="/:locale/privacy" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/privacy'} replace />} />
        <Route path="/:locale/terms" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/terms'} replace />} />
        <Route path="/:locale/editorial-policy" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/editorial-policy'} replace />} />
        <Route path="/:locale/tool-finder" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/tool-finder'} replace />} />
        <Route path="/:locale/compare" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/compare'} replace />} />
        <Route path="/:locale/compare/:slug" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/compare'} replace />} />
        <Route path="/:locale/prompts" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/prompts'} replace />} />
        <Route path="/:locale/prompts/:slug" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/prompts'} replace />} />
        <Route path="/:locale/submit" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/submit'} replace />} />
        <Route path="/:locale/best" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/best'} replace />} />
        <Route path="/:locale/best/:slug" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/best'} replace />} />
        <Route path="/:locale/search" element={<Navigate to={location.pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/search'} replace />} />

        {/* Core Pages */}
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/tool/:slug" element={<ToolPage />} />

        {/* Blog */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<ArticlePage />} />

        {/* Company Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/editorial-policy" element={<EditorialPolicyPage />} />

        {/* Growth Features */}
        <Route path="/tool-finder" element={<ToolFinderPage />} />
        <Route path="/compare" element={<ComparisonsPage />} />
        <Route path="/compare/:slug" element={<ComparisonPage />} />
        <Route path="/prompts" element={<PromptsPage />} />
        <Route path="/prompts/:slug" element={<PromptDetailPage />} />
        <Route path="/submit" element={<SubmitToolPage />} />

        {/* Best AI Tools Pages */}
        <Route path="/best" element={<BestToolsIndexPage />} />
        <Route path="/best/:slug" element={<BestToolsPage />} />

        {/* Advanced Search */}
        <Route path="/search" element={<SearchPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
