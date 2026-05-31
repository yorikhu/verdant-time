const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: Expose a simple method to get app version
  getVersion: () => ipcRenderer.invoke('get-app-version'),

  // Example: Send a message to main process
  sendMessage: (message) => ipcRenderer.send('message', message),

  // Example: Listen for messages from main process
  onMessage: (callback) => {
    const subscription = (event, message) => callback(message);
    ipcRenderer.on('message', subscription);
    return () => ipcRenderer.removeListener('message', subscription);
  },

  // Platform info
  platform: process.platform,

  // Show system notification
  showNotification: (title, body) => ipcRenderer.invoke('show-notification', title, body)
});

console.log('Preload script loaded');
