import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SearchIcon } from './Icons';

const suggestions = [
  'ChatGPT', 'Midjourney', 'Writing Assistant', 'Code Generator',
  'Image Editor', 'Video AI', 'Data Analysis', 'Voice Cloning'
];

export default function Search() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <section id="search" className="relative py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          {/* Search Input */}
          <div
            className={`relative rounded-2xl transition-all duration-300 ${
              focused
                ? 'glow-brand-strong'
                : ''
            }`}
          >
            <div className={`relative flex items-center rounded-2xl border transition-all duration-300 ${
              focused
                ? 'border-brand-500/40 bg-dark-800/90'
                : 'border-white/[0.06] bg-dark-800/60'
            }`}>
              <SearchIcon className="absolute left-5 text-dark-300" size={20} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search 2,400+ AI tools..."
                className="w-full bg-transparent pl-13 pr-4 py-4.5 text-[15px] text-white placeholder-dark-300 focus:outline-none rounded-2xl"
              />
              <button onClick={handleSearch} className="btn-primary mr-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-white shrink-0">
                <span className="relative z-10">Search</span>
              </button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[12px] text-dark-400 font-medium mr-1">Popular:</span>
            {suggestions.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-3 py-1.5 text-[12px] font-medium text-dark-200 hover:text-white rounded-lg border border-white/[0.05] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
