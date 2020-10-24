const fs = require("fs");

import MainMenu from "./prompts/MainMenu";

class Model {
  constructor() {}

  loadConfigJson(configPath) {
    try {
      let rawData = fs.readFileSync(configPath);
      let config = JSON.parse(rawData);
      return config;
    } catch {
      console.log(
        "ERROR: " + configPath + " not found. Please change the config path."
      );
    }
  }

  buildMainMenu() {
    return new MainMenu();
  }
}

export default Model;
