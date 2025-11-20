'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    performance: true,
    functional: true,
    targeting: true
  })

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent')
    if (!cookieConsent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const acceptAll = () => {
    const consent = {
      necessary: true,
      performance: true,
      functional: true,
      targeting: true,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookieConsent', JSON.stringify(consent))
    setShowBanner(false)
    setShowSettings(false)
  }

  const savePreferences = () => {
    const consent = {
      ...preferences,
      necessary: true, // Always true
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('cookieConsent', JSON.stringify(consent))
    setShowBanner(false)
    setShowSettings(false)
  }

  const togglePreference = (key: string) => {
    if (key === 'necessary') return // Can't disable necessary cookies
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }))
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 z-[100] bg-white/95 dark:bg-obsidian-200/95 backdrop-blur-xl border-t border-gray-200 dark:border-obsidian-300 shadow-[0_-4px_24px_rgba(0,0,0,0.1)] dark:shadow-[0_-4px_24px_rgba(0,0,0,0.4)]"
        role="region"
        aria-label="Cookie banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {!showSettings ? (
            // Main Banner
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  This website uses cookies for analytics, personalization and advertising. By continuing to browse, you agree to our use of cookies. To learn more, click{' '}
                  <Link 
                    href="/cookies" 
                    className="text-primary-600 dark:text-blue-400 hover:underline font-semibold"
                    onClick={() => setShowBanner(false)}
                  >
                    Cookie Policy
                  </Link>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-6 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-obsidian-300 hover:bg-gray-200 dark:hover:bg-obsidian-400 rounded-lg transition-colors border border-gray-300 dark:border-obsidian-400"
                >
                  COOKIE SETTINGS
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-primary-600 dark:bg-blue-500 hover:bg-primary-700 dark:hover:bg-blue-600 rounded-lg transition-colors shadow-md"
                >
                  ACCEPT ALL
                </button>
              </div>
            </div>
          ) : (
            // Settings Panel
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Cookie Preferences
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  aria-label="Close settings"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-auto">
                {/* Necessary Cookies */}
                <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-obsidian-300/50 rounded-lg">
                  <div className="flex-1 mr-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Absolutely Necessary Cookies
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Essential for the website to function. Cannot be disabled.
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-6 bg-primary-600 dark:bg-blue-500 rounded-full relative cursor-not-allowed opacity-50">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Performance Cookies */}
                <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-obsidian-300/50 rounded-lg">
                  <div className="flex-1 mr-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Performance Cookies
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Help us understand how visitors interact with our website.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('performance')}
                    className="flex items-center"
                    aria-label="Toggle performance cookies"
                  >
                    <div className={`w-12 h-6 rounded-full relative transition-colors ${preferences.performance ? 'bg-primary-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.performance ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </button>
                </div>

                {/* Functional Cookies */}
                <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-obsidian-300/50 rounded-lg">
                  <div className="flex-1 mr-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Functionality Cookies
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Remember your preferences and provide enhanced features.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('functional')}
                    className="flex items-center"
                    aria-label="Toggle functional cookies"
                  >
                    <div className={`w-12 h-6 rounded-full relative transition-colors ${preferences.functional ? 'bg-primary-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.functional ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </button>
                </div>

                {/* Targeting Cookies */}
                <div className="flex items-start justify-between p-3 bg-gray-50 dark:bg-obsidian-300/50 rounded-lg">
                  <div className="flex-1 mr-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Targeting/Advertising Cookies
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Used to deliver relevant ads and track ad campaign performance.
                    </p>
                  </div>
                  <button
                    onClick={() => togglePreference('targeting')}
                    className="flex items-center"
                    aria-label="Toggle targeting cookies"
                  >
                    <div className={`w-12 h-6 rounded-full relative transition-colors ${preferences.targeting ? 'bg-primary-600 dark:bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${preferences.targeting ? 'right-1' : 'left-1'}`}></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-obsidian-400">
                <button
                  onClick={acceptAll}
                  className="flex-1 px-6 py-2.5 text-sm font-semibold text-white bg-primary-600 dark:bg-blue-500 hover:bg-primary-700 dark:hover:bg-blue-600 rounded-lg transition-colors"
                >
                  ACCEPT ALL
                </button>
                <button
                  onClick={savePreferences}
                  className="flex-1 px-6 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-obsidian-300 hover:bg-gray-200 dark:hover:bg-obsidian-400 rounded-lg transition-colors border border-gray-300 dark:border-obsidian-400"
                >
                  SAVE PREFERENCES
                </button>
              </div>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Learn more in our{' '}
                <Link 
                  href="/cookies" 
                  className="text-primary-600 dark:text-blue-400 hover:underline"
                  onClick={() => setShowBanner(false)}
                >
                  Cookie Policy
                </Link>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
