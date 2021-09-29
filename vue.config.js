module.exports = {
  runtimeCompiler: process.env.VUE_APP_ENV === "development",
  productionSourceMap: process.env.VUE_APP_ENV !== "production",
  devServer: {
    host: "0.0.0.0",
    port: 8888,
    proxy: {
      "/gz": {
        // dev target
        target: "https://image.guazistatic.com/",
        changeOrigin: true
      }
    },
    disableHostCheck: true,
  }
};
