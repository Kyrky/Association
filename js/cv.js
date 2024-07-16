document.addEventListener('DOMContentLoaded', function() {
    const toggles = document.querySelectorAll('.details-toggle');

    toggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const detailsBlock = this.nextElementSibling;

            if (detailsBlock.classList.contains('show')) {
                detailsBlock.classList.remove('show');
            } else {
                detailsBlock.classList.add('show');
            }
        });
    });
});
