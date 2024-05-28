// Отримуємо всі елементи, які можна скопіювати
const copyableElements = document.querySelectorAll('[data-copiable]');

// Додаємо обробник кліка на кожен елемент
copyableElements.forEach(element => {
    element.addEventListener('click', () => {
        // Отримуємо текст, який потрібно скопіювати
        const textToCopy = element.getAttribute('data-copiable');

        // Копіюємо текст у буфер обміну
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // Відображаємо вспливаюче повідомлення
                const notification = document.getElementById('copy-notification');
                notification.textContent = 'Текст скопійовано!';
                notification.classList.add('show-notification');

                // Позиціонуємо повідомлення праворуч від копіюємого тексту
                const rect = element.getBoundingClientRect();
                notification.style.top = rect.top + 'px';
                notification.style.left = rect.right + 'px';

                // Після 3 секунд приховуємо повідомлення
                setTimeout(() => {
                    notification.textContent = '';
                    notification.classList.remove('show-notification');
                }, 3000);
            })
            .catch(err => console.error('Помилка при копіюванні: ', err));
    });
});

// Видаляємо повідомлення, якщо користувач клікнув деінде на сторінці
document.addEventListener('click', event => {
    const notification = document.getElementById('copy-notification');
    notification.textContent = '';
    notification.classList.remove('show-notification');
});
