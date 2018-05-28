var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var StartUp = (function () {
    function StartUp() {
        this.startTime = +new Date();
        this.endTime = +new Date();
        this.intervalTime = 0;
        this.timer = new egret.Timer(1000 / 150, 0);
    }
    StartUp.getInstance = function () {
        if (StartUp.p_startup == null) {
            StartUp.p_startup = new StartUp();
            StartUp.p_startup.init();
        }
        return StartUp.p_startup;
    };
    StartUp.prototype.init = function () {
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.upDate, this);
        this.timer.start();
    };
    StartUp.prototype.upDate = function () {
        this.startTime = +new Date();
        this.intervalTime = this.startTime - this.endTime;
        this.endTime = +new Date();
    };
    StartUp.p_startup = null;
    return StartUp;
}());
__reflect(StartUp.prototype, "StartUp");
//# sourceMappingURL=StartUp.js.map