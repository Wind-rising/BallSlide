/*
界面基类,封装基本的操作, 打开关闭及注册按钮事件,同时管理界面的显示层级及自动隐藏
*/
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
var BtnEventObj = (function () {
    function BtnEventObj() {
    }
    return BtnEventObj;
}());
__reflect(BtnEventObj.prototype, "BtnEventObj");
var UIBaseMenu = (function (_super) {
    __extends(UIBaseMenu, _super);
    function UIBaseMenu(str) {
        var _this = _super.call(this) || this;
        _this.m_bIsHideBack = false; //显示的时候将层级低于自己的界面全部隐藏
        _this.m_nZorder = 10; //默认层级参数是10
        _this.m_byMenuGroup = 0; //0不限制  1游戏外界面  2游戏内界面
        _this.m_bMyVisable = true;
        _this.m_vEvents = [];
        _this.skinName = str;
        return _this;
    }
    UIBaseMenu.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.top = null;
        this.bottom = null;
        this.left = null;
        this.right = null;
    };
    UIBaseMenu.prototype.Open = function () {
        UICenter.getInstance().OpenForm(this);
        this.start();
    };
    UIBaseMenu.prototype.start = function () {
        var _this = this;
        if (this.Close != undefined) {
            //ButtonEffect.getButtonEffect().addBtnEffect(this.Close);
            //this.Close.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent) => {this.Closed();},this);
            this.AddEvent(this.Close, egret.TouchEvent.TOUCH_TAP, function (e) { _this.Closed(); }, this);
        }
    };
    UIBaseMenu.prototype.Closed = function () {
        UICenter.getInstance().CloseForm(this);
        this.end();
    };
    UIBaseMenu.prototype.end = function () {
        for (var i = 0; i < this.m_vEvents.length; i++) {
            var pBE = this.m_vEvents[i];
            //ButtonEffect.getButtonEffect().removeBtnEffect(pBE.pBtn);
            pBE.pBtn.removeEventListener(pBE.type, pBE.listener, pBE.thisObject);
        }
        this.m_vEvents.splice(0, this.m_vEvents.length);
    };
    //注册事件,按钮点击效果,不需要调用取消函数
    UIBaseMenu.prototype.AddEvent = function (pBtn, type, listener, thisObject) {
        var pBE = null;
        for (var i = 0; i < this.m_vEvents.length; i++) {
            if (this.m_vEvents[i].pBtn == pBtn && this.m_vEvents[i].type == type) {
                pBE = this.m_vEvents[i];
                break;
            }
        }
        if (pBE == null) {
            pBE = new BtnEventObj();
            pBE.pBtn = pBtn;
            pBE.type = type;
            this.m_vEvents.push(pBE);
            //ButtonEffect.getButtonEffect().addBtnEffect(pBE.pBtn);
        }
        else
            pBE.pBtn.removeEventListener(pBE.type, pBE.listener, pBE.thisObject);
        pBE.listener = listener;
        pBE.thisObject = thisObject;
        pBE.pBtn.addEventListener(pBE.type, pBE.listener, pBE.thisObject);
    };
    UIBaseMenu.prototype.Update = function () {
    };
    return UIBaseMenu;
}(eui.Component));
__reflect(UIBaseMenu.prototype, "UIBaseMenu");
//# sourceMappingURL=UIBaseMenu.js.map