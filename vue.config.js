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