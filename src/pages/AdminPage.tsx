import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useThemeContext } from '../contexts/ThemeContext'
import { SEOHead } from '../components/SEOHead'
import { AdminLayout } from '../components/Layout/AdminLayout'

export const AdminPage: React.FC = () => {
  const { isDark } = useThemeContext()
  const { user } = useAuth()
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

  const toggleMaintenanceMode = async () => {
    setUpdating(true)
    
    try {
      const newValue = !isMaintenanceMode
      
      // Utiliser update au lieu d'upsert pour éviter les conflits
      const { error } = await supabase
        .from('site_settings')
        .update({
          value: newValue.toString(),
          updated_at: new Date().toISOString()
        })
        .eq('key', 'maintenance')

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
      
      <AdminLayout
        isMaintenanceMode={isMaintenanceMode}
        updating={updating}
        onToggleMaintenance={toggleMaintenanceMode}
      />
    </>
  )
}