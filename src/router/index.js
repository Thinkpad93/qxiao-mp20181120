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
}, {
  path: '/login',
  component: () => import('@/views/login')
}, {
  path: '/fresh',
  component: () => import('@/views/fresh/index')
}, {
  path: '/fresh/show',
  component: () => import('@/views/fresh/show')
}, {
  path: '/notice',
  component: () => import('@/views/notice/index')
}]

export default new Router({
  routes: constantRouterMap
})
