import router from './index.js'
import store from 'store/index.js'
//引入nprogress 进度条插件
import NProgress from 'nprogress'
import {getToken} from 'util/auth.js'

// 配置进度条
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false})

// 白名单
const whiteList = ['/login']
router.beforeEach(async (to,from,next) => {
  NProgress.start()
  // 判断是否登录
  if(getToken()){
    if(to.path === '/login'){
      next({path: '/index'})
    }else{
      // 获取用户角色
      const role = store.getters.role
      if(role !== -1){
        next()
      }else{
        try{
          // 没有角色 获取用户角色
          const {role} = await store.dispatch('user/getInfo');
          // 根据当前用户角色动态生成路由
          const accessRoutes = await store.dispatch('permission/generateRoutes', role)
          // 添加这些路由至路由器
          router.addRoutes(accessRoutes)
          // 继续路由切换,确保addRoutes完成
          next({...to,replace: true})
        }catch(e){
          // 出错需要重置令牌并重新登陆(令牌过期,网络错误等原因)
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  }else{
    // 未登录
    if(whiteList.indexOf(to.path) !== -1){
      // 在白名单中, 放过
      next()
    }else {
      // 重定向至登录页
      next('/login')
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
