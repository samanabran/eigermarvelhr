import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

import { resolve } from 'path'

const projectRoot = process.env.PROJECT_ROOT || import.meta.dirname

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: resolve(projectRoot, 'src/pages/index.html'),
    },
    chunkSizeWarningLimit: 800,
    minify: 'terser',
  },
});
