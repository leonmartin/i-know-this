class Menu {
  static updateMenu(menuItemName) {
    console.log(`Menu item ${menuItemName} selected.`);

    const $entry = document.getElementById(`menu-item-${menuItemName}`);

    // update active menu entry
    document.getElementById("active").removeAttribute("id");
    $entry.parentElement.id = "active";
  }
}

export default Menu;
