const { app, BrowserWindow, Tray, Menu } = require("electron");
const path = require("path");

let mainWindow;

function showMainWindow() {
  mainWindow.show();
}

function hideMainWindow() {
  mainWindow.hide();
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
      label: "隐藏窗口",
      type: "normal",
      click: () => {
        hideMainWindow();
      }
    },
    { type: "separator" },
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
    mainWindow.isVisible() ? hideMainWindow() : showMainWindow();
  });
}

function createMenu() {
  var menu = Menu.buildFromTemplate([
    {
      label: "后退",
      type: "normal",
      click: () => {
        mainWindow.webContents.goBack();
      }
    },
    {
      label: "前进",
      type: "normal",
      click: () => {
        mainWindow.webContents.goForward();
      }
    }
  ]);

  mainWindow.setMenu(menu);
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false
  });

  mainWindow.loadURL("http://www.yuque.com");

  Menu.setApplicationMenu(null);

  createTray();
  createMenu();

  mainWindow.on("closed", function() {
    mainWindow = null;
  });

  mainWindow.maximize();
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) createWindow();
});
