const fs = require("fs");
const { config } = require("process");

const CONFIG_PATH = "./config.json";

class FileManager {
  static loadConfigFromFile() {
    return this.loadJsonFromFile(CONFIG_PATH);
  }

  static writeConfigToFile(configData) {
    return this.writeJsonToFile(configData, CONFIG_PATH);
  }

  static loadJsonFromFile(filePath) {
    try {
      const rawData = fs.readFileSync(filePath);
      const parsedData = JSON.parse(rawData);
      return parsedData;
    } catch (err) {
      console.error(err);
    }
  }

  static writeJsonToFile(filePath, jsonData) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(jsonData));
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}

module.exports = FileManager;
