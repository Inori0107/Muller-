/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import {
  createRouter,
  createWebHashHistory,
  START_LOCATION,
} from "vue-router/auto";
import { setupLayouts } from "virtual:generated-layouts";
import { useUserStore } from "@/stores/user";
import { routes } from "vue-router/auto-routes";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const user = useUserStore();
  // 如果是初始位置，則加載使用者資料
  if (from === START_LOCATION) {
    await user.profile();
  }
  if (to.meta.login && !user.isLogin) {
    next({
      query: {
        login: true,
      },
    });
  } else if (to.meta.admin && !user.isAdmin) {
    next("/"); // 導航到首頁
  } else {
    next(); // 繼續導航
  }
});

router.afterEach((to, from) => {
  document.title = to.meta.title;
});

export default router;
