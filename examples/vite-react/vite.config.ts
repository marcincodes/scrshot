import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Scrshot from '@scrshot/bundler/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Scrshot()],
})
