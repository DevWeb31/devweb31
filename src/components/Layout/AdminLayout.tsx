import React, { useState, useEffect } from 'react'
import { Menu, X, LogOut, User, Globe } from 'lucide-react'
import { useThemeContext } from '../../hooks/useThemeContext'
import { useAuth } from '../../hooks/useAuth'
import { Sidebar } from './Sidebar'
import { AdminContent } from '../Admin/AdminContent'

interface AdminLayoutProps {
  isMaintenanceMode: boolean
  updating: boolean
  onToggleMaintenance: () => void
  successMessage?: string | null
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  isMaintenanceMode,
  updating,
  onToggleMaintenance,
  successMessage
}) => {
  const { isDark } = useThemeContext()
  const { signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [currentSection, setCurrentSection] = useState('dashboard')

  // Gérer la responsivité
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])



  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="flex items-center justify-between px-3 sm:px-4 py-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              } lg:hidden`}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-600' : 'bg-blue-500'}`}>
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <h1 className="font-semibold text-base sm:text-lg">DevWeb31</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Status - Masqué sur très petit écran */}
            <div className="hidden sm:flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isMaintenanceMode ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className={`text-sm font-medium ${isMaintenanceMode ? 'text-red-500' : 'text-green-500'}`}>
                {isMaintenanceMode ? 'Maintenance' : 'En ligne'}
              </span>
            </div>
            
            {/* Bouton Voir le site */}
            <button 
              onClick={() => window.open('/', '_blank')}
              className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg transition-colors ${
                isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              title="Voir le site public"
            >
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Voir le site</span>
            </button>
            
            {/* Bouton Admin - Texte masqué sur petit écran */}
            <button className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <User className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Administrateur</span>
            </button>
            
            {/* Bouton Déconnexion - Texte masqué sur petit écran */}
            <button
              onClick={signOut}
              className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg transition-colors ${
                isDark ? 'bg-red-600 hover:bg-red-700' : 'bg-red-500 hover:bg-red-600'
              } text-white`}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
        />

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${
          sidebarCollapsed && !sidebarOpen ? 'ml-16' : 'ml-64'
        } lg:ml-0`}>
          <div className="p-3 sm:p-4 lg:p-6">
            <AdminContent
              currentSection={currentSection}
              isMaintenanceMode={isMaintenanceMode}
              updating={updating}
              onToggleMaintenance={onToggleMaintenance}
              successMessage={successMessage}
            />
          </div>
        </main>
      </div>

      {/* Bouton flottant "Voir le site" */}
      <button
        onClick={() => window.open('/', '_blank')}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
        } hover:scale-110 hover:shadow-xl`}
        title="Voir le site public"
      >
        <Globe className="h-6 w-6" />
      </button>
    </div>
  )
}
