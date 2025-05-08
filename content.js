// Generate random name based on gender
function generateName(gender) {
    const firstName = gender === 'male' ? 
        faker.name.firstName('male') : 
        faker.name.firstName('female');
    const lastName = faker.name.lastName();
    return { firstName, lastName };
}

// Generate email from name
function generateEmail(firstName, lastName) {
    return faker.internet.email(firstName, lastName);
}

// Function to generate a random password based on options
function generatePassword(options) {
    // The old Faker.js version doesn't have the same API, so we need to implement our own
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = lowercase;
    if (options.useUppercase) chars += uppercase;
    if (options.useNumbers) chars += numbers;
    if (options.useSpecial) chars += special;
    
    let password = '';
    for (let i = 0; i < options.length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    return password;
}

// Function to fill form fields
function fillFormFields(gender, passwordOptions, password) {
    // Get form fields
    const nameInputs = document.querySelectorAll('input[type="text"], input[name*="name" i]');
    const emailInputs = document.querySelectorAll('input[type="email"], input[name*="email" i]');
    const passwordInputs = document.querySelectorAll('input[type="password"], input[name*="password" i]');
    
    // Generate data
    const { firstName, lastName } = generateName(gender);
    const email = generateEmail(firstName, lastName);
    
    // Fill name fields
    nameInputs.forEach(input => {
        if (input.name.toLowerCase().includes('first')) {
            input.value = firstName;
        } else if (input.name.toLowerCase().includes('last')) {
            input.value = lastName;
        } else {
            input.value = `${firstName} ${lastName}`;
        }
    });
    
    // Fill email fields
    emailInputs.forEach(input => {
        input.value = email;
    });
    
    // Fill password fields
    passwordInputs.forEach(input => {
        input.value = password;
    });
}

// Function to get random male name
function getRandomMaleName() {
    return faker.name.firstName('male');
}

// Function to get random female name
function getRandomFemaleName() {
    return faker.name.firstName('female');
}

// Function to get random last name
function getRandomLastName() {
    return faker.name.lastName();
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillForm') {
        fillFormFields(request.gender, request.passwordOptions, request.password);
    }
}); 