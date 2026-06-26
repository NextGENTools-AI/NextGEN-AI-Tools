import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import PageLayout from '../components/layouts/PageLayout';
import { tools } from '../data/tools';
import { 
  ArrowRightIcon, ChevronLeftIcon, StarIcon, 
  CheckIcon, SparkleIcon, ZapIcon 
} from '../components/Icons';

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; icon?: string }[];
}

const questions: Question[] = [
  {
    id: 'purpose',
    question: 'What do you primarily need AI for?',
    options: [
      { value: 'writing', label: 'Writing & Content' },
      { value: 'coding', label: 'Coding & Development' },
      { value: 'images', label: 'Image Generation' },
      { value: 'video', label: 'Video Creation' },
      { value: 'chat', label: 'Chat & Assistance' },
      { value: 'business', label: 'Business & Analytics' },
      { value: 'research', label: 'Research & Learning' },
      { value: 'productivity', label: 'Productivity' },
    ],
  },
  {
    id: 'experience',
    question: 'What\'s your experience level with AI tools?',
    options: [
      { value: 'beginner', label: 'Complete beginner' },
      { value: 'some', label: 'Used a few tools' },
      { value: 'experienced', label: 'Experienced user' },
      { value: 'expert', label: 'Power user / Developer' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your budget preference?',
    options: [
      { value: 'free', label: 'Free tools only' },
      { value: 'low', label: 'Under $20/month' },
      { value: 'medium', label: '$20-50/month' },
      { value: 'high', label: 'No budget limit' },
    ],
  },
  {
    id: 'priority',
    question: 'What matters most to you?',
    options: [
      { value: 'quality', label: 'Best quality output' },
      { value: 'speed', label: 'Fastest results' },
      { value: 'ease', label: 'Easiest to use' },
      { value: 'features', label: 'Most features' },
      { value: 'value', label: 'Best value for money' },
    ],
  },
];

// Map answers to tool recommendations
function getRecommendations(answers: Record<string, string>) {
  let filtered = [...tools];
  
  // Filter by purpose/category
  if (answers.purpose) {
    const categoryMap: Record<string, string[]> = {
      writing: ['ai-writing'],
      coding: ['ai-coding'],
      images: ['ai-image-generation'],
      video: ['ai-video-generation'],
      chat: ['ai-chatbots'],
      business: ['ai-business', 'ai-marketing'],
      research: ['ai-research', 'ai-education'],
      productivity: ['ai-productivity'],
    };
    const cats = categoryMap[answers.purpose] || [];
    if (cats.length > 0) {
      filtered = filtered.filter(t => cats.includes(t.categorySlug));
    }
  }
  
  // Filter by budget
  if (answers.budget) {
    const budgetMap: Record<string, string[]> = {
      free: ['Free', 'Freemium'],
      low: ['Free', 'Freemium', 'Paid'],
      medium: ['Free', 'Freemium', 'Paid'],
      high: ['Free', 'Freemium', 'Paid', 'Enterprise'],
    };
    const allowed = budgetMap[answers.budget] || [];
    filtered = filtered.filter(t => allowed.includes(t.pricing));
  }
  
  // Sort by rating and relevance
  filtered.sort((a, b) => b.rating - a.rating);
  
  return filtered.slice(0, 6);
}

export default function ToolFinderPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);
  
  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  
  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResults(true);
    }
  };
  
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
  };
  
  const recommendations = showResults ? getRecommendations(answers) : [];
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'AI Tool Finder', url: '/tool-finder' },
  ]);

  return (
    <>
      <SEO
        title="AI Tool Finder — Find Your Perfect AI Tool"
        description="Answer a few quick questions and get personalized AI tool recommendations. Find the perfect AI tool for writing, coding, design, business, and more."
        canonical="/tool-finder"
        keywords="AI tool finder, AI tool quiz, find AI tools, AI tool recommendations, best AI tool for me"
        structuredData={breadcrumbSchema}
      />

      <PageLayout maxWidth="4xl">
        {!showResults ? (
          <>
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-[13px] text-dark-400 mb-2">
                <span>Question {step + 1} of {questions.length}</span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <div className="h-1.5 bg-dark-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-brand-500 to-cyan-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-6">
                  <SparkleIcon size={28} className="text-brand-400" />
                </div>
                
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                  {currentQuestion.question}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className="group flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] bg-surface-2/40 hover:bg-surface-2/70 hover:border-brand-500/30 text-left transition-all"
                    >
                      <div className="w-8 h-8 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0">
                        <span className="text-[13px] font-bold text-brand-400">{option.label.charAt(0)}</span>
                      </div>
                      <span className="text-[15px] font-medium text-white group-hover:text-brand-400 transition-colors">
                        {option.label}
                      </span>
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button
                    onClick={handleBack}
                    className="mt-8 inline-flex items-center gap-2 text-[14px] text-dark-300 hover:text-white transition-colors"
                  >
                    <ChevronLeftIcon size={16} />
                    Back
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          /* Results */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckIcon size={28} className="text-emerald-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Your Personalized Recommendations
              </h1>
              <p className="text-dark-200 max-w-lg mx-auto">
                Based on your answers, here are the AI tools we think you'll love.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {recommendations.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={`/tool/${tool.slug}`}
                    className="group card-hover block h-full rounded-2xl border border-white/[0.06] bg-surface-2/40 p-5"
                  >
                    {index === 0 && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
                        <ZapIcon size={10} />
                        Suggested First
                      </span>
                    )}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-[14px] font-bold text-white border border-white/[0.06]`}>
                        {tool.logo}
                      </div>
                      <div>
                        <h3 className="text-[15px] font-semibold text-white group-hover:text-brand-400 transition-colors">
                          {tool.name}
                        </h3>
                        <span className="text-[12px] text-dark-400">{tool.category}</span>
                      </div>
                    </div>
                    <p className="text-[13px] text-dark-300 mb-3 line-clamp-2">
                      {tool.tagline}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] text-dark-400">Open listing</span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded uppercase ${
                        tool.pricing === 'Free' || tool.pricing === 'Freemium'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {tool.pricing}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleRestart}
                className="px-6 py-3 rounded-xl text-[14px] font-medium text-dark-200 border border-white/[0.08] hover:border-white/[0.15] hover:text-white transition-all"
              >
                Start Over
              </button>
              <Link
                to="/categories"
                className="btn-primary px-6 py-3 rounded-xl text-[14px] font-semibold text-white flex items-center gap-2"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse All Tools
                  <ArrowRightIcon size={16} />
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </PageLayout>
    </>
  );
}
