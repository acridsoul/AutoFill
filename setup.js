document.getElementById('save').addEventListener('click', async () => {
  const apiKey = document.getElementById('apiKey').value.trim();
  if (!apiKey) {
    document.getElementById('status').textContent = 'Please enter a valid API key';
    return;
  }

  await chrome.storage.sync.set({ rapidApiKey: apiKey });
  document.getElementById('status').textContent = 'API key saved successfully!';
  document.getElementById('apiKey').value = '';
});

// Load existing key if set
chrome.storage.sync.get(['rapidApiKey'], (result) => {
  if (result.rapidApiKey) {
    document.getElementById('status').textContent = 'API key is already configured';
  }
});
