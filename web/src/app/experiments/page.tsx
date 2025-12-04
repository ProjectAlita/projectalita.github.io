'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

export default function ExperimentsPage() {
  const [theme, setTheme] = useState<'crystal' | 'obsidian'>('crystal')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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

  const experiments = [
    {
      title: 'Epic → Test Suite Generator',
      description: 'Automated requirements-to-test traceability with AI-powered orchestration. Transform Jira Epics into fully structured requirements and automated test coverage using event-driven multi-agent orchestration.',
      href: '/experiments/epic-to-test-suite',
      badge: 'Case Study',
      badgeColor: 'blue',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600',
      tags: ['Jira', 'Zephyr', 'Multi-Agent', 'SAFe']
    },
    {
      title: 'Inventory Knowledge Graph',
      description: 'Building unified knowledge from multi-source contexts for AI-powered code intelligence. A dynamic property graph that transforms fragmented context into a semantic backbone for agent reasoning.',
      href: '/experiments/inventory-graph',
      badge: 'Research',
      badgeColor: 'emerald',
      icon: (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-600',
      tags: ['Knowledge Graph', 'NetworkX', 'LLM', 'Code Intelligence']
    }
  ]

  if (!mounted) {
    return null
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
          
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              AI Experiments
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore cutting-edge research and case studies in AI-powered software development, from multi-agent orchestration to knowledge graph systems.
            </p>
          </motion.div>

          {/* Experiments Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {experiments.map((experiment, index) => (
              <motion.div
                key={experiment.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={experiment.href} className="block group">
                  <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 p-6 md:p-8 transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_16px_48px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)] hover:-translate-y-1"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${experiment.gradient} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                        {experiment.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2.5 py-1 bg-${experiment.badgeColor}-100 dark:bg-${experiment.badgeColor}-600/20 text-${experiment.badgeColor}-700 dark:text-${experiment.badgeColor}-200 rounded-full text-xs font-medium border border-${experiment.badgeColor}-200/50 dark:border-${experiment.badgeColor}-500/30`}>
                            {experiment.badge}
                          </span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-blue-400 transition-colors">
                          {experiment.title}
                        </h2>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {experiment.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {experiment.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 rounded-full text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-primary-600 dark:text-blue-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                      <span>Explore experiment</span>
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-600/20 text-purple-700 dark:text-purple-200 rounded-full text-sm font-medium border border-purple-200/50 dark:border-purple-500/30">
              <span className="w-2 h-2 bg-purple-500 dark:bg-purple-300 rounded-full animate-pulse"></span>
              More experiments coming soon
            </div>
          </motion.div>
        </div>
      </section>

      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d5a87' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Footer />
    </main>
  )
}
