import Vue from 'vue'
import Router from 'vue-router'
import Mark from '@/view/mark'
import Index from '@/view/index'
import Article from '@/view/article'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/article',
      name: 'article',
      component: Article
    },
    {
      path: '/mark',
      name: 'mark',
      component: Mark
    }
  ]
})
