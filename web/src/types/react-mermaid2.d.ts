declare module 'react-mermaid2' {
  import { ComponentType } from 'react'

  interface MermaidConfig {
    theme?: 'default' | 'dark' | 'forest' | 'neutral'
    themeVariables?: Record<string, string>
    flowchart?: {
      useMaxWidth?: boolean
      htmlLabels?: boolean
      curve?: string
      padding?: number
    }
    [key: string]: any
  }

  interface MermaidProps {
    chart: string
    config?: MermaidConfig
  }

  const Mermaid: ComponentType<MermaidProps>
  export default Mermaid
}
