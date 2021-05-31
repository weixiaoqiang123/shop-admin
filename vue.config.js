const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  configureWebpack: {
    resolve:{
      extensions:[],
      alias:{
        'assets':'@/assets',
        'common':'@/common',
        'components':'@/components',
        'network':'@/network',
        'views':'@/views',
        'router':'@/router',
        'store': '@/store',
        'api': '@/api',
        'util': '@/util',
        'layout': '@/layout',
        'model': '@/model'
      }
    }
  },
  chainWebpack(config) {
      // 1.让svgloader排除掉src/icons这个目录
      config.module.rule('svg')
          .exclude.add(resolve('src/icons'));//以当前文件为起点 拼出src/icons的路径
      
      // 2.让插件svg-sprite-loader添加规则src/icons/svg
      config.module.rule('icons')
          .test(/\.svg$/)   //svg结尾的文件名
          .include.add(resolve('src/icons')).end()//include数组操作 end回退到上一层
          .use('svg-sprite-loader')
              .loader('svg-sprite-loader')
              .options({symbolId: 'icon-[name]'})
  },
  devServer: {
    // 启动端口
    port: 8081,
    host: '0.0.0.0',
    https: false,
    // 自动启动浏览器
    open: true,
    proxy: {
      '/api': {
        // target: 'http://192.168.124.31',
        target: 'http://localhost:8888',
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}