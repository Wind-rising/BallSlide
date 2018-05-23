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
//平衡杆
var BalanceBar = (function (_super) {
    __extends(BalanceBar, _super);
    function BalanceBar() {
        var _this = _super.call(this) || this;
        _this.touchID = [];
        _this.init();
        return _this;
    }
    BalanceBar.prototype.init = function () {
        //初始化元素信息
        Adapt.getInstance().SETBitmap({
            obj: this,
            res: 'Stick_png',
            sign: 'width',
            length: 1.5,
            anchorX: 0.5,
            anchorY: 0.5,
            x: 0.5,
            y: 0.7,
        });
    };
    return BalanceBar;
}(egret.Bitmap));
__reflect(BalanceBar.prototype, "BalanceBar");
//触摸屏类
var TouchScreen = (function (_super) {
    __extends(TouchScreen, _super);
    function TouchScreen() {
        var _this = _super.call(this) || this;
        _this.timer = new egret.Timer(1000 / 150, 0);
        //帧刷新时间
        _this.startTime = 0;
        //帧再次刷新时间
        _this.endTime = 0;
        //角度运动时间  度/秒
        _this.s_r = GameData.getInstance().rotationSpeed;
        //触控ID
        _this.touchID = null;
        _this.init();
        return _this;
    }
    TouchScreen.prototype.init = function () {
        //初始化元素信息
        Adapt.getInstance().SETBitmap({
            obj: this,
            width: 0.5,
            height: 0.9,
            guideY: 'bottom-bottom',
            y: 0,
        });
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.end, this);
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.ticker, this);
    };
    TouchScreen.prototype.begin = function (event) {
        this.touchID = event.touchPointID;
        GameMain.getInstance().exa_BalanceBar.touchID.push(event.touchPointID);
        this.startTime = +new Date();
        this.timer.start();
    };
    TouchScreen.prototype.end = function () {
        var touchArr = GameMain.getInstance().exa_BalanceBar.touchID;
        for (var i = 0; i < touchArr.length; i++) {
            if (touchArr[i] == this.touchID) {
                touchArr.splice(i, 1);
                break;
            }
        }
        this.timer.stop();
    };
    TouchScreen.prototype.ticker = function () {
        if (GameMain.getInstance().exa_BalanceBar.touchID[0] != this.touchID) {
            this.startTime = +new Date();
            return;
        }
        this.endTime = +new Date();
        var rotation = (this.endTime - this.startTime) * this.s_r;
        var restrict_rotaion = GameData.getInstance().restrict_rotaion;
        var balanceBar_rotation = GameMain.getInstance().exa_BalanceBar.rotation;
        rotation = balanceBar_rotation + rotation;
        // GameMain.getInstance().exa_BalanceBar.rotation += rotation;
        if (Math.abs(rotation) > restrict_rotaion) {
            rotation = this.s_r > 0 ? restrict_rotaion : -restrict_rotaion;
        }
        GameMain.getInstance().exa_BalanceBar.rotation = rotation;
        GameMain.getInstance().exa_Ball.move();
        this.startTime = +new Date();
    };
    return TouchScreen;
}(egret.Bitmap));
__reflect(TouchScreen.prototype, "TouchScreen");
//触摸屏左
var TouchScreenLeft = (function (_super) {
    __extends(TouchScreenLeft, _super);
    function TouchScreenLeft() {
        var _this = _super.call(this) || this;
        _this.s_r = _this.s_r;
        _this.init();
        return _this;
    }
    TouchScreenLeft.prototype.init = function () {
        _super.prototype.init.call(this);
        Adapt.getInstance().SETBitmap({
            obj: this,
            x: 0,
        });
    };
    return TouchScreenLeft;
}(TouchScreen));
__reflect(TouchScreenLeft.prototype, "TouchScreenLeft");
//触摸屏右
var TouchScreenRight = (function (_super) {
    __extends(TouchScreenRight, _super);
    function TouchScreenRight() {
        var _this = _super.call(this) || this;
        _this.s_r = -_this.s_r;
        _this.init();
        return _this;
    }
    TouchScreenRight.prototype.init = function () {
        _super.prototype.init.call(this);
        Adapt.getInstance().SETBitmap({
            obj: this,
            x: 0.5,
        });
    };
    return TouchScreenRight;
}(TouchScreen));
__reflect(TouchScreenRight.prototype, "TouchScreenRight");
//限制模块
var Restrict = (function (_super) {
    __extends(Restrict, _super);
    function Restrict() {
        var _this = _super.call(this) || this;
        _this.init();
        return _this;
    }
    Restrict.prototype.init = function () {
        Adapt.getInstance().SETBitmap({
            obj: this,
            res: 'sanjiao_png',
            sign: 'width',
            length: 0.2,
        });
        // this.y = GameMain.getInstance().exa_BalanceBar.y + 
    };
    return Restrict;
}(egret.Bitmap));
__reflect(Restrict.prototype, "Restrict");
//球
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(BalanceBar) {
        var _this = _super.call(this) || this;
        _this.father = null;
        _this.father = BalanceBar;
        _this.init();
        return _this;
    }
    Ball.prototype.init = function () {
        Adapt.getInstance().SETBitmap({
            obj: this,
            res: 'Earth2_png',
            sign: 'width',
            length: 0.5,
            x: 0.5,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        // this.y = 
        var data = Adapt.getInstance().Triangle({
            A: this.father.rotation,
            c: this.height / 2 + this.father.height / 2,
        });
        this.y = this.father.y - data.b;
        this.x = this.father.x - data.a;
    };
    Ball.prototype.move = function () {
        var data = Adapt.getInstance().Triangle({
            A: this.father.rotation,
            c: this.height / 2 + this.father.height / 2,
        });
        this.y = this.father.y - data.b;
        this.x = this.father.x + data.a;
    };
    return Ball;
}(egret.Bitmap));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=GameOBJ.js.map