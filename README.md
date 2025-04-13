# AutoFill Chrome Extension

A Chrome extension that automatically fills forms with realistic dummy data, including temporary Gmail addresses from Gmailnator API.

## Features

- Automatically fills registration/login forms with:
  - Temporary Gmail addresses (via Gmailnator API)
  - Secure random passwords
  - Realistic first/last names
  - Usernames
- Handles confirm password fields
- Shows visible password hints
- Manual fill option via extension popup

## Installation

1. Clone this repository
2. Go to `chrome://extensions`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the project directory

## Usage

- The extension automatically fills forms on page load
- Click the extension icon to manually trigger form filling
- Passwords are displayed in clear text for reference

## Configuration

The extension uses the Gmailnator API with these settings:
- API endpoint: `https://gmailnator.p.rapidapi.com/generate-email`
- Option: `[3]` (Gmail address generation)

## Dependencies

- Chrome Extension Manifest V3
- Gmailnator API (automatic email generation)

## Screenshots

![Extension Popup](icons/icon128.png)
*Extension popup interface*

## License

MIT License - See [LICENSE](LICENSE) file
