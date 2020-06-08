import Vue from 'vue'
import Router from 'vue-router'
import Mark from '@/view/mark'
import Index from '@/view/index'
import Article from '@/view/article'


Vue.use(Router)
export default new Router({
  mode: 'history', //设置为 history 模式
  base: '/blog/', //项目访问路径
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
