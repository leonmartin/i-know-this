import Model from "../model/Model";
import View from "../view/View";

class Controller {
  constructor(configPath) {
    this.model = new Model();
    this.view = new View();

    this.loadConfigJson(configPath);
    this.buildMainMenu();
    this.startCli();
  }

  loadConfigJson(configPath) {
    this.config = this.model.loadConfigJson(configPath);
    console.log("INFO: " + configPath + " has been successfully loaded.");
  }

  buildMainMenu() {
    this.mainMenu = this.model.buildMainMenu();
  }

  async startCli() {
    console.log("INFO: Starting CLI...");

    if (!this.config["json_path"] || this.config["json_path"] === "") {
      this.view.showInitMenu();
    }

    const response = await this.view.runMainMenu(this.mainMenu);
    this.handleUserResponse(response);
    console.log(response);
  }

  loadJson(jsonPath) {
    this.model.loadJson(jsonPath);
  }

  handleUserResponse(response) {
    switch (response) {
      case response == JSON.parse('{"main_menu":"Load Json"}'): {
        console.log(response);
        break;
      }

      default: {
      }
    }
  }
}

export default Controller;
