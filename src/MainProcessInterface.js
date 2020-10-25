const { ipcRenderer } = window.nodeRequire("electron");
import { triggerViewUpdate } from "./index.js";

class MainProcessInterface {
  constructor() {
    this.jsonData = {};
    // listen to FILE_OPEN channel
    ipcRenderer.on("FILE_OPEN", (event, args) => {
      console.log("Received a message on FILE_OPEN channel.");
      this.jsonData = args;
      triggerViewUpdate();
    });
  }

  getJsonData() {
    return this.jsonData;
  }

  addEntry(category, entry) {
    this.jsonData[category].append(entry);
    // send username to main.js
    ipcRenderer.send("asynchronous-message", username);
  }
}

export default MainProcessInterface;
