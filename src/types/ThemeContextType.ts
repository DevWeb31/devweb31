export type Theme = 'system' | 'dark' | 'light'

export interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  isDark: boolean
  changeTheme: (newTheme: Theme) => void
}
