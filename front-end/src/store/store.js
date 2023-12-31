import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
      loggedIn: false,
      inputUsername: '',
      id: -1
    },
    mutations: {
        SET_LOGGED_IN (state, value) {
          console.log('SET_LOGGED_IN called with value', value)
          state.loggedIn = value
        },
        SET_USERNAME (state, value) {
          state.inputUsername = value
        },
        SET_ID (state, value) {
          state.id = value
        }
      }
      
})
  
