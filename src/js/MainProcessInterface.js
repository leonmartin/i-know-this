const { ipcRenderer } = window.nodeRequire("electron");
import { displayNotification } from "./index.js";

class MainProcessInterface {
  constructor() {
    this.initListeners();
  }

  initListeners() {
    // listen to FILE_OPEN channel
    ipcRenderer.on("JSON_DATA", (event, args) => {
      console.log("Renderer process received a message on JSON_DATA channel.");
      this.jsonData = args;
    });

    // listen to NOTIFICATION_SUCCESS channel
    ipcRenderer.on("NOTIFICATION_SUCCESS", (event, arg) => {
      console.log(
        "Renderer process received a message on NOTIFICATION_SUCCESS channel."
      );
      displayNotification(arg, "SUCCESS");
    });

    // listen to NOTIFICATION_FAIL channel
    ipcRenderer.on("NOTIFICATION_FAIL", (event, arg) => {
      console.log(
        "Renderer process received a message on NOTIFICATION_FAIL channel."
      );
      displayNotification(arg, "FAIL");
    });
  }

  getJsonData() {
    return ipcRenderer.sendSync("REQUEST_JSON_DATA", "");
  }

  addEntry(entry) {
    // send updated json data to main process on ADD_ENTRY channel
    console.log(entry);
    ipcRenderer.send("ADD_ENTRY", entry);
  }
}

export default MainProcessInterface;
