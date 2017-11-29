import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/login/login.vue'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },{
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
})
