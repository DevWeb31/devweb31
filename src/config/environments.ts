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
  // Détection automatique basée sur l'URL
  const isProd =
    window.location.hostname === 'devweb31.fr' ||
    window.location.hostname === 'www.devweb31.fr' ||
    import.meta.env.VITE_ENV === 'production';

  return isProd ? 'production' : 'development';
};

// Fonction utilitaire pour obtenir la configuration de l'environnement actuel
export const getCurrentConfig = () => {
  const env = getCurrentEnvironment();
  return ENV_CONFIG[env];
};

// Fonction utilitaire pour vérifier si on est en développement
export const isDevelopment = () => {
  const env = getCurrentEnvironment();
  return env === 'development';
};

// Fonction utilitaire pour vérifier si on est en production
export const isProduction = () => {
  const env = getCurrentEnvironment();
  return env === 'production';
};

// Fonction de débogage pour vérifier l'environnement
export const debugEnvironment = () => {
  console.log('🔍 Debug Environnement:', {
    hostname: window.location.hostname,
    VITE_ENV: import.meta.env.VITE_ENV,
    currentEnv: getCurrentEnvironment(),
    isDev: isDevelopment(),
    isProd: isProduction(),
  });
};
