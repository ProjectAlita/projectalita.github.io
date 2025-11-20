'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function PrivacyPolicyPage() {
  const sections = [
    {
      title: "Introduction",
      content: "EPAM Systems, Inc., together with its subsidiaries ('EPAM') has created this Privacy Policy in line with EPAM's commitment to your privacy on EPAM websites and marketing initiatives. The following discloses EPAM's information gathering, dissemination and protection practices."
    },
    {
      title: "Compliance",
      content: "If you do not agree to the terms of this Privacy Policy, please do not access or use EPAM websites. If you wish to stop receiving EPAM marketing materials then please click on the Unsubscribe button within the marketing email you have received from us."
    },
    {
      title: "Collection of Information",
      content: "EPAM collects information to provide better services to its users and to better understand the visitors to its websites and what content is of interest to them. EPAM collects information you affirmatively choose to submit (such as your name, email address, company name, title, country) for accessing downloads, viewing content, subscribing to newsletters, registering for events, and your preferences in receiving marketing. Information is also collected from your use of EPAM websites, such as IP address, browser type, ISP, referring/exit pages, platform type, date/time stamp, number of clicks, domain name and country/state. Location information may be collected when you use EPAM websites. EPAM may collect technical data from third parties and public sources such as analytics providers, advertising networks, and search information providers."
    },
    {
      title: "Sharing of Information",
      content: "EPAM may disclose your personal information to group companies, professional advisers, third party services providers and partners who provide data processing services, or who otherwise process personal information for purposes described in Privacy Notices. Information may also be disclosed to competent law enforcement bodies, regulatory agencies, government agencies, courts or other third parties where EPAM believes disclosure is necessary as a matter of applicable law or regulation, to exercise or defend legal rights, or to protect vital interests. EPAM may also share information with your consent."
    },
    {
      title: "Legal Basis of Processing",
      content: "If your personal information is protected by EU data protection law, EPAM's legal basis for collecting and using personal information will depend on the personal information concerned and the specific context. EPAM will normally collect personal information where it needs it to perform a contract with you, where the processing is in its legitimate interests and not overridden by your rights, or where it has your consent. In some cases, EPAM may have a legal obligation to collect personal information or may need it to protect vital interests."
    },
    {
      title: "Use of Information",
      content: "Information collected by EPAM will be used in accordance with this Privacy Policy for making better business decisions, supporting activities you choose to engage in, and providing higher quality solutions and services. EPAM uses location information to tailor your experience. Non-personal information may be used to enhance EPAM websites, and IP addresses for website diagnostics and administration. EPAM will retain personal information only as long as necessary to fulfill the purposes for which it was collected, including satisfying legal, accounting, or reporting requirements."
    },
    {
      title: "International Transfers",
      content: "EPAM processes information on servers in many countries around the world and you consent to your personal information being processed on a server located outside your country of residence. These countries may have different data protection laws. However, EPAM has taken appropriate safeguards to require that your personal information remains protected, including utilizing the European Commission's Standard Contractual Clauses for transfers between group companies."
    },
    {
      title: "Information Security",
      content: "EPAM protects your personal information in the same way it protects other confidential information, such as storing it on secure servers that only select EPAM personnel have access to, and by encrypting it to help prevent access by unauthorized parties. EPAM has procedures in place to deal with any personal information breach and will notify you and any applicable regulator when legally required."
    },
    {
      title: "Marketing",
      content: "EPAM will collect and use your personal data for marketing purposes. Your data will be stored in EPAM's CRM system and used to inform you about EPAM products and services that may be of interest and to send newsletters. For statistical purposes, EPAM will collect information about your response to emails and interaction to make decisions on future marketing. If you wish to stop this data collection and use, please contact privacy@epam.com."
    },
    {
      title: "Your Data Protection Rights",
      content: "If your personal information is protected by EU data protection law, you have rights to access, correct, update or request deletion of your personal information. You can object to processing, ask EPAM to restrict processing, or request portability of your personal information. You have the right to opt-out of marketing communications at any time by clicking 'unsubscribe' in emails or using the relevant opt-out mechanism. You can withdraw consent at any time, though this will not affect the lawfulness of prior processing. You have the right to complain to a data protection authority about EPAM's collection and use of your personal information."
    },
    {
      title: "Cookies",
      content: "You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, some parts of EPAM websites may become inaccessible or not function properly. For more information about cookies that EPAM uses, please see EPAM's Cookie Policy."
    },
    {
      title: "Links",
      content: "EPAM websites contain links, plug-ins and applications to various third party websites. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. EPAM has no control over, and is not responsible for the content, privacy policies or reliability of such third party connections. When you leave EPAM's website, EPAM encourages you to read the privacy notice and privacy policy of every website you visit."
    },
    {
      title: "Changes to the Policy",
      content: "EPAM reserves the right to modify or amend this Privacy Policy at its own discretion from time to time. Changes can be viewed here or elsewhere on EPAM websites. Your continued use of EPAM websites constitutes your acceptance of those changes. This version was last updated on 06 July 2018."
    },
    {
      title: "Contact Details",
      content: "It is important that the personal information EPAM holds about you is accurate and current. Please keep EPAM informed if your personal information changes. If you have any questions about this Privacy Policy, the practices of EPAM websites or your interaction with EPAM via websites, please contact EPAM."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-obsidian-50 dark:via-obsidian-100 dark:to-primary-800/20">
      {/* Header */}
      <header className="border-b border-white/60 dark:border-obsidian-300/60 bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <Link 
            href="/"
            className="inline-flex items-center text-sm text-primary-600 dark:text-blue-400 hover:text-primary-700 dark:hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Title Section */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* EPAM Notice Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-6 mb-12">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  EPAM Product
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  ELITEA is a product of EPAM Systems, Inc. This privacy policy is based on EPAM's Privacy Policy and applies to the ELITEA platform and services.
                </p>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.section
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {index + 1}. {section.title}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {section.content}
                </p>
                
                {/* Add specific subsections for certain sections */}
                {section.title === "Contact Details" && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-obsidian-300">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      For privacy-related inquiries, please contact EPAM:
                    </p>
                    <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                      <p className="font-semibold">EPAM Systems, Inc.</p>
                      <p>41 University Drive, Suite 202</p>
                      <p>Newtown, PA 18940</p>
                      <p><strong>Phone:</strong> +1-267-759-9000</p>
                      <p><strong>Fax:</strong> +1-267-759-8989</p>
                      <p><strong>Email:</strong> <a href="mailto:privacy@epam.com" className="text-primary-600 dark:text-blue-400 hover:underline">privacy@epam.com</a></p>
                    </div>
                  </div>
                )}
              </motion.section>
            ))}
          </div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 p-6 bg-gray-100 dark:bg-obsidian-300/60 rounded-2xl"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Need More Information?
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              If you have any questions about how we handle your data or want to exercise your privacy rights, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 dark:bg-blue-500 text-white rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-blue-600 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-obsidian-200 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-obsidian-300 transition-colors border border-gray-300 dark:border-obsidian-400"
              >
                Return Home
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/60 dark:border-obsidian-300/60 bg-white/40 dark:bg-obsidian-200/40 backdrop-blur-sm mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} elitea.ai. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/#terms" className="hover:text-primary-600 dark:hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
