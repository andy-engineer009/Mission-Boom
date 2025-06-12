import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Mission Boom',
        short_name: 'Boom',
        theme_color: '#fff',
        icons: [
            {
                src: 'apple-icon-180.png',
                sizes: '64x64',
                type: 'image/png'
            },
            {
                src: 'apple-icon-180.png',
                sizes: '192x192',
                type: 'image/png'
            },
            {
                src: 'apple-icon-180.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any'
            },
            {
                src: 'manifest-icon-512.maskable.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            }
        ],
      }, 
    })
  ],

})