'use client'

import { useState, useEffect } from 'react'
import { motion, LayoutGroup } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'
import ThemeToggle from '@/components/ThemeToggle'

const MermaidDiagram = dynamic(() => import('@/components/MermaidDiagram'), {
  ssr: false,
})

export default function InventoryGraphPage() {
  const [theme, setTheme] = useState<'crystal' | 'obsidian'>('crystal')
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'ingestion' | 'retrieval' | 'tools'>('overview')

  useEffect(() => {
    setMounted(true)
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
    "Transforms fragmented context into unified knowledge",
    "Supports delta updates for evolving codebases",
    "Separates metadata (graph) from content (files)",
    "Enables semantic search across heterogeneous sources",
    "Powers AI agents with surgical code navigation"
  ]

  const semanticLayers = [
    { layer: 'code', types: 'class, function, method, module, variable', color: 'blue' },
    { layer: 'service', types: 'api_endpoint, route, rpc_method', color: 'purple' },
    { layer: 'data', types: 'model, schema, database, table, column', color: 'green' },
    { layer: 'product', types: 'feature, user_story, requirement', color: 'amber' },
    { layer: 'domain', types: 'concept, process, definition', color: 'indigo' },
    { layer: 'documentation', types: 'guide, reference, example', color: 'cyan' },
    { layer: 'configuration', types: 'setting, env_var, secret', color: 'orange' },
    { layer: 'tooling', types: 'tool, script, command', color: 'pink' },
  ]

  if (!mounted) {
    return null
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
            <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-600/20 text-emerald-700 dark:text-emerald-200 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-200/50 dark:border-emerald-500/30">
              <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-emerald-300 rounded-full animate-pulse"></span>
              Research
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
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-500 dark:to-teal-600 rounded-xl flex items-center justify-center shadow-lg dark:shadow-emerald-500/50">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
                >
                  Inventory Knowledge Graph
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg md:text-xl text-gray-600 dark:text-gray-300"
                >
                  Building unified knowledge from multi-source contexts for AI-powered code intelligence
                </motion.p>
              </div>

              {/* Right - Video Embed */}
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
                  <div className="aspect-video rounded-xl overflow-hidden border border-emerald-200/50 dark:border-emerald-700/50 relative group">
                    <iframe
                      src="https://www.youtube.com/embed/O3FIvEjbpGQ?rel=0"
                      title="Inventory Knowledge Graph Demo"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                    {/* YouTube link overlay */}
                    <a
                      href="https://youtu.be/O3FIvEjbpGQ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-black/70 hover:bg-red-600 text-white text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                      Watch on YouTube
                    </a>
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
                    { id: 'ingestion' as const, label: 'Ingestion' },
                    { id: 'retrieval' as const, label: 'Retrieval' },
                    { id: 'tools' as const, label: 'Tools' }
                  ].map((tab) => {
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className="relative group inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold leading-tight transition-all duration-300 flex-1"
                      >
                        {isActive && (
                          <motion.span
                            layoutId="active-tab-pill-inventory"
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
                        Modern AI agents operate in high-entropy environments where information arrives asynchronously from disparate sources—files, APIs, chat logs—in varying formats and granularities. The <strong className="text-emerald-600 dark:text-emerald-400">Inventory Knowledge Graph</strong> addresses this by implementing a <strong className="text-emerald-600 dark:text-emerald-400">dynamic property graph</strong> that prioritizes flexibility and fault tolerance over formal ontological strictness.
                      </p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 text-base md:text-lg">
                        Unlike traditional RDF triple stores or rigid ontology-based systems, this approach ingests heterogeneous context, extracts entities into a schema-light graph structure, and applies a <strong className="text-emerald-600 dark:text-emerald-400">probabilistic enrichment pipeline</strong> to normalize types, merge duplicates, and infer semantic relationships.
                      </p>
                      
                      <div className="mt-8 p-6 bg-emerald-50/50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200/50 dark:border-emerald-700/50">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Core Architecture Principles</h3>
                        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                          <li className="flex gap-2">
                            <span className="text-emerald-500 dark:text-emerald-400 mt-1">•</span>
                            <span><strong>Index-Only Philosophy</strong> — Graph stores metadata; content retrieved on-demand</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-emerald-500 dark:text-emerald-400 mt-1">•</span>
                            <span><strong>Citation-Based Provenance</strong> — Lightweight references maintain source traceability</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-emerald-500 dark:text-emerald-400 mt-1">•</span>
                            <span><strong>Delta Updates</strong> — Incremental processing for evolving codebases</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-emerald-500 dark:text-emerald-400 mt-1">•</span>
                            <span><strong>Taxonomy-Driven Extraction</strong> — LLM-guided entity identification</span>
                          </li>
                          <li className="flex gap-2">
                            <span className="text-emerald-500 dark:text-emerald-400 mt-1">•</span>
                            <span><strong>Multi-Factor Scoring</strong> — Intelligent search beyond exact matching</span>
                          </li>
                        </ul>
                      </div>

                      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 bg-white/40 dark:bg-obsidian-100/40 rounded-xl border border-white/40 dark:border-obsidian-300/40">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                              </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">NetworkX Backend</h4>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Property graph model with rich metadata on nodes and edges, enabling efficient traversal algorithms.</p>
                        </div>
                        <div className="p-5 bg-white/40 dark:bg-obsidian-100/40 rounded-xl border border-white/40 dark:border-obsidian-300/40">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">JSON Serialization</h4>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Node-link format persistence with checkpoint support for resumable large-scale ingestion.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'ingestion' && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Knowledge Graph Ingestion</h2>
                    
                    <div className="prose dark:prose-invert max-w-none mb-8">
                      <p className="text-lg text-gray-700 dark:text-gray-300">
                        The ingestion process transforms raw source code and documentation into a structured knowledge graph with entities, relations, and metadata optimized for semantic retrieval.
                      </p>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">Ingestion Process Overview</h3>
                    <div className="space-y-6 mb-8">
                      {[
                        {
                          title: "Configuration & Setup",
                          component: "Ingestion Manager",
                          trigger: "System Initialization",
                          purpose: "Initialize system components and configure processing parameters",
                          actions: [
                            "Initialize LLM for entity/relation extraction",
                            "Set graph persistence path",
                            "Register source toolkits (GitHub, ADO, LocalGit, etc.)",
                            "Configure guardrails (rate limits, content filters, token limits)"
                          ],
                          output: "Configured ingestion pipeline ready for execution"
                        },
                        {
                          title: "Checkpoint Management (Resumable)",
                          component: "Checkpoint Manager",
                          trigger: "Pipeline start or resume",
                          purpose: "Enable fault-tolerant, resumable ingestion for large codebases",
                          actions: [
                            "Check for existing checkpoint from previous run",
                            "Resume from last processed file if available",
                            "Track progress for failure recovery",
                            "Enable long-running ingestion jobs"
                          ],
                          output: "Resume state determined, processing queue prepared"
                        },
                        {
                          title: "Document Fetching",
                          component: "Document Retriever",
                          trigger: "Checkpoint ready",
                          purpose: "Retrieve and normalize source documents from configured repositories",
                          actions: [
                            "Connect to source toolkit",
                            "Fetch raw documents (not chunked - full files)",
                            "Apply whitelist/blacklist filters",
                            "Normalize to LangChain Document format",
                            "Skip already processed files (if resuming)"
                          ],
                          output: "Document queue populated with normalized files"
                        },
                        {
                          title: "Entity Extraction (LLM-based)",
                          component: "Entity Extractor",
                          trigger: "Document available for processing",
                          purpose: "Extract structured entities from code using taxonomy-guided LLM analysis",
                          actions: [
                            "Use ENTITY_TAXONOMY (49 types across 8 layers)",
                            "Extract entities from code structure",
                            "Parse metadata (name, type, description, properties)",
                            "Handle extraction errors gracefully (log and continue)"
                          ],
                          output: "Raw entities extracted with metadata"
                        },
                        {
                          title: "Entity Normalization",
                          component: "Entity Normalizer",
                          trigger: "Entities extracted from document",
                          purpose: "Standardize entity identifiers and types for consistent graph structure",
                          actions: [
                            "Normalize entity types (lowercase, handle plurals)",
                            "Map variations to canonical forms",
                            "Generate unique IDs: Standard (hash(type + name)) or Context-dependent (hash(type + name + file_path))"
                          ],
                          output: "Normalized entities with stable identifiers"
                        },
                        {
                          title: "Deduplication & Merging",
                          component: "Deduplication Engine",
                          trigger: "Normalized entity ready",
                          purpose: "Consolidate duplicate entities and maintain citation traceability",
                          actions: [
                            "Check if entity ID already exists",
                            "If exists: Merge citations (same entity from multiple files)",
                            "If new: Create new entity node",
                            "Update all indices (name, type, file, layer)"
                          ],
                          output: "Unique entity with merged citations and updated indices"
                        },
                        {
                          title: "Graph Construction",
                          component: "Graph Builder",
                          trigger: "Entity deduplicated",
                          purpose: "Build NetworkX graph structure with nodes and metadata",
                          actions: [
                            "Add entity as node to NetworkX graph",
                            "Store all properties and metadata",
                            "Link citations to source files",
                            "Auto-save periodically at checkpoint intervals"
                          ],
                          output: "Graph updated with new/merged entity nodes"
                        },
                        {
                          title: "Relation Extraction (LLM-based)",
                          component: "Relation Extractor",
                          trigger: "All documents processed for entities",
                          purpose: "Discover and validate semantic relationships between entities",
                          actions: [
                            "Group entities by source file",
                            "Use RELATIONSHIP_TAXONOMY to guide extraction",
                            "Analyze entity interactions within file context",
                            "Cross-reference entity IDs for validation"
                          ],
                          output: "Relations added as graph edges with typed connections"
                        },
                        {
                          title: "Finalization & Persistence",
                          component: "Persistence Manager",
                          trigger: "All processing complete",
                          purpose: "Save complete graph structure and prepare for retrieval operations",
                          actions: [
                            "Dump graph to JSON format",
                            "Save all indices (name, type, file, layer)",
                            "Save entity and relation schemas",
                            "Clear checkpoint file (success marker)"
                          ],
                          output: "Graph persisted, ready for retrieval queries"
                        }
                      ].map((stage, index) => (
                        <div key={index} className="border-l-4 border-blue-500 dark:border-blue-400 pl-4 pb-4">
                          <div className="mb-3">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {index + 1}. {stage.title}
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-flex items-center px-2.5 py-1 bg-purple-100 dark:bg-purple-600/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-300 dark:border-purple-500/40">
                                Component: {stage.component}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 dark:bg-gray-600/30 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-500/40">
                                Trigger: {stage.trigger}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-300 dark:border-blue-500/40">
                                Output: {stage.output}
                              </span>
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
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Complete Ingestion Flow</h3>
                    {/* Mermaid Flowchart */}
                    <div className="mb-6">
                      <MermaidDiagram 
                        theme={theme === 'obsidian' ? 'dark' : 'default'}
                        chart={`flowchart TD
    Start([Start: Graph Ingestion]) --> ConfigSetup[Setup Configuration:<br/>- LLM<br/>- Graph Path<br/>- Source Toolkits<br/>- Guardrails]
    
    ConfigSetup --> CheckResume{Resume from<br/>Checkpoint?}
    CheckResume -->|Yes| LoadCheckpoint[Load Checkpoint:<br/>- Processed Files<br/>- Progress State<br/>- Pending Entities]
    CheckResume -->|No| CreateCheckpoint[Create New Checkpoint]
    
    LoadCheckpoint --> InitExtractors
    CreateCheckpoint --> InitExtractors[Initialize Extractors:<br/>- DocumentClassifier<br/>- EntityExtractor<br/>- RelationExtractor]
    
    InitExtractors --> FetchDocs[Fetch Documents from Source:<br/>- GitHub/ADO/LocalGit<br/>- Apply Whitelist/Blacklist<br/>- Get Raw Files]
    
    FetchDocs --> DocLoop{More<br/>Documents?}
    
    DocLoop -->|Yes| CheckProcessed{Already<br/>Processed?}
    CheckProcessed -->|Yes - Skip| DocLoop
    CheckProcessed -->|No| NormalizeDoc[Normalize Document:<br/>- Convert to LangChain Doc<br/>- Extract Metadata<br/>- Set Source Toolkit]
    
    NormalizeDoc --> ValidateDoc{Valid<br/>Document?}
    ValidateDoc -->|Invalid| DocLoop
    
    ValidateDoc -->|Valid| ApplyGuardrails[Apply Guardrails:<br/>- Rate Limiting<br/>- Content Filtering<br/>- Token Limits]
    
    ApplyGuardrails --> ExtractEntities[Extract Entities via LLM:<br/>- Use ENTITY_TAXONOMY<br/>- Parse Code Structure<br/>- Extract Metadata]
    
    ExtractEntities --> EntityError{Extraction<br/>Error?}
    EntityError -->|Yes| MarkFailed[Mark File as Failed:<br/>- Log Error<br/>- Track Attempts<br/>- Continue Processing]
    MarkFailed --> DocLoop
    
    EntityError -->|No| NormalizeTypes[Normalize Entity Types:<br/>- Lowercase<br/>- Handle Plurals<br/>- Map Variations]
    
    NormalizeTypes --> GenerateIDs[Generate Entity IDs:<br/>- Hash type + name<br/>- Context-dependent types<br/>include file path]
    
    GenerateIDs --> CheckDuplicate{Entity ID<br/>Exists?}
    
    CheckDuplicate -->|Yes - Merge| MergeCitations[Merge Citations:<br/>- Add to citations list<br/>- Keep existing entity<br/>- Update metadata]
    CheckDuplicate -->|No - New| CreateEntity[Create New Entity:<br/>- Store metadata<br/>- Add citation<br/>- Set properties]
    
    MergeCitations --> UpdateIndices
    CreateEntity --> UpdateIndices[Update Indices:<br/>- Name Index<br/>- Type Index<br/>- File Index<br/>- Layer Index]
    
    UpdateIndices --> AddToGraph[Add to NetworkX Graph:<br/>- Create Node<br/>- Store Properties<br/>- Link Citation]
    
    AddToGraph --> CheckInterval{Checkpoint<br/>Interval?}
    CheckInterval -->|Yes| SaveCheckpoint[Save Checkpoint:<br/>- Progress Stats<br/>- Processed Files<br/>- Pending Entities]
    CheckInterval -->|No| DocLoop
    SaveCheckpoint --> AutoSave[Auto-save Graph JSON]
    AutoSave --> DocLoop
    
    DocLoop -->|No More Docs| ExtractRelations{Extract<br/>Relations?}
    
    ExtractRelations -->|No| FinalSave
    ExtractRelations -->|Yes| GroupByFile[Group Entities by File]
    
    GroupByFile --> RelationLoop{More<br/>Files?}
    
    RelationLoop -->|Yes| ExtractRels[Extract Relations via LLM:<br/>- Use RELATIONSHIP_TAXONOMY<br/>- Analyze entity interactions<br/>- Cross-reference IDs]
    
    ExtractRels --> ValidateRels{Valid<br/>Relations?}
    ValidateRels -->|No| RelationLoop
    ValidateRels -->|Yes| AddRelations[Add Relations to Graph:<br/>- Create Edges<br/>- Store Relation Type<br/>- Add Properties]
    
    AddRelations --> RelationLoop
    
    RelationLoop -->|No More Files| FinalSave[Final Save:<br/>- Dump Graph to JSON<br/>- Save Indices<br/>- Save Schema]
    
    FinalSave --> ClearCheckpoint[Clear Checkpoint File]
    ClearCheckpoint --> Complete([Ingestion Complete:<br/>Graph Ready for Retrieval])
    
    style Start fill:#90EE90
    style Complete fill:#87CEEB
    style EntityError fill:#FFB6C6
    style ExtractEntities fill:#FFE4B5
    style ExtractRels fill:#FFE4B5
    style CheckDuplicate fill:#FFE4B5`}
                      />
                    </div>

                    {/* Key Features Section */}
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Entity Taxonomy Card */}
                        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-md border border-white/60 dark:border-obsidian-300/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                              ET
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Entity Taxonomy (8 Layers, 49 Types)</h4>
                          </div>
                          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span><span><strong>Product Layer</strong>: feature, product, capability, menu, ui_component</span></li>
                            <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span><span><strong>Domain Layer</strong>: concept, process, workflow, use_case, guideline</span></li>
                            <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span><span><strong>Service Layer</strong>: api_endpoint, rpc_method, service, handler, event</span></li>
                            <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span><span><strong>Code Layer</strong>: class, function, method, module, variable, constant</span></li>
                            <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span><span><strong>Data Layer</strong>: model, schema, field, table, database, migration</span></li>
                            <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span><span><strong>Testing Layer</strong>: test_case, test_suite, fixture, mock, assertion</span></li>
                            <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span><span><strong>Delivery Layer</strong>: pipeline, job, deployment, artifact, container</span></li>
                            <li className="flex gap-2"><span className="text-blue-500 dark:text-blue-400">•</span><span><strong>Organization Layer</strong>: team, repository, project, workspace</span></li>
                          </ul>
                        </div>
                        
                        {/* Relationship Taxonomy Card */}
                        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-md border border-white/60 dark:border-obsidian-300/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                              RT
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Relationship Taxonomy (8 Categories, 34 Types)</h4>
                          </div>
                          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span><span><strong>Structural</strong>: CONTAINS, IMPORTS, EXTENDS, IMPLEMENTS, USES, DEPENDS_ON</span></li>
                            <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span><span><strong>Behavioral</strong>: CALLS, INVOKES, TRIGGERS, HANDLES, SUBSCRIBES_TO, PUBLISHES_TO</span></li>
                            <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span><span><strong>Data Lineage</strong>: READS_FROM, WRITES_TO, TRANSFORMS, QUERIES, STORES_IN</span></li>
                            <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span><span><strong>UI/Product</strong>: RENDERS, ROUTES_TO, NAVIGATES_TO, DISPLAYS</span></li>
                            <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span><span><strong>Testing</strong>: TESTS, MOCKS, COVERS, ASSERTS</span></li>
                            <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span><span><strong>Ownership</strong>: OWNED_BY, MAINTAINED_BY, CREATED_BY</span></li>
                            <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span><span><strong>Temporal</strong>: PRECEDES, FOLLOWS, SCHEDULED_BY</span></li>
                            <li className="flex gap-2"><span className="text-purple-500 dark:text-purple-400">•</span><span><strong>Semantic</strong>: RELATED_TO, SIMILAR_TO, ALIAS_OF</span></li>
                          </ul>
                        </div>
                      
                        {/* Guardrails Card */}
                        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-md border border-white/60 dark:border-obsidian-300/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                              GR
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Guardrails</h4>
                          </div>
                          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-2"><span className="text-amber-500 dark:text-amber-400">•</span><span><strong>Rate Limiting</strong>: Requests per minute to LLM</span></li>
                            <li className="flex gap-2"><span className="text-amber-500 dark:text-amber-400">•</span><span><strong>Content Filtering</strong>: Remove PII/secrets before extraction</span></li>
                            <li className="flex gap-2"><span className="text-amber-500 dark:text-amber-400">•</span><span><strong>Token Limits</strong>: Max tokens per document</span></li>
                            <li className="flex gap-2"><span className="text-amber-500 dark:text-amber-400">•</span><span><strong>Entity Limits</strong>: Max entities per document</span></li>
                            <li className="flex gap-2"><span className="text-amber-500 dark:text-amber-400">•</span><span><strong>Relation Limits</strong>: Max relations per document</span></li>
                            <li className="flex gap-2"><span className="text-amber-500 dark:text-amber-400">•</span><span><strong>Confidence Thresholds</strong>: Minimum confidence for entities/relations</span></li>
                          </ul>
                        </div>
                        
                        {/* Checkpoint System Card */}
                        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-md border border-white/60 dark:border-obsidian-300/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                              CP
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Checkpoint System</h4>
                          </div>
                          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-2"><span className="text-green-500 dark:text-green-400">•</span><span><strong>Tracks</strong>: Processed files, failed files, pending entities</span></li>
                            <li className="flex gap-2"><span className="text-green-500 dark:text-green-400">•</span><span><strong>Saves</strong>: Every N documents (configurable interval)</span></li>
                            <li className="flex gap-2"><span className="text-green-500 dark:text-green-400">•</span><span><strong>Enables</strong>: Resume from failure, long-running jobs</span></li>
                            <li className="flex gap-2"><span className="text-green-500 dark:text-green-400">•</span><span><strong>Clears</strong>: On successful completion</span></li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Design Principles Card - Full Width */}
                      <div className="mt-6 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/30 dark:to-teal-900/30 backdrop-blur-md border border-emerald-200/60 dark:border-emerald-700/60 rounded-2xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                            DP
                          </div>
                          <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">Design Principles</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 text-sm text-emerald-900/90 dark:text-emerald-200/90">
                          <div className="flex gap-2">✅ <span><strong>Lightweight Storage</strong>: Citations instead of raw content</span></div>
                          <div className="flex gap-2">✅ <span><strong>Multi-Source Support</strong>: Merge entities from different sources</span></div>
                          <div className="flex gap-2">✅ <span><strong>Resumable</strong>: Checkpoint system for failure recovery</span></div>
                          <div className="flex gap-2">✅ <span><strong>Error Tolerant</strong>: Continue processing on extraction errors</span></div>
                          <div className="flex gap-2">✅ <span><strong>Cross-Source Relations</strong>: Relations can span multiple toolkits</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'retrieval' && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Knowledge Graph Retrieval</h2>
                    
                    <div className="prose dark:prose-invert max-w-none mb-8">
                      <p className="text-lg text-gray-700 dark:text-gray-300">
                        The retrieval system provides fast, flexible access to the knowledge graph through multiple query types, intelligent scoring, and graph traversal algorithms.
                      </p>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-6">Query Types Overview</h3>
                    <div className="space-y-6 mb-8">
                      {[
                        {
                          title: "Search Entities",
                          component: "Search Engine",
                          trigger: "User search query",
                          purpose: "Find entities matching a query with fuzzy and token-based matching",
                          actions: [
                            "Tokenize query and entity names (handle camelCase, snake_case)",
                            "Calculate match scores: exact (1.0), starts-with (0.85), contains (0.75)",
                            "Apply token overlap scoring (0.6-0.7)",
                            "Check file path and description matches (0.55, 0.35-0.5)",
                            "Rank results by combined score",
                            "Apply filters: entity types, layers, file patterns"
                          ],
                          output: "Top K ranked entities with match scores"
                        },
                        {
                          title: "Get Entity Details",
                          component: "Entity Resolver",
                          trigger: "Entity name or ID provided",
                          purpose: "Retrieve comprehensive information about a specific entity",
                          actions: [
                            "Lookup entity by name in name index (O(1))",
                            "If not found, fallback to search with fuzzy matching",
                            "Fetch all entity properties (ID, name, type, layer, description)",
                            "Collect all citations (file paths + line numbers)",
                            "Optionally fetch relations (incoming/outgoing edges)",
                            "Include relation types and connected entity metadata"
                          ],
                          output: "Complete entity record with relations and citations"
                        },
                        {
                          title: "Get Entity Content",
                          component: "Content Retriever",
                          trigger: "Request for actual source code",
                          purpose: "Fetch and return the raw source code for an entity",
                          actions: [
                            "Find entity citation (file path + line range)",
                            "Check if base_directory configured for local access",
                            "If local: Read file directly from filesystem",
                            "If remote: Use source toolkit to fetch content",
                            "Extract specific line range from full document",
                            "Validate path security (prevent directory traversal)"
                          ],
                          output: "Source code snippet with file metadata"
                        },
                        {
                          title: "Impact Analysis",
                          component: "Graph Traversal Engine",
                          trigger: "Change impact assessment request",
                          purpose: "Analyze dependencies and downstream/upstream impacts",
                          actions: [
                            "Select direction: Downstream (what depends on this) or Upstream (what this depends on)",
                            "Initialize BFS queue with starting entity",
                            "Traverse edges (incoming for downstream, outgoing for upstream)",
                            "Track visited nodes to avoid cycles",
                            "Group results by depth level",
                            "Include relation types in path information"
                          ],
                          output: "Dependency tree grouped by depth with relation paths"
                        },
                        {
                          title: "Advanced Search",
                          component: "Multi-Filter Search Engine",
                          trigger: "Complex search with multiple criteria",
                          purpose: "Execute sophisticated queries with combined filters",
                          actions: [
                            "Parse filter criteria (types, layers, files, relations)",
                            "Apply entity type filters (OR logic across types)",
                            "Apply layer filters (mapped to type sets)",
                            "Filter by file patterns (glob matching)",
                            "Filter by relation existence (has_relations boolean)",
                            "Apply minimum citations threshold",
                            "Combine with text search scoring"
                          ],
                          output: "Filtered and scored entity list"
                        },
                        {
                          title: "List by Type/Layer",
                          component: "Index Query Engine",
                          trigger: "Request for all entities of specific type/layer",
                          purpose: "Fast retrieval using pre-built indices",
                          actions: [
                            "If by type: Direct lookup in type index (O(1))",
                            "If by layer: Map layer to entity types via TYPE_TO_LAYER",
                            "Fetch entity IDs from index",
                            "Apply limit to prevent overwhelming results",
                            "Return entity details for matched IDs"
                          ],
                          output: "List of entities matching type/layer criteria"
                        },
                        {
                          title: "Graph Statistics",
                          component: "Analytics Engine",
                          trigger: "Request for graph metrics",
                          purpose: "Provide insights into graph structure and composition",
                          actions: [
                            "Count total nodes and edges in graph",
                            "Group entities by type and count occurrences",
                            "Group relations by type and count occurrences",
                            "Calculate layer distribution",
                            "Identify most-cited entities",
                            "Compute connectivity metrics"
                          ],
                          output: "Statistical summary of graph structure"
                        }
                      ].map((query, index) => (
                        <div key={index} className="border-l-4 border-purple-500 dark:border-purple-400 pl-4 pb-4">
                          <div className="mb-3">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {index + 1}. {query.title}
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <span className="inline-flex items-center px-2.5 py-1 bg-purple-100 dark:bg-purple-600/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium border border-purple-300 dark:border-purple-500/40">
                                Component: {query.component}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 dark:bg-gray-600/30 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium border border-gray-300 dark:border-gray-500/40">
                                Trigger: {query.trigger}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-1 bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-300 dark:border-blue-500/40">
                                Output: {query.output}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 italic mb-3">
                            Purpose: {query.purpose}
                          </p>
                          
                          <div className="space-y-2">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">Actions:</p>
                            <ul className="space-y-2">
                              {query.actions.map((action, aIndex) => (
                                <li key={aIndex} className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed flex gap-2">
                                  <span className="text-purple-500 dark:text-purple-400 mt-1">•</span>
                                  <span className="flex-1">{action}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Complete Retrieval Flow</h3>
                    {/* Mermaid Flowchart - showing just the key query paths */}
                    <div className="mb-8">
                      <MermaidDiagram 
                        theme={theme === 'obsidian' ? 'dark' : 'default'}
                        chart={`flowchart TD
    Start([Retrieval Request]) --> LoadGraph[Load Graph from JSON:<br/>- Restore NetworkX Graph<br/>- Rebuild Indices<br/>- Load Schema]
    
    LoadGraph --> QueryType{Query<br/>Type?}
    
    QueryType -->|Search| SearchQuery[Search Entities:<br/>- Token Matching<br/>- Fuzzy Search<br/>- Layer/Type Filters]
    SearchQuery --> CalculateScores[Calculate Match Scores]
    CalculateScores --> RankResults[Rank Results by Score]
    RankResults --> ReturnResults[Return Top K Results]
    
    QueryType -->|Get Entity| GetEntityByName[Find Entity by Name]
    GetEntityByName --> EntityFound{Entity<br/>Found?}
    EntityFound -->|No| SearchFallback[Fallback to Search]
    SearchFallback --> ReturnResults
    EntityFound -->|Yes| GetRelations{Include<br/>Relations?}
    GetRelations -->|Yes| FetchRelations[Fetch Relations]
    GetRelations -->|No| ReturnEntity[Return Entity Details]
    FetchRelations --> ReturnEntity
    
    QueryType -->|Get Content| GetContent[Get Entity Content]
    GetContent --> FindCitation[Find Entity Citation]
    FindCitation --> CitationFound{Citation<br/>Found?}
    CitationFound -->|No| ReturnError[Return Error]
    CitationFound -->|Yes| CheckLocal{Base Directory<br/>Set?}
    CheckLocal -->|Yes| ReadLocal[Read Local File]
    CheckLocal -->|No| FetchRemote[Fetch from Remote]
    ReadLocal --> FormatContent[Format Content]
    FetchRemote --> FormatContent
    FormatContent --> ReturnResults
    
    QueryType -->|Impact Analysis| ImpactAnalysis[Impact Analysis]
    ImpactAnalysis --> ChooseDirection{Direction?}
    ChooseDirection -->|Downstream| TraverseDownstream[Traverse Incoming Edges]
    ChooseDirection -->|Upstream| TraverseUpstream[Traverse Outgoing Edges]
    TraverseDownstream --> BFSTraversal[BFS Traversal]
    TraverseUpstream --> BFSTraversal
    BFSTraversal --> GroupByDepth[Group Results by Depth]
    GroupByDepth --> ReturnResults
    
    QueryType -->|Advanced Search| AdvancedSearch[Advanced Search]
    AdvancedSearch --> ParseFilters[Parse Filters]
    ParseFilters --> ApplyMultiFilters[Apply Multi-Criteria Filters]
    ApplyMultiFilters --> ScoreAndRank[Score & Rank Results]
    ScoreAndRank --> ReturnResults
    
    QueryType -->|List by Type/Layer| ListEntities[List Entities]
    ListEntities --> UseIndices[Use Pre-built Indices]
    UseIndices --> ApplyLimit[Apply Limit]
    ApplyLimit --> ReturnResults
    
    QueryType -->|Get Stats| GetStats[Get Graph Stats]
    GetStats --> CountNodes[Count Nodes & Edges]
    CountNodes --> GroupByType[Group by Type & Relation]
    GroupByType --> ReturnResults
    
    ReturnResults --> End([End: Results Returned])
    ReturnEntity --> End
    ReturnError --> End
    
    style Start fill:#FFE4B5
    style End fill:#90EE90
    style SearchQuery fill:#E6E6FA
    style ImpactAnalysis fill:#E6E6FA
    style AdvancedSearch fill:#E6E6FA
    style GetContent fill:#E6E6FA
    style ReturnError fill:#FFB6C6`}
                      />
                    </div>

                    {/* Key Features Section */}
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Scoring System Card */}
                        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-md border border-white/60 dark:border-obsidian-300/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                              SC
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Search Scoring System</h4>
                          </div>
                          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-2"><span className="text-indigo-500 dark:text-indigo-400">•</span><span><strong>Exact match</strong>: 1.0 (perfect match)</span></li>
                            <li className="flex gap-2"><span className="text-indigo-500 dark:text-indigo-400">•</span><span><strong>Starts with</strong>: 0.85 (prefix match)</span></li>
                            <li className="flex gap-2"><span className="text-indigo-500 dark:text-indigo-400">•</span><span><strong>Contains</strong>: 0.75 (substring)</span></li>
                            <li className="flex gap-2"><span className="text-indigo-500 dark:text-indigo-400">•</span><span><strong>Token overlap</strong>: 0.6-0.7 (camelCase/snake_case)</span></li>
                            <li className="flex gap-2"><span className="text-indigo-500 dark:text-indigo-400">•</span><span><strong>File path</strong>: 0.55 (location match)</span></li>
                            <li className="flex gap-2"><span className="text-indigo-500 dark:text-indigo-400">•</span><span><strong>Description</strong>: 0.35-0.5 (semantic match)</span></li>
                          </ul>
                        </div>
                        
                        {/* Indices Card */}
                        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-md border border-white/60 dark:border-obsidian-300/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                              IX
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Fast Lookup Indices</h4>
                          </div>
                          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-2"><span className="text-cyan-500 dark:text-cyan-400">•</span><span><strong>Name Index</strong>: name → Set[entity_ids] (handles duplicates)</span></li>
                            <li className="flex gap-2"><span className="text-cyan-500 dark:text-cyan-400">•</span><span><strong>Type Index</strong>: type → Set[entity_ids] (O(1) filtering)</span></li>
                            <li className="flex gap-2"><span className="text-cyan-500 dark:text-cyan-400">•</span><span><strong>File Index</strong>: file_path → Set[entity_ids] (per-file lookup)</span></li>
                            <li className="flex gap-2"><span className="text-cyan-500 dark:text-cyan-400">•</span><span><strong>Layer Index</strong>: Computed from TYPE_TO_LAYER mapping</span></li>
                          </ul>
                        </div>
                      
                        {/* Token Matching Card */}
                        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-md border border-white/60 dark:border-obsidian-300/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                              TM
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Token Matching</h4>
                          </div>
                          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-2"><span className="text-violet-500 dark:text-violet-400">•</span><span><strong>camelCase</strong>: "ChatMessageHandler" → ["chat", "message", "handler"]</span></li>
                            <li className="flex gap-2"><span className="text-violet-500 dark:text-violet-400">•</span><span><strong>snake_case</strong>: "user_service" → ["user", "service"]</span></li>
                            <li className="flex gap-2"><span className="text-violet-500 dark:text-violet-400">•</span><span><strong>PascalCase</strong>: "APIHandler" → ["api", "handler"]</span></li>
                            <li className="flex gap-2"><span className="text-violet-500 dark:text-violet-400">•</span><span><strong>Example</strong>: Query "chat message" matches "ChatMessageHandler"</span></li>
                          </ul>
                        </div>
                        
                        {/* Impact Analysis Card */}
                        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-md border border-white/60 dark:border-obsidian-300/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                              IA
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Impact Analysis</h4>
                          </div>
                          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-2"><span className="text-rose-500 dark:text-rose-400">•</span><span><strong>Downstream</strong>: What depends on this? (incoming edges)</span></li>
                            <li className="flex gap-2"><span className="text-rose-500 dark:text-rose-400">•</span><span><strong>Upstream</strong>: What does this depend on? (outgoing edges)</span></li>
                            <li className="flex gap-2"><span className="text-rose-500 dark:text-rose-400">•</span><span><strong>BFS Traversal</strong>: Depth-based grouping with cycle detection</span></li>
                            <li className="flex gap-2"><span className="text-rose-500 dark:text-rose-400">•</span><span><strong>Path Tracking</strong>: Include relation types in dependency paths</span></li>
                          </ul>
                        </div>

                        {/* Content Retrieval Card */}
                        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-md border border-white/60 dark:border-obsidian-300/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                              CR
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Content Retrieval</h4>
                          </div>
                          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-2"><span className="text-orange-500 dark:text-orange-400">•</span><span><strong>Local First</strong>: Read from filesystem if base_directory set</span></li>
                            <li className="flex gap-2"><span className="text-orange-500 dark:text-orange-400">•</span><span><strong>Remote Fallback</strong>: Fetch via source toolkit (GitHub, ADO)</span></li>
                            <li className="flex gap-2"><span className="text-orange-500 dark:text-orange-400">•</span><span><strong>Line Range</strong>: Extract specific lines from full document</span></li>
                            <li className="flex gap-2"><span className="text-orange-500 dark:text-orange-400">•</span><span><strong>Security</strong>: Path validation prevents directory traversal</span></li>
                          </ul>
                        </div>

                        {/* Advanced Filters Card */}
                        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-md border border-white/60 dark:border-obsidian-300/60 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                              AF
                            </div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">Advanced Filters</h4>
                          </div>
                          <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                            <li className="flex gap-2"><span className="text-fuchsia-500 dark:text-fuchsia-400">•</span><span><strong>Type Filters</strong>: OR logic across multiple entity types</span></li>
                            <li className="flex gap-2"><span className="text-fuchsia-500 dark:text-fuchsia-400">•</span><span><strong>Layer Filters</strong>: Semantic grouping by domain layer</span></li>
                            <li className="flex gap-2"><span className="text-fuchsia-500 dark:text-fuchsia-400">•</span><span><strong>File Patterns</strong>: Glob matching for path filtering</span></li>
                            <li className="flex gap-2"><span className="text-fuchsia-500 dark:text-fuchsia-400">•</span><span><strong>Relation/Citation Thresholds</strong>: Min counts for filtering</span></li>
                          </ul>
                        </div>
                      </div>
                      
                      {/* Design Principles Card - Full Width */}
                      <div className="mt-6 bg-gradient-to-br from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/30 dark:to-teal-900/30 backdrop-blur-md border border-emerald-200/60 dark:border-emerald-700/60 rounded-2xl p-6 shadow-md">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md">
                            DP
                          </div>
                          <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">Design Principles</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-3 text-sm text-emerald-900/90 dark:text-emerald-200/90">
                          <div className="flex gap-2">✅ <span><strong>Fast Retrieval</strong>: Multiple indices for O(1) lookups</span></div>
                          <div className="flex gap-2">✅ <span><strong>Flexible Search</strong>: Token-based + fuzzy matching</span></div>
                          <div className="flex gap-2">✅ <span><strong>On-Demand Content</strong>: Fetch source code when needed</span></div>
                          <div className="flex gap-2">✅ <span><strong>Multi-Source</strong>: Citations from different toolkits</span></div>
                          <div className="flex gap-2">✅ <span><strong>Graph Traversal</strong>: Impact analysis via BFS</span></div>
                          <div className="flex gap-2">✅ <span><strong>Security</strong>: Path validation for local file access</span></div>
                          <div className="flex gap-2">✅ <span><strong>Scalable</strong>: Handles large graphs efficiently</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'tools' && (
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Tools & Integrations</h2>
                    
                    <div className="prose dark:prose-invert max-w-none mb-8">
                      <p className="text-lg text-gray-700 dark:text-gray-300">
                        The Inventory Knowledge Graph integrates with source control systems, development platforms, and orchestration tools to provide comprehensive codebase analysis and retrieval capabilities.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mb-8">
                      {[
                        { name: "Elitea.ai", description: "Workflow orchestration platform for distributed intelligence and agent coordination", url: "https://elitea.ai", role: "AI Orchestration" },
                        { name: "LangChain", description: "Framework for document processing and LLM-based entity extraction", url: "https://langchain.com", role: "AI Framework" },
                        { name: "NetworkX", description: "Graph data structure and algorithms for knowledge graph storage", url: "https://networkx.org", role: "Graph Engine" }
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
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Key Operations</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
                              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Operation</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Component</th>
                              <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Key Output</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {[
                              { operation: "Repository Ingestion", component: "Ingestion Manager", output: "Entity/relation graph with citations" },
                              { operation: "Entity Search", component: "Search Engine", output: "Ranked entity results with scores" },
                              { operation: "Content Retrieval", component: "Content Retriever", output: "Source code snippets with context" },
                              { operation: "Impact Analysis", component: "Graph Traversal Engine", output: "Dependency tree by depth" },
                              { operation: "Advanced Filtering", component: "Multi-Filter Engine", output: "Filtered entity sets by criteria" },
                              { operation: "Type/Layer Queries", component: "Index Query Engine", output: "Fast O(1) entity lookups" },
                              { operation: "Graph Statistics", component: "Analytics Engine", output: "Structural metrics and insights" },
                              { operation: "Checkpoint Management", component: "Checkpoint Manager", output: "Resumable ingestion state" }
                            ].map((row, index) => (
                              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-obsidian-100/40 transition-colors">
                                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.operation}</td>
                                <td className="py-3 px-4">
                                  <span className="inline-flex items-center px-2 py-1 bg-purple-100 dark:bg-purple-600/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium">
                                    {row.component}
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
              <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 dark:from-emerald-600 dark:to-teal-700 rounded-[24px] shadow-lg p-6">
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
