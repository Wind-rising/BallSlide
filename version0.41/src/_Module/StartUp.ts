// TypeScript file
class StartUp{
    public static p_startup:StartUp = null;
    public static getInstance(){
        if(StartUp.p_startup == null){
           StartUp.p_startup = new StartUp(); 
           StartUp.p_startup.init();
        }
        return StartUp.p_startup;
    }
    public startTime = +new Date();
    public endTime = +new Date();
    public intervalTime = 0;
    public timer =new egret.Timer(1000/150,0);
    public init(){
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.upDate,this);
        this.timer.start();
    }
    public upDate(){
        this.startTime = +new Date();
        this.intervalTime = this.startTime - this.endTime;
        this.endTime = +new Date();
    }
}