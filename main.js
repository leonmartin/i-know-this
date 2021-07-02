const DatabaseInterface = require("./src/js/backend/DatabaseInterface.js");

const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const path = require("path");
const hash = require("object-hash");

const dbInterface = new DatabaseInterface(app.getPath("userData"));

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
          label: "Exit",
          click() {
            app.quit();
          },
        },
      ],
    },
  ]);

  Menu.setApplicationMenu(menu);

  mainWindow.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });

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
  ipcMain.on("REQUEST_ALL_ENTRIES", (event) => {
    console.log(
      "Main process received a message on REQUEST_ALL_ENTRIES channel."
    );

    dbInterface.readAllEntries().then((entries) => {
      event.returnValue = entries;
    });
  });

  ipcMain.on("REQUEST_ENTRY", (event, id) => {
    console.log(
      `Main process received a message on REQUEST_ENTRY channel with id '${id}'.`
    );

    dbInterface.readEntry(id).then((entry) => {
      console.log(entry);

      if (entry) {
        event.returnValue = entry;
      }
    });
  });

  ipcMain.on("REQUEST_ENTRY_CATEGORY", (event, id) => {
    console.log(
      `Main process received a message on REQUEST_ENTRY_CATEGORY channel with id '${id}'.`
    );

    dbInterface.readEntry(id).then((entry) => {
      console.log(entry);

      if (entry) {
        event.returnValue = entry.category;
      }
    });
  });

  ipcMain.on("ADD_OR_UPDATE_ENTRY", (event, entry) => {
    console.log(
      `Main process received a message on ADD_OR_UPDATE_ENTRY channel with object ${JSON.stringify(
        entry
      )}.`
    );

    if (entry["_id"]) {
      dbInterface
        .updateEntry(entry)
        .then(() =>
          event.reply("NOTIFICATION_SUCCESS", "Entry successfully edited!")
        )
        .catch(() =>
          event.event.reply("NOTIFICATION_FAIL", "Entry could not be edited!")
        );
    } else {
      dbInterface
        .addEntry(entry)
        .then(() =>
          event.reply("NOTIFICATION_SUCCESS", "New entry successfully saved!")
        )
        .catch(() =>
          event.event.reply(
            "NOTIFICATION_FAIL",
            "New entry could not be saved!"
          )
        );
    }
  });

  ipcMain.on("DELETE_ENTRY", (event, id) => {
    console.log(
      `Main process received a message on DELETE_ENTRY channel with id '${id}'.`
    );

    dbInterface
      .removeEntry(id)
      .then(() =>
        event.reply("NOTIFICATION_SUCCESS", "Entry successfully deleted!")
      )
      .catch(() =>
        event.event.reply("NOTIFICATION_FAIL", "Entry could not be deleted!")
      );
  });
}
