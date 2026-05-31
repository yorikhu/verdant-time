/**
 * Preact 入口文件
 */
import { render } from 'preact';
import { App } from './components/App';
import './styles/variables.scss';

// 获取根元素
const root = document.getElementById('app');

if (root) {
  render(<App />, root);
} else {
  console.error('Root element not found');
}

// 窗口焦点状态
window.addEventListener('focus', () => {
  document.body.classList.add('window-focused');
});

window.addEventListener('blur', () => {
  document.body.classList.remove('window-focused');
});

console.log('Verdant Time - 青植番茄钟 initialized');
