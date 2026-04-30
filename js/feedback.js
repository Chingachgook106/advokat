// Функция для отправки файла. Она сама по себе.
function sendData() {
    const msg = document.getElementById('message').value.trim();
    const name = document.getElementById('userName').value.trim() || "Аноним";
    const contact = document.getElementById('userEmail').value.trim() || "Не указан";

    if (!msg) {
        alert("Напишите хотя бы что-нибудь в сообщении!");
        return;
    }

    // Собираем всё в одну строку для твоей "записки"
    const resultText = `От: ${name}\nКонтакты: ${contact}\nСообщение: ${msg}`;

    const blob = new Blob([resultText], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', blob, 'message.txt');

    fetch('http://localhost:5000/send-email', {
        method: 'POST',
        body: formData,
    })
    .then(r => r.text())
    .then(res => alert("Сообщение отправлено!"))
    .catch(e => alert("Ошибка отправки. Проверь сервер."));
} // <--- ВОТ ЗДЕСЬ ФУНКЦИЯ ЗАКОНЧИЛАСЬ

// А этот код для слайдера выполняется сам по себе, когда страница загрузится.
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.wrapper');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');

    if (!container || !scrollLeftBtn || !scrollRightBtn) return;

    // Плавная прокрутка кнопками
    scrollRightBtn.addEventListener('click', () => {
        // Прокручиваем на 80% ширины видимого окна
        container.scrollBy({ left: container.offsetWidth * 0.8, behavior: 'smooth' });
    });

    scrollLeftBtn.addEventListener('click', () => {
        container.scrollBy({ left: -container.offsetWidth * 0.8, behavior: 'smooth' });
    });

    // Центрирование при загрузке (по желанию - на вторую колонку)
    setTimeout(() => {
        const columns = container.querySelectorAll('.column');
        if (columns.length > 1 && window.innerWidth <= 992) {
            columns[1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, 500); 
});
