const gui = require('nw.gui')
const fs = require('fs')
const clipboard = gui.Clipboard.get()

let menu: typeof gui.Menu;

// Extend application menu for Mac OS
if (process.platform == 'darwin') {
  menu = new gui.Menu({type: 'menubar'})
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title)
  gui.Window.get().menu = menu
}

const initContextMenu = () => {
    menu = new gui.Menu()
};

window.onload = () => {
    initContextMenu()
    gui.Window.get().show();
};
