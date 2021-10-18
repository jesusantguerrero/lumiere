import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': 'src',
      '@lumiere': 'src/core'
    },
  },
  optimizeDeps: {
    include: ["@supabase/supabase-js"],
    exclude: ['lumiere-utils']
  }
})
