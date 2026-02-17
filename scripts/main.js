// Точка входа


import { initNavbar } from './components/navbar.js';
import { initRegistrationForm } from './forms/registration.js';
import { initCallbackForm } from './forms/callback.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initRegistrationForm();
    initCallbackForm();
    
    // Автофокус для модального окна звонка (остался тут, так как это специфика UI)
    const callModalElement = document.getElementById('callModal');
    if (callModalElement) {
        callModalElement.addEventListener('shown.bs.modal', function () {
            const quickName = document.getElementById('quickName');
            if(quickName) quickName.focus();
            
            const quickPhone = document.getElementById('quickPhone');
            if (quickPhone && !quickPhone.value) quickPhone.value = '+7 ';
        });
    }
});