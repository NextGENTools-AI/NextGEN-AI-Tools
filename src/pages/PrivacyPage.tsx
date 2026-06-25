import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';

export default function PrivacyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Privacy Policy', url: '/privacy' },
  ]);

  return (
    <>
      <SEO
        title="Privacy Policy — Your Data, Protected"
        description="Learn how NextGEN AI Tools collects, uses, and protects your personal information. We are committed to transparency and your privacy rights."
        canonical="/privacy"
        keywords="privacy policy, data protection, GDPR, cookies, personal information"
        structuredData={breadcrumbSchema}
      />

      <div className="min-h-screen pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-dark-300">
              Last updated: January 24, 2025
            </p>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-8 text-[15px] text-dark-200 leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Introduction</h2>
                <p>
                  NextGEN AI Tools ("we," "our," or "us") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                  information when you visit our website nextgenai.tools (the "Site").
                </p>
                <p>
                  Please read this privacy policy carefully. If you do not agree with the terms of 
                  this privacy policy, please do not access the site.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Information We Collect</h2>
                
                <h3 className="text-lg font-medium text-white mt-6 mb-3">Personal Data</h3>
                <p>We may collect personally identifiable information, such as:</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>Name and email address (when you subscribe to our newsletter)</li>
                  <li>Contact information (when you submit a contact form)</li>
                  <li>Any other information you choose to provide</li>
                </ul>

                <h3 className="text-lg font-medium text-white mt-6 mb-3">Automatically Collected Data</h3>
                <p>When you visit our Site, we automatically collect certain information:</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>IP address and browser type</li>
                  <li>Device information and operating system</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">How We Use Your Information</h2>
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Send newsletters and marketing communications (with your consent)</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Analyze usage patterns and optimize user experience</li>
                  <li>Detect and prevent fraud or security threats</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our Site 
                  and hold certain information. Cookies are files with small amounts of data that 
                  may include an anonymous unique identifier.
                </p>
                <p className="mt-3">Types of cookies we use:</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li><strong className="text-white">Essential cookies:</strong> Required for the Site to function properly</li>
                  <li><strong className="text-white">Analytics cookies:</strong> Help us understand how visitors use our Site</li>
                  <li><strong className="text-white">Preference cookies:</strong> Remember your settings and preferences</li>
                </ul>
                <p className="mt-3">
                  You can instruct your browser to refuse all cookies or indicate when a cookie is 
                  being sent. However, some features of our Site may not function properly without cookies.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Third-Party Services</h2>
                <p>We may use third-party services that collect, monitor, and analyze data:</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li><strong className="text-white">Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong className="text-white">Email service providers:</strong> For newsletter delivery</li>
                  <li><strong className="text-white">Hosting providers:</strong> For website infrastructure</li>
                </ul>
                <p className="mt-3">
                  These third parties have their own privacy policies addressing how they use such information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures to protect 
                  your personal information. However, no method of transmission over the Internet 
                  or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Your Rights (GDPR)</h2>
                <p>If you are a resident of the European Economic Area (EEA), you have certain data protection rights:</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li><strong className="text-white">Right to access:</strong> Request copies of your personal data</li>
                  <li><strong className="text-white">Right to rectification:</strong> Request correction of inaccurate data</li>
                  <li><strong className="text-white">Right to erasure:</strong> Request deletion of your data</li>
                  <li><strong className="text-white">Right to restrict processing:</strong> Request limitation of data processing</li>
                  <li><strong className="text-white">Right to data portability:</strong> Request transfer of your data</li>
                  <li><strong className="text-white">Right to object:</strong> Object to processing of your data</li>
                </ul>
                <p className="mt-3">
                  To exercise these rights, please contact us at privacy@nextgenai.tools.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">California Privacy Rights (CCPA)</h2>
                <p>
                  California residents have specific rights regarding their personal information under 
                  the California Consumer Privacy Act (CCPA), including the right to know, delete, 
                  and opt-out of the sale of personal information. We do not sell personal information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Children's Privacy</h2>
                <p>
                  Our Site is not intended for children under 13 years of age. We do not knowingly 
                  collect personal information from children under 13. If you are a parent or guardian 
                  and believe your child has provided us with personal information, please contact us.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. We will notify you of any 
                  changes by posting the new Privacy Policy on this page and updating the "Last updated" 
                  date. We encourage you to review this Privacy Policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
                <p>If you have questions about this Privacy Policy, please contact us:</p>
                <ul className="list-none space-y-2 mt-3">
                  <li><strong className="text-white">Email:</strong> privacy@nextgenai.tools</li>
                  <li><strong className="text-white">Website:</strong> nextgenai.tools/contact</li>
                </ul>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
