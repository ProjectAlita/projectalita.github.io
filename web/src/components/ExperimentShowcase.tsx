'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import ExperimentCard from '@/components/ExperimentCard'
import { type Experiment, getExperimentsWithPhaseBadges, phaseConfig } from '@/data/experiments'

interface ExperimentShowcaseProps {
  className?: string
}

export default function ExperimentShowcase({ className = '' }: ExperimentShowcaseProps) {
  const [filter, setFilter] = useState<'all' | 'phase-1' | 'phase-2' | 'phase-3'>('all')
  const [filteredExperiments, setFilteredExperiments] = useState<Experiment[]>([])
  const filterOptions = ['all', 'phase-1', 'phase-2', 'phase-3'] as const

  useEffect(() => {
    const experiments = getExperimentsWithPhaseBadges()
    // Only show the 2 available experiments
    const availableExperiments = experiments.filter(exp => 
      exp.id === 'epic-to-test-suite' || exp.id === 'inventory-knowledge-graph'
    )
    if (filter === 'all') {
      setFilteredExperiments(availableExperiments)
    } else {
      setFilteredExperiments(availableExperiments.filter(exp => exp.phase === filter))
    }
  }, [filter])

  return (
    <section className={`py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-obsidian-50 transition-colors duration-500 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 lg:mb-6">
            Experiments and Researches
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Explore what we're building next - practical AI experiments launching soon
          </p>
        </motion.div>

        {/* Experiments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="wait">
            {filteredExperiments.map((experiment, index) => (
              <ExperimentCard
                key={experiment.id}
                title={experiment.title}
                description={experiment.description}
                videoId={experiment.videoId}
                githubRepo={experiment.githubRepo}
                badge={experiment.badge}
                views={experiment.views}
                stars={experiment.stars}
                status={experiment.status}
                thumbnail={experiment.thumbnail}
                backgroundImage={experiment.backgroundImage}
                link={experiment.link}
                index={index}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}