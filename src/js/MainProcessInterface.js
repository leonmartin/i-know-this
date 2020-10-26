const { ipcRenderer } = window.nodeRequire("electron");
import { triggerViewUpdate, displayNotification } from "./index.js";

class MainProcessInterface {
  constructor() {
    this.jsonData = {};
    this.initListeners();
  }

  initListeners() {
    // listen to FILE_OPEN channel
    ipcRenderer.on("SYNC_FILE_OPEN", (event, args) => {
      console.log("Received a message on FILE_OPEN channel.");
      this.jsonData = args;
      triggerViewUpdate();

      event.returnValue = "SUCCESS";
    });

    // listen to ASYNC_ADD_ENTRY_REPLY channel
    ipcRenderer.on("ASYNC_ADD_ENTRY_REPLY", (event, arg) => {
      console.log("Received a message on ASYNC_ADD_ENTRY_REPLY channel.");

      if (arg === "SUCCESS") {
        displayNotification("New entry successfully added!", "SUCCESS");
      } else if (arg === "FAIL") {
        displayNotification("Persisting new entry failed!", "FAIL");
      }
    });
  }

  getJsonData() {
    return this.jsonData;
  }

  addEntry(category, entry) {
    // add entry; create new category if necessary
    this.jsonData[category] === undefined
      ? (this.jsonData[category] = [entry])
      : this.jsonData[category].push(entry);

    // send updated json data to main process on ADD_ENTRY channel
    ipcRenderer.send("ASYNC_ADD_ENTRY", this.jsonData);
  }
}

export default MainProcessInterface;
