import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useThemeContext } from '../hooks/useThemeContext'
import { SEOHead } from '../components/SEOHead'
import { useNavigate } from 'react-router-dom'

interface LoginFormData {
  email: string
  password: string
}

export const LoginPage: React.FC = () => {
  const { isDark } = useThemeContext()
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const { error } = await signIn(data.email, data.password)
      
      if (error) {
        setError(error.message)
      } else {
        // Redirection vers la page admin après connexion réussie
        navigate('/admin')
      }
    } catch {
      setError('Une erreur inattendue s\'est produite')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <SEOHead
        title="Connexion - Back-office"
        description="Accédez au back-office de DevWeb31 pour gérer votre site web."
        keywords="connexion, back-office, admin, DevWeb31"
        canonical="https://devweb31.fr/login"
      />
      
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className={`mx-auto h-16 w-16 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-900' : 'bg-blue-100'}`}>
              <Lock className={`h-8 w-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <h2 className={`mt-6 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Connexion Back-office
            </h2>
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Accédez à votre espace d'administration
            </p>
          </div>

          <div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`p-8 rounded-2xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}
          >
            {error && (
              <div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
              >
                <AlertCircle className="h-5 w-5 text-red-600" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Adresse email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'L\'email est requis',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email invalide'
                      }
                    })}
                    className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="votre@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: 'Le mot de passe est requis' })}
                    className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                      isDark 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Votre mot de passe"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    ) : (
                      <Eye className={`h-5 w-5 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>



              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl font-medium transition-all transform ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Connexion en cours...
                  </div>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Retour au{' '}
                <a 
                  href="/" 
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  site principal
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
