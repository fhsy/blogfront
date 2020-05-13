import Vue from 'vue'
import Router from 'vue-router'
import Mark from '@/view/mark'
import Index from '@/view/index'
import Index2 from '@/view/index2'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/index2',
      name: 'index2',
      component: Index2
    },
    {
      path: '/mark',
      name: 'mark',
      component: Mark
    }
  ]
})
