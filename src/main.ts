import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import config from '@/config/index'
/** 
 *  iview引入配置部分
 *  两种方案
 *  第一种全部引用，省去项目中声明（目前使用全局）
 *  第二种采用按需加载的方案，部分组件（通用型比较强的基础组件）全局注册，特殊组件（使用频率比较低的）在页面中自己加载使用
*/
// import { Button, Table, Icon, Form, FormItem } from 'iview'; 
// Vue.component('Button', Button);
// Vue.component('Table', Table);
// Vue.component('Icon', Icon);
// Vue.component('Form', Form);
// Vue.component('FormItem', FormItem);

import iView from 'iview'; 

Vue.use(iView); 

Vue.config.productionTip = false
import 'iview/dist/styles/iview.css'

Vue.prototype.$config = config


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
