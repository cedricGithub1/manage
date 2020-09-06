import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import axios from './http/http'
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'

Vue.use(ElementUI);

Vue.prototype.moment = moment
Vue.prototype.axios = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
