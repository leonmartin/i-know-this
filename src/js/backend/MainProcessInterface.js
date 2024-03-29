const { ipcRenderer } = window.nodeRequire("electron");
import Controller from "../controller.js";

class MainProcessInterface {
  constructor() {
    this.initListeners();
  }

  /**
   * Initiates the listeners for communication with the main process.
   */
  initListeners() {
    // listen to NOTIFICATION_SUCCESS channel
    ipcRenderer.on("NOTIFICATION_SUCCESS", (event, arg) => {
      console.log(
        "Renderer process received a message on NOTIFICATION_SUCCESS channel."
      );
      Controller.displayNotification(arg, "SUCCESS");
    });

    // listen to NOTIFICATION_FAIL channel
    ipcRenderer.on("NOTIFICATION_FAIL", (event, arg) => {
      console.log(
        "Renderer process received a message on NOTIFICATION_FAIL channel."
      );
      Controller.displayNotification(arg, "FAIL");
    });
  }

  requestAllEntries() {
    return ipcRenderer.sendSync("REQUEST_ALL_ENTRIES", "");
  }

  getEntryById(id) {
    return ipcRenderer.sendSync("REQUEST_ENTRY", id);
  }

  getCategoryOfEntryById(id) {
    return ipcRenderer.sendSync("REQUEST_ENTRY_CATEGORY", id);
  }

  addOrUpdateEntry(entry) {
    ipcRenderer.send("ADD_OR_UPDATE_ENTRY", entry);
  }

  deleteEntryById(id) {
    // send updated json data to main process on ADD_ENTRY channel
    console.log(id);
    ipcRenderer.send("DELETE_ENTRY", id);
  }
}

export default MainProcessInterface;
