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
    path: '/baby',
    component: () => import('@/views/baby'),
  }, {
    path: '/baby/add',
    component: () => import('@/views/baby/add')
  }, {
    path: '/community',
    component: () => import('@/views/community')
  }, {
    path: '/my',
    component: () => import('@/views/my')
  }, {
    path: '/parentMy',
    component: () => import('@/views/my/parentMy')
  }, {
    path: '/login',
    component: () => import('@/views/login')
  }, {
    path: '/createSchool',
    component: () => import('@/views/createschool')
  }, {
    path: '/fresh',
    component: () => import('@/views/fresh')
  }, {
    path: '/fresh/show',
    component: () => import('@/views/fresh/show')
  }, {
    path: '/notice',
    component: () => import('@/views/notice')
  }, {
    path: '/teacher',
    component: () => import('@/views/teacher')
  }, {
    path: '/teacher/add',
    component: () => import('@/views/teacher/add')
  }, {
    path: '/teacher/edit/:id',
    component: () => import('@/views/teacher/edit')
  },
  {
    path: '/class',
    component: () => import('@/views/class')
  }
]

export default new Router({
  routes: constantRouterMap
})
