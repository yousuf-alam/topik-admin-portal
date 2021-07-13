module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  devServer: {
    // disableHostCheck: true,
    // port: 4000,
    // public: '0.0.0.0:4000', used to test pusher in local environment
    watchOptions: {
      poll: true
    }
  }

}
