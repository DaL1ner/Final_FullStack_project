// Обработка отправки основной формы регистрации
document.addEventListener('DOMContentLoaded', function() {
    // Обработка отправки основной формы регистрации
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('fullName').value;
            const branch = document.getElementById('branch').value;
            
            // Простая валидация
            if (!fullName || !branch) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
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
            
            // Сброс формы
            this.reset();
        });
    }
    
    // Маска для телефона в основной форме
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatPhone);
    }
    
    // Маска для телефона в модальном окне обратного звонка
    const quickPhoneInput = document.getElementById('quickPhone');
    if (quickPhoneInput) {
        quickPhoneInput.addEventListener('input', formatPhone);
    }
    
    // Функция форматирования телефона
    function formatPhone(e) {
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
    }
});

// Функция для установки активного пункта меню
function setActiveNavLink() {
  // Получаем текущий путь страницы
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Находим все ссылки навигации
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  // Перебираем все ссылки и удаляем класс active
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.classList.remove('fw-bold');
    
    // Проверяем, соответствует ли href текущей странице
    const linkHref = link.getAttribute('href');
    
    // Если ссылка ведет на главную страницу
    if ((linkHref === 'index.html' || linkHref === './') && currentPath === 'index.html') {
      link.classList.add('active', 'fw-bold');
    } 
    // Если ссылка ведет на другую страницу
    else if (linkHref && currentPath.includes(linkHref.split('/').pop())) {
      link.classList.add('active', 'fw-bold');
    }
  });
}

// Вызываем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', setActiveNavLink);

// Также вызываем при изменении маршрута (если используется History API)
window.addEventListener('popstate', setActiveNavLink);