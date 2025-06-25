const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  productionSourceMap: true,
  pages: {
    index: {
      //入口
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    login: {
      entry: 'src/pages/Login/login.js',
      template: 'src/pages/Login/login.html',
      filename: 'login.html',
      title: "登录"
    }
  },
  lintOnSave: false, //关闭语法检查
  devServer: {
    host: 'localhost', //target host
    port: 8080,
    proxy: 'http://113.44.75.241:5158',
  }
}