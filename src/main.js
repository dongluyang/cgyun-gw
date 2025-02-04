import Vue from "vue";
import axios from "axios";
import Buefy from "buefy";
import VueClipboard from "vue-clipboard2";
import VModal from "vue-js-modal";
import "font-awesome/css/font-awesome.min.css";
import "source-sans-pro/source-sans-pro.css";
import App from "./App";

import router from "./router";
import store from "./store";
import db from "./datastore-notes";

// const electron = require("electron");
import {ipcRenderer } from "electron";

ipcRenderer.on("about", (arg, event) => {
  let component = router.currentRoute.matched[0].instances.default;
  if (event === "about-modal-active") {
    component.aboutModalActive = true;
  }
});

ipcRenderer.on("downloadProgress", (arg, event) => {
  let component = router.currentRoute.matched[0].instances.default;
    component.percentage = event.percent;
    component.showProgressBar = true
});

// electron.remote.app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors');

// const BrowserWindow = electron.remote.BrowserWindow;

// const win = new BrowserWindow({
//   webPreferences: {
//     nodeIntegration: true,
//     nodeIntegrationInWorker: true,
//     webSecurity: false,
//   },
//   frame: false
// });
//
// win.webContents.session.webRequest.onBeforeSendHeaders(
//   (details, callback) => {
//     callback({ requestHeaders: { Origin: '*', ...details.requestHeaders } });
//   },
// );
//
// win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
//   callback({
//     responseHeaders: {
//       'Access-Control-Allow-Origin': ['*'],
//       ...details.responseHeaders,
//     },
//   });
// });


Vue.use(Buefy, {
  defaultIconPack: "fa"
});

Vue.use(VueClipboard);

Vue.use(VModal);

Vue.filter("capitalize", value => {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

// if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

Vue.prototype.$db = db;
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");
