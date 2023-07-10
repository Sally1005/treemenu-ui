import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import qs from 'qs';
import "../api/mock";

Vue.prototype.axios = axios;
Vue.prototype.qs = qs;
Vue.use(ElementUI);
Vue.config.productionTip = false

let vue = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vue;