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
}

export default MainProcessInterface;
