import { products, productCategorys } from "./productObject.js";

window.addEventListener("click", function (event) {
  let curentEl;

  const modalWrapper = this.document.querySelector(".modal-wrapper");
  if (findAncestor(event.target, "grid-item")) {
    curentEl = findAncestor(event.target, "grid-item");

    const img = getElement(curentEl.dataset.productcode, products)["imgSrc"];
    const price = getElement(curentEl.dataset.productcode, products)["price"];
    const productName = getElement(curentEl.dataset.productcode, products)[
      "productFullName"
    ];
    const minCountUnit = getElement(curentEl.dataset.productcode, products)[
      "minCountUnit"
    ];
    const unit = getElement(curentEl.dataset.productcode, products)["unit"];
 const baseUnit = getElement(curentEl.dataset.productcode, products)["baseUnit"];

    modalWrapper.classList.toggle("open");
    this.getComputedStyle(modalWrapper);
    modalWrapper.innerHTML = `
    <div class="modal">		
    <button class="modal-btn-close">X</button>
         <img src="${img}" class='modal-img'>
         <div class="text-goods-name">${productName} <br>
         <span class="text-min-qty">*ціна діє при купівлі від ${minCountUnit} ${baseUnit} </span> </div> 
         <div class="text-goods-price">${parseFloat(price).toFixed(
           2
         )} &#8372</div>	
    </div>
  `;
  }

  if (
    event.target.classList.contains("modal-img") ||
    event.target.classList.contains("modal-btn-close") ||
    event.target.classList.contains("modal-wrapper") ||
    event.target.parentElement.classList.contains("modal-wrapper")
  ) {
    modalWrapper.classList.toggle("open");
  }
});

// находит предка элемента с указанным классом
function findAncestor(el, cls) {
  while ((el = el.parentElement) && !el.classList.contains(cls)) {}
  return el;
}

function getElement(elemId, whereAreWeLooking) {
  for (let key in whereAreWeLooking) {
    for (let el in whereAreWeLooking[key]) {
      if (elemId == whereAreWeLooking[key][el]["productCode"]) {
        return whereAreWeLooking[key][el];
        break;
      }
    }
  }
}
