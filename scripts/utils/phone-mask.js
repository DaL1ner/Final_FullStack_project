// Логика маски ввода телефона

export function initPhoneMask(inputElement) {
    if (!inputElement) return;

    // Устанавливаем начальное значение
    if (!inputElement.value) inputElement.value = '+7 ';

    inputElement.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length === 0) {
            e.target.value = '+7 ';
            return;
        }
        
        if (value[0] !== '7') value = '7' + value;
        
        let formatted = '+7';
        if (value.length > 1) {
            formatted += ' (' + value.substring(1, 4);
            if (value.length >= 4) formatted += ') ';
            if (value.length >= 4) formatted += value.substring(4, 7);
            if (value.length >= 7) formatted += '-' + value.substring(7, 9);
            if (value.length >= 9) formatted += '-' + value.substring(9, 11);
        }
        
        e.target.value = formatted;
    });
}