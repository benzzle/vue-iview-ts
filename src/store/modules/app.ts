import {
  getBreadCrumbList,
  getHomeRoute
} from '@/libs/util'
import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config

export default {
  state: {
    breadCrumbList: [],
    homeRoute: getHomeRoute(routers, homeName),
  },
  getters: {
    
  },
  mutations: {
    setBreadCrumb (state:any, route:any) {
      state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
    }
  },
  actions: {
    
  }
}
