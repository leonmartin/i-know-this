import MainProcessInterface from "./MainProcessInterface.js";

import OverviewView from "./views/OverviewView.js";
import ListView from "./views/ListView.js";
import AddView from "./views/AddView.js";

const mainProcessInterface = new MainProcessInterface();
const views = {};
var currentlySelected = "Overview";

// add event listeners to menu entries
const $menuEntries = document.getElementsByClassName("sidebar-link-p");
for (let $entry of $menuEntries) {
  $entry.addEventListener("click", () => handleMenuClick($entry));
}

// inital call for building the view
triggerViewUpdate();

function triggerViewUpdate() {
  // update the view based on the currently active menu entry
  handleMenuClick(document.getElementById("active"));
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

  // create view instance if not already present
  if (views[entryText] === undefined) {
    switch (entryText) {
      case "Overview":
        views[entryText] = new OverviewView();
        break;
      case "List":
        views[entryText] = new ListView();
        break;
      case "Add":
        views[entryText] = new AddView();
        break;
    }
  }

  // get view from view instance with respect to current json data
  const view = views[entryText].getView(mainProcessInterface.getJsonData());

  // inject the view
  const $mainContainer = document.getElementById("main-view");
  $mainContainer.innerHTML = view;

  // add event handling for submit button in add view
  if (currentlySelected == "Add") {
    const $form = document.getElementById("add-form");
    $form.addEventListener("submit", (event) => {
      event.preventDefault();

      let category = document.getElementById("category-input").value;
      let title = document.getElementById("title-input").value;

      let entry = { Title: title };

      console.log(category, entry);

      // TODO
      //mainProcessInterface.addEntry(category, title)
    });
  }
}

export { triggerViewUpdate };
