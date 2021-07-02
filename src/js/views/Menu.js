class Menu {
  static updateMenu(menuItemId) {
    console.log(`Menu item ${menuItemId} selected.`);

    const $entry = document.getElementById(menuItemId);

    // update active menu entry
    document.getElementById("active").removeAttribute("id");
    $entry.parentElement.id = "active";
  }
}

export default Menu;
