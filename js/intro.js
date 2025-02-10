$(document).ready(function() {
    if ($(window).width() >= 1000) {
      $('.intro').animate({ opacity: 1 }, 500, function() {
        $('.content').animate({ opacity: 1 }, 2500);
        setTimeout(function() {
          $('.intro').animate({ opacity: 0 }, 2500, function() {
            $('body').css('filter', 'none');
          });
        }, 500);
      });
    } else {
      $('.intro').remove();
      $('.content').css('opacity', 1);
    }
  });
  