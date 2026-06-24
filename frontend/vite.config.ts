import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '../', '')
  const port = env.API_PORT || '3000'
  const root = env.API_ROOT || '/movies'

  return {
    envDir: '../',
    plugins: [react()],
    server: {
      proxy: {
        [root]: {
          target: `http://localhost:${port}`,
          changeOrigin: true,
        }
      }
    }
  }
})
