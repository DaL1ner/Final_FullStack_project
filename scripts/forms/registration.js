// Обработчик формы регистрации


import { isValidName, isValidPhone, isValidEmail } from '../utils/validators.js';
import { showFieldError, clearFormErrors, clearFieldError } from '../utils/ui-helpers.js';
import { showSuccessModal } from '../components/success-modal.js';
import { initPhoneMask } from '../utils/phone-mask.js';

export function initRegistrationForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    // Инициализация маски (теперь работает через jQuery внутри функции)
    initPhoneMask('#phone');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearFormErrors(form);
        let hasError = false;

        const fullName = form.querySelector('#fullName');
        const branch = form.querySelector('#branch');
        const phone = form.querySelector('#phone');
        const email = form.querySelector('#email');

        // Валидация
        if (!branch.value) { 
            showFieldError(branch, 'Выберите филиал'); 
            hasError = true; 
        }
        
        if (!fullName.value.trim() || !isValidName(fullName.value)) {
            showFieldError(fullName, 'Введите корректное имя и фамилию');
            hasError = true;
        }

        // Валидация телефона (убираем пробелы и скобки для проверки)
        const rawPhone = phone.value.replace(/\D/g, '');
        if (!rawPhone || rawPhone.length !== 11) {
            showFieldError(phone, 'Введите корректный номер телефона');
            hasError = true;
        }

        if (email.value.trim() && !isValidEmail(email.value)) {
            showFieldError(email, 'Некорректный Email');
            hasError = true;
        }

        if (hasError) return;

        // Отправка данных
        dispatchFormEvent(fullName.value, phone.value, branch.value, email.value);
        
        showSuccessModal(
            'Спасибо за заявку!',
            'Наш менеджер свяжется с вами в ближайшее время.',
            'bi-check-circle-fill'
        );

        form.reset();
        // Сброс маски визуально
        $(phone).val(''); 
    });

    // Очистка ошибок при фокусе
    form.querySelectorAll('input, select').forEach(field => {
        field.addEventListener('focus', () => clearFieldError(field));
    });
}

function dispatchFormEvent(fullname, phone, branch, email) {
    const event = new CustomEvent('formValid', { 
        detail: { branch, fullname, phone, email } 
    });
    document.dispatchEvent(event);
}