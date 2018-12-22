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
    path: '/baby/supply',
    component: () => import('@/views/baby/supply'),
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
    path: '/schoolCreate',
    component: () => import('@/views/school/create')
  }, {
    path: '/schoolJoin',
    component: () => import('@/views/school/join')
  }, {
    path: '/notice',
    component: () => import('@/views/notice')
  }, {
    path: '/recipe',
    component: () => import('@/views/recipe')
  }, {
    path: '/clock',
    component: () => import('@/views/clock')
  }, {
    path: '/clock/show/:id',
    component: () => import('@/views/clock/show')
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
    path: '/notice/add',
    component: () => import('@/views/notice/add')
  }, {
    path: '/notice/show/:id',
    component: () => import('@/views/notice/show')
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
  },
  {
    path: '/class/add',
    component: () => import('@/views/class/add')
  },
  {
    path: '/class/edit/:id',
    component: () => import('@/views/class/edit')
  },
  {
    path: '/student',
    component: () => import('@/views/student')
  },
  {
    path: '/student/add',
    component: () => import('@/views/student/add')
  },
  {
    path: '/student/edit/:id',
    component: () => import('@/views/student/edit')
  }
]

export default new Router({
  routes: constantRouterMap
})
