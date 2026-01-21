document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Здесь можно добавить валидацию и отправку данных на сервер
    const fullName = document.getElementById('fullName').value;
    const branch = document.getElementById('branch').value;
    
    // Простая валидация
    if (!fullName || !branch) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }
    
    // Create modal HTML element
    const modalHTML = `
        <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title" id="successModalLabel">Спасибо за заявку!</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body text-center py-4">
                        <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
                        <h4 class="mt-3">Ваша заявка принята</h4>
                        <p class="text-muted mt-2">
                            Наш менеджер свяжется с вами в ближайшее время для подтверждения записи.<br>
                            Ожидайте звонка на указанный номер телефона.
                        </p>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button type="button" class="btn btn-success px-4" data-bs-dismiss="modal">Хорошо</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Initialize and show modal
    const modalElement = document.getElementById('successModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
    // Remove modal from DOM when hidden
    modalElement.addEventListener('hidden.bs.modal', function () {
        this.remove();
    });
    
    // Reset form after successful submission
    this.reset();
});

// Маска для телефона
document.getElementById('phone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '+7 ';
    
    if (value.length > 1) {
        formatted += '(' + value.substring(1, 4);
        if (value.length >= 4) formatted += ') ';
        if (value.length >= 4) formatted += value.substring(4, 7);
        if (value.length >= 7) formatted += '-' + value.substring(7, 9);
        if (value.length >= 9) formatted += '-' + value.substring(9, 11);
    } else {
        formatted = '+7';
    }
    
    e.target.value = formatted;
});

// Маска для телефона
document.getElementById('quickPhone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    let formatted = '+7 ';
    
    if (value.length > 1) {
        formatted += '(' + value.substring(1, 4);
        if (value.length >= 4) formatted += ') ';
        if (value.length >= 4) formatted += value.substring(4, 7);
        if (value.length >= 7) formatted += '-' + value.substring(7, 9);
        if (value.length >= 9) formatted += '-' + value.substring(9, 11);
    } else {
        formatted = '+7';
    }
    
    e.target.value = formatted;
});