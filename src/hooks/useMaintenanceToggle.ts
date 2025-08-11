import { useState } from 'react'
import { supabase } from '../lib/supabase'

export const useMaintenanceToggle = () => {
  const [updating, setUpdating] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const toggleMaintenance = async (currentValue: boolean) => {
    setUpdating(true)
    setSuccessMessage(null)
    
    try {
      const newValue = !currentValue
      
      // Vérifier d'abord si l'enregistrement existe
      const { data: existingData } = await supabase
        .from('site_settings')
        .select('id')
        .eq('key', 'maintenance_mode')
        .single()

      let result
      
      if (existingData) {
        // Mettre à jour l'enregistrement existant
        result = await supabase
          .from('site_settings')
          .update({
            value: newValue.toString(),
            updated_at: new Date().toISOString()
          })
          .eq('key', 'maintenance_mode')
      } else {
        // Créer un nouvel enregistrement
        result = await supabase
          .from('site_settings')
          .insert({
            key: 'maintenance_mode',
            value: newValue.toString(),
            description: 'Mode maintenance du site (true/false)',
            updated_at: new Date().toISOString()
          })
      }

      if (result.error) throw result.error
      
      // Afficher le message de succès
      const message = newValue 
        ? 'Mode maintenance activé avec succès ! Le site est maintenant en maintenance.'
        : 'Mode maintenance désactivé avec succès ! Le site est maintenant accessible.'
      
      setSuccessMessage(message)
      
      // Masquer le message après 5 secondes
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      
      return newValue
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mode maintenance:', error)
      setSuccessMessage('Erreur lors de la mise à jour du mode maintenance.')
      
      // Masquer le message d'erreur après 5 secondes
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
      
      return currentValue
    } finally {
      setUpdating(false)
    }
  }

  return {
    updating,
    successMessage,
    toggleMaintenance
  }
}
