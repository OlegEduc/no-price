import { products } from "./productObject.js";
import { rendMainContent } from "./rendMainContent.js";

const searchInput = document.querySelector("#search-input");
const search = document.querySelector(".search");
const btnSearchClear = document.getElementById("btn-search-clear");

//******** фильтр по номенклатуре ******
function renderOfSearch() {
  // функция для поиска по названию товара
  const findString = searchInput.value.toLowerCase();
  const productNames = document.querySelectorAll(
    "div.category-goods, div.text-goods-name"
  );
  console.dir(productNames);
  let arrGoods = Array.from(productNames);
  let curentCategory;
  for (i = 0; i < arrGoods.length; i++) {
    if (arrGoods[i].classList.contains("category-goods")) {
      curentCategory = arrGoods[i];
      curentCategory.style["display"] = findString === "" ? "grid" : "none";
    } else {
      let str = arrGoods[i].innerText.toLowerCase();
      if (str.includes(findString)) {
        arrGoods[i].parentElement.parentElement.style = "display: grid";
        curentCategory.style["display"] = "grid";
      } else {
        arrGoods[i].parentElement.parentElement.style = "display: none";
      }
    }
  }
}

// очистка поля ввода строки поиска
btnSearchClear.addEventListener("click", () => {
  if (searchInput.value === "" && window.innerWidth <= 600) {
    search.style.cssText = `
    display : none; `;
  }

  searchInput.value = "";
  if (window.innerWidth <= 600) {
    if (searchInput.value === "") {
      btnSearchClear.innerText = "Закрити";
    } else {
      btnSearchClear.innerText = "Очистити";
    }
  }
  searchInput.focus();
  returnObjectOfSearch();
});

searchInput.addEventListener("input", () => {
  if (window.innerWidth <= 600) {
    if (searchInput.value === "") {
      btnSearchClear.innerText = "Закр";
    } else {
      btnSearchClear.innerText = "Очистити";
    }
  }
  if (searchInput.value.length > 0) {
    if (window.innerWidth <= 600) {
      btnSearchClear.innerText = "Очистити";
    }
  }
  returnObjectOfSearch();
});

function returnObjectOfSearch() {
  let category; // категории товаров
  let product; // товар
  const place = document.querySelector(".content");
  const resaultObj = Object();
  let catInObj = false;
  for (let key in products) {
    // получаем категории товаров (ключи верхнего уровня товаров)
    category = products[key];
    for (let elem in category) {
      // получаем товары в ктаегории (ключи второго уровня вложенности)
      product = category[elem];
      if (
        product["productName"]
          .toLowerCase()
          .includes(searchInput.value.toLowerCase()) ||
        product["productFullName"]
          .toLowerCase()
          .includes(searchInput.value.toLowerCase())
      ) {
        if (!catInObj) {
          //если найден хоть один элемент - добавляем категорию в результирующий объект
          resaultObj[key] = Object();
          catInObj = true; // помечаем что категория уже добавлена в результирующий объект
        }
        resaultObj[key][elem] = Object(category[elem]); // добавляем элементы в категорию
      }
    }
    catInObj = false;
  }

  place.innerHTML = ""; // очищаем содержимое контента
  if (Object.keys(resaultObj).length > 0) {
    rendMainContent(resaultObj); // выводим результат поиска
  } else {
    // если ничего не нашли
    place.style.cssText = `font-size: 2.5rem; 
                          color: green;
                          text-aline: center; 
                          padding: auto; 
                          aline-items: center; 
                          justify-content: center;;
                          justify-content: center;`;
    place.innerText = "За Вашим запитом співпадінь не знайдено";
  }
}
