import { useState } from 'react';
import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import { MailIcon, TwitterIcon, LinkedInIcon, GithubIcon } from '../components/Icons';

const contactReasons = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'submit-tool', label: 'Submit a Tool' },
  { value: 'partnership', label: 'Partnership Opportunity' },
  { value: 'press', label: 'Press & Media' },
  { value: 'bug', label: 'Report a Bug' },
  { value: 'feedback', label: 'Feedback' },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    reason: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to a backend
    setSubmitted(true);
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <>
      <SEO
        title="Contact Us — Get in Touch"
        description="Have questions about AI tools? Want to submit a tool or partner with us? Contact the NextGEN AI Tools team. We typically respond within 24 hours."
        canonical="/contact"
        keywords="contact NextGEN AI, submit AI tool, AI tools partnership, feedback"
        structuredData={breadcrumbSchema}
      />

      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="text-base sm:text-lg text-dark-200">
              Have a question, feedback, or want to submit a tool? We'd love to hear from you. 
              Our team typically responds within 24 hours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6 sm:p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">Message Sent!</h2>
                    <p className="text-[14px] text-dark-300 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: '', email: '', reason: 'general', message: '' });
                      }}
                      className="text-[14px] font-medium text-brand-400 hover:text-brand-300"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-[13px] font-medium text-white mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          required
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className="w-full bg-dark-800/70 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-[13px] font-medium text-white mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          required
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className="w-full bg-dark-800/70 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="reason" className="block text-[13px] font-medium text-white mb-2">
                        Reason for Contact
                      </label>
                      <select
                        id="reason"
                        value={formState.reason}
                        onChange={(e) => setFormState({ ...formState, reason: e.target.value })}
                        className="w-full bg-dark-800/70 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all"
                      >
                        {contactReasons.map((reason) => (
                          <option key={reason.value} value={reason.value}>
                            {reason.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[13px] font-medium text-white mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className="w-full bg-dark-800/70 border border-white/[0.06] rounded-xl px-4 py-3 text-[14px] text-white placeholder-dark-400 focus:outline-none focus:border-brand-500/40 focus:ring-1 focus:ring-brand-500/20 transition-all resize-none"
                        placeholder="Tell us how we can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary w-full px-6 py-3.5 rounded-xl text-[14px] font-semibold text-white"
                    >
                      <span className="relative z-10">Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="space-y-6"
            >
              {/* Email */}
              <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                  <MailIcon size={20} className="text-brand-400" />
                </div>
                <h3 className="text-[15px] font-semibold text-white mb-1">Email Us</h3>
                <p className="text-[13px] text-dark-300 mb-3">For general inquiries</p>
                <a
                  href="mailto:hello@nextgenai.tools"
                  className="text-[14px] font-medium text-brand-400 hover:text-brand-300"
                >
                  hello@nextgenai.tools
                </a>
              </div>

              {/* Social */}
              <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
                <h3 className="text-[15px] font-semibold text-white mb-4">Follow Us</h3>
                <div className="flex items-center gap-3">
                  <a
                    href="https://twitter.com/nextgenaitools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] flex items-center justify-center text-dark-300 hover:text-white transition-all"
                    aria-label="Twitter"
                  >
                    <TwitterIcon size={18} />
                  </a>
                  <a
                    href="https://linkedin.com/company/nextgenaitools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] flex items-center justify-center text-dark-300 hover:text-white transition-all"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon size={18} />
                  </a>
                  <a
                    href="https://github.com/nextgenaitools"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] flex items-center justify-center text-dark-300 hover:text-white transition-all"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={18} />
                  </a>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="rounded-2xl border border-white/[0.06] bg-surface-2/40 p-6">
                <h3 className="text-[15px] font-semibold text-white mb-2">Frequently Asked</h3>
                <ul className="space-y-2 text-[13px]">
                  <li>
                    <span className="text-dark-300">How do I submit a tool?</span>
                    <p className="text-dark-400 mt-0.5">Select "Submit a Tool" above and provide the details.</p>
                  </li>
                  <li>
                    <span className="text-dark-300">Is listing free?</span>
                    <p className="text-dark-400 mt-0.5">Yes, basic listings are completely free.</p>
                  </li>
                  <li>
                    <span className="text-dark-300">How long for a response?</span>
                    <p className="text-dark-400 mt-0.5">We typically respond within 24 hours.</p>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
