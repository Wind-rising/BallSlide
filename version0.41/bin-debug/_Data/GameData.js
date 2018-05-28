var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameData = (function () {
    function GameData() {
        this.rotationSpeed = 80 / 1000;
        this.restrict_rotaion = 30;
        /*
                      /                         \
                     / rotation +      -rotation \
          ——————————/——————————             ——————\—————————
         + rotation/                               \ rotation -
                  /                                 \
                 /                                   \
        */
    }
    GameData.getInstance = function () {
        if (GameData.g_GameData == null) {
            GameData.g_GameData = new GameData();
        }
        return GameData.g_GameData;
    };
    GameData.prototype.init = function () {
        GameData.g_GameData = new GameData();
        return GameData.g_GameData;
    };
    GameData.g_GameData = null;
    return GameData;
}());
__reflect(GameData.prototype, "GameData");
//# sourceMappingURL=GameData.js.map