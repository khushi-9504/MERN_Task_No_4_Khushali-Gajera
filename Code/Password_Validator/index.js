const passwordInput = document.getElementById("passwordInput");
const passwordStrength = document.getElementById("passwordStrength");

// Function to evaluate password strength
function evaluatePasswordStrength(password) {
    const length = password.length;
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[!~`@#$%^&*()]/.test(password);
    const hasSequentialChars = /(.)\1{2,}/.test(password); // Repeated characters
    const hasCommonPatterns = /(123|abc|password|qwerty)/i.test(password); // Common patterns

    // Determine password strength
    if (length < 8 || (!hasLowercase && !hasUppercase && !hasDigit && !hasSpecial)) {
        return { strength: "Weak Password", class: "weak" };
    } else if (length >= 8 && length <= 11 && (hasLowercase + hasUppercase + hasDigit + hasSpecial >= 2)) {
        return { strength: "Good Password", class: "good" };
    } else if (length >= 12 && length <= 14 && hasLowercase && hasUppercase && hasDigit && hasSpecial) {
        return { strength: "Strong Password", class: "strong" };
    } else if (length > 15 && hasLowercase && hasUppercase && hasDigit && hasSpecial && !hasSequentialChars && !hasCommonPatterns) {
        return { strength: "Excellent Password", class: "excellent" };
    } else {
        return { strength: "Good Password", class: "good" };
    }
}

// Add event listener to input field
passwordInput.addEventListener("input", () => {
    const password = passwordInput.value;
    if (!password) {
        passwordStrength.textContent = "Start typing...";
        passwordStrength.className = "strength";
        return;
    }

    const { strength, class: className } = evaluatePasswordStrength(password);
    passwordStrength.textContent = strength;
    passwordStrength.className = `strength ${className}`;
});
