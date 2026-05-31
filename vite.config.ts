import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import path from 'path';

// 自定义插件：打印不同的构建模式消息
function buildModePlugin() {
  return {
    name: 'build-mode-indicator',
    configResolved(config: { mode: string }) {
      const mode = config.mode;
      if (mode === 'production') {
        console.log('\x1b[36m%s\x1b[0m', 'vite building for production release...');
      } else if (mode === 'development') {
        console.log('\x1b[33m%s\x1b[0m', 'vite building for development test...');
      }
    },
  };
}

export default defineConfig({
  plugins: [preact(), buildModePlugin()],
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
