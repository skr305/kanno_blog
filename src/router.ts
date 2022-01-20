import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Notes from "./pages/notes.vue";
import Project from "./pages/project.vue";
import Resume from "./pages/resume.vue";
import Talk from "./pages/talk.vue";
import Posts from "./pages/posts.vue";
import Test from "../posts/notes/test.md";

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
    children: [
      {
        path: "test",
        component: Test,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
