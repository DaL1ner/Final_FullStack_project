// Обработка отправки основной формы регистрации
document.addEventListener('DOMContentLoaded', function() {
    // ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ ВАЛИДАЦИИ ==========
    
    // Отправка логов форм
    function getLog(fullnameValue, phoneValue, branch = 'None', emailValue = 'None') {
        const formData = {
            branch: branch,
            fullname: fullnameValue,
            phone: phoneValue,
            email: emailValue
        };

        const event = new CustomEvent('formValid', { detail: formData });
        document.dispatchEvent(event);
    }
    function showFieldError(field, message) {
        // Очищаем предыдущие ошибки
        clearFieldError(field);
        
        // Добавляем класс ошибки полю
        field.classList.add('is-invalid');
        
        // Создаем элемент для сообщения об ошибке
        const errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback d-block';
        errorElement.style.color = '#e74c3c';
        errorElement.style.fontSize = '0.875rem';
        errorElement.style.marginTop = '0.25rem';
        errorElement.textContent = message;
        
        // Вставляем после поля ввода
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    function clearFieldError(field) {
        field.classList.remove('is-invalid');
        
        // Удаляем элемент с ошибкой, если он существует
        const nextElement = field.nextElementSibling;
        if (nextElement && nextElement.classList.contains('invalid-feedback')) {
            nextElement.remove();
        }
    }
    
    function clearFormErrors(form) {
        const invalidFields = form.querySelectorAll('.is-invalid');
        invalidFields.forEach(field => clearFieldError(field));
    }
    
    function isValidName(name) {
        const words = name.trim().split(/\s+/).filter(word => word.length > 0);
        return words.length >= 2 && words.every(word => word.length >= 2);
    }
    
    function isValidPhone(phone) {
        const digits = phone.replace(/\D/g, '');
        return digits.length === 11 && digits.startsWith('7');
    }
    
    function isValidEmail(email) {
        if (!email.trim()) return true; // Email необязательное поле
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email.trim());
    }
    
    // ========== ВАЛИДАЦИЯ ОСНОВНОЙ ФОРМЫ РЕГИСТРАЦИИ ==========

    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let hasError = false;
            
            // Очищаем предыдущие ошибки
            clearFormErrors(registrationForm);
            
            // Получаем значения полей
            const fullName = document.getElementById('fullName').value;
            const branch = document.getElementById('branch').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            
            // Валидация филиала
            if (!branch) {
                showFieldError(document.getElementById('branch'), 'Пожалуйста, выберите филиал');
                hasError = true;
            }
            
            // Валидация имени
            if (!fullName.trim()) {
                showFieldError(document.getElementById('fullName'), 'Пожалуйста, введите имя и фамилию');
                hasError = true;
            } else if (!isValidName(fullName)) {
                showFieldError(document.getElementById('fullName'), 'Введите корректное имя и фамилию (минимум 2 слова)');
                hasError = true;
            }
            
            // Валидация телефона
            if (!phone.trim()) {
                showFieldError(document.getElementById('phone'), 'Пожалуйста, введите номер телефона');
                hasError = true;
            } else if (!isValidPhone(phone)) {
                showFieldError(document.getElementById('phone'), 'Введите корректный номер телефона в формате (+7 ХХХ ХХХ-ХХ-ХХ)');
                hasError = true;
            }
            
            // Валидация email (если заполнен)
            if (email.trim() && !isValidEmail(email)) {
                showFieldError(document.getElementById('email'), 'Введите корректный адрес электронной почты');
                hasError = true;
            }
            
            // Если есть ошибки - останавливаем отправку
            if (hasError) {
                return;
            }
            else {
                getLog(fullName, phone, branch, email)
            }
            
            // Создание модального окна об успешной отправке
            const modalHTML = `
            <div class="modal fade" id="successModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content rounded-4">
                        <div class="modal-header bg-success text-white border-0">
                            <h5 class="modal-title fs-4 fw-bold">Спасибо за заявку!</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center py-5">
                            <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                            <h4 class="mt-3 fw-bold">Ваша заявка принята</h4>
                            <p class="text-muted mt-3">
                                Наш менеджер свяжется с вами в ближайшее время для подтверждения записи.<br>
                                Ожидайте звонка на указанный номер телефона.
                            </p>
                        </div>
                        <div class="modal-footer border-0 justify-content-center pb-4">
                            <button type="button" class="btn btn-success px-5 py-2" data-bs-dismiss="modal">Хорошо</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            
            // Добавление модального окна в DOM
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Инициализация и показ модального окна
            const modalElement = document.getElementById('successModal');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
            
            // Удаление модального окна после закрытия
            modalElement.addEventListener('hidden.bs.modal', function() {
                this.remove();
            });
            
            // Сброс формы и очистка ошибок
            this.reset();
            clearFormErrors(this);
        });
        
        // Добавляем очистку ошибок при фокусе на поле
        registrationForm.querySelectorAll('input, select').forEach(field => {
            field.addEventListener('focus', () => clearFieldError(field));
        });
    }
    
    // ========== ВАЛИДАЦИЯ ФОРМЫ ОБРАТНОГО ЗВОНКА ==========
    
    const quickContactForm = document.getElementById('quickContactForm');
    if (quickContactForm) {
        quickContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let hasError = false;
            
            // Очищаем предыдущие ошибки
            clearFormErrors(quickContactForm);
            
            // Получаем значения полей
            const quickName = document.getElementById('quickName').value;
            const quickPhone = document.getElementById('quickPhone').value;
            
            // Валидация имени
            if (!quickName.trim()) {
                showFieldError(document.getElementById('quickName'), 'Пожалуйста, введите ваше имя');
                hasError = true;
            } else if (!isValidName(quickName)) {
                showFieldError(document.getElementById('quickName'), 'Введите корректное имя и фамилию');
                hasError = true;
            }
            
            // Валидация телефона
            if (!quickPhone.trim()) {
                showFieldError(document.getElementById('quickPhone'), 'Пожалуйста, введите номер телефона');
                hasError = true;
            } else if (!isValidPhone(quickPhone)) {
                showFieldError(document.getElementById('quickPhone'), 'Введите корректный номер телефона');
                hasError = true;
            }
            
            // Если есть ошибки - останавливаем отправку
            if (hasError) {
                return;
            }
            else {
                getLog(quickName, quickPhone)
            }
            
            // Создание модального окна об успешной отправке
            const modalHTML = `
            <div class="modal fade" id="callbackSuccessModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content rounded-4">
                        <div class="modal-header bg-success text-white border-0">
                            <h5 class="modal-title fs-4 fw-bold">Заявка отправлена!</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-center py-5">
                            <i class="bi bi-telephone-fill text-success" style="font-size: 4rem;"></i>
                            <h4 class="mt-3 fw-bold">Ждите звонка!</h4>
                            <p class="text-muted mt-3">
                                Наш менеджер перезвонит вам в ближайшее время.<br>
                                Обычно это занимает не более 15 минут.
                            </p>
                        </div>
                        <div class="modal-footer border-0 justify-content-center pb-4">
                            <button type="button" class="btn btn-success px-5 py-2" data-bs-dismiss="modal">Отлично</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            
            // Добавление модального окна в DOM
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            // Инициализация и показ модального окна
            const modalElement = document.getElementById('callbackSuccessModal');
            const modal = new bootstrap.Modal(modalElement);
            modal.show();
            
            // Удаление модального окна после закрытия
            modalElement.addEventListener('hidden.bs.modal', function() {
                this.remove();
            });
            
            // Сброс формы и очистка ошибок
            this.reset();
            clearFormErrors(this);
            
            // Закрываем модальное окно обратного звонка
            const callModal = bootstrap.Modal.getInstance(document.getElementById('callModal'));
            if (callModal) callModal.hide();
        });
        
        // Добавляем очистку ошибок при фокусе на поле
        quickContactForm.querySelectorAll('input').forEach(field => {
            field.addEventListener('focus', () => clearFieldError(field));
        });
    }
    
    // ========== МАСКА ДЛЯ ТЕЛЕФОНА ==========
    
    // Маска для телефона в основной форме
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhone);
        
        // Устанавливаем начальное значение
        if (!phoneInput.value) {
            phoneInput.value = '+7 ';
        }
    }
    
    // Маска для телефона в модальном окне обратного звонка
    const quickPhoneInput = document.getElementById('quickPhone');
    if (quickPhoneInput) {
        quickPhoneInput.addEventListener('input', formatPhone);
        
        // Устанавливаем начальное значение
        if (!quickPhoneInput.value) {
            quickPhoneInput.value = '+7 ';
        }
    }
    
    // Функция форматирования телефона
    function formatPhone(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        // Если пользователь удалил все символы, оставляем "+7 "
        if (value.length === 0) {
            e.target.value = '+7 ';
            return;
        }
        
        // Если пользователь удалил "+7", восстанавливаем
        if (value[0] !== '7') {
            value = '7' + value;
        }
        
        // Форматируем номер
        let formatted = '+7';
        
        if (value.length > 1) {
            formatted += ' (' + value.substring(1, 4);
            if (value.length >= 4) formatted += ') ';
            if (value.length >= 4) formatted += value.substring(4, 7);
            if (value.length >= 7) formatted += '-' + value.substring(7, 9);
            if (value.length >= 9) formatted += '-' + value.substring(9, 11);
        }
        
        e.target.value = formatted;
        
        // Автоматически добавляем пробел после +7 при фокусе на пустом поле
        if (e.target.value === '+7' && e.type === 'focus') {
            e.target.value = '+7 ';
        }
    }
    
    // Автофокус на первое поле при открытии модального окна обратного звонка
    const callModalElement = document.getElementById('callModal');
    if (callModalElement) {
        callModalElement.addEventListener('shown.bs.modal', function () {
            document.getElementById('quickName').focus();
            
            // Устанавливаем начальное значение для телефона, если пустое
            const quickPhone = document.getElementById('quickPhone');
            if (quickPhone && !quickPhone.value) {
                quickPhone.value = '+7 ';
            }
        });
    }
});