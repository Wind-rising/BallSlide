//平衡杆
class BalanceBar extends egret.Bitmap{
    constructor(){
        super();
        this.init();
    }
    public touchID = [];
    public init(){
        //初始化元素信息
        Adapt.getInstance().SETBitmap({
            obj:this,
            res:'Stick_png',
            sign:'width',
            length:1.5,
            anchorX:0.5,
            anchorY:0.5,
            x:0.5,
            y:0.7,
        });
    }
}
//触摸屏类
class TouchScreen extends egret.Bitmap{
    constructor(){
        super();
        this.init();
    }
    
    public timer:egret.Timer = new egret.Timer(1000/150,0);
    //帧刷新时间
    public startTime = 0;
    //帧再次刷新时间
    public endTime = 0;
    //角度运动时间  度/秒
    public s_r = GameData.getInstance().rotationSpeed;
    //触控ID
    public touchID = null;
    public init(){
        //初始化元素信息
        Adapt.getInstance().SETBitmap({
            obj:this,
            width:0.5,
            height:0.9,
            guideY:'bottom-bottom',
            y:0,
        });
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.begin,this);
        this.addEventListener(egret.TouchEvent.TOUCH_END,this.end,this);
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.ticker,this);
    }
    public begin(event){
        this.touchID = event.touchPointID;
        GameMain.getInstance().exa_BalanceBar.touchID.push(event.touchPointID);
        this.startTime = +new Date();
        this.timer.start();
    }
    public end(){
        let touchArr = GameMain.getInstance().exa_BalanceBar.touchID;
        for(let i = 0;i<touchArr.length;i++){
            if(touchArr[i]==this.touchID){
                touchArr.splice(i,1);
                break;
            }
        }
        this.timer.stop();
    }
    public ticker(){
        if(GameMain.getInstance().exa_BalanceBar.touchID[0] != this.touchID){
            this.startTime = +new Date();
            return;
        }
        this.endTime = +new Date();
        let rotation = (this.endTime - this.startTime)*this.s_r;
        let restrict_rotaion = GameData.getInstance().restrict_rotaion;
        let balanceBar_rotation = GameMain.getInstance().exa_BalanceBar.rotation;
        rotation = balanceBar_rotation + rotation;
        // GameMain.getInstance().exa_BalanceBar.rotation += rotation;
        if(Math.abs(rotation)>restrict_rotaion){
            rotation = this.s_r>0?restrict_rotaion:-restrict_rotaion;
        }
        GameMain.getInstance().exa_BalanceBar.rotation = rotation;
        GameMain.getInstance().exa_Ball.move();
        this.startTime = +new Date();
    }
}
//触摸屏左
class TouchScreenLeft extends TouchScreen{
    constructor(){
        super();
        this.init();
    }
    public s_r = this.s_r;
    public init(){
        super.init();
        Adapt.getInstance().SETBitmap({
            obj:this,
            x:0,
        });
    }
}
//触摸屏右
class TouchScreenRight extends TouchScreen{
    constructor(){
        super();
        this.init();
    }
    public s_r = -this.s_r;
    public init(){
        super.init();
        Adapt.getInstance().SETBitmap({
            obj:this,
            x:0.5,
        });
    }
}
//限制模块
class Restrict extends egret.Bitmap{
    constructor(){
        super();
        this.init();
    }
    public init(){
        Adapt.getInstance().SETBitmap({
            obj:this,
            res:'sanjiao_png',
            sign:'width',
            length:0.2,
        })
        // this.y = GameMain.getInstance().exa_BalanceBar.y + 
    }
}
//球
class Ball extends egret.Bitmap{
    public father:BalanceBar = null;
    constructor(BalanceBar){
        super();
        this.father = BalanceBar;
        this.init();
    }
    public init(){
        Adapt.getInstance().SETBitmap({
            obj:this,
            res:'Earth2_png',
            sign:'width',
            length:0.5,
            x:0.5,
            anchorX:0.5,
            anchorY:0.5,
        });
        // this.y = 
        let data = Adapt.getInstance().Triangle({
            A:this.father.rotation,
            c:this.height/2+this.father.height/2,
        });
        this.y = this.father.y - data.b;
        this.x = this.father.x - data.a;
    }
    public move(){
        let data = Adapt.getInstance().Triangle({
            A:this.father.rotation,
            c:this.height/2+this.father.height/2,
        });
        this.y = this.father.y - data.b;
        this.x = this.father.x + data.a;
    }
}