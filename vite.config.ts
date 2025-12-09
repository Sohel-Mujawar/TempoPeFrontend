// vite.config.ts
import {defineConfig} from 'vite';
import viteReact from '@vitejs/plugin-react';
import {TanStackRouterVite} from '@tanstack/router-plugin/vite';
import {resolve} from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    viteReact(),
    svgr({
      svgrOptions: {
        exportType: 'default', // Export SVG as default React component
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: {
      overlay: false, // Disable HMR error overlay
    },
  },
  build: {
    chunkSizeWarningLimit: 2500,
  },
});
