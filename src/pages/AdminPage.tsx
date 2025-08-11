import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Settings, Power, PowerOff, LogOut, Shield, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useThemeContext } from '../contexts/ThemeContext'
import { SEOHead } from '../components/SEOHead'

export const AdminPage: React.FC = () => {
  const { isDark } = useThemeContext()
  const { user, signOut } = useAuth()
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    if (user) {
      fetchMaintenanceStatus()
    }
  }, [user])

  const fetchMaintenanceStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'maintenance')
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching maintenance status:', error)
        return
      }

      setIsMaintenanceMode(data?.value === 'true')
      setLoading(false)
    } catch (error) {
      console.error('Error fetching maintenance status:', error)
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut()
  }

  const toggleMaintenanceMode = async () => {
    setUpdating(true)
    
    try {
      const newValue = !isMaintenanceMode
      
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'maintenance',
          value: newValue.toString(),
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      
      setIsMaintenanceMode(newValue)
    } catch (error) {
      console.error('Error updating maintenance mode:', error)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>Chargement...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEOHead
        title="Administration - Back-office"
        description="Interface d'administration de DevWeb31 pour gérer votre site web."
        keywords="administration, back-office, admin, DevWeb31"
        canonical="https://devweb31.fr/admin"
      />
      
      <div className={`min-h-screen pt-16 ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className={`rounded-2xl shadow-lg p-6 mb-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-center">
              <div>
                <h1 className={`text-2xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <Settings className="h-8 w-8 text-blue-600" />
                  Administration DevWeb31
                </h1>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Connecté en tant que {user?.email}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <User className={`h-4 w-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                  <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {user?.user_metadata?.role || 'Administrateur'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors ${
                    isDark 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <LogOut className="h-5 w-5" />
                  Déconnexion
                </button>
              </div>
            </div>
          </div>

          {/* Maintenance Mode Control */}
          <div className={`rounded-2xl shadow-lg p-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Mode Maintenance
            </h2>
            
            <div className={`flex items-center justify-between p-6 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div>
                <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  État du site
                </h3>
                <p className={`mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {isMaintenanceMode 
                    ? 'Le site affiche actuellement la page de maintenance'
                    : 'Le site est accessible normalement'
                  }
                </p>
              </div>
              
              <button
                onClick={toggleMaintenanceMode}
                disabled={updating}
                className={`relative inline-flex h-16 w-28 items-center rounded-full transition-all ${
                  isMaintenanceMode 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-green-500 hover:bg-green-600'
                } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <motion.div
                  className={`inline-block h-12 w-12 transform rounded-full bg-white shadow-lg transition-transform ${
                    isMaintenanceMode ? 'translate-x-2' : 'translate-x-14'
                  }`}
                  layout
                >
                  <div className="flex items-center justify-center h-full">
                    {isMaintenanceMode ? (
                      <PowerOff className="h-6 w-6 text-red-500" />
                    ) : (
                      <Power className="h-6 w-6 text-green-500" />
                    )}
                  </div>
                </motion.div>
                
                <span className="absolute text-sm font-medium text-white">
                  {isMaintenanceMode ? 'OFF' : 'ON'}
                </span>
              </button>
            </div>

            <div className={`mt-6 p-4 rounded-xl ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50'}`}>
              <p className={`text-sm ${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                <strong>Note :</strong> Lorsque le mode maintenance est activé, 
                tous les visiteurs verront la page de maintenance au lieu du site normal. 
                Seuls les administrateurs peuvent accéder à cette interface.
              </p>
            </div>
          </div>

          {/* Future Features Placeholder */}
          <div className={`rounded-2xl shadow-lg p-8 mt-8 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Fonctionnalités à venir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <span className="text-blue-600 font-bold">📊</span>
                </div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Analytics</h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Statistiques du site</p>
              </div>
              
              <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
                  <span className="text-green-600 font-bold">📝</span>
                </div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Contenus</h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Gestion des pages</p>
              </div>
              
              <div className={`p-4 rounded-xl text-center ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-orange-900' : 'bg-orange-100'}`}>
                  <span className="text-orange-600 font-bold">💬</span>
                </div>
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>Messages</h3>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Contact clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}