import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        component: () => import("../../components/views/DefaultView.vue"),
    },
    {
        path: "/workplace",
        component: () => import("../../components/views/WorkplaceView.vue"),
    },
    {
        path: "/mission_management",
        component: () => import("../../components/views/MissionManagementView.vue"),
    },
    {
        path: "/event_log",
        component: () => import("../../components/views/EventLogView.vue"),
    },
    {
        path: "/data_query",
        component: () => import("../../components/views/DataQueryView.vue"),
    },
    {
        path: "/variable_settings",
        // component: () => import("../../components/views/VariableSettingsView.vue"),
        redirect: "/variable_settings/account_management",
        children: [
            {
                path: "account_management",
                component: () => import("../../components/views/VariableSettingsView.vue"),
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;