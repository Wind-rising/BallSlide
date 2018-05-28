/**所有的配置文件 */
class ConfigData{
    private static configData:ConfigData;

    public static getInterface():ConfigData{
        if(this.configData==null){
            this.configData=new ConfigData();
        }
        return this.configData;
    }
    //spine配置
    public EffectCfg_json: any = RES.getRes("EffectCfg_json");
    //项目配置文件
    public ProjectData:any = RES.getRes("project_json");
}