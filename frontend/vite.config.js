import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true, // Allows testing PWA during development
      },
      manifest: {
        name: 'Karu Counselling App',
        short_name: 'Karu Counselling',
        description: 'A Vite-powered Progressive Web App',
        theme_color: "#008000", 
        background_color: "#008000",
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: '/images/pict.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/images/pict.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst', // Tries network first, falls back to cache
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst', // Loads images from cache if available
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
              },
            },
          },
          {
            urlPattern: ({ request }) => ['script', 'style'].includes(request.destination),
            handler: 'StaleWhileRevalidate', // Loads from cache but updates in background
            options: {
              cacheName: 'static-resources',
            },
          },
        ],
      }
    })
  ],
  server: {
    historyApiFallback: true,
  },
});
