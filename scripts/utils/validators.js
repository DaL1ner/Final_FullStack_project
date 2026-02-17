// Чистая логика проверки (email, телефон, имя)

export function isValidName(name) {
    const words = name.trim().split(/\s+/).filter(word => word.length > 0);
    return words.length >= 2 && words.every(word => word.length >= 2);
}

export function isValidPhone(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 11 && digits.startsWith('7');
}

export function isValidEmail(email) {
    if (!email.trim()) return true; // Email необязательное поле
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
}