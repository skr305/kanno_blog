import { createRouter as _createRouter, createWebHistory, createMemoryHistory, RouteRecordRaw } from 'vue-router'
import Notes from './pages/notes.vue'
import Project from './pages/project.vue'
import Resume from './pages/resume.vue'
import Posts from './pages/posts.vue'
import NotFound from './pages/not-found.vue'
const camlize = (str: string) => str.replace(/-(\w)/g, (_, $1) => $1.toUpperCase())

const finder = (part: Record<string, any>) => {
  return Object.keys(part).map((mod) => {
    const r = part[mod]
    const name = camlize(r.meta[0].name)
    return {
      path: r.meta[0].name,
      component: part[mod].default,
      name,
      meta: {
        title: r.title
      }
    }
  })
}

export const notes = finder(import.meta.globEager('../posts/notes/*.md'))

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'note',
    component: Notes
  },
  {
    path: '/project',
    name: 'project',
    component: Project
  },
  {
    path: '/resume',
    name: 'resume',
    component: Resume
  },
  {
    path: '/notes',
    component: Posts,
    children: [...notes]
  }
]

export const createRouter = () =>
  _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes
  })

export const getRoutes = () =>
  routes
    .map((item) => {
      let route = []
      if (item.children) {
        item.children.forEach((_) => {
          route.push(`${item.path}/${_.path}`)
        })
      }
      route.push(item.path)
      return route
    })
    .flat()
    .slice(0, -1)
