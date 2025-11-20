'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function IntroSection() {
  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white dark:bg-obsidian-100 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Introduction
          </h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Testing Large Language Models (LLMs) and their agentic applications is becoming one of the most challenging and crucial areas in modern software quality engineering. Unlike traditional software, LLMs are non-deterministic, context-sensitive, and capable of reasoning and improvisation. These characteristics make classical QA methods insufficient. A new discipline of <strong>AI Quality Engineering</strong> is emerging, blending data science, behavioral testing, and cognitive evaluation.
            </p>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              If you're a QA professional used to verifying buttons, APIs, and UI flows, diving into the world of LLM testing might feel like stepping into science fiction. But here's the key: <strong>your core skill - systematically finding what breaks - is more essential than ever</strong>. The trick is learning how LLMs break differently.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
              Why QA Teams Should Care About LLM Testing
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Think of LLMs like super-powerful interns: they sound smart, they do a lot, but they also make things up, change their mind, or say something strange under pressure. You wouldn't trust an intern with critical tasks unless you could check their work. That's what testing LLMs is about - <strong>finding the weird edge cases where smart-looking answers turn into bad decisions</strong>.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8 border border-blue-200 dark:border-blue-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Here's why you matter:
              </h4>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>LLMs fail in unpredictable ways.</strong> Unlike a function with clear inputs and outputs, an LLM might give five different answers to the same question. Your job is to ensure those answers still make sense.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Business teams can't see risk until it's too late.</strong> You test to catch where the model might hallucinate a fact, miss important context, or produce something offensive.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>There's no "correct output" most of the time.</strong> That makes your judgment and domain knowledge even more important.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">
                    <strong>Your mindset is your superpower.</strong> You're trained to think like a user, challenge assumptions, and ask: "What if this breaks?" That's exactly what's needed when testing AI.
                  </span>
                </li>
              </ul>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-10">
              What's the Value of All This?
            </h3>
            
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              You don't need to know statistics or build benchmarks from scratch to make a real impact. Here's how LLM testing adds value in plain terms:
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓&nbsp;&nbsp;Trust over time
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Your testing builds confidence. Not that the model is perfect, but that it won't embarrass your team in production.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓&nbsp;&nbsp;Fewer support nightmares
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  If you catch the weird responses now, users won't be opening tickets later asking why the bot said the moon is made of cheese.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓&nbsp;&nbsp;Fewer legal risks
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  You help prevent the system from saying something toxic, biased, or downright illegal.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓&nbsp;&nbsp;Smarter improvement
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  You surface repeatable issues. That means engineers and data scientists don't have to guess how to fix things - they get a real bug report.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓&nbsp;&nbsp;Stronger releases
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Testing AI systems isn't about green checkmarks. It's about knowing where it works and where it doesn't. That's a release strategy, not just a QA report.
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-5 border border-green-200 dark:border-green-700">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  ✓&nbsp;&nbsp;Business credibility
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  When a product fails due to a rogue AI response, it's not just a technical issue - it's a brand issue. Solid testing is what keeps stakeholders, regulators, and end users confident that your AI isn't just flashy - it's dependable.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
