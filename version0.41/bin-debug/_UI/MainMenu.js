/*

UI管理中心

*/
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MainMenu = (function () {
    function MainMenu() {
        //this.m_pMenuQuest  = new QuestMenu();
        this.m_pGameMain = GameMain.getInstance();
    }
    MainMenu.getInstance = function () {
        if (MainMenu.pMainMenu == null) {
            MainMenu.pMainMenu = new MainMenu();
            //PlayerData.player.InitData();
        }
        return MainMenu.pMainMenu;
    };
    MainMenu.prototype.Update = function () {
    };
    MainMenu.pMainMenu = null;
    return MainMenu;
}());
__reflect(MainMenu.prototype, "MainMenu");
//# sourceMappingURL=MainMenu.js.map