// Логика маски ввода телефона

function setCaretPosition(elem, position) {
    if (elem.setSelectionRange) {
        // Для современных браузеров
        elem.setSelectionRange(position, position);
    } else if (elem.createTextRange) {
        // Для старых IE (на случай поддержки legacy)
        const range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', position);
        range.moveStart('character', position);
        range.select();
    }
}
export function initPhoneMask(selector) {
    const $element = selector instanceof HTMLElement ? $(selector) : $(selector);
    
    if ($element.length === 0) {
        console.warn('Элемент для маски телефона не найден:', selector);
        return;
    }

    // Получаем доступ к DOM элементу для работы с курсором
    const inputElement = $element[0];

    // Маска: +7 (999) 999-99-99
    $element.mask('+7 (999) 999-99-99', {
        placeholder: '+7 (___) ___-__-__'
    });

    // Функция установки курсора после "+7 ("
    const focusHandler = function() {
        // Небольшая задержка, чтобы маска успела примениться браузером
        setTimeout(() => {
            setCaretPosition(inputElement, 4);
        }, 0);
    };

    // Вешаем обработчики на фокус и клик
    // Клик нужен, чтобы перехватить момент, если пользователь кликнул в середину строки
    $element.on('focus click', focusHandler);

    // При потере фокуса очищаем поле, если введены только префикс
    $element.on('blur', function() {
        if ($(this).val() === '+7 (') {
            $(this).val('');
        }
    });
}