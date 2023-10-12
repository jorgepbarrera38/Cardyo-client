import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Croppa from 'vue-croppa'
import toastr from 'toastr'
import VueSkeletonLoader from 'skeleton-loader-vue';
import vSelect from 'vue-select'
import moment from 'moment'
import TrendChart from "vue-trend-chart";

Vue.use(TrendChart);

import VCalendar from 'v-calendar'

Vue.use(VCalendar)

if (localStorage.getItem('access_token')) {
  axios.defaults.headers.common['Authorization'] = `bearer ${localStorage.getItem('access_token')}`
}


moment.locale('es')

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

let production = true

if (production) {
  axios.defaults.baseURL = 'api'
} else {
  axios.defaults.baseURL = 'http://localhost:8000/api'
}

Vue.prototype.$http = axios

axios.get('config').then(response => {
  //console.log(response.data);
  store.commit('setCONFIG', response.data.CONFIG)
  store.commit('setAPP_URL', response.data.APP_URL)
  store.commit('setLOGO_COMPANY', response.data.LOGO_COMPANY)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  if (error.response.status == 401) {
    localStorage.removeItem('namesUser')
    store.commit('setNamesUser', 'Usuario')
    localStorage.removeItem('permissionsUser')
    store.commit('setPermissionsUser', [])
    localStorage.removeItem('access_token')
    store.commit('changeStateAuthUser', false)
    router.push({ name: 'login' })
  }

  if (error.response.status == 403) {
    toastr.error('No tiene permisos para esta acción')
    //router.push({ name: 'dashboard.index' })
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.state.authenticated) {
    localStorage.removeItem('namesUser')
    store.commit('setNamesUser', 'Usuario')
    localStorage.removeItem('permissionsUser')
    store.commit('setPermissionsUser', [])
    localStorage.removeItem('access_token')
    next({ name: 'login' })
  }
  else if (to.name == 'login' && store.state.authenticated) {
    next({ name: 'dashboard.index' })
  }
  else {
    next() 
  }
})

Vue.mixin({
  methods: {
    hasPermission (permission) {
      let hasPermission = store.state.permissionsUser.some(permissionUser => permissionUser.name == permission)
      if (!hasPermission) {
        toastr.error('No tiene permisos para esta acción')
        return false
      }
      return true
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
