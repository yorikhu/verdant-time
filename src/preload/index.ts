import { contextBridge, ipcRenderer } from 'electron';
import type { ElectronAPI } from './api';

// Create the ElectronAPI object
const electronAPI: ElectronAPI = {
  // Platform info
  platform: process.platform,

  // Get app version
  getVersion: () => ipcRenderer.invoke('get-app-version'),

  // Show notification
  showNotification: (options) => ipcRenderer.invoke('show-notification', options),

  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  toggleFullscreen: () => ipcRenderer.invoke('toggle-fullscreen'),

  // Send message to main process
  sendMessage: (channel, message) => {
    ipcRenderer.send(channel, message);
  },

  // Listen for messages from main process
  onMessage: (channel, callback) => {
    const subscription = (_event: Electron.IpcRendererEvent, message: unknown) => callback(message);
    ipcRenderer.on(channel, subscription);
    return () => ipcRenderer.removeListener(channel, subscription);
  },
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Type declaration for window.electronAPI
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

console.log('Preload script loaded');
