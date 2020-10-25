const { ipcRenderer } = window.nodeRequire("electron");
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
