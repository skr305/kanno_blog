import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Project from './pages/project.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/project',
    component: Project,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
