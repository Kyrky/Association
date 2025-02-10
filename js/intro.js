$(document).ready(function() {
    $('.intro').animate({ opacity: 1 }, 500, function() {
        $('.content').animate({ opacity: 1 }, 2500);
        setTimeout(function() {
            $('.intro').animate({ opacity: 0 }, 2500, function() {
                $('body').css('filter', 'none');
            });
        }, 500);
    });
});
