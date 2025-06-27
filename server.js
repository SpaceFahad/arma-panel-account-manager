const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 52596;
const ACCOUNTS_FILE = path.join(__dirname, 'accounts.json');

// Middleware
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(express.json());
app.use(express.static(__dirname));

// Security headers
app.use((req, res, next) => {
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-XSS-Protection', '1; mode=block');
    next();
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get accounts
app.get('/accounts.json', async (req, res) => {
    try {
        const data = await fs.readFile(ACCOUNTS_FILE, 'utf8');
        const accounts = JSON.parse(data);
        res.json(accounts);
    } catch (error) {
        console.error('Error reading accounts file:', error);
        if (error.code === 'ENOENT') {
            // If file doesn't exist, return empty array
            res.json([]);
        } else {
            res.status(500).json({ error: 'Failed to read accounts file' });
        }
    }
});

// Save accounts
app.post('/save-accounts', async (req, res) => {
    try {
        const accounts = req.body;
        
        // Validate the data structure
        if (!Array.isArray(accounts)) {
            return res.status(400).json({ error: 'Invalid data format: expected array' });
        }
        
        // Validate each account
        for (const account of accounts) {
            if (!account.username || typeof account.username !== 'string') {
                return res.status(400).json({ error: 'Invalid account: username is required' });
            }
            if (!account.password || typeof account.password !== 'string') {
                return res.status(400).json({ error: 'Invalid account: password is required' });
            }
            if (!account.permissions || typeof account.permissions !== 'object') {
                return res.status(400).json({ error: 'Invalid account: permissions are required' });
            }
        }
        
        // Create backup of current file
        try {
            const currentData = await fs.readFile(ACCOUNTS_FILE, 'utf8');
            const backupFile = `${ACCOUNTS_FILE}.backup.${Date.now()}`;
            await fs.writeFile(backupFile, currentData);
            console.log(`Backup created: ${backupFile}`);
        } catch (backupError) {
            console.warn('Could not create backup:', backupError.message);
        }
        
        // Write the new data
        const jsonData = JSON.stringify(accounts, null, 2);
        await fs.writeFile(ACCOUNTS_FILE, jsonData, 'utf8');
        
        console.log('Accounts file updated successfully');
        res.json({ success: true, message: 'Accounts saved successfully' });
        
    } catch (error) {
        console.error('Error saving accounts file:', error);
        res.status(500).json({ error: 'Failed to save accounts file' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Account Manager server running on http://localhost:${PORT}`);
    console.log(`Access the application at: http://localhost:${PORT}`);
    console.log(`Accounts file: ${ACCOUNTS_FILE}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('\nShutting down server...');
    process.exit(0);
});