import { motion } from 'framer-motion';
import SEO, { generateBreadcrumbSchema } from '../components/SEO';

export default function TermsPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms' },
  ]);

  return (
    <>
      <SEO
        title="Terms of Service — Usage Agreement"
        description="Read the Terms of Service for NextGEN AI Tools. Understand your rights and responsibilities when using our AI tools directory and services."
        canonical="/terms"
        keywords="terms of service, terms and conditions, user agreement, legal terms"
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
              Terms of Service
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
                <h2 className="text-xl font-semibold text-white mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing or using NextGEN AI Tools (the "Service"), available at nextgenai.tools, 
                  you agree to be bound by these Terms of Service ("Terms"). If you disagree with 
                  any part of these terms, you may not access the Service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
                <p>
                  NextGEN AI Tools is an online directory and resource platform that provides 
                  information about artificial intelligence tools and services. Our Service includes:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>A searchable directory of AI tools</li>
                  <li>Reviews, comparisons, and editorial content</li>
                  <li>Newsletter and email communications</li>
                  <li>Educational resources and guides</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">3. User Responsibilities</h2>
                <p>When using our Service, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 mt-3">
                  <li>Provide accurate information when required</li>
                  <li>Use the Service only for lawful purposes</li>
                  <li>Not attempt to gain unauthorized access to any part of the Service</li>
                  <li>Not use automated systems to access the Service without permission</li>
                  <li>Not interfere with or disrupt the Service or servers</li>
                  <li>Not reproduce, duplicate, copy, sell, or exploit any portion of the Service</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">4. Intellectual Property</h2>
                <p>
                  The Service and its original content (excluding content provided by users or 
                  third parties), features, and functionality are owned by NextGEN AI Tools and 
                  are protected by international copyright, trademark, patent, trade secret, 
                  and other intellectual property laws.
                </p>
                <p className="mt-3">
                  You may not use our branding, logos, or trademarks without express written 
                  permission. Our content may not be copied, reproduced, modified, or distributed 
                  without authorization.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">5. Third-Party Content and Links</h2>
                <p>
                  Our Service contains links to third-party websites and displays information 
                  about third-party AI tools. We do not control, endorse, or assume responsibility 
                  for the content, privacy policies, or practices of any third-party sites or services.
                </p>
                <p className="mt-3">
                  Information about AI tools is provided for informational purposes only. We strive 
                  for accuracy but cannot guarantee that all information is current or complete. 
                  You should verify information directly with tool providers before making decisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">6. User Submissions</h2>
                <p>
                  If you submit content to our Service (such as tool submissions, reviews, or 
                  feedback), you grant us a non-exclusive, worldwide, royalty-free license to 
                  use, reproduce, modify, and distribute that content in connection with the Service.
                </p>
                <p className="mt-3">
                  You represent that you own or have rights to any content you submit and that 
                  it does not violate the rights of any third party.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">7. Newsletter and Communications</h2>
                <p>
                  By subscribing to our newsletter, you consent to receive periodic emails from us. 
                  You may unsubscribe at any time using the link provided in each email. We will 
                  not sell or share your email address with third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">8. Disclaimer of Warranties</h2>
                <p>
                  THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, 
                  EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, 
                  SECURE, OR ERROR-FREE.
                </p>
                <p className="mt-3">
                  We do not guarantee the accuracy, completeness, or usefulness of any information 
                  on the Service. Any reliance you place on such information is strictly at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
                <p>
                  IN NO EVENT SHALL NEXTGEN AI TOOLS, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, 
                  OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, 
                  OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
                </p>
                <p className="mt-3">
                  Our total liability for any claims related to the Service shall not exceed the 
                  amount you paid us, if any, in the past twelve months.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">10. Indemnification</h2>
                <p>
                  You agree to indemnify, defend, and hold harmless NextGEN AI Tools and its 
                  affiliates from any claims, damages, losses, or expenses (including reasonable 
                  attorneys' fees) arising from your use of the Service or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">11. Termination</h2>
                <p>
                  We may terminate or suspend your access to the Service immediately, without prior 
                  notice or liability, for any reason, including breach of these Terms. Upon termination, 
                  your right to use the Service will cease immediately.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">12. Governing Law</h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of 
                  the State of Delaware, United States, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">13. Changes to Terms</h2>
                <p>
                  We reserve the right to modify or replace these Terms at any time. If a revision 
                  is material, we will provide at least 30 days' notice prior to any new terms taking 
                  effect. Your continued use of the Service after changes constitutes acceptance of 
                  the modified Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">14. Severability</h2>
                <p>
                  If any provision of these Terms is held to be unenforceable or invalid, such 
                  provision will be changed and interpreted to accomplish the objectives of such 
                  provision to the greatest extent possible under applicable law, and the remaining 
                  provisions will continue in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-white mb-4">15. Contact Information</h2>
                <p>If you have questions about these Terms, please contact us:</p>
                <ul className="list-none space-y-2 mt-3">
                  <li><strong className="text-white">Email:</strong> legal@nextgenai.tools</li>
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
