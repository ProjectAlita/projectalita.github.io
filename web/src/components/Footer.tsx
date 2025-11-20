'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'ELITEA', href: 'https://next.elitea.ai', external: true },
      { name: 'LLM Testing Guide', href: '/articles/llm-testing' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Changelog', href: '/docs/release-notes/rn_current/' },
    ],
    company: [
      { name: 'About', href: '/about' },
      { name: 'Team', href: '/team' },
      { name: 'Careers', href: 'https://www.epam.com/careers', external: true },
      { name: 'Contact', href: 'mailto:supportAlita@epam.com' },
    ],
    resources: [
      { name: 'Community', href: 'https://solutionshub.epam.com/solution/elitea', external: true },
      { name: 'Support', href: 'mailto:supportAlita@epam.com' },
      { name: 'FAQ', href: 'https://elitea.ai/docs/support/faqs/', external: true },
      { name: 'Status', href: '/status' },
    ],
    legal: [
      { name: 'Privacy', href: '/privacy' },
      { name: 'Terms', href: '/terms' },
      { name: 'Security', href: '/security' },
      { name: 'Cookies', href: '/cookies' },
    ],
  }

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/ProjectAlita',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/epam-systems/posts/?feedView=all',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com/@elitea-ai',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-obsidian-50 dark:via-obsidian-100 dark:to-primary-800/20 border-t border-white/60 dark:border-obsidian-300/60 overflow-hidden transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d5a87' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <div className="col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl px-4 py-2 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 mb-4"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <span className="w-2 h-2 bg-primary-500 dark:bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">elitea.ai</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 max-w-xs">
                Building practical AI experiments at the intersection of{' '}
                <strong className="text-primary-600 dark:text-primary-400">AI</strong>,{' '}
                <strong className="text-secondary-600 dark:text-cyan-400">Data</strong>, and{' '}
                <strong className="text-accent-600 dark:text-purple-400">Engineering</strong>.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-full flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-blue-400 shadow-[0_4px_12px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 transition-all duration-300"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="col-span-1"
            >
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 capitalize">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      {...((link as any).external && { target: '_blank', rel: 'noopener noreferrer' })}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-blue-400 transition-colors duration-200 inline-flex items-center group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 p-6 lg:p-8"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Stay Updated
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Get the latest experiments, tutorials, and AI insights delivered to your inbox.
                </p>
              </div>
              <div className="flex-shrink-0 w-full lg:w-auto">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 lg:w-64 px-4 py-3 bg-white/80 dark:bg-obsidian-100/80 backdrop-blur-sm rounded-[16px] text-sm text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:focus:ring-blue-500/50 transition-all duration-200"
                    style={{
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-primary-600/95 dark:bg-blue-500/95 backdrop-blur-xl text-white rounded-[16px] text-sm font-semibold shadow-[0_4px_16px_rgba(37,99,235,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] dark:shadow-[0_4px_16px_rgba(59,130,246,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] dark:hover:shadow-[0_6px_20px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-primary-500/20 dark:border-blue-400/30 transition-all duration-300"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="pt-8 border-t border-white/40 dark:border-obsidian-300/40"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
            <p>
              © {currentYear} elitea.ai. All rights reserved.
            </p>
            <p className="flex items-center gap-1">
              Made with{' '}
              <span className="text-red-500 animate-pulse">❤️</span>{' '}
              for the AI community
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
