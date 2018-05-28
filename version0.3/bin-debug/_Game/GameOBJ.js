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
        //帧刷新时间K@
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
        _this.noAnmationRotation = 0;
        _this.m = 1; //单位kg
        // public timer:egret.Timer = new egret.Timer(1000/150,0);
        //当前相对平衡杆水平作用力
        _this.F = 0;
        //当前相对平衡杆运动距离
        _this.dis = 0;
        //当前相对平衡杆加速度
        _this.A = 0;
        //当前相对平衡杆加速度
        _this.V = 0;
        //小球模拟沿平衡杆运动
        //相对于屏幕x轴加速度
        _this.Ax = 0;
        //相对于屏幕y轴加速度
        _this.Ay = 0;
        //相对于屏幕x轴速度
        _this.Vx = 0;
        //相对于屏幕y轴速度
        _this.Vy = 0;
        _this.father = BalanceBar;
        _this.init();
        StartUp.getInstance().timer.addEventListener(egret.TimerEvent.TIMER, _this.ticker, _this);
        return _this;
    }
    Ball.prototype.init = function () {
        Adapt.getInstance().SETBitmap({
            obj: this,
            res: 'Earth2_png',
            sign: 'width',
            length: 0.2,
            x: 0.5,
            anchorX: 0.5,
            anchorY: 0.5,
        });
        // this.y = 
        this.initPos();
        this.move();
    };
    Ball.prototype.initPos = function () {
        var data = Adapt.getInstance().Triangle({
            A: this.father.rotation,
            c: this.height / 2 + this.father.height / 2,
        });
        this.y = this.father.y - data.b;
        this.x = this.father.x + data.a;
        this.rotation -= this.noAnmationRotation - this.father.rotation;
        this.noAnmationRotation = this.father.rotation;
        this.calcAcc();
    };
    Ball.prototype.move = function () {
        var data = Adapt.getInstance().Triangle({
            a: this.width / 2 + this.father.height / 2,
            b: this.dis,
        });
        var IncludeA = this.father.rotation - data.A;
        var data2 = Adapt.getInstance().Triangle({
            A: IncludeA,
            c: data.c,
        });
        if (this.dis < 0) {
            var data3 = Adapt.getInstance().Triangle({
                B: this.father.rotation,
                c: this.father.height + this.width,
            });
            this.x = this.father.x - data2.b + data3.b;
            this.y = this.father.y - data2.a - data3.a;
        }
        else {
            this.x = this.father.x + data2.b;
            this.y = this.father.y + data2.a;
        }
        this.rotation -= this.noAnmationRotation - this.father.rotation;
        this.noAnmationRotation = this.father.rotation;
        // 超出归位
        // if(this.x<this.width/2){
        //     let A = (90 - this.father.rotation)/2;
        //     let B = 90 - A;
        //     let B2 = B - A;
        //     let data4 = Adapt.getInstance().Triangle({
        //         B:B2,
        //         c:this.width/2,
        //     });
        //     this.x = this.width/2;
        //     this.y = this.father.y - data.a;
        // }else if(this.x > Adapt.getInstance().stageWidth - this.width/2){
        //     let A = (90 - this.father.rotation)/2;
        //     let B = 90 - A;
        //     let B2 = B - A;
        //     let data4 = Adapt.getInstance().Triangle({
        //         B:B2,
        //         c:this.width/2,
        //     });
        //     this.x = Adapt.getInstance().stageWidth - this.width/2;
        //     this.y = this.father.y - data.a;
        // }
        if (this.x < this.width / 2) {
            //超出屏幕外平衡杆夹角小三角型
            var data4 = Adapt.getInstance().Triangle({
                A: (90 - this.father.rotation),
                a: this.father.height / 2
            });
            //一半杆子呈现三角形
            var data5 = Adapt.getInstance().Triangle({
                A: this.father.rotation,
                b: Adapt.getInstance().stageWidth / 2,
            });
            console.log(data5);
            //why?不知道为什么，但修正了
            var data7 = Adapt.getInstance().Triangle({
                A: this.father.rotation,
                b: this.width / 2 + this.father.height / 2,
            });
            this.x = this.width / 2;
            if (data5.a < 0) {
                //球与边夹角三角形
                var data6 = Adapt.getInstance().Triangle({
                    A: (90 - this.father.rotation) / 2,
                    a: this.width / 2,
                });
                this.y = this.father.y - data5.a + data4.c + data6.b - data7.c * 2;
                this.dis = -(data5.c - data6.b);
            }
            else {
                //球与边夹角三角形
                var data6 = Adapt.getInstance().Triangle({
                    A: (90 + this.father.rotation) / 2,
                    a: this.width / 2,
                });
                console.log(data5.a, data4.c, data6.b);
                this.y = this.father.y - data5.a - data4.c - data6.b;
                this.dis = -(data5.c - data6.b);
            }
            this.V = 0;
            this.Vx = 0;
            this.Vy = 0;
        }
        else if (this.x > Adapt.getInstance().stageWidth - this.width / 2) {
            //超出屏幕外平衡杆夹角小三角型
            var data4 = Adapt.getInstance().Triangle({
                A: (90 - this.father.rotation),
                a: this.father.height / 2
            });
            //整个杆子呈现三角形
            var data5 = Adapt.getInstance().Triangle({
                A: this.father.rotation,
                b: Adapt.getInstance().stageWidth / 2,
            });
            console.log(data5);
            //球与边夹角三角形
            var data6 = Adapt.getInstance().Triangle({
                A: (90 - this.father.rotation) / 2,
                a: this.width / 2,
            });
            this.x = Adapt.getInstance().stageWidth - this.width / 2;
            // console.log(data5.a , data4.c , data6.b)
            this.y = this.father.y + data5.a - data4.c - data6.b;
            this.dis = data5.c - data6.b;
            this.V = 0;
            this.Vx = 0;
            this.Vy = 0;
            // console.log(this.x,this.y)    
        }
        this.calcAcc();
    };
    Ball.prototype.calcAcc = function () {
        this.F = Adapt.getInstance().powerDispersed({ m: this.m, rotation: this.father.rotation });
        this.A = this.F / this.m;
        var aData = Adapt.getInstance().Triangle({ c: this.A, A: this.father.rotation });
        var vData = Adapt.getInstance().Triangle({ c: this.V, A: this.father.rotation });
        this.Ax = aData.b;
        this.Ay = aData.a;
        this.Vx = vData.b;
        this.Vy = vData.a;
    };
    Ball.prototype.ticker = function () {
        if ((this.x < this.width / 2) || (this.x > Adapt.getInstance().stageWidth - this.width / 2)) {
            if ((this.x < this.width / 2 && this.Vx < 0 && this.father.rotation > 0) || (this.x > Adapt.getInstance().stageWidth - this.width / 2 && this.Vx > 0 && this.father.rotation < 0)) {
                this.A = 0;
                this.Ax = 0;
                this.Ay = 0;
                this.V = 0;
                this.Vx = 0;
                this.Vy = 0;
                this.move();
                var intervalTime_1 = StartUp.getInstance().intervalTime / 1000;
                this.V += this.A * intervalTime_1;
                this.Vx += this.Ax * intervalTime_1;
                this.Vy += this.Ay * intervalTime_1;
                this.dis += this.V;
                this.x += this.Vx;
                this.y += this.Vy;
                console.log(this.Vx);
                return;
            }
            else if ((this.x < this.width / 2 && this.father.rotation < 0) || (this.x > Adapt.getInstance().stageWidth - this.width / 2 && this.father.rotation > 0)) {
                this.A = 0;
                this.Ax = 0;
                this.Ay = 0;
                this.V = 0;
                this.Vx = 0;
                this.Vy = 0;
                return;
            }
        }
        var intervalTime = StartUp.getInstance().intervalTime / 1000;
        this.V += this.A * intervalTime;
        this.Vx += this.Ax * intervalTime;
        this.Vy += this.Ay * intervalTime;
        this.dis += this.V;
        this.x += this.Vx;
        this.y += this.Vy;
    };
    return Ball;
}(egret.Bitmap));
__reflect(Ball.prototype, "Ball");
//# sourceMappingURL=GameOBJ.js.map