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