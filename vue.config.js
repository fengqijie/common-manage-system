module.exports = {
  runtimeCompiler: process.env.VUE_APP_ENV === "development",
  productionSourceMap: process.env.VUE_APP_ENV !== "production",
  devServer: {
    host: "0.0.0.0",
    port: 8888,
    proxy: {
      "/api": {
        // dev target
        target: "http://127.0.0.1:8888/",
        pathRewrite: { "^/api": "/" },
        changeOrigin: true
      }
    },
    disableHostCheck: true
  }
};
