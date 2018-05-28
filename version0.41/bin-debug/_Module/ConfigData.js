var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**所有的配置文件 */
var ConfigData = (function () {
    function ConfigData() {
        //spine配置
        this.EffectCfg_json = RES.getRes("EffectCfg_json");
        //项目配置文件
        this.ProjectData = RES.getRes("project_json");
    }
    ConfigData.getInterface = function () {
        if (this.configData == null) {
            this.configData = new ConfigData();
        }
        return this.configData;
    };
    return ConfigData;
}());
__reflect(ConfigData.prototype, "ConfigData");
//# sourceMappingURL=ConfigData.js.map