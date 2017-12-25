import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Report from '@/components/Report'
import Resource from '@/components/Resource'
import Management from '@/components/Management'
import Login from '@/login/login.vue'

import SchoolLevel from '@/components/report/SchoolLevel'
import TeachingLevel from '@/components/report/TeachingLevel'
import StudentLevel from '@/components/report/studentLevel.vue'
import ClassLevel from '@/components/report/classLevel.vue'



Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
  {
    path: '/',
      //name: 'login',
      //component: Login
      redirect: {
        name:'login'
      }
    },{
      path: '/login',
      name: 'login',
      component: Login
    },{
      path: '/home',
      name: 'home',
      component: Home
    },{
      path:'/report',
      //name:'report',
      component:Report,
      children:[{
        path:'/',
        redirect: {
          name:'schoolLevel'
        }
        //name:'schoolLevel',
        //component:SchoolLevel,
      },{
        path:'/report/schoolLevel',
        name:'schoolLevel',
        component:SchoolLevel,
      },{
        path:'/report/teachingLevel',
        name:'teachingLevel',
        component:TeachingLevel,
      },{
        path:'/report/studentLevel',
        name:'studentLevel',
        component:StudentLevel,
      },{
        path:'/report/classLevel',
        name:'classLevel',
        component:ClassLevel,
      }]
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
