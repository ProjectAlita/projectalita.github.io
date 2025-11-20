'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from '@/components/ThemeToggle'

export default function AboutPage() {
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

  const integrations = [
    'Git',
    'Jira',
    'Confluence',
    'Azure DevOps',
    'Zephyr',
    'QTest',
    'SonarQube',
    'SharePoint'
  ]

  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'AI-Augmented Workflows',
      description: 'Coordinate tasks, data flows, and collaboration across teams and systems with intelligent automation.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: 'Enterprise Integrations',
      description: 'Out-of-the-box connections to widely used enterprise platforms including Atlassian, Azure, and more.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'LLM-Driven Agents',
      description: 'Leverage intelligent agents and automation pipelines to reduce repetitive work and enhance decision-making.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-obsidian-50 dark:via-obsidian-100 dark:to-primary-800/20 transition-colors duration-500">
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
              About
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
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              About{' '}
              <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                ELITEA
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              AI-augmented workflow orchestration for modern enterprises
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                What is ELITEA?
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-gray-900 dark:text-white">ELITEA</strong> is a platform for orchestrating and managing workflows across an organization, embedding AI, LLMs, and intelligent agents into the tools and processes people already use.
                </p>
                <p>
                  Its focus is <strong className="text-primary-600 dark:text-blue-400">AI-augmented workflow orchestration</strong> - coordinating tasks, data flows, and collaboration across teams and systems.
                </p>
                <p>
                  By combining enterprise integrations with LLM-driven agents and automation pipelines, ELITEA reduces repetitive manual work, streamlines collaboration, and enables people to focus on higher-value problem solving and innovation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-3xl p-4 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <Image
                  src="/assets/chat_screen.png"
                  alt="ELITEA Platform Interface"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
              </div>
            </motion.div>
          </div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Key Capabilities
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-6 shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 hover:shadow-[0_8px_24px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)] transition-all duration-300"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 dark:from-blue-400 dark:to-cyan-400 rounded-xl flex items-center justify-center text-white mb-4 shadow-md">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Integrations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Out-of-the-Box Integrations
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-3">
              {integrations.map((integration, index) => (
                <motion.span
                  key={integration}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 1.1 + index * 0.05 }}
                  className="px-4 py-2 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-600/20 dark:to-secondary-600/20 text-primary-700 dark:text-blue-300 rounded-full text-sm font-medium border border-primary-200/50 dark:border-primary-500/30 shadow-sm"
                >
                  {integration}
                </motion.span>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 1.1 + integrations.length * 0.05 }}
              >
                <a
                  href={typeof window !== 'undefined' && window.location.hostname === 'localhost' 
                    ? 'http://localhost:8000/integrations/mcp/mcp-server-stdio/' 
                    : '/docs/integrations/mcp/mcp-server-stdio/'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-obsidian-100/80 backdrop-blur-xl text-primary-700 dark:text-blue-300 rounded-full font-semibold text-sm shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-primary-200/50 dark:border-primary-500/30 transition-all duration-300 hover:scale-105"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  and more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </motion.div>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-12 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-primary-500 dark:border-blue-400 rounded-r-xl p-6"
          >
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary-600 dark:text-blue-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Important to Note
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  ELITEA is <strong>not an LLM itself</strong>. Instead, it is a workflow orchestration and management layer that leverages AI and LLMs to automate processes, enhance decision-making, and improve delivery outcomes across domains.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-12 text-center"
          >
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600/95 dark:bg-blue-500/95 backdrop-blur-xl text-white rounded-[20px] font-semibold text-lg shadow-[0_8px_24px_rgba(37,99,235,0.25),inset_0_1px_1px_rgba(255,255,255,0.2)] dark:shadow-[0_8px_24px_rgba(59,130,246,0.4),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] dark:hover:shadow-[0_12px_32px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-primary-500/20 dark:border-blue-400/30 transition-all duration-300 hover:scale-105"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Explore Documentation
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
