import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import { LoadingBar } from 'iview'
import { setToken, getToken, canTurnTo } from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'hash'
})
const LOGIN_PAGE_NAME = 'login'

const turnTo = (to:any, access:any, next:any) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  const token = getToken() 
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    console.log("未登录且要跳转的页面不是登录页,跳转到登录页")
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    console.log("未未登陆且要跳转的页面是登录页,跳转到登录页")
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    console.log("已登录且要跳转的页面是登录页")
    next({
      name: homeName // 跳转到homeName页
    })
  } else {
    // 已登录且要跳转的页面是不是登录页
    console.log("已登录且要跳转的页面是不是登录页")
    if (store.state.user.hasGetInfo) {
      // 已经获取到用户信息直接跳转
      console.log("已经获取到用户信息直接跳转")
      turnTo(to, store.state.user.access, next)
    } else {
      // 已经登录未获取到用户信息去获取用户信息
      console.log("已经登录未获取到用户信息去获取用户信息")
      store.dispatch('user/getUserInfo').then(user => {
        console.log("获取用户信息--成功",user)
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;
        // access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, user.access||[], next)
      }).catch(() => {
        console.log("请求一下获取用户信息--失败")
        setToken('')
        next({
          name: LOGIN_PAGE_NAME
        })
      })
    }
  }
})

router.afterEach(to => {
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
