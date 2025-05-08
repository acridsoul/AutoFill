# Autofill Buddy

A Chrome extension that autofills registration forms with realistic fake data using Faker.js.

## Features

- Generate realistic user data (names, emails, passwords)
- Gender-specific name generation
- Customizable password options
- Dark/light theme support
- Copy generated passwords to clipboard

## Installation

1. Clone this repository:
```
git clone <repository-url>
```

2. Install dependencies:
```
npm install
```

3. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" by clicking the toggle in the top right
   - Click "Load unpacked" and select the extension directory

## Usage

1. Navigate to any web page with a registration form
2. Click the extension icon to open the popup
3. Select gender and password options
4. Click "Fill Form" to autofill the form fields

## Development

This extension uses:
- Faker.js for generating realistic data
- ES modules for importing dependencies
- Chrome Extension Manifest V3

## License

MIT 