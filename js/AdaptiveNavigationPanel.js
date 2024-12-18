// import { setHeightUserWindow } from "./ElemSizeControl";

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function hsddenVisibleElem(el) {
  if (el === null) {
    return;
  }
  el.classList.toggle("hidedElement");
}

// обработка клика по кнопке категорий товаров

if (document.querySelector(".footer")) {
  const btnCategory = document.querySelector("#btn-category");

  btnCategory.addEventListener("click", function () {
    hsddenVisibleElem(sidebarDropdown);
  });

  const sidebarDropdown = document.querySelector(".sidebar-dropdown");
  sidebarDropdown.addEventListener("click", function () {
    hsddenVisibleElem(sidebarDropdown);
  });

  // /обработка клика по кнопке категорий товаров

  // обработка клика по кнопке поиска <600px
  const btnSearch = document.querySelector("#btn-search");
  btnSearch.addEventListener("click", function () {
    const search = document.querySelector(".search");
    const searchInput = document.querySelector("#search-input");
    const btnSearchClear = document.querySelector("#btn-search-clear");
    const dropdown = document.querySelector(".footer .dropdown");

    getComputedStyle(dropdown);

    if (getComputedStyle(search).display === "none") {
      if (searchInput.value === "") {
        btnSearchClear.innerText = "Закрити";
      }
      search.style.display = "flex";
      dropdown.style.display = "none";
    }
    searchInput.focus();
  }); // /обработка клика по кнопке поиска <600px

  // обработка клика по кнопке очистити <600px
  const btnSearchClear = document.querySelector("#btn-search-clear");
  btnSearchClear.onclick = function () {
    const search = document.querySelector(".search");
    const dropdown = document.querySelector(".footer .dropdown");

    if (btnSearchClear.innerText === "Закрити") {
      search.style.display = "none";
      dropdown.style.display = "flex";
    }
  }; // /обработка клика по кнопке очистити <600px
}
