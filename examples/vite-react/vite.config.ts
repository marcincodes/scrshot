import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { vitePlugin } from '@scrshot/bundler';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vitePlugin()],
})
