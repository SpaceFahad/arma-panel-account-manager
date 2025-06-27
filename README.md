# Account Manager

A simple web application to manage user accounts and permissions stored in `accounts.json`.

### This project is made to be used specifically with https://github.com/HBTurpinArma/arma-server-web-admin accounts.json file.

## Features

- **View Accounts**: List all user accounts (passwords are hidden for security)
- **Add New Accounts**: Create new user accounts with username and password
- **Edit Permissions**: Modify permissions for each account with an easy-to-use interface
- **Change Passwords**: Update user passwords securely
- **Delete Accounts**: Remove user accounts with confirmation
- **Auto-save**: All changes are saved to the `accounts.json` file
- **Backup**: Automatic backup creation before saving changes

## Security Features

- Passwords are never displayed in the interface
- Input validation and sanitization
- XSS protection through HTML escaping
- Automatic backups before file modifications
- CORS and security headers configured

## Installation & Usage

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Rename `accounts.json.sample`**
   To `accounts.json`

   Everytime you make changes to the accounts.json through the app, dont forget to copy/overwrite it in your arma-server-web-admin folder in order for the new changes to be applied, P.S. dont forget to restart your arma panel after any changes to the accounts.json 
3. **Start the Server**:
   ```bash
   npm start
   ```

4. **Access the Application**:
   Open your browser and go to: `http://localhost:52596`

## File Structure

- `index.html` - Main application interface
- `server.js` - Node.js server handling file operations
- `accounts.json` - User accounts and permissions data
- `package.json` - Project dependencies and scripts

## Accounts.json Structure

The application expects the following JSON structure:

```json
[
  {
    "username": "user",
    "password": "password123",
    "permissions": {
      "servers": {
        "view": true,
        "stop": true,
        "start": true,
        "delete": false,
        "create": false,
        "edit": true
      },
      "missions": {
        "view": true,
        "delete": false,
        "create": true
      },
      "mods": {
        "view": false,
        "delete": false
      },
      "logs": {
        "view": false,
        "delete": false
      }
    }
  }
]
```

## Permission Categories

The application supports the following permission categories:

- **Servers**: view, stop, start, delete, create, edit
- **Missions**: view, delete, create
- **Mods**: view, delete
- **Logs**: view, delete

## Usage Instructions

1. **Adding a New Account**:
   - Enter username and password in the "Add New Account" section
   - Click "Add Account"
   - Set permissions as needed
   - Click "Save Changes"

2. **Editing Permissions**:
   - Click "Edit Permissions" on any account
   - Check/uncheck permissions as needed
   - Click "Save Changes"

3. **Changing Password**:
   - Click "Change Password" on any account
   - Enter new password
   - Click "Update Password"
   - Click "Save Changes"

4. **Deleting Account**:
   - Click "Delete" on any account
   - Confirm deletion
   - Changes are saved automatically

## Notes

- The application creates automatic backups before saving changes
- All changes must be explicitly saved using the "Save Changes" button
- The server runs on port 52596 by default
- The application is designed for local use only

## Troubleshooting

- If the server won't start, check if port 52596 is available
- If accounts don't load, ensure `accounts.json` exists and has valid JSON
- Check `server.log` for any error messages
- Backup files are created with timestamp extensions (e.g., `accounts.json.backup.1640995200000`)
