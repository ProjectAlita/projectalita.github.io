'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

interface Role {
  id: string
  title: string
  description: string
  icon: JSX.Element
  color: string
  gradient: string
  darkGradient: string
  link?: string
  capabilities: string[]
}

export default function RolesSection() {
  const roles: Role[] = [
    {
      id: 'business-analyst',
      title: 'Business Analyst',
      description: 'Streamline requirements gathering, documentation, and stakeholder communication with AI-powered tools.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-cyan-500',
      darkGradient: 'dark:from-blue-400 dark:to-cyan-400',
      link: '/business-analysis',
      capabilities: [
        'Requirements elicitation & documentation',
        'User story & acceptance criteria generation',
        'Process flow visualization',
        'Stakeholder meeting automation'
      ]
    },
    {
      id: 'qa-engineer',
      title: 'QA Engineer',
      description: 'Enhance testing workflows with AI-generated test cases, automation scripts, and intelligent quality analysis.',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-green-500',
      gradient: 'from-green-500 to-emerald-500',
      darkGradient: 'dark:from-green-400 dark:to-emerald-400',
      capabilities: [
        'Automated test case generation',
        'Smart test data creation',
        'Visual regression testing',
        'Bug report analysis'
      ]
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-obsidian-100 transition-colors duration-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232d5a87' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            className="inline-flex items-center bg-primary-100 dark:bg-primary-600/20 text-primary-700 dark:text-blue-200 px-3 py-1.5 rounded-full text-xs font-medium mb-6 border border-primary-200/50 dark:border-primary-500/30 shadow-sm dark:shadow-primary-500/10"
          >
            <span className="w-1.5 h-1.5 bg-primary-500 dark:bg-blue-300 rounded-full mr-2 animate-pulse"></span>
            AI for Every Role
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">
            Built for&nbsp;
            <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
              Your Workflow
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover AI-powered tools tailored to your role - from business analysis to development
          </p>
        </motion.div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="h-full bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)]"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                {/* Gradient Header */}
                <div className={`relative h-32 bg-gradient-to-br ${role.gradient} ${role.darkGradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="w-16 h-16 bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white border border-white/30"
                    >
                      {role.icon}
                    </motion.div>
                  </div>
                  
                  {/* Decorative circles */}
                  <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                  <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-black/10 rounded-full blur-2xl" />
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-blue-400 transition-colors">
                    {role.title}
                  </h3>
                  
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {role.description}
                  </p>

                  {/* Capabilities */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                      Key Capabilities
                    </h4>
                    <ul className="space-y-2">
                      {role.capabilities.map((capability, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + i * 0.05, duration: 0.3 }}
                          className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                        >
                          <svg className="w-5 h-5 text-primary-500 dark:text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{capability}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  {role.link ? (
                    <Link href={role.link}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-3 bg-white/60 dark:bg-obsidian-100/60 backdrop-blur-xl text-primary-700 dark:text-blue-300 rounded-[16px] font-semibold text-sm shadow-[0_4px_12px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.1)] hover:bg-white/80 dark:hover:bg-obsidian-100/80 hover:shadow-[0_6px_16px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_6px_16px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 transition-all duration-300 flex items-center justify-center gap-2"
                        style={{
                          backdropFilter: 'blur(20px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                        }}
                      >
                        Explore Workflow
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.button>
                    </Link>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-3 bg-gray-100 dark:bg-obsidian-300/60 backdrop-blur-xl text-gray-500 dark:text-gray-400 rounded-[16px] font-semibold text-sm shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 cursor-not-allowed"
                      disabled
                    >
                      Coming Soon
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 text-center"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Don't see your role? We're constantly expanding our AI toolkit.
          </p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Request Your Role
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
