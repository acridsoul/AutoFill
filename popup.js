document.addEventListener('DOMContentLoaded', function() {
    // Gender selection
    const genderButtons = document.querySelectorAll('.gender-btn');
    let selectedGender = 'male';

    genderButtons.forEach(button => {
        button.addEventListener('click', () => {
            genderButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedGender = button.dataset.gender;
        });
    });

    // Password options
    const passwordLength = document.getElementById('passwordLength');
    const useUppercase = document.getElementById('useUppercase');
    const useSpecial = document.getElementById('useSpecial');

    // Fill form button
    document.getElementById('fillForm').addEventListener('click', async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        
        const passwordOptions = {
            length: parseInt(passwordLength.value),
            useUppercase: useUppercase.checked,
            useSpecial: useSpecial.checked
        };

        chrome.tabs.sendMessage(tab.id, {
            action: 'fillForm',
            gender: selectedGender,
            passwordOptions: passwordOptions
        });
    });
}); 