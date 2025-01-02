import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

import Dashboard from "../views/Dashboard.vue";
import RegisterUser from "../views/RegisterUser.vue";
import LoginUser from "../views/LoginUser.vue";
import PostDetails from "../views/PostDetails.vue";
import PostCreate from "../views/PostCreate.vue";
import PostUpdate from "../views/PostUpdate.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:id",
    name: "PostDetails",
    component: PostDetails,
  },
  {
    path: "/update/:id",
    name: "PostUpdate",
    component: PostUpdate,
  },
  {
    path: "/create",
    name: "PostCreate",
    component: PostCreate,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterUser,
  },
  {
    path: "/login",
    name: "login",
    component: LoginUser,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem("user");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/");
  }
  next();
});

export default router;
