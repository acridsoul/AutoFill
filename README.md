# Proton Pass Autofill Chrome Extension

A Chrome extension that automatically fills registration forms with matching dummy data. The extension generates consistent data where the email matches the name (e.g., if the name is James Mark, the email will be james.mark45@test.com).

## Features

- Automatically detects registration forms
- Generates matching name and email combinations
- Creates strong passwords
- Fills both password and confirm password fields with the same value
- Works on any website with registration forms

## Installation

1. Clone or download this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any website with a registration form
2. The extension will automatically attempt to fill the form
3. If automatic filling doesn't work, click the extension icon in your browser toolbar to trigger the filling manually

## Generated Data Format

- Names: Random combinations of common first and last names
- Email: Generated from the name (e.g., james.mark45@test.com)
- Password: 12-character strong password with mixed case, numbers, and special characters

## Security Note

This extension is designed for testing purposes only. The generated data is not stored anywhere and is only used for form filling. 