import { products, productCategorys, anouns } from "./productObject.js";
import {
  rendSidebarContent,
  rendSidebarDropdownContent,
} from "./renderSidebar.js";
import { setHeightUserWindow } from "./ElemSizeControl.js";

setHeightUserWindow();
//наполняем sidebar контентом (группами товара)
const sidebar = document.querySelector(".sidebar");
sidebar.innerHTML = rendSidebarContent(productCategorys);
const categoryDropdown = document.querySelector(".sidebar-dropdown");
categoryDropdown.innerHTML = rendSidebarDropdownContent(productCategorys);

const sectionCart = `<div class="items counter-wrapper">
                        <div class="items__current" data-action="minus">-</div>
                        <input class="items__current" data-counter value="0">
                        <div class="items__current" data-action="plus">+</div>
                        <div class="items__current" data-action="total-sum"></div>
                        <button data-cart class="add-to-cart" data-action="addToCart">додати в кошик</button>
                     </div>`;

export function rendMainContent(prod) {
  //наполняем товарами из объекта products

  const place = document.querySelector(".content");
  const prodLevelOne = Object.values(prod);
  let sectionGood = "";
  let item;
  let productsItems;
  let category;

  if (anouns.length) {
    let anounsDiv = "";
    for (let i = 0; i < anouns.length; i++) {
      anounsDiv += `
      <p class="anouns">
        ${anouns[i]}
      </p>`;
    }
    place.innerHTML = anounsDiv;
  }

  // place.innerHTML = `<div class="promotion">
		// 		<img class="promotion-img" src="https:\/\/olegeduc.github.io\/food-trade\/image\/action\/promotion-dobrij-ranok-1l.gif" alt="dobrij-ranok-promotion">
		// 	</div>`;

  // картинка акции
  // place.innerHTML =  place.innerHTML + `<div class="grid-item-action">
  //                                            <img class="img-action" src="https://olegeduc.github.io/food-trade/image/action/action-grechka-1kg-3.jpg">
  //                                       </div> `;
  // перебираем все ключи верхнего уровня вложенности products
  for (let i = 0; i < prodLevelOne.length; i++) {
    // категория товара
    category = Object.keys(prod)[i];
    const cat = `
            <div class="category-goods" id="${category}">        		
				<h2>${category}</h2>
			</div>`;

    place.insertAdjacentHTML("beforeEnd", cat);

    productsItems = new Object(prodLevelOne[i]);

    for (item in productsItems) {
      // содержимое категории товара
      const productCode = productsItems[item]["productCode"];
      const img = productsItems[item]["imgSrc"];
      let productName = productsItems[item]["productFullName"];
      const minCountUnit = productsItems[item]["minCountUnit"];
      const unit = productsItems[item]["unit"];
      const baseUnit = productsItems[item]["baseUnit"];
      const previousPrice = productsItems[item]["previousPrice"];
      const price = productsItems[item]["price"];
      sectionGood = `
				<div class="grid-item" data-productCode = ${productCode}>
					<div class="item-img-wrapper">
						<img src="${img}">
					</div>
					<div class="text-goods-wrapper">
						<div class="text-goods-name">${productName} 
						<div class="text-min-qty"> від ${minCountUnit} ${baseUnit}  </div> 
          </div> `;
      /* <div class="text-min-qty ${Number(price) ? "" : " hidedElement"}"> від ${minCountUnit} ${baseUnit}  </div>  */

      if (parseFloat(previousPrice) > parseFloat(price)) {
        sectionGood += `<div class="text-goods-previousPrice">
                          <h3> ${getValuePrice(previousPrice)}</h3>
                        </div>      
					              <div class="text-goods-price" > ${getValuePrice(
                          price,
                          unit
                        )} </div>	
                      </div>`;
      } else {
        sectionGood += `     
						<div class="text-goods-price" >${getValuePrice(
              price,
              unit
            )} </div>                   
        </div>`;
      }

      place.insertAdjacentHTML("beforeEnd", sectionGood);
    }

    // ищем все секции категорий и меняем в последней текст
    const catDiv = document.querySelectorAll(".category-goods");
    if (category != "focusProduct") {
      catDiv[
        catDiv.length - 1
      ].innerHTML = `<h2>${productsItems[item]["category"]}</h2>`;
    } else {
      catDiv[catDiv.length - 1].innerHTML = "";
    }
  }
}

export function getValuePrice(el, baseUnit, sect) {
  let elOfFloat = Number(el);

  if (elOfFloat) {
    return `&#8372 ${parseFloat(el).toFixed(2)} <span class="card-unit"> ${
      baseUnit ? baseUnit : ""
    }</span>`;
  } else {
    return "<span style='width: 100%; text-align: center' >Ціна за домовленістю</span>";
  }
}

rendMainContent(products);
