const { defineConfig } = require('@vue/cli-service');

// const path = require('path');

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  /* 两种webpack
    - chainWebpack更改原来的webpack
    - configureWebpack在原来的webpack中追加
  */
  // chainWebpack: (config) => {
  //   // __dirname当前绝对路径 拼上 src/components/element
  //   config.resolve.alias.set('@element', path.resolve(__dirname, 'src/components/element'));
  // },
  // 第二种写法
  configureWebpack: {
    resolve: {
      alias: {
        '@element': '@/components/element',
      },
    },
  },
});
