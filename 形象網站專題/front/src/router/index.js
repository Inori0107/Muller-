/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import Home from '../pages/index.vue';
import Information from '../pages/information.vue';
import Introduce from '../pages/introduce.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/information', component: Information },
  { path: '/introduce', component: Introduce },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
  routes,
})

export default router
