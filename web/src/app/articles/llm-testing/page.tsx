'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'
import IntroSection from '@/components/llm-testing/IntroSection'
import ApplicationTypesSection from '@/components/llm-testing/ApplicationTypesSection'
import EvaluationTypesSection from '@/components/llm-testing/EvaluationTypesSection'
import SummarySection from '@/components/llm-testing/SummarySection'
import CitationsSection from '@/components/llm-testing/CitationsSection'

export default function LLMTestingPage() {
  const [theme, setTheme] = useState<'crystal' | 'obsidian'>('crystal')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check localStorage and system preference
    const savedTheme = localStorage.getItem('analysta-theme') as 'crystal' | 'obsidian'
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (systemPrefersDark) {
      setTheme('obsidian')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    if (theme === 'obsidian') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('analysta-theme', theme)
  }, [theme, mounted])

  const toggleTheme = () => {
    setTheme(prev => prev === 'crystal' ? 'obsidian' : 'crystal')
  }

  if (!mounted) {
    return null // Prevent flash of unstyled content
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-obsidian-50 dark:via-obsidian-100 dark:to-primary-800/20 transition-colors duration-500">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl border-b border-white/60 dark:border-obsidian-300/60 shadow-sm"
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-2 text-primary-700 dark:text-blue-300 hover:text-primary-600 dark:hover:text-blue-200 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-semibold">Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-primary-100 dark:bg-primary-600/20 text-primary-700 dark:text-blue-200 px-3 py-1.5 rounded-full text-xs font-medium border border-primary-200/50 dark:border-primary-500/30">
              <span className="w-1.5 h-1.5 bg-primary-500 dark:bg-blue-300 rounded-full animate-pulse"></span>
              Testing Guide
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                📚 Testing AI Applications
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Test Your{' '}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
                LLM Applications
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Master the art of testing AI-powered systems with comprehensive strategies, 
              proven approaches, and best practices for ensuring quality, reliability, and safety.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <IntroSection />
      <ApplicationTypesSection />
      <EvaluationTypesSection />
      <SummarySection />
      <CitationsSection />
      <Footer />
    </main>
  )
}
