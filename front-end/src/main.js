import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import routes from './routes';
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue); 
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  router,
  store: new Vuex.Store(store),
  render: h => h('router-view')
}).$mount('#app')
