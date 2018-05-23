/**所有的配置文件 */
class ConfigData{
    private static configData:ConfigData;

    public static getInterface():ConfigData{
        if(this.configData==null){
            this.configData=new ConfigData();
        }
        return this.configData;
    }

    public EffectCfg_json: any = RES.getRes("EffectCfg_json");
    
}