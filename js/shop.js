document.addEventListener('DOMContentLoaded', function () {
    const toggles = document.querySelectorAll('.category-toggle');
  
    toggles.forEach(toggle => {
      toggle.addEventListener('click', function () {
        const content = this.nextElementSibling;
  
        // Закрываем все открытые блоки
        document.querySelectorAll('.category-content').forEach(item => {
          if (item !== content) {
            item.classList.remove('show');
          }
        });
  
        // Переключаем видимость текущего блока
        content.classList.toggle('show');
      });
    });
  });
  