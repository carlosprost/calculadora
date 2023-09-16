const { BrowserWindow } = require("electron");
const path = require("path");

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 500,
    height: 750,
    maximizable: false,
    minimizable: false,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadFile(path.join(__dirname, "src/view/index.html"));
}

module.exports = {
  createWindow,
};
