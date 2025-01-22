import { RouteConfig } from "vue-router";

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Post",
    component: () => import("@/views/Post/PostList.vue"),
    meta: {
      title: "Posts",
    },
  },
  {
    path: "/post-detail/:id",
    name: "PostDetail",
    component: () => import("@/views/Post/PostDetail.vue"),
    meta: {
      title: "Post Detail",
      hideNavbar: true,
      backLink: "/",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Auth/Login.vue"),
    meta: {
      requiresAuth: false,
      title: "Login Page",
    },
  },
];

export default routes;
