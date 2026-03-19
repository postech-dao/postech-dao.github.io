import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    chunkSizeWarningLimit: 550,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three/examples/jsm')) return 'vendor-three-examples';
          if (id.includes('/three/') || id.includes('node_modules/three/')) return 'vendor-three-core';
          if (id.includes('i18next')) return 'vendor-i18n';
          if (id.includes('node_modules')) return 'vendor';
        }
      }
    }
  }
});
