import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("../../components/views/DefaultView.vue"),
    },
    {
        path: "/default",
        component: () => import("../../components/views/DefaultView.vue"),
    },
    {
        path: "/workplace",
        component: () => import("../../components/views/workplace_views/WorkplaceView.vue"),
    },
    {
        path: "/mission_management",
        component: () => import("../../components/views/mission_management_views/MissionManagementView.vue"),
    },
    {
        path: "/data_query",
        component: () => import("../../components/views/data_query_views/DataQueryView.vue"),
    },
    {
        path: "/settings_info",
        // component: () => import("../../components/views/SettingsInfoView.vue"),
        redirect: "/settings_info/account_management",
        children: [
            {
                path: "account_management",
                component: () => import("../../components/views/settings_info_views/SettingsInfoView.vue"),
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;