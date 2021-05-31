import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入自定义样式
import 'assets/css/style.css'
// 全局路由守卫
import './router/permission.js'
import Base from './base.js'
import '@/icons'

Vue.use(ElementUI)
Vue.use(Base)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
