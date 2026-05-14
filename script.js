/**
 * UI & Feedback Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. СЛАЙДЕР: Логика перемещения
  const track = document.querySelector('.slider-track');
  const nextBtn = document.querySelector('.scroll-btn.next');
  const prevBtn = document.querySelector('.scroll-btn.prev');

  if (track && nextBtn && prevBtn) {
    const step = () => track.clientWidth * 0.8;

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });
  }

  // 2. ФОРМА: Отправка "записки"
  const feedbackForm = document.getElementById('feedbackForm');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (event) => {
      // Предотвращаем перезагрузку страницы
      event.preventDefault();

      // Собираем всё, что ввёл пользователь (даже если там пусто или мусор)
      const formData = new FormData(feedbackForm);
      const payload = Object.fromEntries(formData.entries());

      // Имитация или реальная отправка на сервер
      fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(() => {
        console.log('Сообщение ушло:', payload);
        feedbackForm.reset(); // Очищаем форму после отправки
      })
      .catch(err => {
        // Даже если сервер ответил ошибкой, мы не беспокоим пользователя алертами
        console.error('Ошибка сети, но форма очищена для следующей попытки');
        feedbackForm.reset(); 
      });
    });
  }
});