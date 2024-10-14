import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteElectronDev } from './plugins/vite.electron.dev'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteElectronDev(),
  ],
})
