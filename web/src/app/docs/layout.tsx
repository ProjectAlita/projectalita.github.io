import { ReactNode } from 'react'

export const metadata = {
  title: 'Documentation - ELITEA.AI',
  description: 'Learn about testing LLM applications, AI-powered QA, and modern testing approaches',
}

export default function DocsLayout({
  children,
}: {
  children: ReactNode
}) {
  return <>{children}</>
}
