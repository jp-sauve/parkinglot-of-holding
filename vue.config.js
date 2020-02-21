const path = require("path");

module.exports = {
  devServer: {
    proxy: "http://localhost:8888"
  },
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].template = path.resolve("./client/index.html");
      return args;
    });
  },
  configureWebpack: {
    entry: {
      app: "./client/js/main.js"
    },
    performance: false,
    resolve: {
      alias: {
        "@": path.resolve("./client/js")
      }
    }
  },
  outputDir: "public/dist"
};
