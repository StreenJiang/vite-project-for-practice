import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("../../components/views/WorkplaceView.vue"),
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;