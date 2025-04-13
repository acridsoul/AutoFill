// Function to detect and fill form fields
function fillFormFields() {
  // Get all input elements
  const inputs = document.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    const type = input.type.toLowerCase();
    const name = input.name ? input.name.toLowerCase() : '';
    const id = input.id ? input.id.toLowerCase() : '';
    const placeholder = input.placeholder ? input.placeholder.toLowerCase() : '';

    // Skip hidden, submit, button, and file inputs
    if (type === 'hidden' || type === 'submit' || type === 'button' || type === 'file' || type === 'reset') {
      return;
    }

    // Request fake data from background script
    chrome.runtime.sendMessage({action: 'generateData'}, (response) => {
      if (!response) return;

      // Match fields based on common patterns
      if (type === 'email' || name.includes('email') || id.includes('email') || placeholder.includes('email')) {
        input.value = response.email;
      } 
      else if (type === 'password' || name.includes('password') || id.includes('password') || placeholder.includes('password')) {
        // Check if this is a confirm password field
        const isConfirmPassword = name.includes('confirm') || id.includes('confirm') || 
                                placeholder.includes('confirm') || name.includes('repeat') || 
                                id.includes('repeat') || placeholder.includes('repeat');
        
        if (isConfirmPassword) {
          // Find the main password field to match
          const mainPassword = document.querySelector('input[type="password"]:not([name*="confirm"]):not([id*="confirm"]):not([placeholder*="confirm"]):not([name*="repeat"]):not([id*="repeat"]):not([placeholder*="repeat"])');
          if (mainPassword) {
            input.value = mainPassword.value;
          } else {
            input.value = response.password;
          }
        } else {
          input.value = response.password;
        }

        // Try to find a nearby element to show the visible password
        const passwordContainer = input.closest('.form-group, .input-group, div') || input.parentElement;
        if (passwordContainer && !passwordContainer.querySelector('.password-visible')) {
          const visibleSpan = document.createElement('span');
          visibleSpan.className = 'password-visible';
          visibleSpan.textContent = ` (Visible: ${response.visiblePassword})`;
          visibleSpan.style.color = '#666';
          visibleSpan.style.fontSize = '0.8em';
          passwordContainer.appendChild(visibleSpan);
        }
      }
      else if (name.includes('firstname') || id.includes('firstname') || placeholder.includes('first name')) {
        input.value = response.firstName;
      }
      else if (name.includes('lastname') || id.includes('lastname') || placeholder.includes('last name')) {
        input.value = response.lastName;
      }
      else if (name.includes('name') || id.includes('name') || placeholder.includes('name') || 
               name.includes('fullname') || id.includes('fullname')) {
        input.value = `${response.firstName} ${response.lastName}`;
      }
      else if (type === 'text' && (name.includes('user') || id.includes('user') || placeholder.includes('username'))) {
        input.value = response.username;
      }
    });
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', fillFormFields);

// Also run when new content is dynamically loaded
const observer = new MutationObserver(fillFormFields);
observer.observe(document.body, {
  childList: true,
  subtree: true
});
