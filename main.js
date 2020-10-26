const { app, BrowserWindow, Menu, dialog, ipcMain } = require("electron");
const fs = require("fs");
const path = require("path");

app.whenReady().then(createWindow);
const isMac = process.platform === "darwin";
const configPath = "./config.json";
const config = loadJsonFromFile(configPath);

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

ipcMain.on("ADD_ENTRY", (event, arg) => {
  console.log("Received a message on ADD_ENTRY channel.");

  // extract category and entry
  const category = Object.keys(arg)[0];
  const entry = arg[category];
  
  const jsonData = loadJsonFromFile(config["json_path"]);
  console.log(category, [entry], jsonData);

  // add entry to json object in according category
  jsonData[category] === undefined
    ? (jsonData[category] = [entry])
    : jsonData[category].push(entry);

  // persist updated json
  writeJsonToFile(config["json_path"], jsonData);
  event.reply("NOTIFICATION_SUCCESS", "New entry successfully added!");
});

ipcMain.on("REQUEST_JSON_DATA", (event, arg) => {
  console.log("Received a message on REQUEST_JSON_DATA channel.");
  event.returnValue = loadJsonFromFile(config["json_path"]);
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
            // show dialog to select json file
            dialog
              .showOpenDialog({
                properties: ["openFile"],
                filters: [{ name: "JSON Files", extensions: ["json", "JSON"] }],
              })
              .then((fileObj) => {
                if (!fileObj.canceled) {
                  let filePath = path.relative(".", fileObj.filePaths[0]);
                  // save path to config file for next startup
                  config["json_path"] = filePath;
                  writeJsonToFile(configPath, config);
                  // pass parsed json to renderer process
                  let jsonData = loadJsonFromFile(config["json_path"]);
                  sendJsonData(jsonData, mainWindow);
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
  mainWindow.webContents.openDevTools();

  // check for json_path from previous session; fallback to default path if not present
  if (config["json_path"] === undefined) {
    config["json_path"] = "./res/default.json";
  }

  let jsonData = loadJsonFromFile(config["json_path"]);

  // load json file
  // TODO: find better way to wait for startup completion than timeout
  setTimeout(() => sendJsonData(jsonData, mainWindow), 500);
}

function loadJsonFromFile(filePath) {
  try {
    rawData = fs.readFileSync(filePath);
    let parsedData = JSON.parse(rawData);
    return parsedData;
  } catch (err) {
    console.error(err);
    mainWindow.webContents.send(
      "NOTIFICATION_FAIL",
      "JSON file could not be loaded!"
    );
  }
}

function writeJsonToFile(filePath, jsonData) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(jsonData));
  } catch (err) {
    console.error(err);
    mainWindow.webContents.send(
      "NOTIFICATION_FAIL",
      "JSON file could not be written!"
    );
  }
}

function sendJsonData(jsonData, mainWindow) {
  mainWindow.webContents.send("JSON_DATA", jsonData);
}
