// const { contextBridge, ipcRenderer } = require('electron')
// // import { contextBridge, ipcRenderer } from 'electron'
// contextBridge.exposeInMainWorld('electronAPI',{
//   openFile: () => ipcRenderer.invoke('dialog:openFile')
// })
// import { ipcRenderer } from 'electron'
const {ipcRenderer } = require('electron')
window.ipcRenderer = ipcRenderer
