// Обработчик формы обратного звонка


import { isValidName, isValidPhone } from '../utils/validators.js';
import { showFieldError, clearFormErrors } from '../utils/ui-helpers.js';
import { showSuccessModal } from '../components/success-modal.js';
import { initPhoneMask } from '../utils/phone-mask.js';

export function initCallbackForm() {
    const form = document.getElementById('quickContactForm');
    if (!form) return;

    initPhoneMask(form.querySelector('#quickPhone'));

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearFormErrors(form);
        let hasError = false;

        const quickName = form.querySelector('#quickName');
        const quickPhone = form.querySelector('#quickPhone');

        if (!quickName.value.trim() || !isValidName(quickName.value)) {
            showFieldError(quickName, 'Введите имя');
            hasError = true;
        }

        if (!quickPhone.value.trim() || !isValidPhone(quickPhone.value)) {
            showFieldError(quickPhone, 'Введите номер телефона');
            hasError = true;
        }

        if (hasError) return;

        dispatchFormEvent(quickName.value, quickPhone.value);
        
        showSuccessModal(
            'Заявка отправлена!',
            'Ждите звонка! Обычно это занимает не более 15 минут.',
            'bi-telephone-fill'
        );

        form.reset();
        
        // Закрыть модальное окно звонка, если оно открыто
        const callModalEl = document.getElementById('callModal');
        if(callModalEl) {
            const modalInstance = bootstrap.Modal.getInstance(callModalEl);
            if(modalInstance) modalInstance.hide();
        }
    });
}

function dispatchFormEvent(fullname, phone) {
    const event = new CustomEvent('formValid', { 
        detail: { branch: 'Обратный звонок', fullname, phone, email: 'None' } 
    });
    document.dispatchEvent(event);
}