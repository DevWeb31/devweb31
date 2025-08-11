import React from 'react'
import { Mail, MapPin, Phone, Settings } from 'lucide-react'
import { useThemeContext } from '../../contexts/ThemeContext'
import logoLight from '../../assets/images/logo-dw31-light.png'
import logoDark from '../../assets/images/logo-dw31-dark.png'

export const Footer: React.FC = () => {
  const { isDark } = useThemeContext()
  
  // Sélectionne le logo selon le thème
  const currentLogo = isDark ? logoDark : logoLight

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src={currentLogo} 
                alt="DevWeb31 Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">DevWeb31</span>
            </div>
            <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
              Spécialiste en développement web et d'applications. 
              Nous créons des solutions digitales modernes et performantes 
              pour faire évoluer votre entreprise.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Nos Services</h3>
            <ul className="space-y-2 text-gray-300 dark:text-gray-400">
              <li>Développement Web</li>
              <li>Applications Mobiles</li>
              <li>E-commerce</li>
              <li>Maintenance & Support</li>
              <li>Optimisation SEO</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3 text-gray-300 dark:text-gray-400">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>Toulouse, France</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span>contact@devweb31.fr</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span>+33 (0)1 23 45 67 89</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <div className="flex items-center justify-center space-x-4">
            <p>&copy; {new Date().getFullYear()} DevWeb31. Tous droits réservés.</p>
            
            {/* Lien d'administration discret */}
            <a 
              href="/admin" 
              className="group p-1 text-gray-500 hover:text-gray-300 transition-all duration-200 hover:bg-gray-800 rounded"
              title="Accès administration"
            >
              <Settings className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}