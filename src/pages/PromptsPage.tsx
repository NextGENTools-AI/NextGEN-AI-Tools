import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import PageLayout, { PageHeader, Card } from '../components/layouts/PageLayout';
import { getAllPrompts, promptCategories, getPromptsByCategory, type Prompt } from '../data/prompts';
import { 
  SearchIcon, StarIcon, CheckIcon, ArrowRightIcon,
  PenIcon, CodeIcon, ChartIcon, BriefcaseIcon, ImageIcon, BrainIcon, ZapIcon
} from '../components/Icons';

const iconMap: Record<string, React.FC<{ size?: number; className?: string }>> = {
  pen: PenIcon,
  code: CodeIcon,
  chart: ChartIcon,
  briefcase: BriefcaseIcon,
  image: ImageIcon,
  brain: BrainIcon,
  zap: ZapIcon,
  search: SearchIcon,
};

// Custom copy icon
function CopyIcon2({ size = 16, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4C2.9 15 2 14.1 2 13V4C2 2.9 2.9 2 4 2H13C14.1 2 15 2.9 15 4V5" />
    </svg>
  );
}

function PromptCard({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="text-[11px] font-medium text-brand-400 uppercase tracking-wide">
            {prompt.tool}
          </span>
          <h3 className="text-[15px] font-semibold text-white mt-1">
            {prompt.title}
          </h3>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <StarIcon size={12} className="text-amber-400" />
          <span className="text-[12px] font-medium text-white">{prompt.rating}</span>
        </div>
      </div>

      <p className="text-[13px] text-dark-300 mb-4 flex-1 line-clamp-2">
        {prompt.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {prompt.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-[10px] font-medium text-dark-300 rounded bg-white/[0.03] border border-white/[0.04]"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
        <span className="text-[11px] text-dark-400">
          {prompt.copyCount.toLocaleString()} copies
        </span>
        <div className="flex items-center gap-2">
          <Link
            to={`/prompts/${prompt.id}`}
            className="text-[12px] font-medium text-dark-300 hover:text-white transition-colors"
          >
            View
          </Link>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all ${
              copied
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20'
            }`}
          >
            {copied ? <CheckIcon size={12} /> : <CopyIcon2 size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </Card>
  );
}

export default function PromptsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const allPrompts = getAllPrompts();
  
  let filteredPrompts = selectedCategory 
    ? getPromptsByCategory(selectedCategory)
    : allPrompts;
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredPrompts = filteredPrompts.filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(t => t.toLowerCase().includes(query))
    );
  }
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Prompt Library', url: '/prompts' },
  ]);

  return (
    <>
      <SEO
        title="AI Prompt Library — Ready-to-Use Prompts for ChatGPT, Claude & More"
        description="Browse a collection of AI prompt templates for writing, coding, marketing, design, and more. These examples can be adapted for tools such as ChatGPT, Claude, and Midjourney."
        canonical="/prompts"
        keywords="AI prompts, ChatGPT prompts, Claude prompts, Midjourney prompts, prompt templates, prompt engineering"
        structuredData={breadcrumbSchema}
      />

      <PageLayout>
        <PageHeader
          title="AI Prompt Library"
          description="Prompt templates you can adapt for writing, coding, marketing, and more. Review and adjust them to fit your workflow and the tool you are using."
          badge="Free to Use"
        />

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10"
        >
          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-6">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts..."
              className="w-full bg-dark-800/60 border border-white/[0.06] rounded-xl pl-11 pr-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 transition-all"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
                !selectedCategory
                  ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                  : 'text-dark-300 border border-white/[0.06] hover:border-white/[0.12] hover:text-white'
              }`}
            >
              All Prompts
            </button>
            {promptCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || BrainIcon;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
                      : 'text-dark-300 border border-white/[0.06] hover:border-white/[0.12] hover:text-white'
                  }`}
                >
                  <Icon size={14} />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Prompts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filteredPrompts.map((prompt, index) => (
            <motion.div
              key={prompt.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <PromptCard prompt={prompt} />
            </motion.div>
          ))}
        </motion.div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-dark-300 mb-4">No prompts found matching your criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
              className="text-brand-400 hover:text-brand-300 font-medium"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-white mb-2">Have a great prompt to share?</h3>
            <p className="text-[14px] text-dark-300 mb-4">
              Help the community by submitting your best prompts. We'll credit you and add it to the library.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-brand-400 hover:text-brand-300"
            >
              Submit a prompt
              <ArrowRightIcon size={14} />
            </Link>
          </Card>
        </motion.div>
      </PageLayout>
    </>
  );
}
