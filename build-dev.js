const { execSync } = require('child_process');

console.log('Building TypeScript...');
execSync('tsc', { stdio: 'inherit' });

console.log('Building Renderer...');
execSync('vite build', { stdio: 'inherit' });

console.log('Copying to win-unpacked...');
const fs = require('fs');
const path = require('path');

const distApp = path.join(__dirname, 'dist-app', 'win-unpacked');
if (!fs.existsSync(distApp)) {
  fs.mkdirSync(distApp, { recursive: true });
}

// 使用 electron-builder 的 dir 模式（只生成目录，不打包成安装程序）
console.log('Packaging with electron-builder...');
execSync('npx electron-builder --win --dir', {
  stdio: 'inherit',
  env: { ...process.env, CSC_IDENTITY_AUTO_DISCOVERY: 'false' }
});

console.log('Build complete! Run: .\\dist-app\\win-unpacked\\Verdant Time.exe');
