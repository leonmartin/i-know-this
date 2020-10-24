const { prompt } = require("enquirer");

class MainMenu {
  constructor() {
    this.mainMenuCallbacks = this.getMainMenuCallbacks();
  }

  run() {
    const response = prompt({
      type: "select",
      name: "main_menu",
      message: "Main Menu - What do you want to do?",
      choices: ["Load Json", "Create Entry", "Search Entry", "Delete Entry"],
    });

    return response;
  }

  getMainMenuCallbacks() {
    function handleLoadJson() {}

    function handleCreateEntry() {}

    function handleSearchEntry() {}

    function handleDeleteEntry() {}

    function handleQuit() {}

    return {
      "Load JSON": handleLoadJson,
      "Create Entry": handleCreateEntry,
      "Search Entry": handleSearchEntry,
      "Delete Entry": handleDeleteEntry,
      Quit: handleQuit,
    };
  }
}

module.exports = MainMenu;
