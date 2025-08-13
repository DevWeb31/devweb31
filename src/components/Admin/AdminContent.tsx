import React, { useState, useEffect } from 'react'
import { Power, BarChart3, FileText, MessageSquare, Users, Database, Shield, Globe, Mail, Bell, Cog, Star, CheckCircle, Database as DatabaseIcon } from 'lucide-react'
import { useThemeContext } from '../../hooks/useThemeContext'
import { supabase } from '../../lib/supabase'

interface AdminContentProps {
  currentSection: string
  isMaintenanceMode: boolean
  updating: boolean
  onToggleMaintenance: () => void
  successMessage?: string | null
}

export const AdminContent: React.FC<AdminContentProps> = ({
  currentSection,
  isMaintenanceMode,
  updating,
  onToggleMaintenance,
  successMessage
}) => {
  const { isDark } = useThemeContext()

  // Barre de navigation rapide
  const QuickNavBar = () => (
    <div className={`mb-4 p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-blue-600" />
          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Navigation rapide
          </span>
        </div>
        <button
          onClick={() => window.open('/', '_blank')}
          className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
            isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <Globe className="h-4 w-4" />
          <span className="text-sm">Voir le site</span>
        </button>
      </div>
    </div>
  )

  // Composant de débogage temporaire
  const DebugMaintenanceStatus = ({ isDark }: { isDark: boolean }) => {
    const [dbStatus, setDbStatus] = useState<string>('Chargement...')
    const [dbValue, setDbValue] = useState<string>('')

    useEffect(() => {
      checkDatabaseStatus()
    }, [])

    const checkDatabaseStatus = async () => {
      try {
        // Vérifier si la table existe
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('key', 'maintenance_mode')
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            setDbStatus('❌ Table site_settings non trouvée ou vide')
            setDbValue('N/A')
          } else {
            setDbStatus(`❌ Erreur: ${error.message}`)
            setDbValue('N/A')
          }
        } else {
          setDbStatus('✅ Table site_settings accessible')
          setDbValue(data.value)
        }
      } catch {
        setDbStatus('❌ Erreur de connexion à la base de données')
        setDbValue('N/A')
      }
    }

    const createMaintenanceRecord = async () => {
      try {
        const { error } = await supabase
          .from('site_settings')
          .insert([{ key: 'maintenance_mode', value: 'false' }])
          .select()
          .single()

        if (error) {
          setDbStatus(`❌ Erreur lors de la création de l'enregistrement: ${error.message}`)
          setDbValue('N/A')
        } else {
          setDbStatus('✅ Enregistrement créé avec succès')
          setDbValue('false')
        }
      } catch {
        setDbStatus('❌ Erreur lors de la création de l\'enregistrement')
        setDbValue('N/A')
      }
    }

    return (
      <div className={`mt-3 p-3 rounded-lg border ${isDark ? 'bg-yellow-900/20 border-yellow-800' : 'bg-yellow-50 border-yellow-200'}`}>
        <div className="flex items-center gap-2 mb-2">
          <DatabaseIcon className="h-4 w-4 text-yellow-600" />
          <span className={`text-sm font-medium ${isDark ? 'text-yellow-300' : 'text-yellow-800'}`}>
            Débogage Base de Données
          </span>
        </div>
        <div className="text-xs space-y-1">
          <p className={isDark ? 'text-yellow-200' : 'text-yellow-800'}>
            <strong>Statut:</strong> {dbStatus}
          </p>
          <p className={isDark ? 'text-yellow-200' : 'text-yellow-800'}>
            <strong>Valeur actuelle:</strong> {dbValue}
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={checkDatabaseStatus}
              className={`px-2 py-1 rounded text-xs ${
                isDark ? 'bg-yellow-800 hover:bg-yellow-700' : 'bg-yellow-200 hover:bg-yellow-300'
              }`}
            >
              Actualiser
            </button>
            <button
              onClick={createMaintenanceRecord}
              className={`px-2 py-1 rounded text-xs ${
                isDark ? 'bg-blue-800 hover:bg-blue-700' : 'bg-blue-200 hover:bg-blue-300'
              }`}
            >
              Créer enregistrement
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Barre de navigation rapide */}
            <QuickNavBar />
            
            <div className="mb-4">
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Tableau de Bord
              </h2>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Vue d'ensemble de votre site et statistiques clés
              </p>
            </div>
            
            {/* Cartes de statistiques */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Visiteurs</p>
                    <p className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>1,234</p>
                  </div>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-green-600">+12% ce mois</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Pages vues</p>
                    <p className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>5,678</p>
                  </div>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
                    <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-green-600">+8% ce mois</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Messages</p>
                    <p className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>23</p>
                  </div>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-orange-900' : 'bg-orange-100'}`}>
                    <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-orange-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-orange-600">+5 ce mois</span>
                </div>
              </div>
              
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Performance</p>
                    <p className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>98%</p>
                  </div>
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}>
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-green-600">+2% ce mois</span>
                </div>
              </div>
            </div>

            {/* Statut du site */}
            <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${isMaintenanceMode ? 'bg-red-500' : 'bg-green-500'}`}></div>
                  <div>
                    <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Statut du site
                    </h3>
                    <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {isMaintenanceMode 
                        ? '🛠️ Mode maintenance activé'
                        : '✅ Site accessible et opérationnel'
                      }
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={onToggleMaintenance}
                  disabled={updating}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all ${
                    isMaintenanceMode 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${
                    isMaintenanceMode ? 'translate-x-1' : 'translate-x-7'
                  }`}>
                    <div className="flex items-center justify-center h-full">
                      {isMaintenanceMode ? (
                        <Power className="h-3 w-3 text-red-500" />
                      ) : (
                        <Power className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )

      case 'maintenance':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Barre de navigation rapide */}
            <QuickNavBar />
            
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Mode Maintenance
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Contrôlez l'accessibilité de votre site
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {isMaintenanceMode ? 'Activé' : 'Désactivé'}
                </span>
                
                <button
                  onClick={onToggleMaintenance}
                  disabled={updating}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all ${
                    isMaintenanceMode 
                      ? 'bg-red-500 hover:bg-red-600' 
                      : 'bg-green-500 hover:bg-green-600'
                  } ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${
                    isMaintenanceMode ? 'translate-x-1' : 'translate-x-7'
                  }`}>
                    <div className="flex items-center justify-center h-full">
                      {isMaintenanceMode ? (
                        <Power className="h-3 w-3 text-red-500" />
                      ) : (
                        <Power className="h-3 w-3 text-green-500" />
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>
            
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${isMaintenanceMode ? 'bg-red-500' : 'bg-green-500'}`}></div>
                <div>
                  <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    État actuel du site
                  </h3>
                  <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    {isMaintenanceMode 
                      ? '🛠️ Mode maintenance activé - Le site affiche la page de maintenance'
                      : '✅ Site accessible - Fonctionnement normal'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className={`mt-3 p-3 rounded-lg text-sm ${isDark ? 'bg-blue-900/20 border border-blue-800' : 'bg-blue-50'}`}>
              <p className={`${isDark ? 'text-blue-300' : 'text-blue-800'}`}>
                <strong>ℹ️ Note :</strong> En mode maintenance, seuls les administrateurs peuvent accéder au site normal.
              </p>
            </div>

            {/* Notification de succès */}
            {successMessage && (
              <div
                className={`mt-3 p-3 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                  isDark ? 'bg-green-900/20 border border-green-800' : 'bg-green-50 border border-green-200'
                }`}
              >
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={`text-sm ${isDark ? 'text-green-300' : 'text-green-800'}`}>
                  {successMessage}
                </span>
              </div>
            )}

            {/* Composant de débogage temporaire */}
            <DebugMaintenanceStatus isDark={isDark} />
          </div>
        )

      case 'seo':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Barre de navigation rapide */}
            <QuickNavBar />
            
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  SEO & Métadonnées
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gestion du référencement et des métadonnées du site
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      case 'domains':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Barre de navigation rapide */}
            <QuickNavBar />
            
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
                <Globe className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Domaines & SSL
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gérer vos domaines et certificats SSL
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      case 'pages':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Gestion des Pages
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Créer, modifier et organiser les pages de votre site
                </p>
              </div>
              <span className="px-2 py-1 text-xs bg-blue-500 text-white rounded-full">3</span>
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité en cours de développement
              </p>
            </div>
          </div>
        )

      case 'blog':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
                <FileText className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Gestion du Blog
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Publier et gérer vos articles de blog
                </p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-full">12</span>
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité en cours de développement
              </p>
            </div>
          </div>
        )

      case 'media':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Gestion des Médias
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gérer les images et vidéos de votre site
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      case 'messages':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-orange-900' : 'bg-orange-100'}`}>
                <MessageSquare className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Messages de Contact
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Consultez et gérez les messages reçus via le formulaire de contact
                </p>
              </div>
              <span className="px-2 py-1 text-xs bg-orange-500 text-white rounded-full">5</span>
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité en cours de développement
              </p>
            </div>
          </div>
        )

      case 'newsletter':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <Mail className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Gestion Newsletter
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gérez vos abonnés et envoyez des newsletters
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                <Bell className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Gestion des Notifications
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gérer les notifications push et emails
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      case 'visitors':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Statistiques des Visiteurs
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Analysez le trafic et le comportement de vos visiteurs
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      case 'performance':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
                <BarChart3 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Métriques de Performance
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Surveillez les performances de votre site
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      case 'conversions':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <BarChart3 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Suivi des Conversions
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Analysez vos taux de conversion et objectifs
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      case 'users':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Gestion des Utilisateurs
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Créez et gérez les comptes utilisateurs de votre application
                </p>
              </div>
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité en cours de développement
              </p>
            </div>
          </div>
        )

      case 'permissions':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Gestion des Permissions
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Configurez les droits d'accès et les rôles utilisateurs
                </p>
              </div>
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité en cours de développement
              </p>
            </div>
          </div>
        )

      case 'audit':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Audit Trail
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Historique des actions et modifications
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      case 'backup':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                <Database className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Sauvegarde de la Base de Données
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gérez les sauvegardes automatiques et manuelles de vos données
                </p>
              </div>
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité en cours de développement
              </p>
            </div>
          </div>
        )

      case 'logs':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <FileText className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Logs Système
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Consultez les logs d'activité et d'erreurs du système
                </p>
              </div>
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité en cours de développement
              </p>
            </div>
          </div>
        )

      case 'migrations':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-purple-900' : 'bg-purple-100'}`}>
                <Database className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Migrations de Base de Données
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Gérer les migrations et mises à jour de la base de données
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      case 'general':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <Cog className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Paramètres Généraux
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Configuration générale de votre application
                </p>
              </div>
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité en cours de développement
              </p>
            </div>
          </div>
        )

      case 'integrations':
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-500'}`}>
                <Cog className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Intégrations
                </h2>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Connectez vos services tiers et APIs
                </p>
              </div>
              <Star className="h-5 w-5 text-yellow-400" />
            </div>
            <div className={`mt-3 p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                🚧 Fonctionnalité Premium en cours de développement
              </p>
            </div>
          </div>
        )

      default:
        return (
          <div className={`rounded-xl shadow-lg p-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="mb-4">
              <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Bienvenue dans l'Administration
              </h2>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Sélectionnez une section dans le menu pour commencer à gérer votre site
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <Power className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className={`font-medium text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Maintenance</h3>
                <p className={`text-xs mt-1 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {isMaintenanceMode ? 'Activé' : 'Désactivé'}
                </p>
              </div>
              
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-green-900' : 'bg-green-100'}`}>
                  <BarChart3 className="h-5 w-5 text-green-600" />
                </div>
                <h3 className={`font-medium text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Analytics</h3>
                <p className={`text-xs mt-1 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Premium</p>
              </div>
              
              <div className={`p-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3 ${isDark ? 'bg-orange-900' : 'bg-orange-100'}`}>
                  <MessageSquare className="h-5 w-5 text-orange-600" />
                </div>
                <h3 className={`text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <span className="font-medium">Messages</span>
                  <span className="text-xs text-orange-500 ml-2">5</span>
                </h3>
                <p className={`text-xs mt-1 text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>En attente</p>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex-1">
      {renderSection()}
    </div>
  )
}
