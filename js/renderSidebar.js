function rendSidebarContent(objCategorys) {
  let sidebarHTML = "";
  for (let key in objCategorys) {
    sidebarHTML =
      sidebarHTML +
      `  <a class="sidebar-item" href="#${key}"> ${objCategorys[key]} </a>`;
  }
  return sidebarHTML;
}
function rendSidebarDropdownContent(objCategorys) {
  let sidebarHTML = "";
  for (let key in objCategorys) {
    sidebarHTML =
      sidebarHTML +
      `  <a class="sidebar-dropdown-item" href="#${key}"> ${objCategorys[key]} </a>`;
  }
  return sidebarHTML;
}

export { rendSidebarContent, rendSidebarDropdownContent };
