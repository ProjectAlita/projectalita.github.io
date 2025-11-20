'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'
import ReactFlow, { 
  Background, 
  Controls, 
  Node, 
  Edge,
  Position
} from 'reactflow'
import 'reactflow/dist/style.css'

export default function EpicToTestSuitePage() {
  const [theme, setTheme] = useState<'crystal' | 'obsidian'>('crystal')
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'workflow' | 'jira-flow' | 'tools'>('overview')

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

  const benefits = [
    "Eliminates manual story and test documentation",
    "Ensures consistent Epic → Story → Test traceability",
    "Enables continuous AI-driven documentation and validation",
    "Integrates seamlessly with existing Agile/SAFe workflows"
  ]

  // React Flow nodes and edges for Jira workflow
  const nodeStyles = {
    base: {
      borderRadius: '16px',
      padding: '16px 20px',
      fontWeight: '600',
      fontSize: '13px',
      border: '1px solid',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: '0 4px 16px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.3)',
      minWidth: '180px',
    }
  }

  const getNodeStyle = (colorClass: string) => {
    const isDark = theme === 'obsidian'
    const colors: Record<string, any> = {
      gray: { 
        background: isDark ? 'rgba(75, 85, 99, 0.6)' : 'rgba(156, 163, 175, 0.7)',
        borderColor: isDark ? 'rgba(156, 163, 175, 0.5)' : 'rgba(107, 114, 128, 0.6)',
        color: 'white'
      },
      blue: {
        background: isDark ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.7)',
        borderColor: isDark ? 'rgba(96, 165, 250, 0.6)' : 'rgba(37, 99, 235, 0.6)',
        color: 'white'
      },
      purple: {
        background: isDark ? 'rgba(139, 92, 246, 0.6)' : 'rgba(139, 92, 246, 0.7)',
        borderColor: isDark ? 'rgba(167, 139, 250, 0.6)' : 'rgba(124, 58, 237, 0.6)',
        color: 'white'
      },
      indigo: {
        background: isDark ? 'rgba(99, 102, 241, 0.6)' : 'rgba(99, 102, 241, 0.7)',
        borderColor: isDark ? 'rgba(129, 140, 248, 0.6)' : 'rgba(79, 70, 229, 0.6)',
        color: 'white'
      },
      green: {
        background: isDark ? 'rgba(16, 185, 129, 0.6)' : 'rgba(16, 185, 129, 0.7)',
        borderColor: isDark ? 'rgba(52, 211, 153, 0.6)' : 'rgba(5, 150, 105, 0.6)',
        color: 'white'
      },
      emerald: {
        background: isDark ? 'rgba(5, 150, 105, 0.6)' : 'rgba(16, 185, 129, 0.8)',
        borderColor: isDark ? 'rgba(16, 185, 129, 0.6)' : 'rgba(5, 150, 105, 0.6)',
        color: 'white'
      },
      amber: {
        background: isDark ? 'rgba(245, 158, 11, 0.6)' : 'rgba(245, 158, 11, 0.7)',
        borderColor: isDark ? 'rgba(251, 191, 36, 0.6)' : 'rgba(217, 119, 6, 0.6)',
        color: 'white'
      }
    }
    return { ...nodeStyles.base, ...colors[colorClass] }
  }

  const initialNodes: Node[] = [
    // Epic Flow
    { id: 'epic-1', type: 'default', position: { x: 250, y: 0 }, data: { label: '📋 Epic: New' }, style: getNodeStyle('gray'), sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'epic-2', type: 'default', position: { x: 250, y: 120 }, data: { label: '🔍 Epic: In Analysis\n(Epic Intake Agent)' }, style: { ...getNodeStyle('blue'), whiteSpace: 'pre-line' }, sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'epic-3', type: 'default', position: { x: 250, y: 260 }, data: { label: '📝 Epic: Spec Ready\n(Requirements Spec Agent)' }, style: { ...getNodeStyle('purple'), whiteSpace: 'pre-line' }, sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'human-1', type: 'default', position: { x: 20, y: 260 }, data: { label: '👤 PO/BA Review' }, style: { ...getNodeStyle('amber'), fontSize: '12px', padding: '12px 16px' }, targetPosition: Position.Top },
    { id: 'epic-4', type: 'default', position: { x: 250, y: 400 }, data: { label: '✍️ Epic: Stories Draft\n(Story Decomposition Agent)' }, style: { ...getNodeStyle('indigo'), whiteSpace: 'pre-line' }, sourcePosition: Position.Bottom, targetPosition: Position.Top },
    
    // Story creation point
    { id: 'story-create', type: 'default', position: { x: 580, y: 400 }, data: { label: '➕ Stories Created' }, style: { ...getNodeStyle('green'), fontSize: '12px', padding: '12px 16px' }, sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'story-1', type: 'default', position: { x: 580, y: 520 }, data: { label: '📄 Story: Draft' }, style: getNodeStyle('gray'), sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'human-2', type: 'default', position: { x: 810, y: 520 }, data: { label: '👤 PO Accepts' }, style: { ...getNodeStyle('amber'), fontSize: '12px', padding: '12px 16px' }, targetPosition: Position.Top },
    { id: 'story-2', type: 'default', position: { x: 580, y: 640 }, data: { label: '✅ Story: Ready' }, style: getNodeStyle('blue'), sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'story-3', type: 'default', position: { x: 580, y: 760 }, data: { label: '📋 Story: Spec Complete\n(Story Writer Agent)' }, style: { ...getNodeStyle('purple'), whiteSpace: 'pre-line' }, sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'story-4', type: 'default', position: { x: 580, y: 900 }, data: { label: '🧪 Story: Test Ready\n(Testcase Agent)' }, style: { ...getNodeStyle('green'), whiteSpace: 'pre-line' }, sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'human-3', type: 'default', position: { x: 810, y: 900 }, data: { label: '👤 QA Review' }, style: { ...getNodeStyle('amber'), fontSize: '12px', padding: '12px 16px' }, targetPosition: Position.Top },
    
    // Epic completion
    { id: 'epic-5', type: 'default', position: { x: 250, y: 540 }, data: { label: '🧪 Epic: Test Ready\n(E2E Suite Builder)' }, style: { ...getNodeStyle('green'), whiteSpace: 'pre-line' }, sourcePosition: Position.Bottom, targetPosition: Position.Top },
    { id: 'human-4', type: 'default', position: { x: 20, y: 540 }, data: { label: '👤 QA Approves' }, style: { ...getNodeStyle('amber'), fontSize: '12px', padding: '12px 16px' }, targetPosition: Position.Top },
    { id: 'epic-6', type: 'default', position: { x: 250, y: 680 }, data: { label: '✅ Epic: Ready for Dev' }, style: getNodeStyle('emerald'), targetPosition: Position.Top },
  ]

  const edgeStyles = {
    animated: { stroke: theme === 'obsidian' ? '#60A5FA' : '#3B82F6', strokeWidth: 2.5 },
    human: { stroke: theme === 'obsidian' ? '#FBBF24' : '#F59E0B', strokeWidth: 2, strokeDasharray: '8,4' }
  }

  const initialEdges: Edge[] = [
    // Epic flow
    { id: 'e1-2', source: 'epic-1', target: 'epic-2', animated: true, style: edgeStyles.animated },
    { id: 'e2-3', source: 'epic-2', target: 'epic-3', animated: true, style: edgeStyles.animated },
    { id: 'e3-h1', source: 'epic-3', target: 'human-1', style: edgeStyles.human },
    { id: 'e3-4', source: 'epic-3', target: 'epic-4', animated: true, style: edgeStyles.animated },
    { id: 'e4-5', source: 'epic-4', target: 'epic-5', animated: true, style: edgeStyles.animated },
    { id: 'e5-h4', source: 'epic-5', target: 'human-4', style: edgeStyles.human },
    { id: 'e5-6', source: 'epic-5', target: 'epic-6', animated: true, style: edgeStyles.animated },
    
    // Story creation branch
    { id: 'e4-sc', source: 'epic-4', target: 'story-create', style: { ...edgeStyles.human, strokeDasharray: '8,4' }, label: 'creates', labelStyle: { fill: theme === 'obsidian' ? '#E5E7EB' : '#4B5563', fontWeight: 600 }, labelBgStyle: { fill: theme === 'obsidian' ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.9)' } },
    { id: 'esc-s1', source: 'story-create', target: 'story-1', animated: true, style: edgeStyles.animated },
    { id: 's1-h2', source: 'story-1', target: 'human-2', style: edgeStyles.human },
    { id: 's1-s2', source: 'story-1', target: 'story-2', animated: true, style: edgeStyles.animated },
    { id: 's2-s3', source: 'story-2', target: 'story-3', animated: true, style: edgeStyles.animated },
    { id: 's3-s4', source: 'story-3', target: 'story-4', animated: true, style: edgeStyles.animated },
    { id: 's4-h3', source: 'story-4', target: 'human-3', style: edgeStyles.human },
  ]

  if (!mounted) {
    return null // Prevent flash of unstyled content
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
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-600/20 text-blue-700 dark:text-blue-200 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-200/50 dark:border-blue-500/30">
              <span className="w-1.5 h-1.5 bg-blue-500 dark:bg-blue-300 rounded-full animate-pulse"></span>
              Case Study
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 md:mb-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left - Text Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 mb-6"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-500 dark:to-blue-600 rounded-xl flex items-center justify-center shadow-lg dark:shadow-blue-500/50">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Epic → Test Suite Generator
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
                >
                  Automated requirements-to-test traceability with AI-powered orchestration
                </motion.p>
              </div>

              {/* Right - Video */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 p-4 md:p-6"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center border border-blue-200/50 dark:border-blue-700/50">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-500 dark:bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                      <p className="text-blue-700 dark:text-blue-300 font-medium">Demo Video Coming Soon</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Content Grid - Tabs + Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Tabs (3/4 width) */}
            <div className="lg:col-span-3 space-y-8">
              {/* Tab Navigation */}
              <LayoutGroup>
                <div
                  className="relative flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 bg-white/40 dark:bg-obsidian-200/40 backdrop-blur-xl border border-white/60 dark:border-obsidian-300/60 rounded-[28px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] w-full transition-colors duration-300"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  }}
                >
                  {[
                    { id: 'overview' as const, label: 'Overview' },
                    { id: 'workflow' as const, label: 'Workflow' },
                    { id: 'jira-flow' as const, label: 'Jira Flow' },
                    { id: 'tools' as const, label: 'Tools' }
                  ].map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative group inline-flex items-center justify-center px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold leading-tight transition-all duration-300 flex-1"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-tab-pill"
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
                          {tab.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </LayoutGroup>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
                    <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                        This system uses <strong className="text-blue-600 dark:text-blue-400">event-driven multi-agent orchestration</strong> to transform a Jira Epic into fully structured requirements and automated test coverage. Each agent acts like a specialist teammate - validating requirements, generating artifacts, and updating knowledge continuously as context evolves.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 text-base md:text-lg">
                        This isn't a single AI script. It's a <strong className="text-blue-600 dark:text-blue-400">distributed intelligence model</strong> aligned to Agile & SAFe delivery flow.
                      </p>
                      
                      <div className="mt-8 p-6 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">What makes this special</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex gap-2">
                            <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                            <span>No static pipeline - <strong>event-driven intelligence</strong></span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                            <span>Modular agents instead of one monolith</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                            <span>Human-in-the-loop control at key decision points</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                            <span>Living documentation that updates itself</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                            <span>Traceability from Epic → Stories → Tests → Updates</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'workflow' && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Workflow Stages & Agents</h2>
                    <div className="space-y-6">
                      {[
                        {
                          title: "Epic Submitted / Updated",
                          agent: "Epic Intake Agent",
                          trigger: "Jira Automation",
                          purpose: "Detect new or updated Epics and kick off analysis",
                          actions: [
                            "Retrieve Epic details, comments, attachments, and linked issues",
                            "Identify missing or unclear requirements",
                            "Prompt stakeholders for clarification (via Jira comment if needed)",
                            "Prepare working context for downstream agents"
                          ],
                          jiraStatus: "Epic: New → In Analysis"
                        },
                        {
                          title: "Requirements Validation & Spec-Kit Creation",
                          agent: "Requirements Spec Agent",
                          trigger: "Intake agent confirms Epic readiness",
                          purpose: "Build structured Epic specification and templates",
                          actions: [
                            "Build structured Epic specification in Confluence",
                            "Create spec-kit templates for related User Stories",
                            "Validate functional & non-functional requirements",
                            "Tag open areas needing business input"
                          ],
                          jiraStatus: "Epic: In Analysis → Spec Ready",
                          assignee: "Product Owner / BA",
                          humanReview: "BA/Product Owner reviews Epic specification and approves for story breakdown"
                        },
                        {
                          title: "Epic → User Story Decomposition",
                          agent: "Story Decomposition Agent",
                          trigger: "Epic spec confirmed complete",
                          purpose: "Break Epic into INVEST-aligned User Stories",
                          actions: [
                            "Break Epic into INVEST-aligned User Stories",
                            "Push draft stories into Jira",
                            "Map dependencies and scope notes",
                            "Populate initial acceptance criteria"
                          ],
                          jiraStatus: "Epic: Spec Ready → Stories Draft | Stories: Draft",
                          assignee: "Product Owner",
                          humanReview: "PO/BA verifies and accepts stories, moves them to Ready"
                        },
                        {
                          title: "User Story Specification",
                          agent: "Confluence Story Writer Agent",
                          trigger: "Story moved to 'Ready' / Accepted",
                          purpose: "Create detailed story specifications with traceability",
                          actions: [
                            "Create or update User Story spec pages",
                            "Sync acceptance criteria",
                            "Add non-functional expectations",
                            "Ensure traceability to Epic spec and design notes"
                          ],
                          jiraStatus: "Story: Ready → Spec Complete"
                        },
                        {
                          title: "Test Case Generation",
                          agent: "Story Testcase Agent",
                          trigger: "Story acceptance criteria finalised",
                          purpose: "Translate acceptance criteria into executable tests",
                          actions: [
                            "Translate acceptance criteria into Zephyr test cases",
                            "Group test steps logically and attach execution notes",
                            "Link tests to Jira story for traceability"
                          ],
                          jiraStatus: "Story: Spec Complete → Test Ready",
                          assignee: "QA Lead",
                          humanReview: "QA Lead reviews and validates test case coverage"
                        },
                        {
                          title: "Epic-Level E2E Test Suite",
                          agent: "E2E Suite Builder Agent",
                          trigger: "All related stories reach 'Spec Complete'",
                          purpose: "Build comprehensive end-to-end test scenarios",
                          actions: [
                            "Build end-to-end scenario tests",
                            "Consolidate user flows across multiple stories",
                            "Publish Epic-level Zephyr Test Suite"
                          ],
                          jiraStatus: "Epic: Stories Draft → Test Ready",
                          assignee: "QA Lead",
                          humanReview: "QA Lead approves E2E test suite and Epic moves to Ready for Development"
                        },
                        {
                          title: "Continuous Feedback & Evolution",
                          agent: "Maintenance & Sync Agent",
                          trigger: "Jira comment / Confluence edit / New acceptance criteria / Story/Epic state change",
                          purpose: "Maintain alignment as requirements evolve",
                          actions: [
                            "Detect changes & regenerate only affected docs/tests",
                            "Notify stakeholders when updates applied",
                            "Maintain Epic ↔ Story ↔ Test alignment"
                          ],
                          jiraStatus: "Status preserved, Comment added"
                        }
                      ].map((stage, index) => (
                        <div key={index} className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 pb-4">
                          <div className="mb-3">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {index + 1}. {stage.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-flex items-center px-2.5 py-1 bg-purple-100 dark:bg-purple-600/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-300 dark:border-purple-500/40">
                                Agent: {stage.agent}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 dark:bg-gray-600/30 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-500/40">
                                Trigger: {stage.trigger}
                              </span>
                              {stage.jiraStatus && (
                                <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-300 dark:border-blue-500/40">
                                  Jira: {stage.jiraStatus}
                                </span>
                              )}
                              {stage.assignee && (
                                <span className="inline-flex items-center px-2.5 py-1 bg-green-100 dark:bg-green-600/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium border border-green-300 dark:border-green-500/40">
                                  Assignee: {stage.assignee}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">
                            Purpose: {stage.purpose}
                          </p>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Actions:</p>
                            <ul className="space-y-2">
                              {stage.actions.map((action, aIndex) => (
                                <li key={aIndex} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex gap-2">
                                  <span className="text-blue-500 dark:text-blue-400 mt-1">•</span>
                                  <span className="flex-1">{action}</span>
                                </li>
                              ))}
                            </ul>
                            {stage.humanReview && (
                              <div className="mt-3 p-3 bg-amber-50/50 dark:bg-amber-900/20 rounded-lg border border-amber-200/50 dark:border-amber-700/50">
                                <p className="text-sm text-amber-800 dark:text-amber-300">
                                  <strong>Human Review Point:</strong> {stage.humanReview}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'jira-flow' && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-crystal-600 dark:text-crystal-100 leading-relaxed mb-4">
                        Below is a visual representation of how Jira tickets flow through the system, from Epic creation to test-ready Stories. The diagram shows both automated agent transitions and human review checkpoints.
                      </p>
                    </div>

                    <div className="h-[900px] bg-white/40 dark:bg-obsidian-200/40 backdrop-blur-xl rounded-[24px] border border-crystal-200/30 dark:border-obsidian-100/30 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.05)]">
                      <ReactFlow
                        nodes={initialNodes}
                        edges={initialEdges}
                        fitView
                        style={{ 
                          background: theme === 'obsidian' 
                            ? 'rgba(17, 24, 39, 0.8)' 
                            : 'rgba(249, 250, 251, 0.8)' 
                        }}
                      >
                        <Background 
                          color={theme === 'obsidian' ? 'rgba(148, 163, 184, 0.2)' : 'rgba(148, 163, 184, 0.3)'} 
                          gap={20} 
                          size={1.5}
                        />
                        <Controls 
                          className="!bg-white/60 dark:!bg-obsidian-300/60 !backdrop-blur-xl !border !border-crystal-200/30 dark:!border-obsidian-100/30 !rounded-xl !shadow-[0_4px_16px_rgba(0,0,0,0.1)] [&_button]:!rounded-lg [&_button]:!border-0 [&_button]:!backdrop-blur-sm [&_button:hover]:!bg-crystal-100/50 dark:[&_button:hover]:!bg-obsidian-200/50" 
                        />
                      </ReactFlow>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                      <div>
                        <h4 className="font-bold text-crystal-900 dark:text-crystal-50 mb-4">Flow Types</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-sm"></div>
                            <span className="text-sm text-crystal-600 dark:text-crystal-200">Automated transition</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-sm" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #FBBF24, #FBBF24 8px, transparent 8px, transparent 12px)' }}></div>
                            <span className="text-sm text-crystal-600 dark:text-crystal-200">Human review required</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-crystal-900 dark:text-crystal-50 mb-4">Status Colors</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-gray-400 to-gray-600 shadow-sm"></div>
                            <span className="text-xs text-crystal-600 dark:text-crystal-200">New/Draft</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 shadow-sm"></div>
                            <span className="text-xs text-crystal-600 dark:text-crystal-200">In Progress</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 shadow-sm"></div>
                            <span className="text-xs text-crystal-600 dark:text-crystal-200">Spec Ready</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-sm"></div>
                            <span className="text-xs text-crystal-600 dark:text-crystal-200">Stories Draft</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-green-400 to-green-600 shadow-sm"></div>
                            <span className="text-xs text-crystal-600 dark:text-crystal-200">Test Ready</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-sm"></div>
                            <span className="text-xs text-crystal-600 dark:text-crystal-200">Ready for Dev</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'tools' && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Tools & Automations</h2>
                    
                    <div className="grid grid-cols-1 gap-3 mb-8">
                      {[
                        { name: "Jira Automation", description: "Primary trigger engine for event-driven orchestration", url: "https://support.atlassian.com/cloud-automation/", role: "Triggers" },
                        { name: "Confluence Automation", description: "Doc sync triggers and specification management", url: "https://support.atlassian.com/confluence-cloud/docs/what-are-automation-rules/", role: "Documentation" },
                        { name: "Zephyr Scale", description: "Test management and traceability platform", url: "https://marketplace.atlassian.com/apps/1213259/zephyr-scale-test-management-for-jira", role: "Testing" },
                        { name: "Elitea.ai", description: "Workflow orchestration platform for distributed intelligence", url: "https://elitea.ai", role: "AI Orchestration" }
                      ].map((tool, index) => (
                        <div key={index} className="bg-white/40 dark:bg-obsidian-100/40 rounded-xl p-4 border border-white/40 dark:border-obsidian-300/40 hover:bg-white/60 dark:hover:bg-obsidian-100/60 transition-all duration-200">
                          <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                {tool.url ? (
                                  <a href={tool.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                    {tool.name} ↗
                                  </a>
                                ) : (
                                  <span className="font-semibold text-gray-900 dark:text-white">{tool.name}</span>
                                )}
                                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-300 rounded text-xs font-medium">
                                  {tool.role}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tool.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">System Summary</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Flow Event</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Agent</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Key Output</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {[
                              { event: "Epic created/updated", agent: "Intake Agent", output: "Parsed context & gap check" },
                              { event: "Clarifications needed", agent: "Clarifier Agent", output: "Jira request + update" },
                              { event: "Epic ready", agent: "Requirements Agent", output: "Confluence Epic Spec + spec-kits" },
                              { event: "Stories drafted", agent: "Decomposition Agent", output: "Jira stories w/ criteria" },
                              { event: "Story accepted", agent: "Story Spec Agent", output: "Confluence story spec" },
                              { event: "Criteria ready", agent: "Testcase Agent", output: "Zephyr test cases" },
                              { event: "Epic ready", agent: "E2E Agent", output: "Epic-level test suite" },
                              { event: "Any change", agent: "Maintenance Agent", output: "Real-time updates" }
                            ].map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-obsidian-100/40 transition-colors">
                                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.event}</td>
                                <td className="py-3 px-4">
                                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 dark:bg-purple-600/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                                    {row.agent}
                                  </span>
                                </td>
                                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.output}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Column - Benefits Sidebar (1/4 width) */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-[24px] shadow-lg p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Key Benefits</h3>
                  
                  <div className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                        <div className="flex items-start gap-3">
                          <svg className="w-5 h-5 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-white text-sm leading-relaxed">{benefit}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
