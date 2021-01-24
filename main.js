const FileManager = require("./src/js/backend/FileManager.js");

const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const path = require("path");
const hash = require("object-hash");

FileManager.createFolderStructure();

app.whenReady().then(createWindow).then(initListeners);
const isMac = process.platform === "darwin";

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minHeight: 500,
    minWidth: 500,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  const menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        {
          label: "Open File",
          accelerator: "CmdOrCtrl+O",
          click() {
            // show dialog to open json file
            dialog
              .showOpenDialog({
                properties: ["openFile"],
                filters: [{ name: "JSON Files", extensions: ["json", "JSON"] }],
              })
              .then((fileObj) => {
                if (!fileObj.canceled) {
                  const filePath = path.relative(".", fileObj.filePaths[0]);
                  // save path to config file for next startup
                  FileManager.loadConfigFromFile()["json_path"] = filePath;
                  FileManager.writeConfigToFile(
                    FileManager.loadConfigFromFile()
                  );
                  // pass parsed json to renderer process
                  const jsonData = FileManager.loadJsonFromFile(
                    FileManager.loadConfigFromFile()["json_path"]
                  );

                  if (jsonData) {
                    sendMessage("JSON_DATA", jsonData, mainWindow);
                  } else {
                    sendMessage(
                      "NOTIFICATION_FAIL",
                      "JSON data could not be loaded!",
                      mainWindow
                    );
                  }
                }
              })
              .catch((err) => {
                console.error(err);
              });
          },
        },
        {
          label: "Exit",
          click() {
            app.quit();
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  // load index.html
  mainWindow.loadFile("./src/html/index.html");

  // close dev tools for testing
  if (process.env.NODE_ENV !== "test") mainWindow.webContents.openDevTools();
}

function sendMessage(channel, content, window) {
  window.webContents.send(channel, content);
}

/**
 * Initializes the listeners for communication with the renderer process.
 */
function initListeners() {
  // init listeners
  ipcMain.on("REQUEST_JSON_DATA", (event) => {
    console.log(
      "Main process received a message on REQUEST_JSON_DATA channel."
    );
    event.returnValue = FileManager.loadJsonFromFile(
      FileManager.loadConfigFromFile()["json_path"]
    );
  });

  ipcMain.on("REQUEST_ENTRY", (event, arg) => {
    console.log(
      `Main process received a message on REQUEST_ENTRY channel with id '${arg}'.`
    );

    const jsonData = FileManager.loadJsonFromFile(
      FileManager.loadConfigFromFile()["json_path"]
    );

    // find and return entry
    for (let category in jsonData) {
      if (jsonData[category].find((entry) => entry["id"] === arg)) {
        event.returnValue = jsonData[category].find(
          (entry) => entry["id"] === arg
        );
        break;
      }
    }
  });

  ipcMain.on("REQUEST_ENTRY_CATEGORY", (event, arg) => {
    console.log(
      `Main process received a message on REQUEST_ENTRY_CATEGORY channel with id '${arg}'.`
    );

    const jsonData = FileManager.loadJsonFromFile(
      FileManager.loadConfigFromFile()["json_path"]
    );

    // find and return category of entry
    for (let category in jsonData) {
      if (jsonData[category].find((entry) => entry["id"] === arg)) {
        event.returnValue = category;
        break;
      }
    }
  });

  ipcMain.on("ADD_ENTRY", (event, arg) => {
    console.log(
      `Main process received a message on ADD_ENTRY channel with object ${JSON.stringify(
        arg
      )}.`
    );

    // extract category and entry
    const category = Object.keys(arg)[0];
    const entry = arg[category];

    const jsonData = FileManager.loadJsonFromFile(
      FileManager.loadConfigFromFile()["json_path"]
    );

    if (entry["id"] !== undefined) {
      // find and delete entry
      for (let category in jsonData) {
        if (jsonData[category].find((oldEntry) => oldEntry["id"] === arg)) {
          const index = jsonData[category].findIndex(
            (oldEntry) => oldEntry["id"] === arg
          );
          jsonData[category].splice(index, 1);

          // delete category if no entries are left
          if (jsonData[category].length === 0) {
            delete jsonData[category];
          }

          break;
        }
      }
    }

    // generate hash and store as id
    entry["id"] = hash(arg);

    // add entry to json object in according category
    jsonData[category] === undefined
      ? (jsonData[category] = [entry])
      : jsonData[category].push(entry);

    // persist updated json
    if (
      FileManager.writeJsonToFile(
        FileManager.loadConfigFromFile()["json_path"],
        jsonData
      )
    ) {
      event.reply("NOTIFICATION_SUCCESS", "New entry successfully saved!");
    } else {
      event.reply("NOTIFICATION_FAIL", "New entry could not be saved!");
    }
  });

  ipcMain.on("DELETE_ENTRY", (event, arg) => {
    console.log(
      `Main process received a message on DELETE_ENTRY channel with id '${arg}'.`
    );

    const jsonData = FileManager.loadJsonFromFile(
      FileManager.loadConfigFromFile()["json_path"]
    );

    // find and delete entry
    for (let category in jsonData) {
      if (jsonData[category].find((entry) => entry["id"] === arg)) {
        const index = jsonData[category].findIndex(
          (entry) => entry["id"] === arg
        );
        jsonData[category].splice(index, 1);

        // delete category if no entries are left
        if (jsonData[category].length === 0) {
          delete jsonData[category];
        }

        break;
      }
    }

    // persist updated json
    if (
      FileManager.writeJsonToFile(
        FileManager.loadConfigFromFile()["json_path"],
        jsonData
      )
    ) {
      event.reply("NOTIFICATION_SUCCESS", "Entry successfully deleted!");
    } else {
      event.reply("NOTIFICATION_FAIL", "Entry could not be deleted!");
    }
  });
}
