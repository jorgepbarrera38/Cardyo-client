import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Croppa from 'vue-croppa'
import toastr from 'toastr'
import VueSkeletonLoader from 'skeleton-loader-vue';
import vSelect from 'vue-select'

Vue.component('v-select', vSelect)
import 'vue-select/dist/vue-select.css';

require('vue2-animate/dist/vue2-animate.min.css')

// Register the component globally
Vue.component('vue-skeleton-loader', VueSkeletonLoader);

Vue.component('pagination', require('laravel-vue-pagination'));

Vue.config.productionTip = false
Vue.use(Croppa)  

//Toastr
require('toastr/build/toastr.min.css')
toastr.options = {
  "positionClass": "toast-bottom-center",
}
Vue.prototype.$toastr = toastr

//Axios
axios.defaults.baseURL = 'http://localhost:8000/api'
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
