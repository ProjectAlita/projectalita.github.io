'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface ExperimentCardProps {
  title: string
  description: string
  videoId?: string
  githubRepo?: string
  badge?: {
    label: string
    color: string
  }
  views?: string
  stars?: string
  status?: 'published' | 'coming-soon'
  thumbnail?: string
  backgroundImage?: string
  index?: number
  link?: string
  onClick?: () => void
}

export default function ExperimentCard({
  title,
  description,
  videoId,
  githubRepo,
  badge,
  views,
  stars,
  status = 'coming-soon',
  thumbnail,
  backgroundImage,
  index = 0,
  link,
  onClick
}: ExperimentCardProps) {
  const router = useRouter()

  const handleVideoClick = () => {
    if (onClick) {
      onClick()
    } else if (link) {
      router.push(link)
    } else if (videoId) {
      // Create video modal
      const modal = document.createElement('div')
      modal.className = 'fixed inset-0 z-50 flex items-center justify-center video-modal-overlay'
      modal.innerHTML = `
        <div class="relative w-full max-w-4xl mx-4 aspect-video bg-black rounded-xl overflow-hidden">
          <button class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300 z-10">&times;</button>
          <iframe 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            class="w-full h-full" 
            frameborder="0" 
            allowfullscreen
          ></iframe>
        </div>
      `
      
      document.body.appendChild(modal)
      
      // Close modal handlers
      const closeBtn = modal.querySelector('button')
      const closeModal = () => document.body.removeChild(modal)
      
      closeBtn?.addEventListener('click', closeModal)
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal()
      })
      
      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          closeModal()
          document.removeEventListener('keydown', escHandler)
        }
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="bg-white/60 dark:bg-obsidian-200/60 backdrop-blur-xl rounded-[24px] shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 overflow-hidden group cursor-pointer transform-gpu hover:shadow-[0_12px_40px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.9)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)] transition-all duration-300"
      onClick={handleVideoClick}
      style={{
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      {/* Video/Thumbnail Section */}
      <div 
        className="relative aspect-video bg-gradient-to-br from-primary-50/80 to-secondary-50/80 dark:from-primary-800/30 dark:to-secondary-800/30 backdrop-blur-sm overflow-hidden"
        style={backgroundImage ? {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        } : {}}
      >
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
        
        {/* Thumbnail images */}
        {thumbnail && (
          <img 
            src={thumbnail} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {videoId && !thumbnail && !backgroundImage && (
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30">
            <span className={`px-3 sm:px-4 py-1.5 text-xs font-bold text-white rounded-full backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/20 ${badge.color}`}>
              {badge.label}
            </span>
          </div>
        )}

        {/* Stats */}
        {views && (
          <div className="absolute top-4 right-4 z-30">
            <span className="px-3 py-1.5 text-xs font-semibold text-white bg-black/40 dark:bg-black/60 backdrop-blur-md rounded-full border border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
              {views} views
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 bg-white/30 dark:bg-obsidian-100/30 backdrop-blur-sm">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3 group-hover:text-primary-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-white/40 dark:border-obsidian-300/40">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            {stars && (
              <span className="flex items-center font-medium">
                <svg className="w-4 h-4 mr-1 text-yellow-500 dark:text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                {stars}
              </span>
            )}
          </div>

          {githubRepo && (
            <a
              href={`https://github.com/ProjectAlita/${githubRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 text-sm text-primary-700 dark:text-blue-400 hover:text-primary-800 dark:hover:text-blue-300 font-semibold bg-white/60 dark:bg-obsidian-200/60 hover:bg-white/80 dark:hover:bg-obsidian-200/80 backdrop-blur-sm rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/60 dark:border-obsidian-300/60 transition-all duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Docs
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
