import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Optimisations pour la production
    target: 'es2015',
    minify: 'terser',
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
});
