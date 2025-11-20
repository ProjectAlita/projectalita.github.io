'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

export default function CookiePolicyPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const cookieCategories = [
    {
      id: 'essential',
      title: 'Absolutely Necessary Cookies',
      description: 'These Cookies are essential to enable you to move around EPAM Sites and use its features. Without these Cookies, services you have asked for, like adding items to an online shopping cart, cannot be provided.',
      examples: [
        'Session cookies for maintaining your login state',
        'Security cookies for protecting against fraudulent activity',
        'Load balancing cookies for distributing traffic'
      ]
    },
    {
      id: 'performance',
      title: 'Performance Cookies',
      description: 'These Cookies collect information about how you use EPAM Sites. Information collected includes, for example, browsers and operating systems used, domain name of the website previously visited, number of visits, average duration of visit, and pages viewed. These Cookies do not collect information that personally identifies you and are considered aggregated data. Performance Cookies are used to improve the user-friendliness of a website and enhance your experience.',
      examples: [
        'Analytics cookies to understand how visitors use the site',
        'Browser and operating system information collection',
        'Visit duration and page view tracking',
        'Domain name and referring page data'
      ]
    },
    {
      id: 'functional',
      title: 'Functionality Cookies',
      description: 'These Cookies allow the website to remember choices you make (such as your username or ID, language preference, or the area or region you are in) and provide enhanced, more personal features. These Cookies can also be used to remember changes you have made to text size, fonts, and other customizable parts of web pages. They may also be used to provide services you have asked for, such as watching a video or commenting on a blog. The information these Cookies collect may be anonymized, and they cannot track your browsing activity on other websites.',
      examples: [
        'Language preference and region selection',
        'Username or ID remembrance',
        'Text size, font, and customization preferences',
        'Video playback and commenting services'
      ]
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
              Cookie Policy
            </h1>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              EPAM Systems, Inc., together with its subsidiaries (collectively, "EPAM"), provides this Cookie Policy, which applies to any websites, branded pages on third party platforms, and applications accessed or used through such websites or third party platforms ("EPAM Sites"), which are operated by or on behalf of EPAM.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
              When you visit the EPAM Sites, EPAM uses a number of suppliers who may place cookies, tags, pixels, and similar tracking technologies (collectively, "Cookies") on your device, browser, or the webpage you are viewing, in order to personalize your experience (e.g., language preferences), understand usage patterns, provide, improve and secure the EPAM Sites.
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
                  ELITEA is a product of EPAM Systems, Inc. This cookie policy is based on EPAM's Cookie Policy and applies to the ELITEA platform and services.
                </p>
              </div>
            </div>
          </div>

          {/* What Are Cookies Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              What Are Cookies?
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We use both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device for a set period or until you delete them).
            </p>
          </motion.section>

          {/* Cookie Categories */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Types of Cookies We Use
            </h2>
            <div className="space-y-4">
              {cookieCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 dark:hover:bg-obsidian-300/30 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {category.description}
                      </p>
                    </div>
                    <svg
                      className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                        activeCategory === category.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activeCategory === category.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-6 border-t border-gray-200 dark:border-obsidian-300"
                    >
                      <h4 className="font-semibold text-gray-900 dark:text-white mt-4 mb-3">
                        Examples:
                      </h4>
                      <ul className="space-y-2">
                        {category.examples.map((example, i) => (
                          <li key={i} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                            <svg className="w-5 h-5 text-primary-600 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Managing Cookies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              How to Manage Cookies
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you do not agree to certain uses of Cookies detailed above, you can exercise certain choices through your browser settings or by not using the EPAM Sites. If you choose to reject cookies via your browser settings, you may still use EPAM Sites though your access to some functionality and areas may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
            </p>
            <div className="bg-gray-50 dark:bg-obsidian-300/60 rounded-xl p-4 mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Opt-Out Resources:
              </h3>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>• <a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-blue-400 hover:underline">Digital Advertising Alliance-US</a></li>
                <li>• <a href="https://www.networkadvertising.org/choices/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-blue-400 hover:underline">Network Advertising Initiative</a></li>
                <li>• <a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-blue-400 hover:underline">Digital Advertising Alliance-Canada</a></li>
                <li>• <a href="http://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-blue-400 hover:underline">European Interactive Digital Advertising Alliance</a></li>
                <li>• <a href="http://www.aboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-blue-400 hover:underline">www.aboutcookies.org</a></li>
                <li>• <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-blue-400 hover:underline">www.allaboutcookies.org</a></li>
                <li>• <a href="http://www.google.com/settings/ads/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-blue-400 hover:underline">Google Display Network ads preferences</a></li>
              </ul>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/50 rounded-xl p-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Do-Not Track:</strong> At this time, EPAM Sites are not configured to honor browsers' "Do Not Track" signals.
              </p>
            </div>
          </motion.section>

          {/* Third-Party Cookies */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Third-Party Cookies and Behavioral Advertising
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              EPAM may also allow third party service performance and retargeting Cookies to collect information about your online activities on the EPAM Sites and across unaffiliated websites you may visit. This information is used to provide ads tailored to your interests (behavioral advertising), and to collect information to help track and manage the effectiveness of the ads and number of visitors.
            </p>
            <div className="space-y-3">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Third-party services EPAM may use include:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300 ml-4">
                <li>Google Analytics</li>
                <li>Google reCAPTCHA</li>
                <li>LinkedIn Insight Tag</li>
                <li>Google AdWords</li>
                <li>Facebook Pixel</li>
                <li>Amplitude</li>
                <li>Hotjar</li>
                <li>Visitor Queue</li>
                <li>Marketo Munchkin</li>
                <li>Reddit</li>
                <li>Microsoft Clarity</li>
                <li>Typeform</li>
              </ul>
              <p className="text-sm text-gray-700 dark:text-gray-300 mt-4">
                This means EPAM may show ads based on your past visits to EPAM Sites, through publishing networks, such as the Google Content Network (GCN). More information about these Cookies may be available on the relevant third party's website.
              </p>
            </div>
          </motion.section>

          {/* Updates Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 mb-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Changes to This Policy
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, our operations, or for other reasons. Please check this page periodically for updates.
            </p>
          </motion.section>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-6 lg:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              If you have any questions about this Cookie Policy, please contact EPAM using the contact details below:
            </p>
            <div className="bg-gray-50 dark:bg-obsidian-300/60 rounded-xl p-4">
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <p className="font-semibold">EPAM Systems, Inc.</p>
                <p>41 University Drive, Suite 202</p>
                <p>Newtown, PA 18940</p>
                <p><strong>Phone:</strong> +1-267-759-9000</p>
                <p><strong>Fax:</strong> +1-267-759-8989</p>
                <p><strong>Email:</strong> <a href="mailto:privacy@epam.com" className="text-primary-600 dark:text-blue-400 hover:underline">privacy@epam.com</a></p>
              </div>
            </div>
          </motion.section>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-12 p-6 bg-gray-100 dark:bg-obsidian-300/60 rounded-2xl"
          >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Need More Information?
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              For more details about how we protect your privacy, please review our Privacy Policy.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 dark:bg-blue-500 text-white rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-blue-600 transition-colors"
              >
                View Privacy Policy
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
              <Link href="/cookies" className="hover:text-primary-600 dark:hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
