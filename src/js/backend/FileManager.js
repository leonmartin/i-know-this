const fs = require("fs");
const { config } = require("process");

const DATA_FOLDER_PATH = "./data";
const CONFIG_PATH = DATA_FOLDER_PATH + "/config.json";
const DEFAULT_JSON_PATH = DATA_FOLDER_PATH + "/default.json";

class FileManager {
  static createFolderStructure() {
    if (!fs.existsSync(DATA_FOLDER_PATH)) {
      fs.mkdirSync(DATA_FOLDER_PATH);
    }

    if (!fs.existsSync(CONFIG_PATH)) {
      this.writeConfigToFile({ json_path: DEFAULT_JSON_PATH });
    }

    if (!fs.existsSync(DEFAULT_JSON_PATH)) {
      this.writeJsonToFile(DEFAULT_JSON_PATH, {});
    }
  }

  static loadConfigFromFile() {
    return this.loadJsonFromFile(CONFIG_PATH);
  }

  static writeConfigToFile(configData) {
    return this.writeJsonToFile(CONFIG_PATH, configData);
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
