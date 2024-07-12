import MenuConfig from "../view_models/MenuConfig";

// Use SFC name to identify an icon
const menuConfigs = [
    new MenuConfig(100, "工作台", "WorkplaceSvg.vue"),
    new MenuConfig(200, "任务管理", "MissionManagementSvg.vue"),
    new MenuConfig(300, "事件日志", "EventLogSvg.vue"),
    new MenuConfig(400, "数据查询", "DataQuerySvg.vue"),
    new MenuConfig(500, "参数配置", "VariableSettingSvg.vue", "/", [
        new MenuConfig(501, "账户管理", "UserAccountManagementSvg.vue"),
        new MenuConfig(502, "站点配置", "WorkstationSvg.vue"),
        new MenuConfig(503, "工具配置", "ToolSvg.vue"),
        new MenuConfig(504, "力臂配置", "ArmSvg.vue"),
    ]),
];


export { menuConfigs }