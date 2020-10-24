const { ipcRenderer } = window.require("electron");
import { triggerViewUpdate } from "./index.js";

class JsonInterface {
  constructor() {
    this.jsonData = {};
    // listen to FILE_OPEN channel
    ipcRenderer.on("FILE_OPEN", (event, args) => {
      console.log(args);
      this.jsonData = args;
      triggerViewUpdate();
    });
  }

  getJsonData() {
    return this.jsonData;
  }
}

export default JsonInterface;
