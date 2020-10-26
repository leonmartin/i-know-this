import MainProcessInterface from "./MainProcessInterface.js";
import NotificationManager from "./NotificationManager.js";

import OverviewView from "./views/OverviewView.js";
import ListView from "./views/ListView.js";
import AddView from "./views/AddView.js";

const mainProcessInterface = new MainProcessInterface();
var currentlySelected = "Overview";

// add event listeners to menu entries
const $menuEntries = document.getElementsByClassName("sidebar-link-p");
for (let $entry of $menuEntries) {
  $entry.addEventListener("click", () => handleMenuClick($entry));
}

// // inital call for building the view
// triggerViewUpdate();

function triggerViewUpdate() {
  // update the view based on the currently active menu entry
  handleMenuClick(document.getElementById("active"));
}

function displayNotification(message, type) {
  NotificationManager.displayNotification(message, type);
}

function handleMenuClick($entry) {
  const entryText = $entry.innerText;
  console.log(`Menu entry ${entryText} selected.`);

  // update active menu entry
  if (currentlySelected !== entryText) {
    currentlySelected = entryText;
    document.getElementById("active").removeAttribute("id");
    $entry.parentElement.id = "active";
  }

  let view;
  const $mainContainer = document.getElementById("main-view");

  // get view with respect to selected menu entry and current json datas
  switch (entryText) {
    case "Overview":
      view = OverviewView.getView(mainProcessInterface.getJsonData());
      $mainContainer.innerHTML = view;
      break;
    case "List":
      view = ListView.getView(mainProcessInterface.getJsonData());
      $mainContainer.innerHTML = view;
      break;
    case "Add":
      view = AddView.getView(mainProcessInterface.getJsonData());
      $mainContainer.innerHTML = view;
      addAddViewFunctionality();
      break;
  }
}

function addAddViewFunctionality() {
  // add event handling for submit button in add view
  const $form = document.getElementById("add-form");
  $form.addEventListener("submit", (event) => {
    event.preventDefault();

    const category = document.getElementById("category-input").value;
    const entry = {};

    // iterate over other form groups to get key-value-pairs
    const $formGroups = document.getElementsByClassName("form-group");

    for (let $formGroup of $formGroups) {
      const key = $formGroup.querySelector("label").innerText;

      if (key === "Category") {
        continue;
      }

      const value = $formGroup.querySelector("input").value;
      entry[key] = value;
    }

    mainProcessInterface.addEntry(category, entry);

    triggerViewUpdate();
  });
}

export { triggerViewUpdate, displayNotification };
