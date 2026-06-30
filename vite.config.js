import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom']
        }
      }
    },
    minify: 'esbuild',
    chunkSizeWarningLimit: 600,
    assetsInlineLimit: 4096
  },
  optimizeDeps: {
    include: ['react', 'react-dom']
  }
})
