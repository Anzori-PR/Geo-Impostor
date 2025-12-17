import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg', 'icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.origin.includes('cdn.tailwindcss.com'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'tailwindcss-cdn',
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxEntries: 1,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 Days
              }
            }
          },
          {
            urlPattern: ({ url }) => url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              cacheableResponse: {
                statuses: [0, 200]
              },
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      },
      manifest: {
        name: 'იპოვე მატყუარა',
        short_name: 'იმპოსტერი',
        description: 'A collection of local multiplayer party games in Georgian: Guess the Imposter and Who is the Liar.',
        theme_color: '#fff',
        background_color: '#1C1C1E',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: './services/icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: './services/icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});