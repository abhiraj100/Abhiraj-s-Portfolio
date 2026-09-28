import crypto from 'node:crypto';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Polyfill crypto.hash for Node.js < 21.7 / < 20.12 (e.g. Node 18)
if (!crypto.hash) {
  crypto.hash = (algorithm, data, outputEncoding) => {
    const h = crypto.createHash(algorithm).update(data);
    return outputEncoding ? h.digest(outputEncoding) : h.digest();
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
      },
    },
  },
});
