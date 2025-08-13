// Configuration des environnements
export const ENV_CONFIG = {
  development: {
    name: 'Développement',
    supabase: {
      url:
        import.meta.env.VITE_SUPABASE_URL_DEV ||
        import.meta.env.VITE_SUPABASE_URL,
      anonKey:
        import.meta.env.VITE_SUPABASE_ANON_KEY_DEV ||
        import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    features: {
      debugMode: true,
      maintenanceMode: false,
      analytics: false,
    },
    api: {
      baseUrl: 'http://localhost:3000',
      timeout: 10000,
    },
  },
  production: {
    name: 'Production',
    supabase: {
      url: import.meta.env.VITE_SUPABASE_URL,
      anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    },
    features: {
      debugMode: false,
      maintenanceMode: false,
      analytics: true,
    },
    api: {
      baseUrl: 'https://devweb31.fr',
      timeout: 15000,
    },
  },
} as const;

export type Environment = keyof typeof ENV_CONFIG;

// Fonction utilitaire pour obtenir la configuration de l'environnement actuel
export const getCurrentEnvironment = (): Environment => {
  const env = import.meta.env.VITE_ENV || 'development';
  return env === 'production' ? 'production' : 'development';
};

// Fonction utilitaire pour obtenir la configuration de l'environnement actuel
export const getCurrentConfig = () => {
  const env = getCurrentEnvironment();
  return ENV_CONFIG[env];
};

// Fonction utilitaire pour vérifier si on est en développement
export const isDevelopment = () => getCurrentEnvironment() === 'development';

// Fonction utilitaire pour vérifier si on est en production
export const isProduction = () => getCurrentEnvironment() === 'production';
