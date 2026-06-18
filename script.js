document.addEventListener('DOMContentLoaded', () => {
  const menuTriggers = document.querySelectorAll('.topmenu > li > a.down');

  menuTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      // Логика клика работает только на мобильных экранах (ширина < 768px)
      if (window.innerWidth < 768) {
        e.preventDefault();
        e.stopPropagation();

        const parentLi = trigger.parentElement;
        const isOpen = parentLi.classList.contains('is-open');

        // Закрываем все остальные открытые подменю перед открытием текущего
        document.querySelectorAll('.topmenu > li').forEach(li => {
          if (li !== parentLi) {
            li.classList.remove('is-open');
          }
        });

        // Переключаем класс состояния текущего подменю
        parentLi.classList.toggle('is-open', !isOpen);
      }
    });
  });

  // Закрытие активного подменю при клике вне области навигации
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768) {
      const nav = document.querySelector('.sticky-nav');
      if (nav && !nav.contains(e.target)) {
        document.querySelectorAll('.topmenu > li').forEach(li => {
          li.classList.remove('is-open');
        });
      }
    }
  });
});