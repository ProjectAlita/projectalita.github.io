'use client'

import { motion } from 'framer-motion'

export default function BestPracticesSection() {
  const bestPractices = [
    {
      title: 'Define Success Criteria First',
      description: 'Start with clear metrics and acceptance criteria before building tests',
      icon: '🎯'
    },
    {
      title: 'Combine Multiple Approaches',
      description: 'Use a mix of testing methods for comprehensive coverage',
      icon: '🔀'
    },
    {
      title: 'Version Control Everything',
      description: 'Track prompts, model configurations, and test datasets',
      icon: '📝'
    },
    {
      title: 'Build Golden Datasets',
      description: 'Curate real-world examples and edge cases for validation',
      icon: '💎'
    },
    {
      title: 'Continuous Evaluation',
      description: 'Implement testing in production, not just pre-deployment',
      icon: '🔄'
    },
    {
      title: 'Automate Regression Testing',
      description: 'Catch prompt or model degradation automatically',
      icon: '🤖'
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Best Practices
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Essential principles for building robust LLM testing workflows
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bestPractices.map((practice, index) => (
            <motion.div
              key={practice.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/60 dark:border-obsidian-300/60 hover:shadow-xl transition-all duration-300"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <div className="text-4xl mb-4">{practice.icon}</div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                {practice.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {practice.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
