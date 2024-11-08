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
        path: "/variable_settings",
        // component: () => import("../../components/views/VariableSettingsView.vue"),
        redirect: "/variable_settings/account_management",
        children: [
            {
                path: "account_management",
                component: () => import("../../components/views/variable_settings_views/VariableSettingsView.vue"),
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;