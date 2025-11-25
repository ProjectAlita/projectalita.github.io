'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowDown, ChevronDown } from 'lucide-react'

interface Activity {
  text: string
  type: 'personal' | 'in-meeting'
  scope: 'in' | 'out'
  experiment?: {
    name: string
    color: string
  }
}

interface ProcessFlowCardProps {
  title: string
  owner: string
  activities: Activity[]
  index: number
  isLast?: boolean
  defaultExpanded?: boolean
}

export default function ProcessFlowCard({ 
  title, 
  owner, 
  activities, 
  index, 
  isLast = false,
  defaultExpanded 
}: ProcessFlowCardProps) {
  // Collapse by default if all activities are out of scope, unless defaultExpanded is specified
  const allOutOfScope = activities.every(activity => activity.scope === 'out')
  const initialExpanded = defaultExpanded !== undefined ? defaultExpanded : !allOutOfScope
  const [isExpanded, setIsExpanded] = useState(initialExpanded)
  
  const getTagStyle = (type: 'personal' | 'in-meeting') => {
    return type === "in-meeting"
      ? "bg-green-100 dark:bg-green-600/30 text-green-700 dark:text-green-300 border-green-300 dark:border-green-500/40"
      : "bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-500/40"
  }

  const getScopeStyle = (scope: 'in' | 'out') => {
    return scope === "in"
      ? "bg-indigo-100 dark:bg-indigo-600/30 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-500/40"
      : "bg-gray-100 dark:bg-gray-600/30 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-500/40"
  }

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="w-full"
      >
        <div className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 overflow-hidden transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)] hover:-translate-y-1"
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          }}
        >
          <div className="p-6 md:p-8">
            {/* Header - Clickable to toggle */}
            <div 
              className="mb-6 cursor-pointer select-none"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {title}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400 italic">Owner:</span>
                    <span className="inline-flex items-center px-3 py-1 bg-primary-100 dark:bg-primary-600/20 text-primary-700 dark:text-blue-300 rounded-full text-sm font-medium border border-primary-200/50 dark:border-primary-500/30">
                      {owner}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-1 flex-shrink-0"
                >
                  <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </motion.div>
              </div>
            </div>

            {/* Activities - Collapsible */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.ul
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-3 md:space-y-4 overflow-hidden"
                >
              {activities.map((activity, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + i * 0.05, duration: 0.3 }}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 md:p-4 bg-white/40 dark:bg-obsidian-100/40 rounded-xl border border-white/40 dark:border-obsidian-300/40 hover:bg-white/60 dark:hover:bg-obsidian-100/60 transition-all duration-200"
                >
                  <span className="text-sm md:text-base text-gray-800 dark:text-gray-200 flex-1">
                    {activity.text}
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    <span
                      className={`border rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${getTagStyle(
                        activity.type
                      )}`}
                    >
                      {activity.type === "in-meeting" ? "In Meeting" : "Personal Work"}
                    </span>
                    {activity.experiment ? (
                      <span
                        className={`border rounded-full px-3 py-1 text-xs font-bold text-white whitespace-nowrap ${activity.experiment.color} border-white/20 shadow-sm cursor-pointer hover:scale-105 transition-transform`}
                        title={`AI Experiment: ${activity.experiment.name}`}
                      >
                        {activity.experiment.name}
                      </span>
                    ) : (
                      <span
                        className={`border rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${getScopeStyle(
                          activity.scope
                        )}`}
                      >
                        {activity.scope === "in" ? "AI Potential" : "Manual Process"}
                      </span>
                    )}
                  </div>
                </motion.li>
              ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Arrow between cards */}
      {!isLast && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
          className="flex justify-center mt-6 mb-4"
        >
          <div className="w-12 h-12 bg-primary-500 dark:bg-blue-500 rounded-full flex items-center justify-center shadow-lg dark:shadow-blue-500/50 animate-bounce">
            <ArrowDown className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      )}
    </div>
  )
}
