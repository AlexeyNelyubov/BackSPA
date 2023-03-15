import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../views/IndexView.vue";
const AuthPage = () => import("@/views/AuthView.vue");
import { useAuthStore } from "@/stores/AuthStore.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "IndexPage",
      component: IndexPage,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (!authStore.logIn)
          next({ name: "AuthPage", params: { id: "signin" } });
        else next();
      },
    },
    {
      path: "/:id",
      name: "AuthPage",
      component: AuthPage,
      props: (route) => ({ id: route.params.id }),
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore();
        if (authStore.logIn) next({ name: "IndexPage" });
        else next();
      },
    },
  ],
});

export default router;
