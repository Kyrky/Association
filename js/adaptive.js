$(document).ready(function() {
    function adjustLayout() {
        var windowWidth = $(window).width();
    }

    // Вызываем функцию при загрузке страницы и при изменении размера окна
    adjustLayout();
    $(window).resize(adjustLayout);

    // Открытие/закрытие мобильного меню
    $('.menu-toggle').click(function() {
        $('nav').toggleClass('open');
    });

    // Закрытие меню при клике на пункт меню
    $('nav a').click(function() {
        if ($(window).width() <= 900) {
            $('nav').removeClass('open');
        }
    });

    // Плавная прокрутка для навигации
    $('nav a').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 60 // Учитываем высоту меню
        }, 500);
    });
});