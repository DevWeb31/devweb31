import React, { useEffect, useState } from 'react'
import { CheckCircle, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SnackbarProps {
  message: string
  isVisible: boolean
  onClose: () => void
  type?: 'success' | 'info' | 'warning' | 'error'
  duration?: number
}

export const Snackbar: React.FC<SnackbarProps> = ({
  message,
  isVisible,
  onClose,
  type = 'success',
  duration = 4000
}) => {
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (isVisible && !isHovered) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)

      return () => clearTimeout(timer)
    }
  }, [isVisible, duration, onClose, isHovered])

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-primary-50 dark:bg-primary-900/20 border-primary-200 dark:border-primary-800 text-primary-800 dark:text-primary-200'
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200'
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200'
      default:
        return 'bg-gray-50 dark:bg-gray-800/20 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200'
    }
  }

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400" />
      case 'info':
        return <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      case 'warning':
        return <CheckCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
      case 'error':
        return <CheckCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      default:
        return <CheckCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.95 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94],
            scale: { duration: 0.3 }
          }}
          className="fixed top-20 left-4 z-50"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className={`
            flex items-center space-x-3 px-4 py-3 rounded-lg border shadow-lg backdrop-blur-sm
            ${getTypeStyles()}
          `}>
            {getIcon()}
            <span className="text-sm font-medium">{message}</span>
            <button
              onClick={onClose}
              className="ml-2 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
