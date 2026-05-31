import type { NotificationOptions } from '../shared/types';
import type { JSX } from 'preact';

// Electron API 暴露给渲染进程的接口
export interface ElectronAPI {
  // 平台信息
  platform: NodeJS.Platform;

  // 获取应用版本
  getVersion(): Promise<string>;

  // 显示通知
  showNotification(options: NotificationOptions): Promise<boolean>;

  // 窗口控制
  minimizeWindow(): Promise<void>;
  maximizeWindow(): Promise<void>;
  closeWindow(): Promise<void>;
  toggleFullscreen(): Promise<void>;

  // 发送消息到主进程
  sendMessage(channel: string, message: unknown): void;

  // 监听来自主进程的消息
  onMessage(channel: string, callback: (message: unknown) => void): () => void;
}

// Type declaration for window.electronAPI
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }

  namespace JSX {
    interface IntrinsicElements {
      [tagName: string]: any;
    }
  }
}

export {};
