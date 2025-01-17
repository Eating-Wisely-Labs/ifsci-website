import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_CDN_ASSETS_PATH ? `https://s.ifsci.wtf/${process.env.VITE_CDN_ASSETS_PATH}` : undefined,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5175,
    host: '0.0.0.0',
    proxy: {
      '^/api': {
        target: 'https://ifsci.wtf/',
        changeOrigin: true
      }
    }
  }
})
