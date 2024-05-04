document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInput = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");

  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
      searchBar.classList.add("open:translate-y-0", "open:ease-in-out");
      searchBar.classList.remove("hidden", "-translate-y-100");
      this.setAttribute("aria-expanded", "true");
      searchInput.focus();
    });
  }

  searchClose.addEventListener("click", function () {
    searchBar.classList.add("hidden", "-translate-y-100");
    searchBar.classList.remove("open:translate-y-0", "open:ease-in-out");
    this.setAttribute("aria-expanded", "false");
  });
});
