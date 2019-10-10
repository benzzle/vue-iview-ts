import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import user from './modules/user'
import app from './modules/app'
Vue.use(Vuex)
/**
 * @desc vuex的整合文件，用于整合项目中不同模块中使用到的vuex数据
 */
export default new Vuex.Store({
    state: {
        breadCrumbList: [],         //面包屑
        globalLoading: true,        //全局loading状态，用来限制用户操作和等待数据的返回
        requestLoadingCount: 0,     //用来记录请求数量，和全局loading共同使用
        internetNormal: true        //网路正常--用于判断请求错误
    },
    mutations: {
        setBreadCrumbList(state: any) {
            // state.breadCrumbList = getBreadCrumbList(route);
            state.breadCrumbList = []
        },
        /**
         * @desc 改变数据请求的loading状态函数
         * @param state 
         * @param type 
         */
        changeGlobalLoading(state: any, type: boolean) {
            if (type) {     //打开loading
                if (state.requestLoadingCount === 0) {
                    state.globalLoading = type
                }
                state.requestLoadingCount++
            } else {      //关闭loading
                state.requestLoadingCount--
                if (state.requestLoadingCount === 0) {
                    state.globalLoading = type
                }
            }
        },
        /**
         * @desc 
         * @param state 
         * @param type 
         */
        changeInternetNormal(state: any, type: boolean) {
            state.internetNormal = type;
        },
    },
    actions: {},
    modules: {
        common,
        user,
        app
    }
})
