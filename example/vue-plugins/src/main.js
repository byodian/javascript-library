import Vue from 'vue'
import App from './App.vue'
import router from './router'
import dataV from '@jiaminghi/data-view'

import '@/styles/index.scss'
import { swiperPlugin, globalComponents } from '@/plugins/index.js'

Vue.use(dataV)
Vue.use(swiperPlugin)
Vue.use(globalComponents)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
