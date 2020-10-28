import MainProcessInterface from "./MainProcessInterface.js";
import NotificationManager from "./NotificationManager.js";

import OverviewView from "./views/OverviewView.js";
import ListView from "./views/ListView.js";
import AddView from "./views/AddView.js";

const mainProcessInterface = new MainProcessInterface();
var currentlySelected = "Overview";

const $menuEntries = document.getElementsByClassName("sidebar-link-p");
const $mainContainer = document.getElementById("main-container");

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
  $mainContainer.innerHTML = "";
  const entryText = $entry.innerText;
  console.log(`Menu entry ${entryText} selected.`);

  // update active menu entry
  if (currentlySelected !== entryText) {
    currentlySelected = entryText;
    document.getElementById("active").removeAttribute("id");
    $entry.parentElement.id = "active";
  }

  let view;

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
      view = AddView.getView();
      $mainContainer.innerHTML = view;
      addAddViewFunctionality();
      break;
  }
}

function addAddViewFunctionality() {
  // add event handling for + button in add view
  const $addFormGroupButton = document.getElementById("add-additional-button");

  let counter = 0;

  $addFormGroupButton.addEventListener("click", () => {
    const $buttonGroup = document.getElementById("form-button-group");
    $form.insertBefore(
      AddView.getAdditionalFormGroupNode(++counter),
      $buttonGroup
    );
  });

  // add event handling for submit button in add view
  const $form = document.getElementById("add-form");
  $form.addEventListener("submit", (event) => {
    // prevent default form behavior
    event.preventDefault();

    const entry = {};

    // get category
    const category = document.getElementById("category-input").value;

    // get title
    const title = document.getElementById("title-input").value;
    entry["Title"] = title;

    // iterate over form groups for additional attributes to get other key-value-pairs
    const $additionalAttributes = document.getElementsByClassName(
      "additional-attribute"
    );

    for (let $additionalAttribute of $additionalAttributes) {
      const key = $additionalAttribute.querySelector("#key-input").value;
      const value = $additionalAttribute.querySelector("#value-input").value;

      if (isInputValid(key) && isInputValid(value)) {
        entry[key] = value;
      }
    }

    // issue adding the entry if category and title are valid
    if (isInputValid(category) && isInputValid(title)) {
      mainProcessInterface.addEntry(category, entry);
    }

    triggerViewUpdate();
  });
}

function isInputValid(inputString) {
  let isValid = true;

  if (inputString === undefined || inputString === "") isValid = false;

  if (inputString.trim() == "") isValid = false;

  return isValid;
}

export { triggerViewUpdate, displayNotification };
