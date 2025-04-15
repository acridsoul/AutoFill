// Fake data generator remains in background.js
class FakeData {
  static async getEmail() {
    const { rapidApiKey } = await chrome.storage.sync.get(['rapidApiKey']);
    if (!rapidApiKey) {
      throw new Error('RapidAPI key not configured');
    }
    
    const url = 'https://gmailnator.p.rapidapi.com/generate-email';
    const options = {
      method: 'POST',
      headers: {
        'x-rapidapi-key': rapidApiKey,
        'x-rapidapi-host': 'gmailnator.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ options: [3] })
    };
    
    const response = await fetch(url, options);
    const result = await response.json();
    if (!result.email) {
      throw new Error('Failed to generate email from API');
    }
    return result.email;
  }

  static getPassword() {
    const part1 = Math.random().toString(36).substring(2, 15);
    const part2 = Math.random().toString(36).substring(2, 15);
    return part1 + part2;
  }

  static #firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah',
    'David', 'Lisa', 'Robert', 'Jennifer', 'William', 'Elizabeth',
    'Christopher', 'Jessica', 'Matthew', 'Ashley'];
  static #lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
    'Miller', 'Davis', 'Wilson', 'Moore', 'Taylor',
    'Anderson', 'Thomas', 'Jackson', 'White', 'Harris'];

  static getFirstName() {
    return this.#firstNames[Math.floor(Math.random() * this.#firstNames.length)];
  }

  static getLastName() {
    return this.#lastNames[Math.floor(Math.random() * this.#lastNames.length)];
  }

  static getUsername() {
    const firstName = this.#firstNames[Math.floor(Math.random() * this.#firstNames.length)];
    const lastName = this.#lastNames[Math.floor(Math.random() * this.#lastNames.length)];
    const randomDigits = Math.floor(Math.random() * 90) + 10;
    return `${firstName.charAt(0)}${lastName}${randomDigits}`.toLowerCase();
  }
}

// Message handler in background.js
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'generateData') {
    const password = FakeData.getPassword();
    const data = {
      email: await FakeData.getEmail(),
      password: password,
      firstName: FakeData.getFirstName(),
      lastName: FakeData.getLastName(),
      username: FakeData.getUsername(),
      visiblePassword: password
    };
    sendResponse(data);
  }
  // Return true to indicate you intend to send a response asynchronously
  return true;
});
