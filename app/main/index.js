'use strict';

var path = require('path');
var url = require('url');

const { app, BrowserWindow } = require('electron');
require('electron-reload')(path.join(__dirname, '../'), {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
});
let win;
app.on('ready', () => {
    win = new BrowserWindow({ width: 1280, height: 800 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../renderer/index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
