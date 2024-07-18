document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  var openModalButtons = document.querySelectorAll(".open-modal");
  var closeModalButtons = document.querySelectorAll(".close");

  openModalButtons.forEach(function (button) {
      button.addEventListener("click", function (event) {
          event.preventDefault();
          var modalId = this.getAttribute("data-modal");
          var modal = document.getElementById(modalId);
          modal.style.display = "block";
      });
  });

  closeModalButtons.forEach(function (button) {
      button.addEventListener("click", function () {
          var modal = this.closest(".modal");
          modal.style.display = "none";
      });
  });

  window.addEventListener("click", function (event) {
      modals.forEach(function (modal) {
          if (event.target == modal) {
              modal.style.display = "none";
          }
      });
  });
});
