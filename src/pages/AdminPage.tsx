import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { Settings, Power, PowerOff, LogOut, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

export const AdminPage: React.FC = () => {
  const [user, setUser] = useState<any>(null)
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    checkUser()
    if (user) {
      fetchMaintenanceStatus()
    }
  }, [user])

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    setUser(session?.user || null)
    setLoading(false)
  }

  const fetchMaintenanceStatus = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'maintenance_mode')
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching maintenance status:', error)
        return
      }

      setIsMaintenanceMode(data?.value === 'true')
    } catch (error) {
      console.error('Error fetching maintenance status:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      checkUser()
    } catch (error: any) {
      setLoginError(error.message)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const toggleMaintenanceMode = async () => {
    setUpdating(true)
    
    try {
      const newValue = !isMaintenanceMode
      
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'maintenance_mode',
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Administration</h1>
            <p className="text-gray-600">Connectez-vous pour accéder au back office</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="admin@devweb31.fr"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="••••••••"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-800 text-sm">{loginError}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
            >
              Se connecter
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Settings className="h-8 w-8 text-blue-600" />
                Administration DevWeb31
              </h1>
              <p className="text-gray-600 mt-1">
                Connecté en tant que {user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium flex items-center gap-2 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Maintenance Mode Control */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Mode Maintenance
          </h2>
          
          <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                État du site
              </h3>
              <p className="text-gray-600 mt-1">
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
              
              <span className={`absolute text-sm font-medium text-white ${
                isMaintenanceMode ? 'right-3' : 'left-3'
              }`}>
                {isMaintenanceMode ? 'OFF' : 'ON'}
              </span>
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-xl">
            <p className="text-blue-800 text-sm">
              <strong>Note :</strong> Lorsque le mode maintenance est activé, 
              tous les visiteurs verront la page de maintenance au lieu du site normal. 
              Seuls les administrateurs peuvent accéder à cette interface.
            </p>
          </div>
        </div>

        {/* Future Features Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Fonctionnalités à venir
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">📊</span>
              </div>
              <h3 className="font-medium text-gray-900">Analytics</h3>
              <p className="text-sm text-gray-600 mt-1">Statistiques du site</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">📝</span>
              </div>
              <h3 className="font-medium text-gray-900">Contenus</h3>
              <p className="text-sm text-gray-600 mt-1">Gestion des pages</p>
            </div>
            
            <div className="p-4 bg-gray-50 rounded-xl text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">💬</span>
              </div>
              <h3 className="font-medium text-gray-900">Messages</h3>
              <p className="text-sm text-gray-600 mt-1">Contact clients</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}