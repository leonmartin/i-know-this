const { app, BrowserWindow, Menu, dialog } = require("electron");
const fs = require("fs");
const path = require("path");

app.whenReady().then(createWindow);

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

const isMac = process.platform === "darwin";
const configPath = "./config.json";
const config = loadConfig(configPath);

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
                  console.log(filePath)
                  //  and pass parsed json to renderer process
                  loadAndSendJsonFile(filePath, mainWindow);
                  // save path to config file for next startup
                  savePathToConfig(filePath);
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

  mainWindow.loadFile("./src/index.html");
  mainWindow.webContents.openDevTools();

  // try to retrieve path of json database from previous session from config file and send it to renderer process
  // TODO: find better way to wait for startup completion than timeout
  setTimeout(() => loadAndSendJsonFile(config["json_path"], mainWindow), 500);
}

function loadConfig() {
  try {
    rawData = fs.readFileSync(configPath);
    let parsedConfig = JSON.parse(rawData);
    return parsedConfig;
  } catch (err) {
    console.error(err);
  }
}

function loadAndSendJsonFile(filePath, mainWindow) {
  try {
    let rawData = fs.readFileSync(filePath);
    let parsedJson = JSON.parse(rawData);
    mainWindow.webContents.send("FILE_OPEN", parsedJson);
  } catch (err) {
    console.error(err);
  }
}

function savePathToConfig(filePath) {
  try {
    config["json_path"] = filePath;
    fs.writeFileSync(configPath, JSON.stringify(config));
  } catch (err) {
    console.error(err);
  }
}
