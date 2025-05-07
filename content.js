// Name arrays for form filling
const maleFirstNames = [
    'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph', 'Thomas', 'Charles',
    'Daniel', 'Matthew', 'Anthony', 'Donald', 'Mark', 'Paul', 'Steven', 'Andrew', 'Kenneth', 'George'
];

const femaleFirstNames = [
    'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth', 'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen',
    'Nancy', 'Lisa', 'Betty', 'Margaret', 'Sandra', 'Ashley', 'Kimberly', 'Emily', 'Donna', 'Michelle'
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
    'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
];

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate random name based on gender
function generateName(gender) {
    const firstNameList = gender === 'male' ? maleFirstNames : femaleFirstNames;
    const firstName = firstNameList[Math.floor(Math.random() * firstNameList.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    return { firstName, lastName };
}

// Generate email from name
function generateEmail(firstName, lastName) {
    const randomNum = Math.floor(Math.random() * 99) + 1;
    return `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randomNum}@test.com`;
}

// Function to generate a random password based on options
function generatePassword(options) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = lowercase + numbers;
    if (options.useUppercase) chars += uppercase;
    if (options.useSpecial) chars += special;
    
    let password = '';
    for (let i = 0; i < options.length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    
    return password;
}

// Function to fill form fields
function fillFormFields(gender, passwordOptions) {
    // Get form fields
    const nameInputs = document.querySelectorAll('input[type="text"], input[name*="name" i]');
    const emailInputs = document.querySelectorAll('input[type="email"], input[name*="email" i]');
    const passwordInputs = document.querySelectorAll('input[type="password"], input[name*="password" i]');
    
    // Generate data
    const firstName = gender === 'male' ? getRandomMaleName() : getRandomFemaleName();
    const lastName = getRandomLastName();
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
    const password = generatePassword(passwordOptions);
    
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
    const maleNames = [
        'James', 'John', 'Robert', 'Michael', 'William',
        'David', 'Richard', 'Joseph', 'Thomas', 'Charles'
    ];
    return maleNames[Math.floor(Math.random() * maleNames.length)];
}

// Function to get random female name
function getRandomFemaleName() {
    const femaleNames = [
        'Mary', 'Patricia', 'Jennifer', 'Linda', 'Elizabeth',
        'Barbara', 'Susan', 'Jessica', 'Sarah', 'Karen'
    ];
    return femaleNames[Math.floor(Math.random() * femaleNames.length)];
}

// Function to get random last name
function getRandomLastName() {
    const lastNames = [
        'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
        'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'
    ];
    return lastNames[Math.floor(Math.random() * lastNames.length)];
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fillForm') {
        fillFormFields(request.gender, request.passwordOptions);
    }
});

// Auto-fill if form is detected
if (document.querySelector('form')) {
    fillFormFields('male', { length: 12, useUppercase: true, useSpecial: true });
} 