import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAWN from "vue-awesome-notifications"
import 'vue-awesome-notifications/dist/styles/style.css'

Vue.use(VueAWN,{
  durations: {
    global: 2000
  }
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
