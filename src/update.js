import { dialog } from 'electron'

import { autoUpdater } from 'electron-updater'

// import http from 'http'

const path = require('path')

// const log = require("electron-log")
// autoUpdater.logger = log
// autoUpdater.logger.transports.file.level = "info"


const isDevelopment = process.env.NODE_ENV === 'development'
// 防止报错no such file or directory dev-app-update.yml
if (isDevelopment) {
  autoUpdater.updateConfigPath = path.join(__dirname, '../dev-app-update.yml')
}

autoUpdater.on('checking-for-update', res => {
  console.info("获取版本信息:" + res)
})

autoUpdater.on('update-not-available', res => {
  console.info("没有可更新版本:" + res)
})

autoUpdater.on('update-available', res => {
  console.log(res)
  dialog.showMessageBox({
    type: 'info',
    title: '软件更新',
    message: "发现新版本"+res.version+", 确定更新?",
    buttons: ['确定', '取消']
  }).then(resp => {
    if (resp.response == 0) {
      autoUpdater.downloadUpdate()
    }
  })
})

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: '下载完成',
    message: '最新版本已下载完成, 退出程序进行安装'
  }).then(() => {
    autoUpdater.quitAndInstall()
  })
})

export default autoUpdater
