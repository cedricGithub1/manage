import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import actManage from '../views/actManage/index.vue'
import voteView from '../views/voteManage/index.vue'
import dictManage from '../views/dictManage/index.vue'
import upImage from '../views/upImage/index.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    name: 'Home',
    path: '/',
    redirect: '/voteView',
    component: Home,
    children: [
      {
        name: '活动设置',
        path: '/actManage',
        component: actManage,
        show: true
      },
      {
        name: '字典设置',
        path: '/AdictManage',
        component: dictManage,
        show: true
      },
      {
        name: '投票查询',
        path: '/voteView',
        component: voteView,
        show: false
      },
      {
        name: '上传背景图',
        path: '/upImage',
        component: upImage,
        show: true
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router