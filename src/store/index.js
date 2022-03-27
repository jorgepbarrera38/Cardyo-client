import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: localStorage.getItem('access_token') ? true : false,
    namesUser: localStorage.getItem('namesUser') ? localStorage.getItem('namesUser') : 'Usuario',
    permissionsUser: localStorage.getItem('permissionsUser') ? JSON.parse(localStorage.getItem('permissionsUser')) : [],
    
    company: {},
    attendanceExpectedToday: '',
    totalAssistsToday: '',
    productsWithStockBelowStockmin: '',
    productsWithStockOverStockmax: '',
    totalSalesToday: '',
  },
  mutations: {
    changeStateAuthUser (state, value) {
      state.authenticated = value
    },
    setNamesUser (state, namesUser) {
      state.namesUser = namesUser
    },
    setPermissionsUser (state, permissionsUser) {
      state.permissionsUser = permissionsUser
    },
    setCompany (state, company) {
      state.company = company
    },
    setAttendanceExpectedToday (state, quantity) {
      state.attendanceExpectedToday = quantity
    },
    setTotalAssistsToday (state, quantity) {
      state.totalAssistsToday = quantity
    },
    setProductsWithStockBelowStockmin (state, productsWithStockBelowStockmin) {
      state.productsWithStockBelowStockmin = productsWithStockBelowStockmin
    },
    setProductsWithStockOverStockmin (state, productsWithStockOverStockmax) {
      state.productsWithStockOverStockmax = productsWithStockOverStockmax
    },
    setTotalSalesToday (state, totalSalesToday) {
      state.totalSalesToday = totalSalesToday
    },
  },
  actions: {
  },
  modules: {
  }
})
