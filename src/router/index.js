import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export const constantRouterMap = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  component: () => import('@/views/home'),
}]

export default new Router({
  routes: constantRouterMap
})
