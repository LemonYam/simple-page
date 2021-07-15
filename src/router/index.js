import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register'),
    meta: { title: '注册' },
  },
  // 用户登录
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login'),
    meta: { title: '登录' }
  },
  {
    name: 'login',
    path: '/admin/login',
    component: () => import('@/views/ManagerLogin'),
    meta: { title: '管理员登录' }
  },
  // 发布
  {
    name: 'post-create',
    path: '/post/create',
    component: () => import('@/views/CreatePost'),
    meta: { title: '信息发布', requireAuth: true }
  },
  // 编辑
  {
    name: 'topic-edit',
    path: '/topic/edit/:id',
    component: () => import('@/views/EditPost'),
    meta: { title: '编辑', requireAuth: true }
  },
  // 详情
  {
    name: "post-detail",
    path: "/post/:id",
    component: () => import("@/views/Post"),
    meta: { title: "详情" },
  },
  {
    name: 'tag',
    path: '/tag/:name',
    component: () => import('@/views/Tag'),
    meta: { title: '主题列表' }
  },
  // 检索
  {
    name: 'search',
    path: '/search',
    component: () => import('@/views/Search'),
    meta: { title: '检索' }
  },
  // 用户主页
  {
    name: 'user',
    path: '/member/:username/home',
    component: () => import('@/views/UserCenter'),
    meta: { title: '用户主页' }
  },
  // 用户设置
  {
    name: 'user-setting',
    path: '/member/:username/setting',
    component: () => import('@/views/SettingCenter'),
    meta: { title: '设置', requireAuth: true }
  },
  // 用户排行
  {
    name: 'rank',
    path: '/rank',
    component: () => import('@/views/AuthorRank'),
    meta: { title: '用户排行' }
  },
  {
    name: 'manager',
    path: '/manager',
    component: () => import('@/views/ManagePage'),
    meta: { title: '管理中心', requireAuth: true }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    meta: { title: '404 not found' },
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})

export default router
