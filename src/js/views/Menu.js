class Menu {
  static updateMenu($entry) {
    const entryText = $entry.innerText;
    console.log(`Menu entry ${entryText} selected.`);

    // update active menu entry
    document.getElementById("active").removeAttribute("id");
    $entry.parentElement.id = "active";

    return entryText;
  }
}

export default Menu;
