import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Main',
    component: () => import('@/components/index.vue')
  },
  {
    path: '/tab',
    name: 'Tab',
    component: () => import('@/components/tabMain.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  }
})
export default router
