import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'real-time',
          name: 'real-time',
          component: () => import('./views/RealTime.vue')
        },
        {
          path: 'history',
          name: 'history',
          component: () => import('./views/History.vue')
        },
        {
          path: 'device',
          name: 'device',
          component: () => import('./views/Device.vue')
        },
        {
          path: 'exportData',
          name: 'exportData',
          component: () => import('./views/exportData.vue')
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: () => import('./views/login/login.vue')
    }
  ]
})
