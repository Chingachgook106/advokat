// Функция для отправки файла. Она сама по себе.
function sendFile() {
    const message = document.getElementById('message').value.trim();
    if (!message) {
        alert("Поле сообщения не может быть пустым!");
        return;
    }
    const blob = new Blob([message], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', blob, 'message.txt');

    fetch('http://localhost:5000/send-email', { // Убедись, что адрес правильный для твоего сервера
        method: 'POST',
        body: formData,
    })
    .then(response => response.text())
    .then(result => {
        alert(result);
        console.log('Ответ сервера:', result);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке!');
    });
} // <--- ВОТ ЗДЕСЬ ФУНКЦИЯ ЗАКОНЧИЛАСЬ

// А этот код для слайдера выполняется сам по себе, когда страница загрузится.
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.wrapper');
    if (!container) return; // Проверка на месте, это хорошо

    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    const columns = document.querySelectorAll('.column');

    const scrollToCenter = () => {
        if (window.innerWidth <= 992 && columns.length > 1) {
            const secondColumn = columns[1];
            const scrollPos = secondColumn.offsetLeft - (container.offsetWidth - secondColumn.offsetWidth) / 2;
            container.scrollLeft = scrollPos;
        }
    };

    scrollToCenter();
    window.addEventListener('resize', scrollToCenter);

    scrollRightBtn.addEventListener('click', () => {
        const columnWidth = columns[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(container).gap) || 0; // Добавил || 0 на всякий случай
        const scrollAmount = columnWidth + gap;
        container.scrollLeft += scrollAmount;
    });

    scrollLeftBtn.addEventListener('click', () => {
        const columnWidth = columns[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(container).gap) || 0; // Добавил || 0 на всякий случай
        const scrollAmount = columnWidth + gap;
        container.scrollLeft -= scrollAmount;
    });
});