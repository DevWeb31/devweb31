import { createClient } from '@supabase/supabase-js'
import { getCurrentConfig } from '../config/environments'

// Configuration Supabase basée sur l'environnement
const config = getCurrentConfig()
export const supabase = createClient(config.supabase.url, config.supabase.anonKey)

// Log de l'environnement actuel (seulement en développement)
if (import.meta.env.DEV) {
  console.log('🔧 Configuration Supabase:', {
    url: config.supabase.url,
    environment: config.name
  })
}

export type Database = {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: number
          key: string
          value: string
          updated_at: string
        }
        Insert: {
          id?: number
          key: string
          value: string
          updated_at?: string
        }
        Update: {
          id?: number
          key?: string
          value?: string
          updated_at?: string
        }
      }
    }
  }
}