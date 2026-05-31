import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';

export default defineConfig({
  plugins: [preact()],
  root: 'src/renderer',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@renderer': path.resolve(__dirname, './src/renderer'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 添加全局样式路径，简化导入
        includePaths: [
          // 从组件目录向上查找到 styles
          path.resolve(__dirname, './src/renderer/styles'),
        ],
        // 静默警告
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  build: {
    outDir: '../../dist-renderer',
    emptyOutDir: true,
  },
  base: './',
  server: {
    port: 3000,
  },
});
