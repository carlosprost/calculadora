const {app} = require('electron')
const { createWindow } = require('./windows')

/* Electron reload */
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
})



app.whenReady().then(createWindow)