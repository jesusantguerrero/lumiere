import Landing from "./pages/Landing/index.vue";
import Login from "./pages/Auth/Login.vue";
import Dashboard from "./pages/Dashboard.vue";
import { createRouter, createWebHistory } from "vue-router";
import config from "./config";
import { isAuthenticated } from "./utils/useFirebase";

export const routes = [
  {
    path: "/",
    component: Landing,
    name: "landing",
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/login",
    component: Login,
    name: "login",
    props: {
      mode: "login",
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    component: Login,
    name: "register",
    props: {
      mode: "register",
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
];

const myRouter = createRouter({
  history: createWebHistory(),
  routes,
});

myRouter.beforeEach(async (to, _from, next) => {
  const user = await isAuthenticated();
  if (to.meta.requiresAuth !== false && !user) {
    next({ name: "login" });
  } else if (to.meta.requiresAuth == false && user && config.loginRoutes.includes(to.name)) {
    next({ name: config.home });
  } else {
    next();
  }
});

export default myRouter;
