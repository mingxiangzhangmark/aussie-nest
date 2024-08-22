import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',  // 使用相对路径
  server:{
    port:3000
  },
  // solve the issue of react moment error
  resolve: {
    mainFields: [],
  },
  
})
