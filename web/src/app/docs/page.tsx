'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function DocsRedirectPage() {
  useEffect(() => {
    // In production, MkDocs is served at /docs/
    // In development, redirect to the MkDocs dev server
    const isDevelopment = process.env.NODE_ENV === 'development'
    
    if (isDevelopment) {
      // Redirect to local MkDocs server
      window.location.href = 'http://localhost:8000'
    } else {
      // In production, redirect to the MkDocs site
      window.location.href = '/docs/home/introduction/'
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-obsidian-50 dark:via-obsidian-100 dark:to-primary-800/20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center px-6"
      >
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto bg-primary-600/10 dark:bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-primary-600 dark:text-blue-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Redirecting to Documentation
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Taking you to the ELITEA documentation...
          </p>
          <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
            <p>
              <strong>Development:</strong> Make sure MkDocs is running at{' '}
              <code className="px-2 py-1 bg-gray-100 dark:bg-obsidian-200 rounded">http://localhost:8000</code>
            </p>
            <p className="text-xs">
              Run <code className="px-2 py-1 bg-gray-100 dark:bg-obsidian-200 rounded">./scripts/dev-docs.sh</code> or{' '}
              <code className="px-2 py-1 bg-gray-100 dark:bg-obsidian-200 rounded">./scripts/dev-all.sh</code>
            </p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="http://localhost:8000"
            className="inline-flex items-center px-6 py-3 bg-primary-600 dark:bg-blue-500 text-white rounded-lg font-semibold hover:bg-primary-700 dark:hover:bg-blue-600 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Open Docs (Dev)
          </a>
          <a
            href="/"
            className="inline-flex items-center px-6 py-3 bg-white dark:bg-obsidian-200 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-obsidian-300 transition-colors border border-gray-300 dark:border-obsidian-400"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  )
}
