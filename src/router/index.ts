import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
// import { useUser } from "@/stores/user";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/catalog",
      name: "catalog",
      // route level code-splitting
      // this generates a separate chunk (Catalog.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CatalogView.vue"),
      meta: { requiesAuth: true },
    },
    {
      path: "/payment",
      name: "payment",
      // route level code-splitting
      // this generates a separate chunk (Payment.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/PaymentView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      // route level code-splitting
      // this generates a separate chunk (Payment.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      // route level code-splitting
      // this generates a separate chunk (Payment.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CheckoutView.vue"),
    },
  ],
});

// router.beforeEach(async (to, from) => {
//   const { loggedIn } = useUser()
//   if (!loggedIn && to.name !== 'login') {
//     localStorage.removeItem('authToken')
//     return { name: 'login' }
//   }
// })

export default router;
