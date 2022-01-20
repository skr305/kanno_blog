import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Notes from "./pages/notes.vue";
import Project from "./pages/project.vue";
import Resume from "./pages/resume.vue";
import Talk from "./pages/talk.vue";
import Posts from "./pages/posts.vue";
const camlize = (str: string) =>
  str.replace(/-(\w)/g, (_, $1) => $1.toUpperCase());

const finder = (part: Record<string, any>) => {
  return Object.keys(part).map((mod) => {
    const r = part[mod];
    const name = camlize(r.meta[0].name);
    return {
      path: r.meta[0].name,
      component: part[mod].default,
      name,
    };
  });
};

export const notes = finder(import.meta.globEager("../posts/notes/*.md"));

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "note",
    component: Notes,
  },
  {
    path: "/project",
    name: "project",
    component: Project,
  },
  {
    path: "/resume",
    name: "resume",
    component: Resume,
  },
  {
    path: "/talk",
    name: "talk",
    component: Talk,
  },
  {
    path: "/notes",
    component: Posts,
    children: [...notes],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
