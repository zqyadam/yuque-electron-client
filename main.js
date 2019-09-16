// Modules to control application life and create native browser window
const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
let isMainWindowShow = true;

function showMainWindow() {
  mainWindow.show();
  isMainWindowShow = true;
}

function hideMainWindow() {
  mainWindow.hide();
  isMainWindowShow = false;
}

function createTray() {
  appTray = new Tray(path.join(__dirname, "/images/appIcon.png"));

  var contextMenu = Menu.buildFromTemplate([
    {
      label: "显示窗口",
      type: "normal",
      click: () => {
        showMainWindow();
      }
    },
    {
      label: "退出",
      type: "normal",
      click: () => {
        app.quit();
      }
    }
  ]);

  appTray.setToolTip("语雀本地端");
  appTray.setContextMenu(contextMenu);
  appTray.on("click", e => {
    isMainWindowShow ? hideMainWindow() : showMainWindow();
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false
  });

  mainWindow.loadURL("http://www.yuque.com");
  mainWindow.setMenu(null);
  mainWindow.maximize();

  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  createTray();

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) createWindow();
});
