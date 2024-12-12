import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, './src/pages'),
      routers: path.resolve(__dirname, './src/routers'),
      services: path.resolve(__dirname, './src/services'),
      '~': path.resolve(__dirname, './src')
    }
  }
});
