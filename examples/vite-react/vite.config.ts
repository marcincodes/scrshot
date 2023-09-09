import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import Scrshot from '@scrshot/build/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Scrshot()],
})
