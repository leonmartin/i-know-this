import MainProcessInterface from "./backend/MainProcessInterface.js";
import NotificationManager from "./views/NotificationManager.js";
import OverviewView from "./views/OverviewView.js";
import ListView from "./views/ListView.js";
import AddView from "./views/AddView.js";
import Menu from "./views/Menu.js";

class Controller {
  constructor() {
    this.mainProcessInterface = new MainProcessInterface();
    const $menuEntries = document.getElementsByClassName("sidebar-link-p");

    // backward button functionality
    window.onpopstate = (event) => {
      if (event.state !== null) {
        this.handleMenuClick(event.state);
      }
    };

    // add event listeners to menu entries
    for (let $entry of $menuEntries) {
      $entry.addEventListener("click", () => {
        const menuItemId = $entry.id;
        window.history.pushState(menuItemId, "menu_click");
        this.handleMenuClick(menuItemId);
      });
    }

    // inital call for building the view
    const initialMenuItem = "menu-item-Overview";
    window.history.pushState(initialMenuItem, "initial_view");
    this.handleMenuClick(initialMenuItem);
  }

  handleMenuClick(menuItemId) {
    Menu.updateMenu(menuItemId);
    // render view with respect to selected menu entry
    switch (menuItemId) {
      case "menu-item-Overview":
        OverviewView.renderView(this.mainProcessInterface.requestAllEntries());
        break;
      case "menu-item-List":
        ListView.renderView(this.mainProcessInterface.requestAllEntries());
        ListView.bindDeleteButtonsClick((id) => {
          if (id !== undefined) {
            this.mainProcessInterface.deleteEntryById(id);
          }
        });
        ListView.bindEditButtonsClick((id) => {
          if (id !== undefined) {
            const entry = this.mainProcessInterface.getEntryById(id);
            AddView.renderView(entry);
            AddView.bindPlusButtonClick();
            AddView.bindAddButtonClick((entry) => {
              this.mainProcessInterface.addOrUpdateEntry(entry);
            });
          }
        });
        break;
      case "menu-item-Add":
        AddView.renderView();
        AddView.bindPlusButtonClick();
        AddView.bindAddButtonClick((entry) => {
          this.mainProcessInterface.addOrUpdateEntry(entry);
        });
        break;
    }
  }

  static displayNotification(message, type) {
    NotificationManager.displayNotification(message, type);
  }
}

new Controller();

export default Controller;
