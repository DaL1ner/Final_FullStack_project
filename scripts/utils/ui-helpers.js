// Работа с DOM (показать ошибку, очистить форму)

export function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('is-invalid');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'invalid-feedback d-block';
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    errorElement.textContent = message;
    
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

export function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const nextElement = field.nextElementSibling;
    if (nextElement && nextElement.classList.contains('invalid-feedback')) {
        nextElement.remove();
    }
}

export function clearFormErrors(form) {
    const invalidFields = form.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => clearFieldError(field));
}