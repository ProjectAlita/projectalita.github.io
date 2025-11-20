'use client'

import { motion } from 'framer-motion'
import ProcessFlowCard from '@/components/ProcessFlowCard'
import ExperimentCard from '@/components/ExperimentCard'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'
import Link from 'next/link'

interface Activity {
  text: string
  type: 'personal' | 'in-meeting'
  scope: 'in' | 'out'
  experiment?: {
    name: string
    color: string
  }
}

interface ProcessStep {
  title: string
  owner: string
  activities: Activity[]
}

interface BusinessAnalysisProcessProps {
  theme: 'crystal' | 'obsidian'
  onToggleTheme: () => void
}

export default function BusinessAnalysisProcess({ theme, onToggleTheme }: BusinessAnalysisProcessProps) {
  const steps: ProcessStep[] = [
    {
      title: "Business Request",
      owner: "Business Stakeholders",
      activities: [
        { text: "Identify business need or problem", type: "personal", scope: "out" },
        { text: "Prepare initial request or business case", type: "personal", scope: "out" },
        { text: "Define expected value and success criteria", type: "in-meeting", scope: "out" },
        { text: "Submit request to Business Analyst team", type: "personal", scope: "out" },
      ],
    },
    {
      title: "Requirements Elicitation",
      owner: "Business Analyst",
      activities: [
        { text: "Plan elicitation activities", type: "personal", scope: "out", experiment: { name: "Requirements & Solution Designer", color: "bg-purple-500" } },
        { text: "Conduct stakeholder interviews and workshops", type: "in-meeting", scope: "out" },
        { text: "Observe current workflows and systems", type: "personal", scope: "out", experiment: { name: "Requirements & Solution Designer", color: "bg-purple-500" } },
        { text: "Document business, stakeholder, functional, and non-functional requirements", type: "personal", scope: "out", experiment: { name: "Requirements & Solution Designer", color: "bg-purple-500" } },
        { text: "Clarify constraints and assumptions", type: "in-meeting", scope: "out" },
      ],
    },
    {
      title: "Requirements Validation & Approval",
      owner: "Business Analyst / Stakeholders",
      activities: [
        { text: "Validate requirements for completeness and feasibility", type: "personal", scope: "out", experiment: { name: "Requirements & Solution Designer", color: "bg-purple-500" } },
        { text: "Review with technical and business teams", type: "in-meeting", scope: "out" },
        { text: "Resolve gaps or ambiguities", type: "in-meeting", scope: "out" },
        { text: "Obtain stakeholder approval and formal sign-off", type: "in-meeting", scope: "out" },
      ],
    },
    {
      title: "Solution Design",
      owner: "Solution Architect / Technical Lead",
      activities: [
        { text: "Translate business requirements into technical solution design", type: "personal", scope: "out", experiment: { name: "Requirements & Solution Designer", color: "bg-purple-500" } },
        { text: "Define architecture, data model, and integration approach", type: "personal", scope: "out", experiment: { name: "Requirements & Solution Designer", color: "bg-purple-500" } },
        { text: "Estimate effort and cost", type: "personal", scope: "out", experiment: { name: "Requirements & Solution Designer", color: "bg-purple-500" } },
        { text: "Prepare design documentation and review with BA", type: "in-meeting", scope: "out" },
      ],
    },
    {
      title: "Epic & User Story Definition",
      owner: "Business Analyst / Product Owner",
      activities: [
        { text: "Epic requirements solicitation – separate topic", type: "in-meeting", scope: "out" },
        { text: "Epic requirements analysis to Epic level specification (Confluence)", type: "personal", scope: "in", experiment: { name: "Epic to Test Suite Generator", color: "bg-blue-500" } },
        { text: "Epic to User-story breakdown", type: "personal", scope: "in", experiment: { name: "Epic to Test Suite Generator", color: "bg-blue-500" } },
        { text: "User-story specification in Confluence", type: "personal", scope: "in", experiment: { name: "Epic to Test Suite Generator", color: "bg-blue-500" } },
        { text: "Define acceptance criteria (functional & non-functional)", type: "personal", scope: "in", experiment: { name: "Epic to Test Suite Generator", color: "bg-blue-500" } },
      ],
    },
    {
      title: "Backlog Refinement & Prioritisation",
      owner: "Business Analyst / Product Owner",
      activities: [
        { text: "Backlog grooming and story refinement with Product Owner", type: "in-meeting", scope: "out" },
        { text: "Define and clarify acceptance criteria for each story", type: "personal", scope: "in", experiment: { name: "Epic to Test Suite Generator", color: "bg-blue-500" } },
        { text: "Estimate and prioritise user stories based on business value", type: "in-meeting", scope: "out" },
      ],
    },
    {
      title: "User Story to Technical Breakdown",
      owner: "Development Team / PM",
      activities: [
        { text: "User-story to technical task breakdown", type: "in-meeting", scope: "out" },
        { text: "Technical task execution", type: "personal", scope: "out" },
      ],
    },
    {
      title: "Testing & Quality Assurance",
      owner: "QA / Business Analyst",
      activities: [
        { text: "User-story level test cases to Zephyr", type: "personal", scope: "in", experiment: { name: "Epic to Test Suite Generator", color: "bg-blue-500" } },
        { text: "Epic level end-to-end tests to Zephyr", type: "personal", scope: "in", experiment: { name: "Epic to Test Suite Generator", color: "bg-blue-500" } },
        { text: "Lead user acceptance testing (UAT) sessions", type: "in-meeting", scope: "out" },
      ],
    },
    {
      title: "Metrics & Continuous Improvement",
      owner: "Business Analyst / Product Owner / Scrum Master",
      activities: [
        { text: "Collect metrics (cycle time, lead time, value delivered)", type: "personal", scope: "in", experiment: { name: "Delivery Metrics Analyzer", color: "bg-green-500" } },
        { text: "Conduct retrospectives and feedback reviews", type: "in-meeting", scope: "in", experiment: { name: "Delivery Metrics Analyzer", color: "bg-green-500" } },
        { text: "Refine backlog and process based on insights", type: "personal", scope: "in", experiment: { name: "Delivery Metrics Analyzer", color: "bg-green-500" } },
      ],
    },
  ]

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
              Process Documentation
            </div>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            {/* Title Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 dark:from-blue-500 dark:to-cyan-500 rounded-xl flex items-center justify-center shadow-lg dark:shadow-blue-500/50">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6"
            >
              AI-Assisted Business Analysis
              <br />
              <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 dark:from-blue-400 dark:via-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                End-to-End Process
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              A comprehensive workflow from business request to continuous improvement, 
              enhanced with AI capabilities across Agile and SAFe methodologies
            </motion.p>

            {/* Featured Experiments */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 md:mt-16"
            >
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8">
                AI-Powered BA Experiments
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                <ExperimentCard
                  title="Epic to Test Suite Generator"
                  description="Transform epics into comprehensive test cases with AI-powered analysis and coverage mapping"
                  status="coming-soon"
                  badge={{ label: "Coming Soon", color: "bg-blue-500" }}
                  link="/experiments/epic-to-test-suite"
                  index={0}
                />
                
                <ExperimentCard
                  title="Requirements & Solution Designer"
                  description="AI-assisted elicitation and solution design from stakeholder input to technical specifications"
                  status="coming-soon"
                  badge={{ label: "Coming Soon", color: "bg-purple-500" }}
                  index={1}
                />
                
                <ExperimentCard
                  title="Delivery Metrics Analyzer"
                  description="Smart analytics for cycle time, lead time, and value delivery with AI-driven insights"
                  status="coming-soon"
                  badge={{ label: "Coming Soon", color: "bg-green-500" }}
                  index={2}
                />
              </div>
            </motion.div>

            {/* Legend */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 md:mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-6"
            >
              <div className="flex items-center gap-2">
                <span className="border rounded-full px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-600/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-500/40">
                  In Meeting
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="border rounded-full px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-500/40">
                  Personal Work
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="border rounded-full px-3 py-1 text-xs font-bold text-white bg-blue-500 border-white/20 shadow-sm">
                  Epic to Test Suite Generator
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="border rounded-full px-3 py-1 text-xs font-bold text-white bg-purple-500 border-white/20 shadow-sm">
                  Requirements & Solution Designer
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="border rounded-full px-3 py-1 text-xs font-bold text-white bg-green-500 border-white/20 shadow-sm">
                  Delivery Metrics Analyzer
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="border rounded-full px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-600/30 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500/40">
                  Manual Process
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Process Flow */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            {steps.map((step, index) => (
              <ProcessFlowCard
                key={index}
                title={step.title}
                owner={step.owner}
                activities={step.activities}
                index={index}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 md:mt-24 text-center"
          >
            <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 p-8 md:p-12 max-w-3xl mx-auto"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to explore AI in your workflow?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                Discover how AI can enhance each step of your business analysis process
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto relative overflow-hidden bg-primary-600/95 dark:bg-blue-500/90 backdrop-blur-xl text-white px-8 py-4 rounded-[20px] font-semibold text-lg shadow-[0_8px_24px_rgba(37,99,235,0.25),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_24px_rgba(59,130,246,0.4),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.35),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_12px_32px_rgba(59,130,246,0.5),inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_2px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center justify-center gap-2 border border-primary-500/20 dark:border-blue-400/30"
                    style={{
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    View Experiments
                  </motion.button>
                </Link>
                
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto relative overflow-hidden bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl text-primary-700 dark:text-blue-200 px-8 py-4 rounded-[20px] font-semibold text-lg shadow-[0_4px_16px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] hover:bg-white/80 dark:hover:bg-obsidian-200/80 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center justify-center gap-2 border border-white/60 dark:border-obsidian-300/60"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Us
                </motion.button>
              </div>
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
