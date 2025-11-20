'use client'
import { motion } from 'framer-motion'

export default function SummarySection() {
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
            Towards Trust‑Worthy AI
          </h2>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Large language models represent a paradigm shift in software engineering, offering unprecedented creativity and autonomy-but they also introduce new risks. Quality for AI isn't about hunting bugs in the traditional sense. It's about shaping intelligence into something dependable, helpful, and aligned with real-world needs.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Effective AI quality engineering requires cultivating trust through dynamic, multi-modal evaluation frameworks that evolve alongside the models themselves. The job of an AI quality engineer is to provide guardrails, measure behavior, stress the system, listen for subtle failure modes, and treat the model as a teammate you're constantly tuning. The art lies in combining human judgment, automated evaluation, and iterative learning.
            </p>

            <p className="text-gray-900 dark:text-white font-semibold leading-relaxed mb-6">
              When done well, you don't just ship a model - you ship trust. And trust is the new uptime.
            </p>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              Recent findings that advanced chatbots can oversimplify or misrepresent scientific evidence remind us to maintain scepticism, continually validate outputs against trusted sources, and involve domain experts in the evaluation loop. The tools will evolve, the benchmarks will shift, but the mission stays the same: ensure intelligence behaves responsibly in the messy, unpredictable world we live in.
            </p>

            <p className="text-gray-900 dark:text-white font-semibold leading-relaxed">
              The future is human-plus-machine. And the humans who can test the machines will quietly run the show.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
