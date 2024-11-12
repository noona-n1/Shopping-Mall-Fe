import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: [
      // 이 설정을 통해 모든 .js 파일과 .jsx 파일을 JSX로 처리
      'src/**/*.js',
      'src/**/*.jsx'
    ]
  },
  server: {
    open: true
  }
});
