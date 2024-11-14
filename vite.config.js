import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://of-you-150add69b1bb.herokuapp.com/',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    open: true
  },
  esbuild: {
    loader: 'jsx',
    include: ['src/**/*.js', 'src/**/*.jsx']
  }
});
