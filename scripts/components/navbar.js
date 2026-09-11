// Логика активного меню


export function initNavbar() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
    navLinks.forEach(link => {
        link.classList.remove('active', 'fw-bold');
        const linkHref = link.getAttribute('href');
        
        if ((linkHref === 'index.html' || linkHref === './') && currentPath === 'index.html') {
            link.classList.add('active', 'fw-bold');
        } else if (linkHref && currentPath.includes(linkHref.split('/').pop())) {
            link.classList.add('active', 'fw-bold');
        }
    });
}