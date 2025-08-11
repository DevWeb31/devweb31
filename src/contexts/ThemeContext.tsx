import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Theme = 'system' | 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  isDark: boolean
  changeTheme: (newTheme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    return savedTheme || 'system'
  })

  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return savedTheme || 'light'
  })

  const getResolvedTheme = (theme: Theme): 'light' | 'dark' => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return theme
  }

  const applyTheme = (theme: Theme) => {
    const resolved = getResolvedTheme(theme)
    setResolvedTheme(resolved)
    
    if (resolved === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const changeTheme = (newTheme: Theme) => {
    console.log('Changing theme to:', newTheme) // Debug log
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        applyTheme('system')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const value: ThemeContextType = {
    theme,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    changeTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
