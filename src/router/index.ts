import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            selector: to.hash,
            offset: {
              x: 0,
              y: 100,
            },
          });
        }, 1000);
      });
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta?.title) {
    document.title = `${to.meta.title} - ${process.env.VUE_APP_TITLE}`;
  }
  // requireAuth: true
  if (to.meta?.requiresAuth === undefined) {
    if (!store.getters["auth/isAuthenticated"]) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
