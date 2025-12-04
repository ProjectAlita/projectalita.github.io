export interface Experiment {
  id: string
  title: string
  description: string
  videoId?: string
  githubRepo?: string
  phase: 'phase-1' | 'phase-2' | 'phase-3'
  views?: string
  stars?: string
  status: 'published' | 'coming-soon'
  thumbnail?: string
  backgroundImage?: string
  link?: string
  badge?: {
    label: string
    color: string
  }
}

export const phaseConfig = {
  'phase-1': {
    label: 'Case-Study',
    title: 'Applied AI for Testers',
    color: 'bg-primary-500',
    textColor: 'text-primary-600'
  },
  'phase-2': {
    label: 'Phase 2', 
    title: 'Applied AI in Workflows',
    color: 'bg-secondary-500',
    textColor: 'text-secondary-600'
  },
  'phase-3': {
    label: 'Research',
    title: 'Applied AI Lab', 
    color: 'bg-accent-500',
    textColor: 'text-accent-600'
  }
}

export const experiments: Experiment[] = [
  {
    id: 'epic-to-test-suite',
    title: 'Epic to Test Suite Generator',
    description: 'Transform epics into comprehensive test cases with AI-powered analysis and coverage mapping',
    phase: 'phase-1',
    status: 'coming-soon',
    backgroundImage: '/assets/covers/ba1png.png',
    link: '/experiments/epic-to-test-suite'
  },
  {
    id: 'inventory-knowledge-graph',
    title: 'Inventory Knowledge Graph',
    description: 'Build unified knowledge from multi-source contexts for AI-powered code intelligence and agent reasoning',
    phase: 'phase-3',
    status: 'coming-soon',
    backgroundImage: '/assets/covers/product-inventory.png',
    link: '/experiments/inventory-graph'
  },
  {
    id: 'requirements-designer',
    title: 'Requirements Designer',
    description: 'AI-assisted requirements elicitation and validation from stakeholder input to approved specifications',
    phase: 'phase-1',
    status: 'coming-soon'
  },
  {
    id: 'delivery-metrics',
    title: 'Delivery Metrics Dashboard',
    description: 'Real-time insights into delivery performance with AI-powered predictive analytics',
    phase: 'phase-1',
    status: 'coming-soon'
  },
  {
    id: 'ai-test-case-generator',
    title: 'AI Test Case Generator',
    description: 'Automatically generate comprehensive test cases from user stories and requirements using GPT-4.',
    phase: 'phase-1',
    status: 'coming-soon'
  },
  {
    id: 'smart-test-data-factory',
    title: 'Smart Test Data Factory',
    description: 'AI-powered test data generation that creates realistic, compliant test datasets on demand.',
    phase: 'phase-1',
    status: 'coming-soon'
  },
  {
    id: 'visual-regression-ai',
    title: 'Visual Regression AI',
    description: 'Intelligent screenshot comparison that understands intentional vs. unintentional changes.',
    phase: 'phase-1',
    status: 'coming-soon'
  },
  {
    id: 'meeting-notes-to-tasks',
    title: 'Meeting Notes to Tasks',
    description: 'Transform meeting transcripts into actionable tasks and follow-ups automatically.',
    phase: 'phase-2',
    status: 'coming-soon'
  },
  {
    id: 'document-intelligence-hub',
    title: 'Document Intelligence Hub',
    description: 'Extract, summarize, and organize insights from multiple document formats using AI.',
    phase: 'phase-2',
    status: 'coming-soon'
  },
  {
    id: 'ai-email-orchestrator',
    title: 'AI Email Orchestrator',
    description: 'Smart email categorization, prioritization, and draft responses for better inbox management.',
    phase: 'phase-2',
    status: 'coming-soon'
  },
  {
    id: 'code-review-assistant',
    title: 'Code Review Assistant',
    description: 'AI-powered code review that suggests improvements, catches bugs, and ensures best practices.',
    phase: 'phase-3',
    status: 'coming-soon'
  },
  {
    id: 'ai-sprint-planner',
    title: 'AI Sprint Planner',
    description: 'Intelligent sprint planning that optimizes team capacity and predicts delivery timelines.',
    phase: 'phase-3',
    status: 'coming-soon'
  },
  {
    id: 'knowledge-base-builder',
    title: 'Knowledge Base Builder',
    description: 'Automatically generate and maintain technical documentation from code and conversations.',
    phase: 'phase-3',
    status: 'coming-soon'
  }
]

// Helper to get experiments for specific context
export const getBAExperiments = (): Experiment[] => {
  return experiments.filter(exp => 
    ['epic-to-test-suite', 'requirements-designer', 'delivery-metrics'].includes(exp.id)
  ).map(exp => ({
    ...exp,
    badge: exp.id === 'epic-to-test-suite' 
      ? { label: 'Coming Soon', color: 'bg-blue-500' }
      : exp.id === 'requirements-designer'
      ? { label: 'Coming Soon', color: 'bg-purple-500' }
      : { label: 'Coming Soon', color: 'bg-green-500' }
  }))
}

// Helper to get experiments with phase badges
export const getExperimentsWithPhaseBadges = (): Experiment[] => {
  return experiments.map(exp => ({
    ...exp,
    badge: {
      label: phaseConfig[exp.phase].label,
      color: phaseConfig[exp.phase].color
    }
  }))
}
