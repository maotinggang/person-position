import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      redirect: 'real-time',
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
    }
  ]
})
