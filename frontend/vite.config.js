import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// 定数ファイル
import { BASE_URL } from './src/constant';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Book Manager PWA',
        short_name: 'Book Manager',
        description: 'A PWA for managing your book collection',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'assets/icon_192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/icon_512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  // workbox: {
  //   globPatterns: [
  //     '**/*.{js,css,html,png,webmanifest,json}' // ← jsonを追加
  //   ]
  // },
  // includeAssets: ['build-info.json'],
  // baseオプションは、GitHub Pagesでホスティングする際に必要
  // リポジトリ名に合わせて変更する
  // 例: https://ユーザー名.github.io/リポジトリ名
  base: BASE_URL,
})