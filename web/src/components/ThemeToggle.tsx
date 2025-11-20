'use client'

import { motion, AnimatePresence } from 'framer-motion'

interface ThemeToggleProps {
  theme: 'crystal' | 'obsidian'
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isObsidian = theme === 'obsidian'

  return (
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed top-6 right-6 z-50 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl rounded-[20px] shadow-[0_8px_24px_rgba(0,0,0,0.12),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] border border-white/60 dark:border-gray-700/60 hover:shadow-[0_12px_32px_rgba(0,0,0,0.16),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-1px_2px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.2)] transition-all duration-300 group"
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
      aria-label={`Switch to ${isObsidian ? 'Crystal' : 'Obsidian'} mode`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {isObsidian ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
              className="absolute"
            >
              {/* Moon icon with stars */}
              <svg
                className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                {/* Stars */}
                <circle cx="19" cy="6" r="1" className="text-yellow-300" />
                <circle cx="22" cy="9" r="0.5" className="text-yellow-200" />
                <circle cx="18" cy="3" r="0.5" className="text-yellow-200" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
              className="absolute"
            >
              {/* Sun icon with rays */}
              <svg
                className="w-6 h-6 text-amber-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="5" />
                <g className="animate-pulse">
                  <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                    fill="none"
                  />
                </g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900/90 dark:bg-white/90 backdrop-blur-sm text-white dark:text-gray-900 text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {isObsidian ? 'Crystal Mode' : 'Obsidian Mode'}
        <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900/90 dark:border-l-white/90" />
      </motion.div>
    </motion.button>
  )
}
