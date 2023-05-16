import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestView from '../views/TestView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/products',
    name: 'product.list',
    component: () => import(/* webpackChunkName: "about" */ '../views/products/List.vue')
  },
  {
    path: '/products/create',
    name: 'product.create',
    component: () => import(/* webpackChunkName: "about" */ '../views/products/Form.vue')
  },
    {
    path: '/products/edit/:id',
    name: 'product.edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/products/Form.vue')
  },
  {
    path: '/user',
    name: 'user.list',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/List.vue')
  },
  {
    path: '/user/create',
    name: 'user.create',
    component: () => import(/* webpackChunkName: "about" */ '../views/user/Form.vue')
  },
  {
    path: '/test',
    name: 'TESTVIEW',
    component: TestView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
