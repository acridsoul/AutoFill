# 🚧Work In Progress🚧


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

## API Key Setup

1. Open `setup.html` in your browser
2. Enter your RapidAPI key
3. Click "Save Key"
4. The key will be securely stored in Chrome's sync storage

Note: You need to configure the API key before the email generation will work.

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

## License

MIT License - See [LICENSE](LICENSE) file
