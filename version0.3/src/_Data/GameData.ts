class GameData{
    public static g_GameData:GameData = null;
    public static getInstance(){
        if(GameData.g_GameData == null){
            GameData.g_GameData = new GameData();
        }
        return GameData.g_GameData;
    }
    public init(){
        GameData.g_GameData = new GameData();
        return GameData.g_GameData;
    }
    public rotationSpeed = 80/1000;
    public restrict_rotaion = 30;
    /*
                  /                         \
                 / rotation +      -rotation \
      ——————————/——————————             ——————\—————————
     + rotation/                               \ rotation -
              /                                 \
             /                                   \
    */
}