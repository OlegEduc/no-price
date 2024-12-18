//  Возвращает высоту экрана
export function getHeightWindow() {
  if (window.innerHeight > window.innerWidth) {
    return Math.max(window.innerHeight, window.innerWidth);
  } else {
    return Math.min(window.innerHeight, window.innerWidth);
  }
}

// Внутренний размер окна — это ширина и высота области просмотра (вьюпорта).
// Объект window предоставляет свойства innerWidth и innerHeight:

const footer = document.querySelector(".footer");
window.addEventListener("resize", () => {
  setHeightUserWindow();
  setNameBtnClearSearch();
});

// устанавливает надпись для кропки очистки поиска
export function setNameBtnClearSearch() {
  const btn = footer.querySelector(".search #btn-search-clear");

  if (!document.querySelector(".search #btn-search-clear")) {
    return;
  }

  if (window.innerWidth > 600) {
    btn.innerText = "Очистити";
  } else {
    if (footer.querySelector("#search-input").value === "") {
      btn.innerText = "Закрити";
    } else {
      btn.innerText = "Очистити";
    }
  }
}

export function setHeightUserWindow() {
  if (!document.querySelector(".footer")) {
    return;
  }

  const wrapper = document.querySelector(".wrapper");
  const header = document.querySelector(".header");
  const content = document.querySelector(".content");
  const footer = document.querySelector(".footer");
  const windowInnerHeight = getHeightWindow();
  wrapper.style.height = windowInnerHeight + "px";
  content.style.maxHeight =
    windowInnerHeight - footer.style.height - header.style.height + "px";
}
