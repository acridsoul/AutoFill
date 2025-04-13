// Fake data generator
class FakeData {
  static async getEmail() {
    // Get API key from secure storage
    const {rapidApiKey} = await chrome.storage.sync.get(['rapidApiKey']);
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
      body: JSON.stringify({options: [3]})
    };

    const response = await fetch(url, options);
    const result = await response.json();
    if (!result.email) {
      throw new Error('Failed to generate email from API');
    }
    return result.email;
  }

  static getPassword() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }

  static getFirstName() {
    const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah'];
    return firstNames[Math.floor(Math.random() * firstNames.length)];
  }

  static getLastName() {
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Williams', 'Brown'];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
  }

  static getUsername() {
    return 'user' + Math.random().toString(36).substring(2, 10);
  }
}

// Message handler
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.action === 'generateData') {
    const data = {
      email: await FakeData.getEmail(),
      password: FakeData.getPassword(),
      firstName: FakeData.getFirstName(),
      lastName: FakeData.getLastName(),
      username: FakeData.getUsername(),
      visiblePassword: FakeData.getPassword() // Same password but visible
    };
    sendResponse(data);
  }
});
