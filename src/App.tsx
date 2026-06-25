import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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

// Growth Features
import ToolFinderPage from './pages/ToolFinderPage';
import ComparisonsPage from './pages/ComparisonsPage';
import ComparisonPage from './pages/ComparisonPage';
import PromptsPage from './pages/PromptsPage';
import PromptDetailPage from './pages/PromptDetailPage';
import SubmitToolPage from './pages/SubmitToolPage';
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
  return (
    <div className="min-h-screen bg-dark-950">
      <ScrollToTop />
      <Navbar />
      <Routes>
        {/* Core Pages */}
        <Route path="/" element={<HomePage />} />
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
        
        {/* Growth Features */}
        <Route path="/tool-finder" element={<ToolFinderPage />} />
        <Route path="/compare" element={<ComparisonsPage />} />
        <Route path="/compare/:slug" element={<ComparisonPage />} />
        <Route path="/prompts" element={<PromptsPage />} />
        <Route path="/prompts/:id" element={<PromptDetailPage />} />
        <Route path="/submit" element={<SubmitToolPage />} />
        
        {/* Best AI Tools Pages */}
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
