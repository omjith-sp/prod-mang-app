import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/productList", // initial redirection
    },
    {
      path: "/productList",
      name: "productList",
      component: () => import("./views/productList/productList.vue"),
    },
    {
      path: "/addProduct",
      name: "addProduct",
      component: () => import("./views/addProduct/addProduct.vue"),
    },
    // {
    //   path: "/editProduct/:id",
    //   name: "/editProduct",
    //   component: () => import("./views/editProduct/editProduct.vue"),
    // },
 
  ],
});

export default router;
