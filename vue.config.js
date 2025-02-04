const path = require("path");

module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/globals.scss";'
      },
      scss: {
        prependData: '@import "~@/globals.scss";'
      }
    }
  },
  configureWebpack: {
    entry: {
      app: "./src/main.js"
    },
    resolve: {
      alias: {
        "@": path.join(__dirname, "./src")
      },
      extensions: [".js", ".vue", ".json", ".css", ".node"]
    },
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessFile: "src/background.js",
      preload: "src/preload.js",
      externals: ["nedb"],
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        productName: "CGYun Client",
        appId: "fr.lauthieb.code-notes",
        directories: {
          output: "build"
        },
        extraResources: [
          {
            from: "src/extraResources",
            to: "app.asar.unpacked/"
          }
        ],
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: "link",
              path: "/Applications"
            },
            {
              x: 130,
              y: 150,
              type: "file"
            }
          ]
        },
        mac: {
          icon: "src/assets/icons/icon.icns"
        },
        win: {
          icon: "src/assets/icons/icon.ico"
        },
        linux: {
          icon: "src/assets/icons"
        },
        publish: {

          provider: 'generic',

          url: 'http://cgyun.com/client/'

        },
        nsis: {

          oneClick: false,

          // 允许修改安装目录

          allowToChangeInstallationDirectory: true,

          allowElevation: true,

          createDesktopShortcut: true,

          createStartMenuShortcut: true,

          shortcutName: "CGYun"
        }
      }
    }
  }
};
