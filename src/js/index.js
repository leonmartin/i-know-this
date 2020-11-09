import MainProcessInterface from "./MainProcessInterface.js";

import NotificationManager from "./views/NotificationManager.js";
import OverviewView from "./views/OverviewView.js";
import ListView from "./views/ListView.js";
import AddView from "./views/AddView.js";
import Menu from "./views/Menu.js";

const mainProcessInterface = new MainProcessInterface();
const $menuEntries = document.getElementsByClassName("sidebar-link-p");

// add event listeners to menu entries
for (let $entry of $menuEntries) {
  $entry.addEventListener("click", () => handleMenuClick($entry));
}

// inital call for building the view
triggerViewUpdate();

function triggerViewUpdate() {
  // update the view based on the currently active menu entry
  handleMenuClick(document.getElementById("active"));
}

function displayNotification(message, type) {
  NotificationManager.displayNotification(message, type);
}

function handleMenuClick($entry) {
  const entryText = Menu.updateMenu($entry);

  // render view with respect to selected menu entry and current json data
  switch (entryText) {
    case "Overview":
      OverviewView.renderView(mainProcessInterface.getJsonData());
      break;
    case "List":
      ListView.renderView(mainProcessInterface.getJsonData());
      break;
    case "Add":
      AddView.renderView();
      AddView.bindPlusButtonClick();
      AddView.bindAddButtonClick(() => {
        mainProcessInterface.addEntry(AddView.getValidatedEntry());
      });
      break;
  }
}

export { triggerViewUpdate, displayNotification };
