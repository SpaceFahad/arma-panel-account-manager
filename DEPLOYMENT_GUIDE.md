# Account Manager - Deployment Guide

## Overview
The Account Manager is now available in multiple formats:

1. **Web Application** - Run locally with Node.js server
2. **Standalone Desktop Application** - Electron-based executables for Windows and Linux

## Web Application (Original)

### Requirements
- Node.js (v14 or higher)
- npm

### Installation & Running
```bash
npm install
npm start
```
Access at: http://localhost:52596

### Files
- `index.html` - Main web interface
- `server.js` - Express server
- `accounts.json` - Data file

## Desktop Application (New)

### Available Formats

#### Linux
1. **AppImage** (Recommended)
   - File: `Account Manager-1.0.0.AppImage`
   - Make executable: `chmod +x "Account Manager-1.0.0.AppImage"`
   - Run: `./"Account Manager-1.0.0.AppImage"`

2. **Portable Directory**
   - Extract: `Account-Manager-Linux.tar.gz`
   - Run: `./linux-unpacked/account-manager`
   - Or use: `./linux-unpacked/start-account-manager.sh`

#### Windows
1. **Portable Directory**
   - Extract: `Account-Manager-Windows.tar.gz`
   - Run: `win-unpacked/Account Manager.exe`
   - Or use: `win-unpacked/Start Account Manager.bat`

### Desktop App Features
- **Standalone**: No Node.js or server required
- **Portable**: Can be run from any directory
- **Secure**: File operations handled by Electron's secure IPC
- **Cross-platform**: Works on Windows and Linux

### File Structure
```
dist/
├── Account Manager-1.0.0.AppImage          # Linux AppImage
├── Account-Manager-Linux.tar.gz            # Linux portable
├── Account-Manager-Windows.tar.gz          # Windows portable
├── README.txt                              # User instructions
├── linux-unpacked/
│   ├── account-manager                     # Linux executable
│   ├── accounts.json                       # Data file
│   └── start-account-manager.sh           # Launch script
└── win-unpacked/
    ├── Account Manager.exe                 # Windows executable
    ├── accounts.json                       # Data file
    └── Start Account Manager.bat          # Launch script
```

## Features (Both Versions)

### Account Management
- ✅ Add, edit, delete user accounts
- ✅ Username and password management
- ✅ Permission management with checkboxes
- ✅ Password visibility (no masking)
- ✅ Global "Save All Changes" button

### Password Validation
- ✅ Minimum 8 characters
- ✅ At least 1 lowercase letter
- ✅ At least 1 uppercase letter
- ✅ At least 1 symbol/special character

### User Interface
- ✅ Clean, responsive design
- ✅ Floating notifications
- ✅ Independent password changes
- ✅ Confirmation dialogs
- ✅ Error handling

### Data Management
- ✅ JSON file storage
- ✅ Automatic backups (web version)
- ✅ Data validation
- ✅ No external dependencies

## Security Considerations

### Password Storage
- Passwords are stored in plain text in `accounts.json`
- This is intentional for administrative access
- Secure the `accounts.json` file appropriately
- Limit access to authorized personnel only

### File Permissions
- Ensure proper file system permissions
- Regular backups are recommended
- Monitor access to the application and data files

## Troubleshooting

### Web Version
- Check Node.js version: `node --version`
- Verify port 52596 is available
- Check console for JavaScript errors

### Desktop Version
- Ensure executable permissions on Linux
- Check that `accounts.json` is in the same directory
- Verify system requirements are met

### Common Issues
- **File not found**: Ensure `accounts.json` exists in the correct location
- **Permission denied**: Check file and directory permissions
- **Validation errors**: Review password requirements

## Development

### Building Desktop App
```bash
# Install dependencies
npm install

# Build for current platform
npm run build

# Build for specific platforms
npm run build-linux
npm run build-win
npm run build-mac
```

### File Structure
- `main.js` - Electron main process
- `preload.js` - Secure IPC bridge
- `app.html` - Desktop app interface
- `package.json` - Build configuration

## Support
For issues or questions, contact the system administrator or refer to the application logs.