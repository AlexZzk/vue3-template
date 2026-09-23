import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url' // 如果是 Node.js 环境

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      // 将 @ 映射到 src 目录
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
