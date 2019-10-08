import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import config from '@/config/index'

import iView from 'iview'; 


Vue.use(iView)
Vue.config.productionTip = false
import 'iview/dist/styles/iview.css'

Vue.prototype.$config = config


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app') 
