// Using Faker.js from global scope (loaded via script tag in popup.html)

document.addEventListener('DOMContentLoaded', function() {
    // Gender selection
    const genderButtons = document.querySelectorAll('.gender-btn');
    let selectedGender = 'male';
    let currentPassword = ''; // Store the current password
    let currentEmail = ''; // Store the current email

    function generatePassword(options) {
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

    // Email generation function using proxy server
    async function generateEmail() {
        try {
            const url = 'https://autofill.githinji.dev/api/generate-email';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    options: [1, 2, 3] // Using only public options
                })
            };

            const generateEmailBtn = document.getElementById('generateEmailBtn');
            const generatedEmailInput = document.getElementById('generatedEmail');
            
            // Update button text to show loading
            const originalBtnText = generateEmailBtn.textContent;
            generateEmailBtn.textContent = 'Generating...';
            generateEmailBtn.disabled = true;
            
            const response = await fetch(url, options);
            const result = await response.json();
            
            if (result && result.email) {
                currentEmail = result.email;
                generatedEmailInput.value = currentEmail;
            } else {
                console.error('Error generating email:', result);
                alert('Failed to generate email. Please try again.');
            }
            
            // Reset button
            generateEmailBtn.textContent = originalBtnText;
            generateEmailBtn.disabled = false;
            
            return currentEmail;
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to generate email: ' + error.message);
            document.getElementById('generateEmailBtn').textContent = 'Generate Email';
            document.getElementById('generateEmailBtn').disabled = false;
            return '';
        }
    }

    genderButtons.forEach(button => {
        button.addEventListener('click', () => {
            genderButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedGender = button.dataset.gender;
        });
    });

    // Password options
    const passwordLength = document.getElementById('passwordLength');
    const passwordLengthValue = document.getElementById('passwordLengthValue');
    const useUppercase = document.getElementById('useUppercase');
    const useNumbers = document.getElementById('useNumbers');
    const useSpecial = document.getElementById('useSpecial');
    const generatedPassword = document.getElementById('generatedPassword');
    const copyPasswordBtn = document.getElementById('copyPassword');
    const generatedEmail = document.getElementById('generatedEmail');
    const copyEmailBtn = document.getElementById('copyEmail');
    const generateEmailBtn = document.getElementById('generateEmailBtn');

    // Function to update password display
    function updatePasswordDisplay() {
        passwordLengthValue.textContent = passwordLength.value;
        const passwordOptions = {
            length: parseInt(passwordLength.value),
            useUppercase: useUppercase.checked,
            useNumbers: useNumbers.checked,
            useSpecial: useSpecial.checked
        };
        currentPassword = generatePassword(passwordOptions);
        generatedPassword.value = currentPassword;
    }

    // Update password when options change
    passwordLength.addEventListener('input', updatePasswordDisplay);
    useUppercase.addEventListener('change', updatePasswordDisplay);
    useNumbers.addEventListener('change', updatePasswordDisplay);
    useSpecial.addEventListener('change', updatePasswordDisplay);

    // Generate email when button is clicked
    generateEmailBtn.addEventListener('click', async () => {
        await generateEmail();
    });

    // Copy password to clipboard
    copyPasswordBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(generatedPassword.value);
            copyPasswordBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyPasswordBtn.textContent = 'Copy';
            }, 1500);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });

    // Copy email to clipboard
    copyEmailBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(generatedEmail.value);
            copyEmailBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyEmailBtn.textContent = 'Copy';
            }, 1500);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });

    // Fill form button
    document.getElementById('fillForm').addEventListener('click', async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            const passwordOptions = {
                length: parseInt(passwordLength.value),
                useUppercase: useUppercase.checked,
                useNumbers: useNumbers.checked,
                useSpecial: useSpecial.checked
            };

            // If no email has been generated yet, generate one now
            if (!currentEmail) {
                await generateEmail();
            }

            console.log('Sending to content.js - Email:', currentEmail); // Debug logging

            await chrome.tabs.sendMessage(tab.id, {
                action: 'fillForm',
                gender: selectedGender,
                passwordOptions: passwordOptions,
                password: currentPassword,
                email: currentEmail
            });
        } catch (err) {
            console.error('Error sending message:', err);
            // Optionally show user feedback
            alert('Please refresh the page and try again.');
        }
    });

    // Generate initial password
    updatePasswordDisplay();

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Theme handling
    function setTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            themeToggle.checked = true;
        } else {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggle.checked = false;
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // On load, set theme from localStorage or default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setTheme(true);
    } else {
        setTheme(false);
    }

    themeToggle.addEventListener('change', () => {
        setTheme(themeToggle.checked);
    });
}); 