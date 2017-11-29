import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Report from '@/components/Report'
import Resource from '@/components/Resource'
import Management from '@/components/Management'
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
    },{
      path:'/report',
      name:'report',
      component:Report
    },{
      path:'/resource',
      name:'resource',
      component:Resource
    },{
      path:'/management',
      name:'management',
      component:Management
    }
  ]
})
