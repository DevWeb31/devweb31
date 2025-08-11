import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

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