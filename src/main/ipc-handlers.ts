import electron from 'electron';
import type { BrowserWindow } from 'electron';
import path from 'path';
import type { NotificationOptions } from '../shared/types';

const { ipcMain, Notification } = electron;

// ES modules don't have __dirname, use import.meta.dirname in Node.js v20+
const __dirname = import.meta.dirname ?? path.dirname(new URL(import.meta.url).pathname);

export function registerIPCHandlers(mainWindow: BrowserWindow | null): void {
  // Show notification
  ipcMain.handle('show-notification', async (_event, options: NotificationOptions) => {
    if (Notification.isSupported() && mainWindow) {
      const notification = new Notification({
        title: options.title,
        body: options.body,
        icon: options.icon || path.join(__dirname, '../../default_bg.png'),
      });

      notification.on('click', () => {
        mainWindow?.focus();
      });

      notification.show();
      return true;
    }
    return false;
  });

  // Get app version
  ipcMain.handle('get-app-version', () => {
    return process.env.npm_package_version || '1.0.0';
  });

  // Minimize window
  ipcMain.handle('minimize-window', () => {
    mainWindow?.minimize();
  });

  // Maximize/restore window
  ipcMain.handle('maximize-window', () => {
    if (mainWindow) {
      if (mainWindow.isMaximized()) {
        mainWindow.unmaximize();
      } else {
        mainWindow.maximize();
      }
    }
  });

  // Close window
  ipcMain.handle('close-window', () => {
    mainWindow?.close();
  });

  // Toggle fullscreen
  ipcMain.handle('toggle-fullscreen', () => {
    if (mainWindow) {
      mainWindow.setFullScreen(!mainWindow.isFullScreen());
    }
  });
}
