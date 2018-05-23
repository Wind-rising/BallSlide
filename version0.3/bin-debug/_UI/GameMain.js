var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
//游戏场景
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        var _this = _super.call(this, 'skin_BallSlideGame') || this;
        _this.exa_BalanceBar = new BalanceBar();
        _this.exa_TouchScreenLeft = new TouchScreenLeft();
        _this.exa_TouchScreenRight = new TouchScreenRight();
        _this.exa_Ball = new Ball(_this.exa_BalanceBar);
        _this.init();
        return _this;
    }
    GameMain.getInstance = function () {
        if (GameMain.g_GameMain == null) {
            GameMain.g_GameMain = new GameMain();
        }
        return GameMain.g_GameMain;
    };
    //初始化
    GameMain.prototype.init = function () {
        if (GameMain.g_GameMain != null) { } //删除页面控件监听
        this.addChild(this.exa_BalanceBar);
        this.addChild(this.exa_Ball);
        this.addChild(this.exa_TouchScreenLeft);
        this.addChild(this.exa_TouchScreenRight);
    };
    GameMain.g_GameMain = null;
    return GameMain;
}(UIBaseMenu));
__reflect(GameMain.prototype, "GameMain");
//# sourceMappingURL=GameMain.js.map