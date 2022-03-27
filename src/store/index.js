import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authenticated: localStorage.getItem('access_token') ? true : false,
    namesUser: localStorage.getItem('namesUser') ? localStorage.getItem('namesUser') : 'Usuario',
    permissionsUser: localStorage.getItem('permissionsUser') ? JSON.parse(localStorage.getItem('permissionsUser')) : [],
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
  },
  actions: {
  },
  modules: {
  }
})
