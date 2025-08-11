import React from 'react'
import { Settings, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export const MaintenanceMode: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Settings className="h-16 w-16 text-blue-600" />
            <Clock className="h-8 w-8 text-orange-500 absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Site en Maintenance
        </h1>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Nous travaillons actuellement sur des améliorations pour vous offrir 
          une meilleure expérience. Nous serons de retour très bientôt !
        </p>
        
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-blue-800 font-medium">DevWeb31</p>
          <p className="text-blue-600 text-sm">Développement Web & Applications</p>
        </div>
      </motion.div>
    </div>
  )
}