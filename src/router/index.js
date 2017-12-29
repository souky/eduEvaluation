import Vue from 'vue'
import Router from 'vue-router'

/*Vue.use(Router)*/

import NavConfig from './nav.config.json';

const registerRoute = (config) => {
  let route = [];
  config.map(nav =>
    nav.list.map(page =>
      route.push({
        name: page.name,
        path: page.path,
        component: require(`../components/pages${page.path}`),
        meta: {
          title: page.title || page.name,
          description: page.description
        }
      })
    )
  );

  return { route, navs: config };
};

const route = registerRoute(NavConfig);

route.route.push({
  path: '/',
  component: require('../login/login.vue')
},{
  path: '/home',
  component: require('../list.vue')
},{
  path: '/grade',
  component: require('../components/grade/grade.vue')
}/*,{
  path: '/knowledge',
  component: require('../components/knowledge/knowledge.vue')
}*/,{
  path: '/setting',
  component: require('../components/pages/setting.vue')
},{
  path: '/fixpassWord',
  component: require('../components/pages/fixpassWord.vue')
},{
  path: '/helping',
  component: require('../components/pages/helping.vue')
},{
  path: '/personal',
  component: require('../components/pages/personal.vue')
},{
  path: '/fixname',
  component: require('../components/pages/fixname.vue')
},{
   path: '/ability',
   component: require('../components/grade/Ability.vue')
},{
  path: '/knowledges',
  component: require('../components/grade/knowledge.vue')
},{
  path: '/resources',
  component: require('../components/grade/resources.vue')
},{
  path: '/homeknowlegde',
  component: require('../components/pages/homeknowlegde.vue')
},{
  path: '/knowlegdeDetail',
  component: require('../components/pages/knowlegdeDetail.vue')
});

export const navs = route.navs;
export default route.route;
