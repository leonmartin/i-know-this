const { ipcRenderer } = window.nodeRequire("electron");
import { triggerViewUpdate, displayNotification } from "./index.js";

class MainProcessInterface {
  constructor() {
    this.initListeners();
  }

  initListeners() {
    // listen to FILE_OPEN channel
    ipcRenderer.on("JSON_DATA", (event, args) => {
      console.log("Received a message on JSON_DATA channel.");
      this.jsonData = args;
      triggerViewUpdate();
    });

    // listen to NOTIFICATION_SUCCESS channel
    ipcRenderer.on("NOTIFICATION_SUCCESS", (event, arg) => {
      console.log("Received a message on NOTIFICATION_SUCCESS channel.");
      displayNotification(arg, "SUCCESS");
    });

    // listen to NOTIFICATION_FAIL channel
    ipcRenderer.on("NOTIFICATION_FAIL", (event, arg) => {
      console.log("Received a message on NOTIFICATION_FAIL channel.");
      displayNotification(arg, "FAIL");
    });
  }

  getJsonData() {
    return ipcRenderer.sendSync("REQUEST_JSON_DATA", "");
  }

  addEntry(category, entry) {
    const message = {};
    message[category] = entry;
    // send updated json data to main process on ADD_ENTRY channel
    ipcRenderer.send("ADD_ENTRY", message);
  }
}

export default MainProcessInterface;
