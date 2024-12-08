/// npm install sqlite3  --target_platform=win32   --runtime=node-webkit --target_arch=ia32
const { app, BrowserView, BrowserWindow, Menu,Tray } = require('electron')
const path = require("path");

let mainWindow;

const omenuTemplate = [
  {
    label: 'Program',
    submenu: [{   role: 'quit',label: 'Izlaz' }],
  }
];
async function createAboutWindow () {
  childWindow = new BrowserWindow({
    height: 400,
    width: 600,
    show: false,
    minimizable: false,
    maximizable: false,
    parent: mainWindow,
    icon: __dirname + '/assets/favicon.ico',
    webPreferences: {
      contextIsolation: false,
       nodeIntegration: true,
       enableRemoteModule: true,
       webSecurity: false,
       allowRunningInsecureContent: false,
    }
  });
 childWindow.setIcon(path.join(__dirname, '/assets/favicon.ico'));

  childWindow.removeMenu();

  childWindow.loadURL(`file://${__dirname}/about.html`);
  childWindow.webContents.on('dom-ready', () => {
    childWindow.show();
  });
}

app.on("ready", () => {
    app.allowRendererProcessReuse = false;
    mainWindow = new BrowserWindow({
        width: 1200, height: 800,
         icon: __dirname + 'assets/favicon.ico',
        webPreferences: {
          contextIsolation: false,
           nodeIntegration: true,

        },
    });
    mainWindow.loadFile(path.join(__dirname,  "index.html"));
   mainWindow.setIcon(path.join(__dirname, '/assets/favicon.ico'));
   const mainMenu = Menu.buildFromTemplate(omenuTemplate);
    Menu.setApplicationMenu(mainMenu);
      const tMenu = Menu.buildFromTemplate(omenuTemplate);
    tray = new Tray( __dirname + '/assets/favicon.ico')
    tray.setToolTip('vtr_vasa.')
 tray.setContextMenu(tMenu)

    mainWindow.on("closed", function () {

        mainWindow = null;
    });
});

// Quit when all windows are closed.
app.on("window-all-closed", function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
        app.quit();
    }
});
