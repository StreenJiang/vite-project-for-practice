import MenuConfig from "../view_models/MenuConfig";

// Use SFC name to identify an icon
const menuConfigs = [
    new MenuConfig(100, "工作台", "WorkplaceSvg.vue", "/workplace"),
    new MenuConfig(200, "任务管理", "MissionManagementSvg.vue", "/mission_management"),
    new MenuConfig(400, "数据查询", "DataQuerySvg.vue", "/data_query"),
    new MenuConfig(500, "配置信息", "SettingInfoSvg.vue", "/settings_info", [
        new MenuConfig(501, "账户管理", "UserAccountManagementSvg.vue", "/settings_info/account_management"),
        new MenuConfig(502, "站点配置", "WorkstationSvg.vue"),
        new MenuConfig(503, "工具配置", "ToolSvg.vue"),
        new MenuConfig(504, "力臂配置", "ArmSvg.vue"),
    ]),
];

// System settings
const systemSettings = {
};


export { menuConfigs, systemSettings }