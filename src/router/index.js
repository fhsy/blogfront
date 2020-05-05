import Vue from 'vue'
import Router from 'vue-router'
import Mark from '@/view/mark'
import Index from '@/view/index'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/mark',
      name: 'mark',
      component: Mark
    }
  ]
})
