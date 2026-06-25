import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';
import { UsersIcon, ZapIcon, ShieldIcon, SparkleIcon, ArrowRightIcon } from '../components/Icons';

const values = [
  {
    icon: SparkleIcon,
    title: 'Quality First',
    description: 'Every tool in our directory is thoroughly vetted by our editorial team to ensure accuracy and relevance.',
  },
  {
    icon: UsersIcon,
    title: 'Community Driven',
    description: 'We listen to our users and continuously improve based on feedback from the AI tools community.',
  },
  {
    icon: ZapIcon,
    title: 'Always Current',
    description: 'The AI landscape evolves rapidly. We update our directory daily to reflect new tools and changes.',
  },
  {
    icon: ShieldIcon,
    title: 'Unbiased Reviews',
    description: 'Our reviews are independent and honest. We never accept payment for favorable coverage.',
  },
];

const stats = [
  { value: '2,400+', label: 'AI Tools Listed' },
  { value: '50+', label: 'Categories' },
  { value: '180K+', label: 'Monthly Visitors' },
  { value: '500+', label: 'Expert Reviews' },
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
        title="About Us — Our Mission to Democratize AI"
        description="Learn about NextGEN AI Tools, the most comprehensive AI tools directory. Our mission is to help everyone discover and leverage the best AI solutions."
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
              Helping the world discover
              <span className="gradient-text-brand"> the best AI tools</span>
            </h1>
            <p className="text-base sm:text-lg text-dark-200 leading-relaxed">
              NextGEN AI Tools is the most comprehensive directory of AI-powered solutions. 
              We're on a mission to democratize access to artificial intelligence by making 
              it easy for anyone to find, compare, and integrate the right AI tools for their needs.
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
                  NextGEN AI Tools was founded in 2023 with a simple observation: the AI tools 
                  landscape was exploding, but there was no reliable way to discover and compare 
                  the options available. Professionals, creators, and businesses were spending 
                  hours researching tools that might not even fit their needs.
                </p>
                <p>
                  We set out to solve this problem by creating a comprehensive, curated directory 
                  where anyone can quickly find the right AI tool for their specific use case. 
                  Every tool in our directory is reviewed by our editorial team, ensuring accurate 
                  information and honest assessments.
                </p>
                <p>
                  Today, NextGEN AI Tools serves over 180,000 monthly visitors, helping students, 
                  freelancers, marketers, developers, and enterprise teams navigate the AI revolution. 
                  We're proud to be a trusted resource in the AI community, and we're just getting started.
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
