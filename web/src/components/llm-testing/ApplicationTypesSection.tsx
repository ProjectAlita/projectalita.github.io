'use client'

import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

export default function ApplicationTypesSection() {
  const [activeTab, setActiveTab] = useState('conversational')

  const applicationTypes = [
    {
      id: 'conversational',
      tabName: 'Chatbots',
      icon: '💬',
      fullTitle: 'Conversational Agents',
      description: 'These include chatbots, customer-support assistants, and virtual companions. They rely heavily on natural dialogue flow, contextual recall, and tone alignment.',
      challenge: 'The key challenge is balancing helpfulness, accuracy, and empathy. Minor hallucinations can be tolerated, but toxicity or misalignment with company policy cannot.',
      keyPoints: [
        'Natural dialogue flow',
        'Contextual recall',
        'Tone alignment',
        'Policy compliance'
      ]
    },
    {
      id: 'copilots',
      tabName: 'Copilots',
      icon: '🤝',
      fullTitle: 'Task-Oriented Agents (Copilots)',
      description: 'Copilots and productivity assistants (e.g., coding copilots, office copilots) interact with APIs, documents, or integrated tools to complete specific user tasks.',
      challenge: 'The focus is on precision, reliability, and reproducibility. Errors in these systems can cause workflow failures or code defects.',
      keyPoints: [
        'Task precision',
        'API integration',
        'Reliability',
        'Reproducibility'
      ]
    },
    {
      id: 'rag',
      tabName: 'RAG',
      icon: '📚',
      fullTitle: 'Retrieval-Augmented Generation',
      description: 'RAG apps combine an LLM with external data sources or vector databases.',
      challenge: 'The testing emphasis is on faithfulness, retrieval accuracy, and context integration. Evaluating hallucination rates and knowledge freshness is vital, as RAG systems depend on dynamic corpora.',
      keyPoints: [
        'Retrieval accuracy',
        'Faithfulness to sources',
        'Context integration',
        'Knowledge freshness'
      ]
    },
    {
      id: 'analytical',
      tabName: 'Analytics',
      icon: '📊',
      fullTitle: 'Analytical and Insight Systems',
      description: 'These models summarize, interpret, or analyze large datasets or business documents. Their value lies in semantic completeness, data integrity, and reasoning coherence.',
      challenge: 'Benchmarking often involves measuring factual accuracy against ground-truth datasets and expert annotations.',
      keyPoints: [
        'Semantic completeness',
        'Data integrity',
        'Reasoning coherence',
        'Factual accuracy'
      ]
    },
    {
      id: 'autonomous',
      tabName: 'Agents',
      icon: '🤖',
      fullTitle: 'Autonomous Agents',
      description: 'These systems plan, execute, and evaluate tasks independently or collaboratively.',
      challenge: 'Testing must address goal achievement, coherence across steps, safety, and ethical compliance. Performance metrics extend beyond single-turn quality to longitudinal success rates and self-correction ability.',
      keyPoints: [
        'Goal achievement',
        'Multi-step coherence',
        'Safety compliance',
        'Self-correction'
      ]
    },
    {
      id: 'creative',
      tabName: 'Creative',
      icon: '🎨',
      fullTitle: 'Creative & Generative',
      description: 'Creative LLMs generate stories, images (via multimodal extensions), or product ideas.',
      challenge: 'Their evaluation focuses on originality, diversity, and aesthetic coherence rather than deterministic correctness. Human-in-the-loop evaluation plays a major role.',
      keyPoints: [
        'Originality',
        'Diversity',
        'Aesthetic coherence',
        'Human evaluation'
      ]
    }
  ]

  const activeApp = applicationTypes.find(app => app.id === activeTab) || applicationTypes[0]

  return (
    <section className="py-16 px-4 sm:px-6 bg-white dark:bg-obsidian-100 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Types of LLM Applications
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Each type requires different testing strategies and quality metrics
          </p>
        </motion.div>


        {/* Tabs - matching ExperimentShowcase design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8 lg:mb-12 px-4"
        >
          <LayoutGroup>
            <div
              className="relative flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-white/40 dark:bg-obsidian-200/40 backdrop-blur-xl border border-white/60 dark:border-obsidian-300/60 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] w-full sm:w-auto transition-colors duration-300"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              {applicationTypes.map((app) => {
                const isActive = activeTab === app.id
                return (
                  <button
                    key={app.id}
                    onClick={() => setActiveTab(app.id)}
                    className="relative group inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold leading-tight transition-all duration-300"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="active-app-type-pill"
                        className="absolute inset-0 rounded-[24px] bg-white/95 dark:bg-obsidian-300/95 shadow-[0_2px_8px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)]"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        style={{
                          backdropFilter: 'blur(10px)',
                          WebkitBackdropFilter: 'blur(10px)',
                        }}
                      />
                    )}
                    <span
                      className={`relative z-10 transition-all duration-300 ${
                        isActive
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`}
                    >
                      {app.tabName}
                    </span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-lg border border-white/60 dark:border-obsidian-300/60"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 shadow-lg flex items-center justify-center text-4xl">
                  {activeApp.icon}
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {activeApp.fullTitle}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  {activeApp.description}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wide mb-3">
                  Key Characteristics
                </h4>
                <ul className="space-y-2">
                  {activeApp.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700 dark:text-gray-200">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-700">
                <h4 className="text-sm font-semibold text-amber-900 dark:text-amber-300 uppercase tracking-wide mb-3">
                  Testing Focus
                </h4>
                <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                  {activeApp.challenge}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700"
        >
          <div className="flex items-start gap-4">
            <div className="text-3xl">💡</div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                Why This Matters
              </h4>
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Each application type requires a different testing strategy. A conversational agent might tolerate creative 
                responses, while a RAG system demands factual precision. Understanding these distinctions helps you prioritize 
                the right metrics and avoid testing everything the same way.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
            Core Principles for LLM Based Applications
          </h3>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Before diving into metrics and test cases, it helps to align on the values AI systems should embody. These principles don't just guide developers - they define what QA should be checking for, too:
          </p>

          <ul className="space-y-4 mb-6">
            <li className="flex gap-3">
              <span className="text-gray-600 dark:text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Responsible:</strong> The AI should avoid causing harm, reinforcing bias, or spreading misinformation.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-600 dark:text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Reliable:</strong> It should work consistently across different inputs, users, and conditions.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-600 dark:text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Transparent:</strong> Users and stakeholders should be able to understand what the AI is doing and why.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-600 dark:text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Accountable:</strong> There should be traceability from decisions to data and from bugs to fixes.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-600 dark:text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Secure:</strong> The AI should not leak sensitive data or be easy to trick or misuse.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-600 dark:text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Aligned:</strong> It should act in ways that match the values, goals, and expectations of users and organizations.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-gray-600 dark:text-gray-400 font-bold mt-1">•</span>
              <span className="text-gray-700 dark:text-gray-300">
                <strong>Adaptable:</strong> The system should respond well to changing contexts and improve from feedback.
              </span>
            </li>
          </ul>

          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8 border border-indigo-200 dark:border-indigo-700">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              <strong>These principles translate directly into test categories.</strong> If you're testing reliability, you're checking whether the system behaves the same in different contexts. If you're testing alignment, you're asking whether it respects boundaries and user intent.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
