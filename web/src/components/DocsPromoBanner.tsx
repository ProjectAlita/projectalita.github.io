'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function DocsPromoBanner() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-obsidian-50 dark:via-obsidian-100 dark:to-primary-800/20 transition-colors duration-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-200 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border border-blue-200/50 dark:border-blue-500/30 shadow-sm dark:shadow-blue-500/10"
          >
            <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-300 rounded-full mr-2 animate-pulse"></span>
            📚 Testing AI Applications
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Test Your&nbsp;
            <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
              AI Applications
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master comprehensive testing strategies for LLM-powered systems with proven approaches 
            and best practices for quality, reliability, and safety
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Link href="/docs/llm-testing">
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600/95 dark:bg-blue-500/90 backdrop-blur-xl text-white rounded-[20px] font-semibold text-lg shadow-[0_8px_24px_rgba(37,99,235,0.25),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_24px_rgba(59,130,246,0.4),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.35),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_32px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.2)] transition-all duration-300 border border-primary-500/20 dark:border-blue-400/30"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <span>Explore Testing Guide</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
