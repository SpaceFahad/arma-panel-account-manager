const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'assets', 'icon.png') // Optional icon
    });

    mainWindow.loadFile('app.html');
    
    // Open DevTools in development
    // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// IPC handlers for file operations
ipcMain.handle('load-accounts', async () => {
    try {
        const accountsPath = path.join(process.cwd(), 'accounts.json');
        const data = await fs.readFile(accountsPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // File doesn't exist, return empty array
            return [];
        }
        throw error;
    }
});

ipcMain.handle('save-accounts', async (event, accounts) => {
    try {
        const accountsPath = path.join(process.cwd(), 'accounts.json');
        
        // Create backup
        try {
            const existingData = await fs.readFile(accountsPath, 'utf8');
            const backupPath = path.join(process.cwd(), `accounts_backup_${Date.now()}.json`);
            await fs.writeFile(backupPath, existingData);
        } catch (backupError) {
            // Ignore backup errors if original file doesn't exist
        }
        
        // Save new data
        await fs.writeFile(accountsPath, JSON.stringify(accounts, null, 2));
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
});

ipcMain.handle('show-error', async (event, title, message) => {
    dialog.showErrorBox(title, message);
});