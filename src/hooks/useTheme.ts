import { useState, useEffect, useCallback } from 'react'

export type Theme = 'system' | 'dark' | 'light'

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Récupérer le thème sauvegardé ou utiliser 'system' par défaut
    const savedTheme = localStorage.getItem('theme') as Theme
    return savedTheme || 'system'
  })

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    // Initialiser avec le thème résolu actuel
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return savedTheme || 'light'
  })

  // État pour forcer le re-render
  const [version, setVersion] = useState(0)

  // Fonction pour obtenir le thème réel (résolu)
  const getResolvedTheme = useCallback((theme: Theme): 'light' | 'dark' => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }, [])

  // Appliquer le thème au document
  const applyTheme = useCallback((theme: Theme) => {
    const resolved = getResolvedTheme(theme)
    setResolvedTheme(resolved)
    
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    
    // Forcer le re-render
    setVersion(prev => prev + 1)
  }, [getResolvedTheme])

  // Changer le thème
  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }, [applyTheme])

  // Écouter les changements de thème système
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme, applyTheme])

  // Appliquer le thème au montage et quand le thème change
  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  return {
    theme,
    resolvedTheme,
    changeTheme,
    isDark: resolvedTheme === 'dark',
    version // Exposer la version pour forcer le re-render
  }
}
