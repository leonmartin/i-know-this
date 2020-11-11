import MainProcessInterface from "./MainProcessInterface.js";

import NotificationManager from "./views/NotificationManager.js";
import OverviewView from "./views/OverviewView.js";
import ListView from "./views/ListView.js";
import AddView from "./views/AddView.js";
import Menu from "./views/Menu.js";

const mainProcessInterface = new MainProcessInterface();
const $menuEntries = document.getElementsByClassName("sidebar-link-p");

// window.onpopstate = function(event) {
//   // handleMenuClick()
//   alert(`location: ${document.location}, state: ${JSON.stringify(event.state)}`)
// }

// add event listeners to menu entries
for (let $entry of $menuEntries) {
  $entry.addEventListener("click", () => handleMenuClick($entry.innerHTML));
}

// inital call for building the view
handleMenuClick("Overview");

function displayNotification(message, type) {
  NotificationManager.displayNotification(message, type);
}

function handleMenuClick(menuItemName) {
  // window.history.pushState(menuItemName, "menu_click");

  Menu.updateMenu(menuItemName);
  // render view with respect to selected menu entry and current json data
  switch (menuItemName) {
    case "Overview":
      OverviewView.renderView(mainProcessInterface.getJsonData());
      break;
    case "List":
      ListView.renderView(mainProcessInterface.getJsonData());
      break;
    case "Add":
      AddView.renderView();
      AddView.bindPlusButtonClick();
      AddView.bindAddButtonClick((entry) => {
        if (entry !== undefined) {
          mainProcessInterface.addEntry(entry);
        }
      });
      break;
  }
}

export { displayNotification };
