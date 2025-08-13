import { createContext } from 'react'
import { ThemeContextType } from '../types/ThemeContextType'

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
