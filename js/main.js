import { getHeightWindow, setNameBtnClearSearch } from "./ElemSizeControl.js";
import { setHeightUserWindow } from "./ElemSizeControl.js";

const footer = document.querySelector(".footer");

if (window.innerWidth > 600) {
  footer.querySelector(".search").style.display = "flex";
  footer.querySelector(".footer .dropdown").style.display = "none";
} else {
  footer.querySelector(".search").style.display = "none";
  footer.querySelector(".footer .dropdown").style.display = "flex";
}


window.addEventListener("orientationchange", function () {
  if (window.innerWidth > 600) {
    footer.querySelector(".search").style.display = "none";
    footer.querySelector(".footer .dropdown").style.display = "flex";
  } else {
    footer.querySelector(".search").style.display = "flex";
    footer.querySelector(".footer .dropdown").style.display = "none";
  }
});

