// Utility function to add the visible password display
function addVisiblePasswordSpan(input, visiblePassword) {
  const passwordContainer = input.closest('.form-group, .input-group, div') || input.parentElement;
  if (passwordContainer && !passwordContainer.querySelector('.password-visible')) {
    const visibleSpan = document.createElement('span');
    visibleSpan.className = 'password-visible';
    visibleSpan.textContent = ` (Visible: ${visiblePassword})`;
    visibleSpan.style.color = '#666';
    visibleSpan.style.fontSize = '0.8em';
    passwordContainer.appendChild(visibleSpan);
  }
}

// Use a single data object to fill in the form fields
function fillFormFieldsWithData(response) {
  const inputs = document.querySelectorAll('input, textarea, select');

  inputs.forEach(input => {
    const type = input.type ? input.type.toLowerCase() : '';
    const name = input.name ? input.name.toLowerCase() : '';
    const id = input.id ? input.id.toLowerCase() : '';
    const placeholder = input.placeholder ? input.placeholder.toLowerCase() : '';

    // Skip inputs that we don't want to fill
    if (['hidden', 'submit', 'button', 'file', 'reset'].includes(type)) {
      return;
    }

    if (type === 'email' || name.includes('email') || id.includes('email') || placeholder.includes('email')) {
      input.value = response.email;
    } 
    else if (type === 'password' || name.includes('password') || id.includes('password') || placeholder.includes('password')) {
      const isConfirmPassword = 
            name.includes('confirm') ||
            id.includes('confirm') ||
            placeholder.includes('confirm') ||
            name.includes('repeat') ||
            id.includes('repeat') ||
            placeholder.includes('repeat');

      if (isConfirmPassword) {
        const passwordFields = Array.from(document.querySelectorAll('input[type="password"]'))
          .filter(field => {
            const fieldName = field.name ? field.name.toLowerCase() : '';
            const fieldId = field.id ? field.id.toLowerCase() : '';
            const fieldPlaceholder = field.placeholder ? field.placeholder.toLowerCase() : '';
            return !(fieldName.includes('confirm') || fieldId.includes('confirm') ||
                     fieldPlaceholder.includes('confirm') || fieldName.includes('repeat') ||
                     fieldId.includes('repeat') || fieldPlaceholder.includes('repeat'));
          });
        const mainPasswordField = passwordFields.length > 0 ? passwordFields[0] : null;
        input.value = mainPasswordField ? mainPasswordField.value : response.password;
        if (mainPasswordField) {
          mainPasswordField.value = response.password;
        }
        addVisiblePasswordSpan(input, response.visiblePassword);
      } else {
        input.value = response.password;
        addVisiblePasswordSpan(input, response.visiblePassword);
      }
    }
    else if (name.includes('firstname') || id.includes('firstname') || placeholder.includes('first name')) {
      input.value = response.firstName;
    }
    else if (name.includes('lastname') || id.includes('lastname') || placeholder.includes('last name')) {
      input.value = response.lastName;
    }
    else if (
      name.includes('name') || id.includes('name') || placeholder.includes('name') ||
      name.includes('fullname') || id.includes('fullname')
    ) {
      input.value = `${response.firstName} ${response.lastName}`;
    }
    else if (
      type === 'text' && 
      (name.includes('user') || id.includes('user') || placeholder.includes('username'))
    ) {
      input.value = response.username;
    }
  });
}

// Cached data variable for reusing the fake data object
let cachedData = null;

// Request data from the background script if not already cached
function requestDataAndFillForm() {
  if (cachedData) {
    fillFormFieldsWithData(cachedData);
  } else {
    chrome.runtime.sendMessage({action: 'generateData'}, (response) => {
      if (response) {
        cachedData = response;
        fillFormFieldsWithData(cachedData);
      }
    });
  }
}

// On initial page load, request the data once and fill the form
document.addEventListener('DOMContentLoaded', () => {
  requestDataAndFillForm();
});

// Also handle dynamically loaded content with a MutationObserver
const observer = new MutationObserver((mutations) => {
  if (cachedData) {
    fillFormFieldsWithData(cachedData);
  }
});
observer.observe(document.body, {
  childList: true,
  subtree: true
});
