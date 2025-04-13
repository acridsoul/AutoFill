// Store last generated password
let lastPassword = '';

document.getElementById('fillNow').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      function: fillFormsManually
    }, () => {
      // Update password display after filling
      if (lastPassword) {
        document.getElementById('passwordInfo').textContent = 
          `Last password: ${lastPassword}`;
      }
    });
  });
});

// Listen for password updates from content script
chrome.runtime.onMessage.addListener((request) => {
  if (request.action === 'passwordGenerated') {
    lastPassword = request.password;
    document.getElementById('passwordInfo').textContent = 
      `Last password: ${request.password}`;
  }
});

function fillFormsManually() {
  // Get all input elements
  const inputs = document.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    // Skip readonly and disabled fields
    if (input.readOnly || input.disabled) return;
    
    // Skip hidden, submit, button, and file inputs
    const type = input.type.toLowerCase();
    if (type === 'hidden' || type === 'submit' || type === 'button' || type === 'file' || type === 'reset') {
      return;
    }

    // Generate data for manual fill
    if (type === 'email') {
      input.value = `user${Math.random().toString(36).substring(2, 10)}@example.com`;
    } else if (type === 'password') {
      const password = Math.random().toString(36).substring(2, 15);
      input.value = password;
      // Send password to popup
      chrome.runtime.sendMessage({
        action: 'passwordGenerated',
        password: password
      });
    } else if (type === 'text') {
      input.value = Math.random().toString(36).substring(2, 10);
    }
  });
}
