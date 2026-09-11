// Точка входа


import { initNavbar } from './components/navbar.js';
import { initRegistrationForm } from './forms/registration.js';
import { initCallbackForm } from './forms/callback.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initRegistrationForm();
    initCallbackForm();
    
    // Автофокус для модального окна звонка
    const callModalElement = document.getElementById('callModal');
    if (callModalElement) {
        callModalElement.addEventListener('shown.bs.modal', function () {
            const quickName = document.getElementById('quickName');
            if(quickName) quickName.focus();
            
            // Инициализация маски при открытии модалки (на случай динамической загрузки)
            const quickPhone = document.getElementById('quickPhone');
            if (quickPhone && !quickPhone.value) {
                // Маска уже должна быть инициализирована в initCallbackForm, 
                // но можно вызвать повторно для надежности
                // initPhoneMask(quickPhone); 
            }
        });
    }
});