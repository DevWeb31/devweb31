import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Charger les variables d'environnement selon le mode
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // Exposer les variables d'environnement au code client
      __APP_ENV__: JSON.stringify(env.VITE_ENV || 'development'),
    },
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    build: {
      // Optimisations pour la production
      target: 'es2015',
      minify: 'esbuild', // Changé de 'terser' à 'esbuild' pour Vercel
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@headlessui/react', 'framer-motion', 'lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    // Optimisations pour Vercel
    server: {
      port: 3000,
    },
  };
});
