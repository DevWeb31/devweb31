import React, { useState, useRef, useEffect } from 'react'
import { 
  Settings, 
  Power, 
  PowerOff, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  Users, 
  Database, 
  Shield, 
  Menu, 
  X,
  ChevronRight,
  ChevronDown,
  Search,
  Bell,
  Home,
  Calendar,
  Mail,
  Globe,
  Cog,
  LogOut,
  ChevronLeft,
  Star,
  User
} from 'lucide-react'
import { useThemeContext } from '../../contexts/ThemeContext'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
  currentSection: string
  onSectionChange: (section: string) => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

interface MenuItem {
  id: string
  label: string
  icon: React.ReactNode
  description?: string
  children?: MenuItem[]
  badge?: number
  isNew?: boolean
  isPremium?: boolean
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onToggle, 
  currentSection, 
  onSectionChange,
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { isDark } = useThemeContext()
  const [expandedItems, setExpandedItems] = useState<string[]>(['site'])
  const [searchTerm, setSearchTerm] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Gérer la responsivité de manière plus robuste
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      
      // Sur mobile, forcer la fermeture de la sidebar
      if (mobile && isOpen) {
        onToggle()
      }
    }

    // Vérifier au montage
    checkMobile()
    
    // Écouter les changements de taille
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [isOpen, onToggle])

  // Sur mobile, toujours afficher la sidebar complète
  const effectiveCollapsed = isMobile ? false : isCollapsed

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Tableau de Bord',
      icon: <Home className="h-5 w-5" />,
      description: 'Vue d\'ensemble du site',
      isNew: true
    },
    {
      id: 'site',
      label: 'Site',
      icon: <Settings className="h-5 w-5" />,
      description: 'Gestion générale du site',
      children: [
        {
          id: 'maintenance',
          label: 'Mode Maintenance',
          icon: <Power className="h-4 w-4" />,
          description: 'Activer/désactiver le mode maintenance',
          badge: 1
        },
        {
          id: 'seo',
          label: 'SEO & Métadonnées',
          icon: <FileText className="h-4 w-4" />,
          description: 'Gérer le référencement',
          isPremium: true
        },
        {
          id: 'domains',
          label: 'Domaines & SSL',
          icon: <Globe className="h-4 w-4" />,
          description: 'Gérer les domaines',
          isPremium: true
        }
      ]
    },
    {
      id: 'content',
      label: 'Contenu',
      icon: <FileText className="h-5 w-5" />,
      description: 'Gestion des contenus',
      children: [
        {
          id: 'pages',
          label: 'Pages',
          icon: <FileText className="h-4 w-4" />,
          description: 'Gérer les pages du site',
          badge: 3
        },
        {
          id: 'blog',
          label: 'Blog',
          icon: <FileText className="h-4 w-4" />,
          description: 'Gérer les articles',
          badge: 12
        },
        {
          id: 'media',
          label: 'Médias',
          icon: <FileText className="h-4 w-4" />,
          description: 'Gérer les images et vidéos',
          isPremium: true
        }
      ]
    },
    {
      id: 'communication',
      label: 'Communication',
      icon: <MessageSquare className="h-5 w-5" />,
      description: 'Gestion des communications',
      children: [
        {
          id: 'messages',
          label: 'Messages',
          icon: <MessageSquare className="h-4 w-4" />,
          description: 'Voir les messages de contact',
          badge: 5
        },
        {
          id: 'newsletter',
          label: 'Newsletter',
          icon: <Mail className="h-4 w-4" />,
          description: 'Gérer les abonnements',
          isPremium: true
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: <Bell className="h-4 w-4" />,
          description: 'Gérer les notifications push',
          isPremium: true
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <BarChart3 className="h-5 w-5" />,
      description: 'Statistiques et analyses',
      children: [
        {
          id: 'visitors',
          label: 'Visiteurs',
          icon: <Users className="h-4 w-4" />,
          description: 'Statistiques des visiteurs',
          isPremium: true
        },
        {
          id: 'performance',
          label: 'Performance',
          icon: <BarChart3 className="h-4 w-4" />,
          description: 'Métriques de performance',
          isPremium: true
        },
        {
          id: 'conversions',
          label: 'Conversions',
          icon: <BarChart3 className="h-4 w-4" />,
          description: 'Suivi des conversions',
          isPremium: true
        }
      ]
    },
    {
      id: 'security',
      label: 'Sécurité',
      icon: <Shield className="h-5 w-5" />,
      description: 'Paramètres de sécurité',
      children: [
        {
          id: 'users',
          label: 'Utilisateurs',
          icon: <Users className="h-4 w-4" />,
          description: 'Gérer les comptes utilisateurs'
        },
        {
          id: 'permissions',
          label: 'Permissions',
          icon: <Shield className="h-4 w-4" />,
          description: 'Gérer les droits d\'accès'
        },
        {
          id: 'audit',
          label: 'Audit Trail',
          icon: <Shield className="h-4 w-4" />,
          description: 'Historique des actions',
          isPremium: true
        }
      ]
    },
    {
      id: 'database',
      label: 'Base de données',
      icon: <Database className="h-5 w-5" />,
      description: 'Gestion des données',
      children: [
        {
          id: 'backup',
          label: 'Sauvegarde',
          icon: <Database className="h-4 w-4" />,
          description: 'Gérer les sauvegardes'
        },
        {
          id: 'logs',
          label: 'Logs',
          icon: <FileText className="h-4 w-4" />,
          description: 'Consulter les logs système'
        },
        {
          id: 'migrations',
          label: 'Migrations',
          icon: <Database className="h-4 w-4" />,
          description: 'Gérer les migrations DB',
          isPremium: true
        }
      ]
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: <Cog className="h-5 w-5" />,
      description: 'Configuration avancée',
      children: [
        {
          id: 'general',
          label: 'Général',
          icon: <Cog className="h-4 w-4" />,
          description: 'Paramètres généraux'
        },
        {
          id: 'integrations',
          label: 'Intégrations',
          icon: <Cog className="h-4 w-4" />,
          description: 'Services tiers',
          isPremium: true
        }
      ]
    }
  ]

  // Filtrer les éléments selon la recherche
  const filteredMenuItems = searchTerm 
    ? menuItems.map(item => ({
        ...item,
        children: item.children?.filter(subItem => 
          subItem.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subItem.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          subItem.children?.some(subSubItem => 
            subSubItem.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subSubItem.description?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      })).filter(item => item.children && item.children.length > 0)
    : menuItems

  const toggleCategory = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleSubItemClick = (id: string) => {
    onSectionChange(id)
    // Fermer le sidebar sur mobile après sélection
    if (isMobile) {
      onToggle()
    }
  }

  const handleSearchToggle = () => {
    setShowSearch(!showSearch)
    if (!showSearch) {
      setTimeout(() => searchRef.current?.focus(), 100)
    } else {
      setSearchTerm('')
    }
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.id)
    const isActive = currentSection === item.id
    const hasChildren = item.children && item.children.length > 0

    return (
      <div key={item.id}>
        <div
          className={`group cursor-pointer transition-all duration-200 ${
            level === 0 ? 'mb-2' : 'ml-4 mb-1'
          }`}
        >
          <div
            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
              isActive
                ? `${isDark ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-900'}`
                : `${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
            }`}
            onClick={() => hasChildren ? toggleCategory(item.id) : handleSubItemClick(item.id)}
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className={`flex-shrink-0 ${isActive ? 'text-white' : isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {item.icon}
              </div>
              
              {!effectiveCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className={`font-medium truncate ${isActive ? 'text-white' : ''}`}>
                      {item.label}
                    </div>
                    {item.isNew && (
                      <span className="px-2 py-1 text-xs bg-green-500 text-white rounded-full">Nouveau</span>
                    )}
                    {item.isPremium && (
                      <Star className="h-3 w-3 text-yellow-400" />
                    )}
                  </div>
                  {item.description && (
                    <div className={`text-xs mt-1 truncate ${
                      isActive ? 'text-blue-100' : isDark ? 'text-gray-500' : 'text-gray-500'
                    }`}>
                      {item.description}
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {!effectiveCollapsed && (
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    isActive 
                      ? 'bg-white text-blue-600' 
                      : isDark 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-blue-100 text-blue-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
                
                {hasChildren && (
                  <div className={`transition-transform duration-200 ${
                    isExpanded ? 'rotate-90' : ''
                  }`}>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sous-éléments */}
        {hasChildren && isExpanded && !effectiveCollapsed && (
          <div className="ml-4 border-l border-gray-300 dark:border-gray-600">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 ${
        effectiveCollapsed ? 'w-16' : 'w-64'
      } lg:relative`}>
        <div className={`h-full flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'} border-r ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          {/* Header du sidebar */}
          <div className={`flex items-center justify-between p-3 border-b ${
            isDark ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className={`flex items-center gap-2 ${effectiveCollapsed ? 'justify-center w-full' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-blue-600' : 'bg-blue-500'
              }`}>
                <span className="text-white font-bold text-sm">D</span>
              </div>
              {!effectiveCollapsed && (
                <div>
                  <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Administration
                  </h2>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    DevWeb31
                  </p>
                </div>
              )}
            </div>
            
            {/* Bouton de collapse uniquement sur desktop */}
            {!isMobile && (
              effectiveCollapsed ? (
                <button
                  onClick={onToggleCollapse}
                  className={`p-1 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                  title="Déployer la sidebar"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={onToggleCollapse}
                  className={`p-1 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                  title="Réduire la sidebar"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
              )
            )}
          </div>

          {/* Barre de recherche */}
          {!effectiveCollapsed && (
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className={`relative ${isDark ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 bg-transparent border-none outline-none text-sm ${
                    isDark ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Menu principal */}
          <nav className="flex-1 overflow-y-auto py-2">
            {filteredMenuItems.map((item) => (
              <div key={item.id}>
                {/* Titre de catégorie */}
                {!effectiveCollapsed && (
                  <div className={`px-3 py-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <h3 className="text-xs font-semibold uppercase tracking-wider">
                      {item.label}
                    </h3>
                  </div>
                )}

                {/* Sous-menus */}
                {item.children && (
                  <div className="space-y-1">
                    {item.children.map((subItem) => (
                      <div key={subItem.id}>
                        <button
                          onClick={() => handleSubItemClick(subItem.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                            currentSection === subItem.id
                              ? `${isDark ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'}`
                              : `${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {subItem.icon}
                          </div>
                          
                          {!effectiveCollapsed && (
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium truncate">
                                  {subItem.label}
                                </span>
                                {subItem.badge && (
                                  <span className={`px-2 py-1 text-xs rounded-full ${
                                    isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                                  }`}>
                                    {subItem.badge}
                                  </span>
                                )}
                              </div>
                              {subItem.description && (
                                <p className={`text-xs mt-1 truncate ${
                                  isDark ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  {subItem.description}
                                </p>
                              )}
                            </div>
                          )}
                          
                          {!effectiveCollapsed && subItem.children && (
                            <ChevronRight className={`h-4 w-4 transition-transform ${
                              expandedItems.includes(subItem.id) ? 'rotate-90' : ''
                            }`} />
                          )}
                        </button>

                        {/* Sous-sous-menus */}
                        {subItem.children && expandedItems.includes(subItem.id) && !effectiveCollapsed && (
                          <div className="ml-6 space-y-1">
                            {subItem.children.map((subSubItem) => (
                              <button
                                key={subSubItem.id}
                                onClick={() => handleSubItemClick(subSubItem.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2 text-left transition-colors ${
                                  currentSection === subSubItem.id
                                    ? `${isDark ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 border-r-2 border-blue-500'}`
                                    : `${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'}`
                                }`}
                              >
                                <div className="flex-shrink-0">
                                  {subSubItem.icon}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium truncate">
                                      {subSubItem.label}
                                    </span>
                                    {subSubItem.badge && (
                                      <span className={`px-2 py-1 text-xs rounded-full ${
                                        isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                                      }`}>
                                        {subSubItem.badge}
                                      </span>
                                    )}
                                  </div>
                                  {subSubItem.description && (
                                    <p className={`text-xs mt-1 truncate ${
                                      isDark ? 'text-gray-400' : 'text-gray-500'
                                    }`}>
                                      {subSubItem.description}
                                    </p>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer du sidebar */}
          <div className={`p-3 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            {!effectiveCollapsed && (
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <User className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Administrateur
                  </p>
                  <p className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    admin@devweb31.com
                  </p>
                </div>
              </div>
            )}
            
            {/* Bouton Voir le site */}
            <button
              onClick={() => window.open('/', '_blank')}
              className={`mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              title="Voir le site public"
            >
              <Globe className="h-4 w-4" />
              {!effectiveCollapsed && <span className="text-sm">Voir le site</span>}
            </button>
            
            {/* Bouton de collapse uniquement sur desktop */}
            {!isMobile && (
              <button
                onClick={onToggleCollapse}
                className={`mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                }`}
              >
                {effectiveCollapsed ? (
                  <ChevronRight className="h-4 w-4" />
                ) : (
                  <>
                    <ChevronLeft className="h-4 w-4" />
                    <span className="text-sm">Réduire</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}