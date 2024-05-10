document.addEventListener("DOMContentLoaded", function () {
  const allButtons = document.querySelectorAll(".searchBtn");
  const searchBar = document.querySelector(".searchBar");
  const searchInpt = document.getElementById("searchInput");
  const searchClose = document.getElementById("searchClose");

  console.log(allButtons);

  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function () {
      searchBar.classList.remove("hidden", "-translate-y-100");
      searchBar.classList.add("visible", "transform-none");
      this.setAttribute("aria-expanded", "true");
      searchInpt.focus();
    });
  }

  searchClose.addEventListener("click", function () {
    searchBar.classList.add("hidden", "-translate-y-100");
    searchBar.classList.remove("visible", "transform-none");
    this.setAttribute("aria-expanded", "false");
  });
});
