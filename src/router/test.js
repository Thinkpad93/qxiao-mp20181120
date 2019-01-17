import Vue from 'vue';
import Route from 'vue-router';

Vue.use(Router);

//所有权限通用路由表 
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login'),
    meta: {
      title: '登陆',
      keepAlive: false,
      roles: [1, 2, 3]
    }
  },
  {
    path: '/author',
    component: () => import('@/views/login'),
    meta: {
      title: '',
      keepAlive: false,
      roles: [1, 2, 3]
    }
  },
  {
    path: '/notice',
    component: () => import('@/views/notice'),
    meta: {
      title: '通知公告',
      keepAlive: true,
      roles: [1, 2, 3]
    },
    children: [{
        path: '/notice/add',
        component: () => import('@/views/notice/add'),
        meta: {
          title: '公告发布',
          keepAlive: false,
          roles: [1, 2, 3]
        }
      },
      {
        path: '/notice/show/:id',
        component: () => import('@/views/notice/show'),
        meta: {
          title: '公告详情',
          keepAlive: true,
          roles: [1, 2, 3]
        }
      }
    ]
  }
]
