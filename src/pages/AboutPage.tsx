import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import { UsersIcon, ZapIcon, ShieldIcon, SparkleIcon, ArrowRightIcon } from '../components/Icons';

const values = [
  {
    icon: SparkleIcon,
    title: 'Clear Listings',
    description: 'We keep tool listings easy to scan with concise summaries, pricing notes, and category placement.',
  },
  {
    icon: UsersIcon,
    title: 'Useful Context',
    description: 'We aim to make it easier to compare tools by use case rather than rely on hype.',
  },
  {
    icon: ZapIcon,
    title: 'Regularly Refreshed',
    description: 'The directory is updated as tools and pricing evolve, so the information stays useful.',
  },
  {
    icon: ShieldIcon,
    title: 'Transparent Approach',
    description: 'We focus on clear descriptions and practical comparisons rather than unsupported claims.',
  },
];

const stats = [
  { value: 'Curated', label: 'Tool Listings' },
  { value: 'Updated', label: 'Regularly' },
  { value: 'Organized', label: 'By Category' },
  { value: 'Browseable', label: 'By Use Case' },
];

const team = [
  { name: 'Sarah Chen', role: 'Founder & CEO', initial: 'SC' },
  { name: 'Marcus Johnson', role: 'Head of Content', initial: 'MJ' },
  { name: 'Emma Thompson', role: 'Lead Editor', initial: 'ET' },
  { name: 'David Kim', role: 'Tech Lead', initial: 'DK' },
];

export default function AboutPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  return (
    <>
      <SEO
        title="About Us — Curated AI Tool Discovery"
        description="Learn about NextGEN AI Tools, a curated directory for discovering AI tools by category, pricing, and use case."
        canonical="/about"
        keywords="about NextGEN AI, AI tools directory, AI discovery platform, artificial intelligence tools"
        structuredData={breadcrumbSchema}
      />

      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
              Helping people explore
              <span className="gradient-text-brand"> AI tools with less noise</span>
            </h1>
            <p className="text-base sm:text-lg text-dark-200 leading-relaxed">
              NextGEN AI Tools is a curated directory of AI-powered solutions. We organize options by category and make it easier to compare features, pricing, and use cases without relying on hype.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl border border-white/[0.06] bg-surface-2/40"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-[13px] text-dark-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Our Story */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-20"
          >
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">Our Story</h2>
              <div className="space-y-4 text-[15px] text-dark-200 leading-relaxed">
                <p>
                  The AI tools landscape is moving quickly, and it can be hard to compare options from one place. We created this directory to make that process easier.
                </p>
                <p>
                  We organize AI tools by category and add practical context so visitors can compare features, pricing, and use cases more clearly. We also update listings as the information changes.
                </p>
                <p>
                  As the space evolves, we keep refining the directory so it remains a useful place to explore ideas, tools, and workflows.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Values */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className="p-6 rounded-2xl border border-white/[0.06] bg-surface-2/40"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mb-4">
                      <Icon size={24} className="text-brand-400" />
                    </div>
                    <h3 className="text-[15px] font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-[13px] text-dark-300 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </motion.section>

          {/* Team */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mb-20"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500/20 to-cyan-500/20 flex items-center justify-center text-xl font-bold text-white border border-white/[0.08] mx-auto mb-4">
                    {member.initial}
                  </div>
                  <h3 className="text-[14px] font-semibold text-white">{member.name}</h3>
                  <p className="text-[12px] text-dark-400">{member.role}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center"
          >
            <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-2xl border border-white/[0.06] bg-surface-2/40">
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                Ready to discover your next AI tool?
              </h2>
              <p className="text-[14px] text-dark-200 mb-6">
                Browse our comprehensive directory and find the perfect AI solutions for your needs.
              </p>
              <Link
                to="/categories"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-white"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore AI Tools
                  <ArrowRightIcon size={16} />
                </span>
              </Link>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
