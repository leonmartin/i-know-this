import OverviewView from "./views/OverviewView.js";
import ListView from "./views/ListView.js";
import AddView from "./views/AddView.js";

var currentlySelected = "";
const views = {};

// add event listeners to menu entries
const $menuEntries = document.getElementsByClassName("sidebar-link-p");
for (let $entry of $menuEntries) {
  $entry.addEventListener("click", () => handleMenuClick($entry));
}

// inital "click" on overview
handleMenuClick(document.getElementById("active"));


function handleMenuClick($entry) {
  const entryText = $entry.innerText;
  console.log(`Menu entry ${entryText} clicked.`);

  // ignore click if menu entry already active
  if (entryText == currentlySelected) return;

  // update active menu entry
  currentlySelected = entryText;
  document.getElementById("active").removeAttribute("id");
  $entry.parentElement.id = "active";

  // create view if not already present
  if (views[entryText] === undefined) {
    buildView(entryText);
  }

  injectView(views[entryText].getView());
}

function buildView(entryText) {
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

function injectView(view) {
  const $mainContainer = document.getElementById("main");
  $mainContainer.innerHTML = view;
}
