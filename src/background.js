"use strict";
import { app, protocol, Menu, BrowserWindow,dialog,ipcMain } from "electron";
import path from 'path'
import fs from 'fs'
import axios from "axios";
import Qs from 'qs';
import {
  createProtocol
  /* installVueDevtools */
} from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    useContentSize: true,
    width: 1160,
    height: 700,
    minHeight: 500,
    minWidth: 900,
    titleBarStyle: "hiddenInset",
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.git3333hub.io/vue-cli-plugin-electron-builder/guide/configuration.html#node-integration for more info
      // contextIsolation: true,
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: false,
      preload: path.join(__dirname, '/preload.js')
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  win.on("closed", () => {
    win = null;
  });
  const template = [
    {
      label: "Application",
      submenu: [
        {
          label: "About Code-Notes",
          click: () => {
            win.webContents.send("about", "about-modal-active");
          }
        },
        { type: "separator" },
        {
          label: "Toggle dev tools",
          accelerator: "CmdOrCtrl+Shift+I",
          click: () => {
            win.webContents.toggleDevTools();
          }
        },
        {
          label: "Quit",
          accelerator: "Command+Q",
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          selector: "selectAll:"
        }
      ]
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

async function handleFileOpen() {

  /*
  dialog.showOpenDialog({
    title: '选择发送的文件',
    properties: ['openFile', 'multiSelections']
  }).then(result => {
    if (result.filePaths && result.filePaths[0]) {
      // 选择文件弹窗选择多个大文件，每个文件都要去分片
      // eslint-disable-next-line no-unused-vars
      result.filePaths.forEach((filePath,index) => {
        //获取文件名
        const fileName = filePath.substr(filePath.lastIndexOf("/")+1)
        // 每个分片文件流的大小
        const chunkSize = 20*1024*1024
        // fs读取整个文件流
        const stats = fs.statSync(filePath)
        // 文件的总大小
        const size = stats.size
        // 文件分成了多少个分片
        const pieces = Math.ceil(size / chunkSize)
        // const fileIndex = index
        // 此处省略代码，把文件路径、文件号、文件大小、分片数传输给渲染进程
        // 以下为关键代码，注意，这里必须使用递归，如果使用for循环，可能会导致分片传输给后台的顺序不对，导致合并文件出错
        AAA(0)
        function AAA(i){
          // 每个分片结束位置
          const enddata = Math.min(size, (i+1)*chunkSize)
          //  arr存储每个分片的文件流
          let arr = []
          // cuSize 存储当前分片的实际文件大小
          let cuSize = 0
          // const chunkIndex = i
          // 获取当前分片从开始到结束的文件流
          const readStream = fs.createReadStream(filePath, {
            start: i * chunkSize,
            end:enddata - 1
          })
          // on data读取数据
          readStream.on('data', (data) => {
            cuSize += data.length
            arr.push(data)
          })
          //on end在该分片读取完成时触发
          readStream.on('end',()=>{
            // 此处省略代码，把当前分片的文件流、分片ID号、文件ID号、文件路径、当前分片实际大小传输给渲染进程
            // 用递归的方式去分片
            let param = {}
            param.size = cuSize
            param.name = fileName
            param.total = size
            win.webContents.send("upload:data", param);
            if(i+1 < pieces){
              AAA(i+1)
            }

          })
        }
      })
    }
  })*/
  const files = []

  await dialog.showOpenDialog({
    title: '选择发送的文件',
    properties: ['openFile', 'multiSelections']
  }).then(result => {
    if (result.filePaths && result.filePaths[0]) {
      // 选择文件弹窗选择多个大文件，每个文件都要去分片
      result.filePaths.forEach((filePath,index) => {
        //获取文件名
        const fileName = filePath.substr(filePath.lastIndexOf("/")+1)
        // fs读取整个文件流
        const stats = fs.statSync(filePath)
        // 文件的总大小
        const size = stats.size
        files.push({"id":index+1,"file_name":fileName,"file_size":size,"upload_progress":0})
      })
    }
  })

 return files

}

async function handleExcelOpen() {

  /*
  dialog.showOpenDialog({
    title: '选择发送的文件',
    properties: ['openFile', 'multiSelections']
  }).then(result => {
    if (result.filePaths && result.filePaths[0]) {
      // 选择文件弹窗选择多个大文件，每个文件都要去分片
      // eslint-disable-next-line no-unused-vars
      result.filePaths.forEach((filePath,index) => {
        //获取文件名
        const fileName = filePath.substr(filePath.lastIndexOf("/")+1)
        // 每个分片文件流的大小
        const chunkSize = 20*1024*1024
        // fs读取整个文件流
        const stats = fs.statSync(filePath)
        // 文件的总大小
        const size = stats.size
        // 文件分成了多少个分片
        const pieces = Math.ceil(size / chunkSize)
        // const fileIndex = index
        // 此处省略代码，把文件路径、文件号、文件大小、分片数传输给渲染进程
        // 以下为关键代码，注意，这里必须使用递归，如果使用for循环，可能会导致分片传输给后台的顺序不对，导致合并文件出错
        AAA(0)
        function AAA(i){
          // 每个分片结束位置
          const enddata = Math.min(size, (i+1)*chunkSize)
          //  arr存储每个分片的文件流
          let arr = []
          // cuSize 存储当前分片的实际文件大小
          let cuSize = 0
          // const chunkIndex = i
          // 获取当前分片从开始到结束的文件流
          const readStream = fs.createReadStream(filePath, {
            start: i * chunkSize,
            end:enddata - 1
          })
          // on data读取数据
          readStream.on('data', (data) => {
            cuSize += data.length
            arr.push(data)
          })
          //on end在该分片读取完成时触发
          readStream.on('end',()=>{
            // 此处省略代码，把当前分片的文件流、分片ID号、文件ID号、文件路径、当前分片实际大小传输给渲染进程
            // 用递归的方式去分片
            let param = {}
            param.size = cuSize
            param.name = fileName
            param.total = size
            win.webContents.send("upload:data", param);
            if(i+1 < pieces){
              AAA(i+1)
            }

          })
        }
      })
    }
  })*/
  const files = []

  await dialog.showOpenDialog({
    title: '选择发送的文件',
    properties: ['openFile'],
    filters: [
      { name: 'Custom File Type', extensions: ['xlsx'] },
    ]
  }).then(result => {
    if (result.filePaths && result.filePaths[0]) {
      // 选择文件弹窗选择多个大文件，每个文件都要去分片
      result.filePaths.forEach((filePath,index) => {
        //获取文件名
        const fileName = filePath.substr(filePath.lastIndexOf("/")+1)
        // fs读取整个文件流
        const stats = fs.statSync(filePath)
        // 文件的总大小
        const size = stats.size
        files.push({"id":index+1,"file_name":fileName,"file_size":size,"upload_progress":0})
      })
    }
  })

  return files

}


async function handleAssetDelete(e,id) {
  console.log('ipcMain received: ' + id);
  let code = 0;
  await axios.delete("http://cgyun.cn/cgproxy/system/rename/"+id,
    {headers: {'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQzMTg2NjIsInVzZXJfbmFtZSI6Inp5IiwianRpIjoiNDg0ZGYxMTQtZjhmYy00Yzg4LWJkZGEtZmUzNTIwNDZhNGQwIiwiaWRlbnRpdHkiOiJ6eSIsImNsaWVudF9pZCI6IkNneXVuQ2xpZW50SWQiLCJzY29wZSI6WyJyZWFkIl19.1dQgMbWSqVSIZVUam9KdMpXj4VEyc35EljdF6fAm5BQ"}}).then(response => {
    const res = response.data
    code = res.code
  })

  return code
}

async function handleAssetList(e,param) {
  console.log('ipcMain received: ' + param);
  let assetList = []
  let total = 0
  await axios.get("http://cgyun.cn/cgproxy/system/rename/list?projectId="
    +param.projectId+"&pageNum="+param.page+"&pageSize="+param.pageSize,
    {headers: {'Authorization': 'Bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzQzMTg2NjIsInVzZXJfbmFtZSI6Inp5IiwianRpIjoiNDg0ZGYxMTQtZjhmYy00Yzg4LWJkZGEtZmUzNTIwNDZhNGQwIiwiaWRlbnRpdHkiOiJ6eSIsImNsaWVudF9pZCI6IkNneXVuQ2xpZW50SWQiLCJzY29wZSI6WyJyZWFkIl19.1dQgMbWSqVSIZVUam9KdMpXj4VEyc35EljdF6fAm5BQ"}}).then(response => {
    const res = response.data
    assetList = res.rows
    total = res.total
  })

  return {list:assetList,total:total}
}

async function handleProjectList(e,param) {
  console.log('ipcMain received: ' + param);

  return await axios.post("http://cgyun.cn/cgproxy/system/project/getMyTeamProjects",
    {client_id:"renyuteamcgteam"},{headers: {'Authorization': 'Bearer ' + param.accessToken}}).then(response => {
    const res = response.data
    const list = res.data;
    let projectList = []
    for (let i = 0; i < list.length; i++) {
      projectList.push({
        id: list[i].project.id,
        name: list[i].project.name,
        alias: list[i].project.alias,
        image: list[i].content,
      })
    }
    return projectList
    }).catch(err=>{
    if (err.message=="Request failed with status code 401") {
      // throw new Error("auth_failed");
      return new Error("auth_failed")
    }
  })

  // return projectList
}


async function handleLogin(e,param) {
  const payload='userName='+param.userName+'&password='+param.password
  const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
  return await axios.post("http://api.cgyun.cn/system/user/login", payload,{ headers: headers }).then(response => {
    const res = response.data
    console.log(res)
    const code = res.code
    if (code == 200) {
      const data = res.data;
      return data
    } else {
      return new Error(res.msg)
    }
  }).catch(err=>{
    return err
  })

}


// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  ipcMain.handle('dialog:openFile', handleFileOpen)
  ipcMain.handle('dialog:openExcel', handleExcelOpen)
  ipcMain.handle('asset:list',handleAssetList)
  ipcMain.handle('asset:delete',handleAssetDelete)
  ipcMain.handle('project:list',handleProjectList)
  ipcMain.handle('account:login',handleLogin)

  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
