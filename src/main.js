import Vue from 'vue'
import App from './App.vue'
// import router from '@/router'
import router from '@/router'
// 导入elementUI
import '@/plugins/element.js'
// 导入axios封装的文件
import '@/utils/request.js'
Vue.config.productionTip = false;


new Vue({
  render: h => h(App),
  router
}).$mount('#app')
