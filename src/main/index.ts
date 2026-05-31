import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { registerIPCHandlers } from './ipc-handlers.js';

// ESM doesn't have __dirname, so we need to recreate it
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Keep a global reference of the window object
let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    minWidth: 700,
    minHeight: 600,
    maxWidth: 1100,
    maxHeight: 1067,
    frame: false, // 完全移除窗口边框和标题栏
    titleBarStyle: 'hidden', // 隐藏标题栏
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload/index.js'),
    },
    show: false, // Don't show until ready-to-show
    backgroundColor: '#F8F5F0',
    transparent: false,
  });

  // 锁定窗口比例 1:1 正方形
  const aspectRatio = 1;
  mainWindow.setAspectRatio(aspectRatio);

  // Load the index.html of the app
  mainWindow.loadFile(path.join(__dirname, '../../dist-renderer/index.html'));

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    if (mainWindow) mainWindow.show();
  });

  // Open DevTools in development
  if (process.argv.includes('--enable-logging')) {
    mainWindow.webContents.openDevTools();
  }

  // Emitted when the window is closed
  mainWindow.on('closed', () => {
    // Dereference the window object
    mainWindow = null;
  });
}

// Quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent new window creation
app.on('web-contents-created', (_event: any, contents: any) => {
  contents.setWindowOpenHandler(() => ({ action: 'deny' }));
});

// App is ready
app.whenReady().then(() => {
  createWindow();

  // Register IPC handlers
  registerIPCHandlers(mainWindow);

  // On macOS, re-create window when dock icon is clicked
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Prevent multiple instances
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // Someone tried to run a second instance, focus our window
    if (mainWindow) {
      if (mainWindow.isMinimized()) {
        mainWindow.restore();
      }
      mainWindow.focus();
    }
  });
}
