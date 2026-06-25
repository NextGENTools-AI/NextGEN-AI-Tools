import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import PageLayout, { PageHeader, Card } from '../components/layouts/PageLayout';
import { categories } from '../data/tools';
import { CheckIcon, SparkleIcon, ZapIcon, UsersIcon, ChartIcon } from '../components/Icons';

const pricingOptions = ['Free', 'Freemium', 'Paid', 'Enterprise'];

const benefits = [
  { icon: UsersIcon, title: 'Reach 180K+ monthly visitors', description: 'Get discovered by our growing audience of AI tool seekers.' },
  { icon: ChartIcon, title: 'SEO-optimized listing', description: 'Your tool page ranks in search results for relevant queries.' },
  { icon: SparkleIcon, title: 'Expert editorial review', description: 'Our team reviews and verifies every submission.' },
  { icon: ZapIcon, title: 'Free forever', description: 'Basic listings are completely free, no strings attached.' },
];

export default function SubmitToolPage() {
  const [formState, setFormState] = useState({
    toolName: '',
    website: '',
    tagline: '',
    description: '',
    category: '',
    pricing: '',
    features: '',
    contactName: '',
    contactEmail: '',
    additionalInfo: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.toolName) newErrors.toolName = 'Tool name is required';
    if (!formState.website) newErrors.website = 'Website is required';
    if (!formState.tagline) newErrors.tagline = 'Tagline is required';
    if (!formState.description) newErrors.description = 'Description is required';
    if (!formState.category) newErrors.category = 'Category is required';
    if (!formState.pricing) newErrors.pricing = 'Pricing model is required';
    if (!formState.contactEmail) newErrors.contactEmail = 'Email is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // In production, this would submit to a backend
      setSubmitted(true);
    }
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Submit Tool', url: '/submit' },
  ]);

  return (
    <>
      <SEO
        title="Submit Your AI Tool — Get Listed in Our Directory"
        description="Submit your AI tool to NextGEN AI Tools directory. Get discovered by 180K+ monthly visitors. Free listings available. SEO-optimized tool pages."
        canonical="/submit"
        keywords="submit AI tool, list AI tool, AI tool directory submission, promote AI tool"
        structuredData={breadcrumbSchema}
      />

      <PageLayout maxWidth="5xl">
        <PageHeader
          title="Submit Your AI Tool"
          description="Get your AI tool discovered by thousands of potential users. Our editorial team reviews every submission to ensure quality."
          badge="Free Listing"
        />

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Card key={benefit.title} padding="md" hover={false}>
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-3">
                  <Icon size={20} className="text-brand-400" />
                </div>
                <h3 className="text-[14px] font-semibold text-white mb-1">{benefit.title}</h3>
                <p className="text-[12px] text-dark-300">{benefit.description}</p>
              </Card>
            );
          })}
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Card padding="lg">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckIcon size={32} className="text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-white mb-3">Submission Received!</h2>
                <p className="text-[14px] text-dark-300 max-w-md mx-auto mb-6">
                  Thank you for submitting your tool. Our editorial team will review it within 3-5 business days. 
                  We'll email you at <strong className="text-white">{formState.contactEmail}</strong> with updates.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      toolName: '', website: '', tagline: '', description: '',
                      category: '', pricing: '', features: '', contactName: '',
                      contactEmail: '', additionalInfo: '',
                    });
                  }}
                  className="text-[14px] font-medium text-brand-400 hover:text-brand-300"
                >
                  Submit another tool
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="text-lg font-semibold text-white mb-6">Tool Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-medium text-white mb-2">
                      Tool Name <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formState.toolName}
                      onChange={(e) => setFormState({ ...formState, toolName: e.target.value })}
                      className={`w-full bg-dark-800/70 border rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all ${
                        errors.toolName ? 'border-rose-500/50' : 'border-white/[0.06]'
                      }`}
                      placeholder="e.g., ChatGPT"
                    />
                    {errors.toolName && <p className="mt-1 text-[12px] text-rose-400">{errors.toolName}</p>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-white mb-2">
                      Website URL <span className="text-rose-400">*</span>
                    </label>
                    <input
                      type="url"
                      value={formState.website}
                      onChange={(e) => setFormState({ ...formState, website: e.target.value })}
                      className={`w-full bg-dark-800/70 border rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all ${
                        errors.website ? 'border-rose-500/50' : 'border-white/[0.06]'
                      }`}
                      placeholder="https://example.com"
                    />
                    {errors.website && <p className="mt-1 text-[12px] text-rose-400">{errors.website}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">
                    Tagline <span className="text-rose-400">*</span>
                    <span className="text-dark-400 font-normal ml-2">(Max 100 characters)</span>
                  </label>
                  <input
                    type="text"
                    maxLength={100}
                    value={formState.tagline}
                    onChange={(e) => setFormState({ ...formState, tagline: e.target.value })}
                    className={`w-full bg-dark-800/70 border rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all ${
                      errors.tagline ? 'border-rose-500/50' : 'border-white/[0.06]'
                    }`}
                    placeholder="e.g., AI assistant that helps you write better"
                  />
                  {errors.tagline && <p className="mt-1 text-[12px] text-rose-400">{errors.tagline}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">
                    Description <span className="text-rose-400">*</span>
                    <span className="text-dark-400 font-normal ml-2">(200-500 characters)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className={`w-full bg-dark-800/70 border rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none ${
                      errors.description ? 'border-rose-500/50' : 'border-white/[0.06]'
                    }`}
                    placeholder="Describe what your tool does, its main features, and who it's for..."
                  />
                  {errors.description && <p className="mt-1 text-[12px] text-rose-400">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[13px] font-medium text-white mb-2">
                      Category <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={formState.category}
                      onChange={(e) => setFormState({ ...formState, category: e.target.value })}
                      className={`w-full bg-dark-800/70 border rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all ${
                        errors.category ? 'border-rose-500/50' : 'border-white/[0.06]'
                      }`}
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-[12px] text-rose-400">{errors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-white mb-2">
                      Pricing Model <span className="text-rose-400">*</span>
                    </label>
                    <select
                      value={formState.pricing}
                      onChange={(e) => setFormState({ ...formState, pricing: e.target.value })}
                      className={`w-full bg-dark-800/70 border rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all ${
                        errors.pricing ? 'border-rose-500/50' : 'border-white/[0.06]'
                      }`}
                    >
                      <option value="">Select pricing</option>
                      {pricingOptions.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                    {errors.pricing && <p className="mt-1 text-[12px] text-rose-400">{errors.pricing}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">
                    Key Features
                    <span className="text-dark-400 font-normal ml-2">(One per line)</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formState.features}
                    onChange={(e) => setFormState({ ...formState, features: e.target.value })}
                    className="w-full bg-dark-800/70 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none"
                    placeholder="AI-powered suggestions&#10;Real-time collaboration&#10;API access"
                  />
                </div>

                <div className="pt-6 border-t border-white/[0.06]">
                  <h2 className="text-lg font-semibold text-white mb-6">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[13px] font-medium text-white mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formState.contactName}
                        onChange={(e) => setFormState({ ...formState, contactName: e.target.value })}
                        className="w-full bg-dark-800/70 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-[13px] font-medium text-white mb-2">
                        Email Address <span className="text-rose-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formState.contactEmail}
                        onChange={(e) => setFormState({ ...formState, contactEmail: e.target.value })}
                        className={`w-full bg-dark-800/70 border rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all ${
                          errors.contactEmail ? 'border-rose-500/50' : 'border-white/[0.06]'
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.contactEmail && <p className="mt-1 text-[12px] text-rose-400">{errors.contactEmail}</p>}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-medium text-white mb-2">
                    Additional Information
                  </label>
                  <textarea
                    rows={3}
                    value={formState.additionalInfo}
                    onChange={(e) => setFormState({ ...formState, additionalInfo: e.target.value })}
                    className="w-full bg-dark-800/70 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none"
                    placeholder="Any other details you'd like us to know..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl text-[14px] font-semibold text-white"
                  >
                    <span className="relative z-10">Submit Tool for Review</span>
                  </button>
                  <p className="mt-3 text-[12px] text-dark-400">
                    By submitting, you agree to our terms and confirm that you have the right to submit this tool.
                  </p>
                </div>
              </form>
            )}
          </Card>
        </motion.div>
      </PageLayout>
    </>
  );
}
