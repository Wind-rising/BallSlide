/*

界面层管理中心

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
var UICenter = (function (_super) {
    __extends(UICenter, _super);
    function UICenter() {
        var _this = _super.call(this) || this;
        _this.m_vInViewMenu = [];
        _this.touchEnabled = false;
        return _this;
    }
    UICenter.getInstance = function () {
        if (UICenter.g_uiCenter == null) {
            UICenter.g_uiCenter = new UICenter();
            //PlayerData.player.InitData();
        }
        return UICenter.g_uiCenter;
    };
    UICenter.prototype.Update = function () {
        for (var i = 0; i < this.m_vInViewMenu.length; i++) {
            if (this.m_vInViewMenu[i].m_bMyVisable)
                this.m_vInViewMenu[i].Update();
            this.m_vInViewMenu[i].visible = this.m_vInViewMenu[i].m_bMyVisable;
        }
    };
    //用于UIBaseMenu的调用,外部不可访问
    UICenter.prototype.OpenForm = function (pMenu) {
        this.CloseForm(pMenu);
        for (var i = 0; i < this.m_vInViewMenu.length; i++) {
            if (this.m_vInViewMenu[i].m_nZorder > pMenu.m_nZorder) {
                this.addChildAt(pMenu, i);
                this.m_vInViewMenu.splice(i, 0, pMenu);
                return;
            }
        }
        //直接在最上层打开
        this.addChild(pMenu);
        this.m_vInViewMenu.push(pMenu);
    };
    //用于UIBaseMenu的调用,外部不可访问
    UICenter.prototype.CloseForm = function (pMenu) {
        for (var i = 0; i < this.m_vInViewMenu.length; i++) {
            if (this.m_vInViewMenu[i] == pMenu) {
                this.removeChild(pMenu);
                this.m_vInViewMenu.splice(i, 1);
                return;
            }
        }
    };
    UICenter.g_uiCenter = null;
    return UICenter;
}(eui.UILayer));
__reflect(UICenter.prototype, "UICenter");
//# sourceMappingURL=UICenter.js.map