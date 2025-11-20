'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroSectionProps {
  theme: 'crystal' | 'obsidian'
}

export default function HeroSection({ theme }: HeroSectionProps) {
  const isObsidian = theme === 'obsidian'

  return (
    <section className="h-auto lg:h-[800px] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-obsidian-50 dark:via-obsidian-100 dark:to-primary-800/20 overflow-hidden relative transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center lg:items-end relative z-10 w-full h-full pt-8 pb-16 lg:pt-12 lg:pb-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left flex flex-col justify-center mb-16 lg:mb-0"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center bg-primary-100 dark:bg-primary-600/20 text-primary-700 dark:text-blue-200 px-3 py-1.5 rounded-full text-xs font-medium mb-6 w-fit border border-primary-200/50 dark:border-primary-500/30 shadow-sm dark:shadow-primary-500/10"
          >
            <span className="w-1.5 h-1.5 bg-primary-500 dark:bg-blue-300 rounded-full mr-2 animate-pulse"></span>
            Applied AI Lab
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
          >
            Where Engineering
            <br />
            Meets
            <br />
            <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
            Applied AI
            </span>
          </motion.h1>


          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-200 mb-6 lg:mb-8 max-w-lg leading-relaxed"
          >
            We build and explore at the intersection of{' '}
            <strong className="text-primary-600 dark:text-blue-300">Artificial Intelligence</strong>,{' '}
            <strong className="text-secondary-600 dark:text-cyan-300">Data</strong>, and{' '}
            <strong className="text-accent-600 dark:text-purple-300">Software Engineering</strong> - 
            turning AI concepts into usable, measurable solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="https://next.elitea.ai"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-primary-600/95 dark:bg-blue-500/90 backdrop-blur-xl text-white px-8 py-4 rounded-[20px] font-semibold text-lg shadow-[0_8px_24px_rgba(37,99,235,0.25),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_24px_rgba(59,130,246,0.4),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.35),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_32px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center justify-center gap-2 border border-primary-500/20 dark:border-blue-400/30"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Try it out
            </motion.a>
            
            <motion.a
              href="/docs"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl text-primary-700 dark:text-blue-200 px-8 py-4 rounded-[20px] font-semibold text-lg shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] hover:bg-white/80 dark:hover:bg-obsidian-200/80 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center justify-center gap-2 border border-white/60 dark:border-obsidian-300/60"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Docs
            </motion.a>
          </motion.div>

          {/* Floating Icon Badges - Below buttons */}
          <div className="mt-8 lg:mt-16 relative h-24 lg:h-32">
            {/* Tools Icon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -10, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.9 },
                y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute left-2 top-2 bg-orange-500 dark:bg-orange-400 rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-xl dark:shadow-orange-500/50"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </motion.div>

            {/* Chat/Collaboration Icon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -15, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 1.1 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
              className="absolute left-20 sm:left-24 top-6 lg:top-8 bg-pink-500 dark:bg-pink-400 rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-xl dark:shadow-pink-500/50"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-white dark:text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 1.592.382 3.091 1.054 4.428l-1.039 3.628a1 1 0 001.355 1.196l3.914-1.566A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 14a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0-5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/>
              </svg>
            </motion.div>

            {/* Ideas/Innovation Icon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -12, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 1.3 },
                y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
              className="absolute left-44 sm:left-52 top-1 bg-yellow-400 dark:bg-yellow-300 rounded-xl lg:rounded-2xl p-2 lg:p-3 shadow-xl dark:shadow-yellow-400/50"
            >
              <svg className="w-6 h-6 lg:w-8 lg:h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </motion.div>

            {/* Lightning Icon Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: [0, -8, 0],
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 1.5 },
                y: { duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
              }}
              className="absolute left-80 top-5 bg-blue-500 dark:bg-blue-400 rounded-2xl p-3 shadow-xl dark:shadow-blue-500/50 hidden xl:block"
            >
              <svg className="w-7 h-7 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
          </div>

          {/* Floating Badge - Mid Screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -5, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 1.2 },
              scale: { duration: 0.8, delay: 1.2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
            className="absolute -right-24 top-1/2 -translate-y-1/2 bg-accent-100 dark:bg-purple-500/20 text-gray-900 dark:text-purple-200 px-4 py-2 rounded-full text-sm font-medium shadow-lg dark:shadow-purple-500/30 border border-accent-200 dark:border-purple-500/40 hidden lg:block backdrop-blur-sm"
          >
            <span className="flex items-center">
              <span className="w-2 h-2 bg-accent-500 dark:bg-purple-300 rounded-full mr-2 animate-pulse"></span>
              Where AI gets practical
            </span>
          </motion.div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex items-end justify-center h-full hidden lg:flex"
        >
          {/* Lady Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative w-full h-full flex items-end z-10 -mb-12 lg:-mb-16"
          >
            <Image
              src={isObsidian ? "/assets/hero-dark.png" : "/assets/hero.png"}
              alt="AI Professional"
              width={800}
              height={800}
              className="w-full h-auto object-contain object-bottom transition-opacity duration-500"
              priority
            />
          </motion.div>

          {/* Projects Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -8, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 1.6 },
              scale: { duration: 0.8, delay: 1.6 },
              y: { duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
            className="absolute top-20 -left-20 bg-white/80 dark:bg-obsidian-200/80 backdrop-blur-xl rounded-2xl shadow-xl dark:shadow-green-500/20 p-4 hidden lg:block z-20 border border-white/60 dark:border-obsidian-300/60"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 dark:from-green-300 dark:to-green-500 rounded-full flex items-center justify-center shadow-md dark:shadow-green-500/50">
                <svg className="w-6 h-6 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">12+</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Projects</div>
              </div>
            </div>
          </motion.div>

          {/* Additional floating icon - top right */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -10, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 1.8 },
              scale: { duration: 0.8, delay: 1.8 },
              y: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="absolute top-4 right-8 bg-blue-500 dark:bg-blue-400 rounded-2xl p-3 shadow-xl dark:shadow-blue-500/50 hidden lg:block z-20"
          >
            <svg className="w-7 h-7 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </motion.div>

          {/* Additional floating icon - bottom right */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -12, 0]
            }}
            transition={{ 
              opacity: { duration: 0.8, delay: 2.0 },
              scale: { duration: 0.8, delay: 2.0 },
              y: { duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }
            }}
            className="absolute bottom-20 -right-12 bg-purple-500 dark:bg-purple-400 rounded-2xl p-3 shadow-xl dark:shadow-purple-500/50 hidden lg:block z-20"
          >
            <svg className="w-7 h-7 text-white dark:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d5a87' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
    </section>
  )
}