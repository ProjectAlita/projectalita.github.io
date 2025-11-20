'use client'
import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'

export default function EvaluationTypesSection() {
  const [activeTab, setActiveTab] = useState('functional')

  const evaluationTypes = [
    {
      id: 'functional',
      tabName: 'Functional',
      title: 'Functional Evaluation',
      icon: '⚙️',
      question: 'Did the model do the job correctly?',
      useful: 'For tasks like answering questions, summarizing, extracting info, coding, etc.',
      example: 'If the user asks for a summary, does the model include the key facts without inventing things?',
      automated: 'Mostly Automated',
      tools: 'pytest, LangChain Evals, OpenAI Evals, HumanEval, DeepEval, MLflow Evaluate, ZenML'
    },
    {
      id: 'behavioral',
      tabName: 'Behavioral',
      title: 'Behavioral Evaluation',
      icon: '🔄',
      question: 'Is the model consistent and stable under pressure or change?',
      useful: 'For applications that deal with lots of user variation (e.g. chatbots).',
      example: 'Does the answer change wildly if I rephrase the question or add a typo?',
      automated: 'Hybrid (template-based and synthetic testing)',
      tools: 'CheckList, SynthEval, TruLens, DeepEval, Confident AI'
    },
    {
      id: 'ethical',
      tabName: 'Safety',
      title: 'Ethical and Safety Evaluation',
      icon: '🛡️',
      question: 'Does the model stay within boundaries? Does it avoid harmful, biased, or toxic responses?',
      useful: 'In any application that talks to the public or makes decisions with social impact.',
      example: 'If I poke at the model with a loaded question, does it still respond responsibly?',
      automated: 'Hybrid',
      tools: 'Detoxify, Perspective API, red-teaming frameworks, Arize AI, Humanloop'
    },
    {
      id: 'alignment',
      tabName: 'Alignment',
      title: 'User Alignment Evaluation',
      icon: '🎯',
      question: 'Does the response feel helpful, kind, relevant?',
      useful: 'For assistants, copilots, and anything customer-facing.',
      example: 'Did the model sound like it understood the user\'s intent, or did it just dump info?',
      automated: 'Mostly manual (human review or LLM-as-a-judge)',
      tools: 'MT-Bench, pairwise comparison sets, Humanloop, Confident AI'
    },
    {
      id: 'reliability',
      tabName: 'Tool Use',
      title: 'Reliability & Tool Use Evaluation',
      icon: '🔧',
      question: 'If the LLM controls a tool (e.g. makes API calls or files), did it use the right format and values?',
      useful: 'For agents and copilots that automate workflows.',
      example: 'Did it call the right API with the correct parameters?',
      automated: 'Mostly Automated',
      tools: 'JSON schema validators, LangChain tool trace, Pydantic, RAGAS (for RAG), DeepEval, Arize AI'
    },
    {
      id: 'transparency',
      tabName: 'Transparency',
      title: 'Transparency Checks',
      icon: '🔍',
      question: 'Can we trace and explain how the model reached its answer?',
      useful: 'For models involved in compliance, internal tooling, regulated environments.',
      example: 'Can I see which part of the prompt or document the model used to make its decision?',
      automated: 'Mostly Manual',
      tools: 'LangSmith traces, Weights & Biases Weave, Arize AI, Datadog, chain-of-thought review'
    },
    {
      id: 'adaptability',
      tabName: 'Adaptability',
      title: 'Adaptability Evaluation',
      icon: '🔄',
      question: 'Does the model continue to perform well as the world or data changes?',
      useful: 'For production systems over time, or apps with changing input formats.',
      example: 'Does the model still get it right after a data update, model upgrade, or system change?',
      automated: 'Manual + longitudinal testing',
      tools: 'ZenML (artifact tracking), MLflow, LangSmith sessions, Weights & Biases Weave, regression replay suites'
    }
  ]

  const activeEval = evaluationTypes.find(evalType => evalType.id === activeTab) || evaluationTypes[0]

  const priorityMatrix = {
    headers: ['Conversational Agent', 'Task-Oriented Agent', 'RAG Application', 'Analytical System', 'Autonomous Agent', 'Creative App'],
    rows: [
      {
        evalType: 'Functional Evaluation',
        priorities: ['Medium', 'High', 'High', 'High', 'High', 'Medium']
      },
      {
        evalType: 'Behavioral Evaluation',
        priorities: ['High', 'Medium', 'Medium', 'Medium', 'High', 'Medium']
      },
      {
        evalType: 'Ethical & Safety Eval',
        priorities: ['High', 'Medium', 'Medium', 'Medium', 'Very High', 'Medium']
      },
      {
        evalType: 'User Alignment Evaluation',
        priorities: ['Very High', 'High', 'Medium', 'Medium', 'Medium', 'Medium']
      },
      {
        evalType: 'Tool Use & Reliability',
        priorities: ['Low', 'Very High', 'Medium', 'Low', 'High', 'Low']
      },
      {
        evalType: 'Transparency Checks',
        priorities: ['Medium', 'Medium', 'High', 'High', 'High', 'Low']
      },
      {
        evalType: 'Adaptability Evaluation',
        priorities: ['Medium', 'High', 'Medium', 'Medium', 'High', 'Medium']
      }
    ]
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Very High':
        return 'bg-red-100 dark:bg-red-900/30 text-red-900 dark:text-red-300 border-red-300 dark:border-red-700'
      case 'High':
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-300 border-orange-300 dark:border-orange-700'
      case 'Medium':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700'
      case 'Low':
        return 'bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-700'
      default:
        return 'bg-gray-100 dark:bg-gray-800/30 text-gray-700 dark:text-gray-400 border-gray-300 dark:border-gray-700'
    }
  }

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
         {/* Evaluation Approaches Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Comparison of Major Evaluation Approaches
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Understanding the strengths and limitations of different evaluation methods
          </p>

          <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg border border-white/60 dark:border-obsidian-300/60 overflow-x-auto"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="min-w-[1000px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-1/6">
                      Evaluation Approach
                    </th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-1/6">
                      Primary Focus & Examples
                    </th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-1/6">
                      Typical Metrics/Criteria
                    </th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-1/4">
                      Strengths
                    </th>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300 w-1/4">
                      Limitations
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-obsidian-300/50 transition-colors"
                  >
                    <td className="p-3 text-sm font-medium text-gray-900 dark:text-white">
                      Static Benchmarks (Functional)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Standardized Q&A or task tests (e.g. MMLU, GLUE, HumanEval, Math, BIG-Bench)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Accuracy, F1, exact match, pass@k etc.
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Objective, reproducible; easy model comparison on many tasks
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      May leak into training data; not interactive or context-heavy
                    </td>
                  </motion.tr>

                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-obsidian-300/50 transition-colors"
                  >
                    <td className="p-3 text-sm font-medium text-gray-900 dark:text-white">
                      Holistic Multi-metric Suites
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Combined task & safety benchmarks (e.g. HELM with accuracy + bias + toxicity scores)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Multiple metrics (accuracy, robustness, fairness, etc.)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Comprehensive view of trade-offs; surfaces hidden issues (e.g. accuracy vs toxicity)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Complex to run; must interpret multi-dimensional results (no single score)
                    </td>
                  </motion.tr>

                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-obsidian-300/50 transition-colors"
                  >
                    <td className="p-3 text-sm font-medium text-gray-900 dark:text-white">
                      Behavioral Checklists
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Fine-grained behavior tests (invariance, consistency, specific skills). Example: taxonomy-based unethical behavior tests
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Pass/fail on each micro-test (or % passed)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Pinpoints specific failure modes; interpretable and actionable (like unit tests)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Labor-intensive to design; coverage depends on human creativity (might miss unseen issues)
                    </td>
                  </motion.tr>

                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-obsidian-300/50 transition-colors"
                  >
                    <td className="p-3 text-sm font-medium text-gray-900 dark:text-white">
                      Adversarial Stress Tests
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Red teaming and robustness attacks (e.g. adversarial prompts, jailbreaking attempts)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Count/rate of failures under attack (e.g. % of prompts that induce policy breaks)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Uncovers worst-case model behaviors; pressure-tests safety reliably
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Over-indexes on corner cases; adversarial scenarios might be unlikely in real use
                    </td>
                  </motion.tr>

                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-obsidian-300/50 transition-colors"
                  >
                    <td className="p-3 text-sm font-medium text-gray-900 dark:text-white">
                      Human Evaluation
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Direct human judgment of outputs (ratings or pairwise comparisons)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Qualitative ratings (e.g. 1–5) or preference win-rate
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Captures nuance and "overall quality" as perceived by users; can evaluate any aspect
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Expensive, slow, not exactly repeatable; may have rater inconsistencies or biases
                    </td>
                  </motion.tr>

                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-obsidian-300/50 transition-colors"
                  >
                    <td className="p-3 text-sm font-medium text-gray-900 dark:text-white">
                      LLM-as-Judge Evaluation
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Using a strong LLM (e.g. GPT-5) to score or rank outputs (e.g. MT-Bench for chatbots)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      LLM's preference or score (correlated ~80% with humans)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Scalable and fast; high agreement with humans on many tasks; enables fine-grained comparisons
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Potential systematic biases (position bias, etc.); not entirely independent (may share model flaws)
                    </td>
                  </motion.tr>

                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-obsidian-300/50 transition-colors"
                  >
                    <td className="p-3 text-sm font-medium text-gray-900 dark:text-white">
                      Factored (Dimension) Evaluation
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Separately scoring multiple aspects (e.g. correctness, relevance, tone)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Individual aspect scores; sometimes combined into profile
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Granular insights into strengths/weaknesses; guides targeted improvement
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      More complex evaluation protocols; deciding weighting of aspects is subjective
                    </td>
                  </motion.tr>

                  <motion.tr
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="hover:bg-gray-50/50 dark:hover:bg-obsidian-300/50 transition-colors"
                  >
                    <td className="p-3 text-sm font-medium text-gray-900 dark:text-white">
                      Interactive Agent Benchmarks
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Simulated environment tests for LLM agents (e.g. AgentBench, tool use evaluations)
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Task success rates; rewards or goals achieved
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      End-to-end performance measure; tests long-term reasoning and decision-making
                    </td>
                    <td className="p-3 text-sm text-gray-700 dark:text-gray-300">
                      Difficult to set up; results can be hard to interpret (environment-specific factors)
                    </td>
                  </motion.tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-700">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 uppercase tracking-wide mb-2">
              💡 Key Takeaway
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              No single evaluation approach is perfect. The best testing strategy combines multiple methods based on your application type, 
              risk tolerance, and available resources. Use static benchmarks for baseline performance, behavioral checklists for specific requirements, 
              LLM-as-judge for scalability, and human evaluation for final validation of critical use cases.
            </p>
          </div>
        </motion.div>
                {/* Evaluation Types Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
           <h4 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Evals cheatsheet
          </h4>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Explore different evaluation types to build a comprehensive LLM testing strategy
          </p>

          {/* Tabs */}
          <div className="flex justify-center mb-8 px-4">
            <LayoutGroup>
              <div
                className="relative flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-white/40 dark:bg-obsidian-200/40 backdrop-blur-xl border border-white/60 dark:border-obsidian-300/60 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] w-full sm:w-auto transition-colors duration-300"
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                {evaluationTypes.map((evalType) => {
                  const isActive = activeTab === evalType.id
                  return (
                    <button
                      key={evalType.id}
                      onClick={() => setActiveTab(evalType.id)}
                      className="relative group inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold leading-tight transition-all duration-300"
                    >
                      {isActive && (
                        <motion.span
                          layoutId="active-eval-type-pill"
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
                        {evalType.tabName}
                      </span>
                    </button>
                  )
                })}
              </div>
            </LayoutGroup>
          </div>

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
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {activeEval.title}
                </h3>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    What it asks:
                  </p>
                  <p className="text-gray-900 dark:text-white leading-relaxed font-medium">
                    {activeEval.question}
                  </p>
                </div>

                <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    When it's useful:
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {activeEval.useful}
                  </p>
                </div>

                <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Example QA question:
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                    "{activeEval.example}"
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Automated?
                    </p>
                    <p className="text-gray-900 dark:text-white leading-relaxed font-medium">
                      {activeEval.automated}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Tools:
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {activeEval.tools}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>    
        {/* Priority Matrix - Moved Up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Evaluation Priority by Application Type
          </h3>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Use this matrix to prioritize which evaluations matter most for your LLM application
          </p>

          <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg border border-white/60 dark:border-obsidian-300/60 overflow-x-auto"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            }}
          >
            <div className="min-w-[800px]">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600">
                      Evaluation Type
                    </th>
                    {priorityMatrix.headers.map((header, index) => (
                      <th key={index} className="p-3 text-center text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 border-b-2 border-gray-300 dark:border-gray-600">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priorityMatrix.rows.map((row, rowIndex) => (
                    <motion.tr
                      key={rowIndex}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: rowIndex * 0.1 }}
                      className="border-b border-gray-200 dark:border-gray-700"
                    >
                      <td className="p-3 text-sm font-medium text-gray-900 dark:text-white">
                        {row.evalType}
                      </td>
                      {row.priorities.map((priority, colIndex) => (
                        <td key={colIndex} className="p-3 text-center">
                          <span className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(priority)}`}>
                            {priority}
                          </span>
                        </td>
                      ))}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700"></span>
              <span className="text-gray-700 dark:text-gray-300">Very High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-orange-100 dark:bg-orange-900/30 border border-orange-300 dark:border-orange-700"></span>
              <span className="text-gray-700 dark:text-gray-300">High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700"></span>
              <span className="text-gray-700 dark:text-gray-300">Medium Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-gray-100 dark:bg-gray-800/30 border border-gray-300 dark:border-gray-700"></span>
              <span className="text-gray-700 dark:text-gray-300">Low Priority</span>
            </div>
          </div>
        </motion.div>
       
      </div>
    </section>
  )
}
