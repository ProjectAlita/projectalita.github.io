'use client'

import { useEffect, useState, useRef } from 'react'

interface MermaidDiagramProps {
  chart: string
  theme?: 'default' | 'dark'
}

export default function MermaidDiagram({ chart, theme = 'default' }: MermaidDiagramProps) {
  const [Mermaid, setMermaid] = useState<any>(null)
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [isAutoFitted, setIsAutoFitted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically import Mermaid only on client side
    import('react-mermaid2').then((mod) => {
      setMermaid(() => mod.default)
    })
  }, [])

  useEffect(() => {
    // Add wheel event listener with passive: false to allow preventDefault
    const container = containerRef.current
    if (!container) return

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const delta = e.deltaY * -0.001
      const newScale = Math.min(Math.max(0.1, scale + delta), 3)
      setScale(newScale)
    }

    container.addEventListener('wheel', wheelHandler, { passive: false })
    
    return () => {
      container.removeEventListener('wheel', wheelHandler)
    }
  }, [scale])

  useEffect(() => {
    // Auto-fit SVG to container on initial load
    if (Mermaid && containerRef.current && !isAutoFitted) {
      const timer = setTimeout(() => {
        const container = containerRef.current
        const svg = container?.querySelector('svg')
        if (svg && container) {
          try {
            const containerWidth = container.clientWidth
            const containerHeight = container.clientHeight
            const bbox = svg.getBBox()
            const svgWidth = bbox.width
            const svgHeight = bbox.height
            
            if (svgWidth > 0 && svgHeight > 0) {
              const scaleX = (containerWidth - 40) / svgWidth
              const scaleY = (containerHeight - 40) / svgHeight
              const autoScale = Math.min(scaleX, scaleY, 1)
              
              if (autoScale < 1) {
                setScale(autoScale)
              }
              setIsAutoFitted(true)
            }
          } catch (error) {
            console.warn('Could not auto-fit SVG:', error)
            setIsAutoFitted(true)
          }
        }
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [Mermaid, isAutoFitted])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsDragging(true)
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetZoom = () => {
    setScale(1)
    setPosition({ x: 0, y: 0 })
  }

  const fitToView = () => {
    const container = containerRef.current
    const svg = container?.querySelector('svg')
    if (svg && container) {
      try {
        const containerWidth = container.clientWidth
        const containerHeight = container.clientHeight
        const bbox = svg.getBBox()
        const svgWidth = bbox.width
        const svgHeight = bbox.height
        
        if (svgWidth > 0 && svgHeight > 0) {
          const scaleX = (containerWidth - 40) / svgWidth
          const scaleY = (containerHeight - 40) / svgHeight
          const autoScale = Math.min(scaleX, scaleY, 1)
          
          setScale(autoScale)
          setPosition({ x: 0, y: 0 })
        }
      } catch (error) {
        console.warn('Could not fit to view:', error)
      }
    }
  }

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3))
  }

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.1))
  }

  if (!Mermaid) {
    return null
  }

  return (
    <>
      <style jsx>{`
        .mermaid-diagram :global(svg) {
          max-height: 100% !important;
          height: auto !important;
          display: block;
        }
        .mermaid-diagram :global(.node rect),
        .mermaid-diagram :global(.node circle),
        .mermaid-diagram :global(.node ellipse),
        .mermaid-diagram :global(.node polygon) {
          stroke-width: 2px;
        }
        .mermaid-diagram :global(.edgeLabel) {
          background-color: ${theme === 'dark' ? 'rgba(30, 30, 46, 0.9)' : 'rgba(255, 255, 255, 0.9)'} !important;
          color: ${theme === 'dark' ? '#e0e0e0' : '#1a1a1a'} !important;
          padding: 4px 8px;
          border-radius: 4px;
        }
        .mermaid-diagram :global(.nodeLabel) {
          color: ${theme === 'dark' ? '#ffffff' : '#1a1a1a'} !important;
          font-weight: 500;
        }
      `}</style>
      <div className="relative">
        {/* Zoom Controls - Material UI Style */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 bg-white dark:bg-obsidian-200 rounded-lg shadow-[0_2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.3),0_4px_8px_rgba(0,0,0,0.3)]">
          <button
            onClick={zoomIn}
            className="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-obsidian-100 rounded-t-lg transition-colors"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
            </svg>
          </button>
          <div className="w-full h-px bg-gray-200 dark:bg-obsidian-300" />
          <button
            onClick={zoomOut}
            className="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-obsidian-100 transition-colors"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
          <div className="w-full h-px bg-gray-200 dark:bg-obsidian-300" />
          <button
            onClick={fitToView}
            className="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-obsidian-100 transition-colors"
            title="Fit to View"
            aria-label="Fit to View"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <div className="w-full h-px bg-gray-200 dark:bg-obsidian-300" />
          <button
            onClick={resetZoom}
            className="w-10 h-10 flex items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-obsidian-100 rounded-b-lg transition-colors"
            title="Reset Zoom (100%)"
            aria-label="Reset Zoom"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <div className="px-2 py-1 text-[10px] text-center text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-obsidian-300">
            {Math.round(scale * 100)}%
          </div>
        </div>

        <div 
          ref={containerRef}
          className="mermaid-diagram overflow-hidden bg-white/60 dark:bg-obsidian-200/60 border border-white/60 dark:border-obsidian-300/60 rounded-xl p-2 cursor-grab active:cursor-grabbing"
          style={{ height: '600px' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Mermaid 
              chart={chart}
              config={{
                theme: theme,
                themeVariables: {
                  fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  primaryColor: theme === 'dark' ? '#4a5568' : '#e2e8f0',
                  primaryTextColor: theme === 'dark' ? '#ffffff' : '#1a202c',
                  primaryBorderColor: theme === 'dark' ? '#718096' : '#cbd5e0',
                  lineColor: theme === 'dark' ? '#a0aec0' : '#4a5568',
                  secondaryColor: theme === 'dark' ? '#2d3748' : '#edf2f7',
                  tertiaryColor: theme === 'dark' ? '#1a202c' : '#f7fafc',
                  background: theme === 'dark' ? '#1e1e2e' : '#ffffff',
                  mainBkg: theme === 'dark' ? '#2d3748' : '#e2e8f0',
                  secondBkg: theme === 'dark' ? '#4a5568' : '#cbd5e0',
                  labelBackground: theme === 'dark' ? '#1e1e2e' : '#ffffff',
                  edgeLabelBackground: theme === 'dark' ? '#1e1e2e' : '#ffffff',
                  clusterBkg: theme === 'dark' ? '#2d3748' : '#f7fafc',
                  clusterBorder: theme === 'dark' ? '#718096' : '#cbd5e0',
                  fontSize: '14px'
                },
                flowchart: {
                  useMaxWidth: false,
                  htmlLabels: true,
                  curve: 'basis',
                  padding: 20
                }
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Scroll to zoom • Drag to pan • Use controls to adjust view</span>
        </div>
      </div>
    </>
  )
}
