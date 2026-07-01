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
    <section id="search" className="relative py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Search Input */}
          <div
            className={`relative rounded-3xl transition-all duration-300 ${
              focused
                ? 'glow-brand-strong scale-[1.01]'
                : ''
            }`}
          >
            <div className={`relative flex items-center rounded-3xl border transition-all duration-300 ${
              focused
                ? 'border-brand-500/40 bg-dark-800/90'
                : 'border-white/[0.06] bg-dark-800/60'
            }`}>
              <SearchIcon className="absolute left-6 text-dark-300" size={22} />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Search our AI tool catalog..."
                className="w-full bg-transparent pl-16 pr-4 py-5 text-base text-white placeholder-dark-400 focus:outline-none rounded-2xl"
              />
              <button onClick={handleSearch} className="btn-primary mr-2 px-7 py-3 rounded-2xl text-[13px] font-semibold text-white shrink-0 hover:scale-[1.03] transition-all duration-300">
                <span className="relative z-10">Search</span>
              </button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[12px] text-dark-400 font-medium mr-1">Popular:</span>
            {suggestions.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-4 py-2 text-[12px] font-medium text-dark-200 hover:text-white rounded-xl border border-white/[0.05] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-200 hover:-translate-y-0.5"
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
