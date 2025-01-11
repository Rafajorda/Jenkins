import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['node-fetch', 'stream', 'buffer', 'util', 'http', 'https', 'zlib']
  }
})
