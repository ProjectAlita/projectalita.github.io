'use client'

import { motion } from 'framer-motion'

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-obsidian-50 dark:via-obsidian-100 dark:to-primary-800/20 transition-colors duration-500">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Security
          </h1>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Learn about our security practices and policies.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Coming soon...
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
