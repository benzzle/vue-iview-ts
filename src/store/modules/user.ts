import { login, logout } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  namespaced: true,
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false
  },
  mutations: {
    setAvator (state:any, avatorPath:any) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state:any, id:any) {
      state.userId = id
    },
    setUserName (state:any, name:any) {
      state.userName = name
    },
    setAccess (state:any, access:any) {
      state.access = access
    },
    setToken (state:any, token:any) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state:any, status:any) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }:any, {userName, password}:any) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        commit('setToken', "112233444555eeeuuu")
        resolve()
        // login({
        //   userName,
        //   password
        // }).then(res => {
        //   const data = res.data
        //   commit('setToken', data.token)
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }:any) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch((err:any) => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }:any) {
      return new Promise((resolve, reject) => {
        try {
          // getUserInfo(state.token).then(res => {
          //   const data = res.data
          //   commit('setAvator', data.avator)
          //   commit('setUserName', data.name)
          //   commit('setUserId', data.user_id)
          //   commit('setAccess', data.access)
          //   commit('setHasGetInfo', true)
          //   resolve(data)
          // }).catch(err => {
          //   reject(err)
          // })
          commit('setAvator', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569821547767&di=3fc3d13860214fc116d5052a7078a0eb&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F908fa0ec08fa513db777cf78376d55fbb3fbd9b3.jpg')
          commit('setUserName', 'userName')
          commit('setUserId', 'UserId')
          commit('setAccess', ['super_admin', 'admin'])
          commit('setHasGetInfo', true)
          resolve({
            name: 'admin',
            user_id: '2',
            access: ['admin'],
            token: 'admin',
            avator: 'https://avatars0.githubusercontent.com/u/20942571?s=460&v=4'
          });
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
