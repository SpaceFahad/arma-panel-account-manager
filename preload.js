const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    loadAccounts: () => ipcRenderer.invoke('load-accounts'),
    saveAccounts: (accounts) => ipcRenderer.invoke('save-accounts', accounts),
    showError: (title, message) => ipcRenderer.invoke('show-error', title, message)
});