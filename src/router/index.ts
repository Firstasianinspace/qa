import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import { Cookies } from "quasar";

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
      // this generates a separate chunk (Cart.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CartView.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      // route level code-splitting
      // this generates a separate chunk (Checkout.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CheckoutView.vue"),
    },
    {
      path: "/user",
      name: "user",
      // route level code-splitting
      // this generates a separate chunk (User.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/UserView.vue"),
    },
    {
      path: "/orders/:id",
      name: "orders",
      // route level code-splitting
      // this generates a separate chunk (Order.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/OrderView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      // route level code-splitting
      // this generates a separate chunk (Admin.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AdminView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const hasToken = Cookies.has("authToken");
  if (to.name !== "login" && !hasToken) next({ name: "login" });
  else next();
});
// router.beforeEach(async (to, from) => {
//   const { loggedIn } = useUser()
//   if (!loggedIn && to.name !== 'login') {
//     localStorage.removeItem('authToken')
//     return { name: 'login' }
//   }
// })

export default router;
