import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/page1',
        name: 'page1',
        meta: {
          title: 'page1'
        },
        component: () => import('@/views/Page1.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        meta: {
          title: 'page2'
        },
        component: () => import('@/views/Page2.vue')
      },
      {
        path: '/page3',
        name: 'page3',
        meta: {
          title: 'page3'
        },
        component: () => import('@/views/Page3.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
