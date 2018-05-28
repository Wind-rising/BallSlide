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
    //帧刷新时间K@
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
    public noAnmationRotation = 0;
    public m = 1;//单位kg
    // public timer:egret.Timer = new egret.Timer(1000/150,0);
    //当前相对平衡杆水平作用力
    public F = 0;
    //当前相对平衡杆运动距离
    public dis = 0;
    //当前相对平衡杆加速度
    public A = 0;
    //当前相对平衡杆加速度
    public V = 0;
    //小球模拟沿平衡杆运动
    //相对于屏幕x轴加速度
    public Ax = 0;
    //相对于屏幕y轴加速度
    public Ay = 0;
    //相对于屏幕x轴速度
    public Vx = 0;
    //相对于屏幕y轴速度
    public Vy = 0;
    constructor(BalanceBar){
        super();
        this.father = BalanceBar;
        this.init();
        StartUp.getInstance().timer.addEventListener(egret.TimerEvent.TIMER,this.ticker,this);
    }
    public init(){
        Adapt.getInstance().SETBitmap({
            obj:this,
            res:'Earth2_png',
            sign:'width',
            length:0.2,
            x:0.5,
            anchorX:0.5,
            anchorY:0.5,
        });
        // this.y = 
        this.initPos();
        this.move();
    }
    public initPos(){
        let data = Adapt.getInstance().Triangle({
            A:this.father.rotation,
            c:this.height/2+this.father.height/2,
        });
        this.y = this.father.y - data.b;
        this.x = this.father.x + data.a;
        this.rotation -= this.noAnmationRotation - this.father.rotation;
        this.noAnmationRotation = this.father.rotation;
        this.calcAcc();
    }
    public move(){
        let data = Adapt.getInstance().Triangle({
            a:this.width/2+this.father.height/2,
            b:this.dis,
        });
        let IncludeA = this.father.rotation - data.A;
        let data2 = Adapt.getInstance().Triangle({
            A:IncludeA,
            c:data.c,
        });
        if(this.dis<0){
            let data3 = Adapt.getInstance().Triangle({
                B:this.father.rotation,
                c:this.father.height+this.width,
            });
            this.x = this.father.x - data2.b + data3.b;
            this.y = this.father.y - data2.a - data3.a;
        }else{
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
        if(this.x<this.width/2){
            //超出屏幕外平衡杆夹角小三角型
            let data4 = Adapt.getInstance().Triangle({
                A:(90 - this.father.rotation),
                a:this.father.height/2
            });
            //一半杆子呈现三角形
            let data5 = Adapt.getInstance().Triangle({
                A:this.father.rotation,
                b:Adapt.getInstance().stageWidth/2,
            }); 
            console.log(data5)
            
            
            //why?不知道为什么，但修正了
            let data7 = Adapt.getInstance().Triangle({
                A:this.father.rotation,
                b:this.width/2+this.father.height/2,
            });
            this.x =  this.width/2;
            if(data5.a<0){
                //球与边夹角三角形
                let data6 = Adapt.getInstance().Triangle({
                    A:(90 - this.father.rotation)/2,
                    a:this.width/2,
                });
                this.y = this.father.y - data5.a + data4.c + data6.b - data7.c*2; 
                this.dis = -(data5.c - data6.b);
            }else{
                //球与边夹角三角形
                let data6 = Adapt.getInstance().Triangle({
                    A:(90 + this.father.rotation)/2,
                    a:this.width/2,
                });
                console.log(data5.a , data4.c , data6.b)
                this.y = this.father.y - data5.a - data4.c - data6.b; 
                this.dis = -(data5.c - data6.b);
            }
            this.V = 0;
            this.Vx = 0;
            this.Vy = 0;   
        }else if(this.x > Adapt.getInstance().stageWidth - this.width/2){
           //超出屏幕外平衡杆夹角小三角型
            let data4 = Adapt.getInstance().Triangle({
                A:(90 - this.father.rotation),
                a:this.father.height/2
            });
            //整个杆子呈现三角形
            let data5 = Adapt.getInstance().Triangle({
                A:this.father.rotation,
                b:Adapt.getInstance().stageWidth/2,
            }); 
            console.log(data5)
            //球与边夹角三角形
            let data6 = Adapt.getInstance().Triangle({
                A:(90 - this.father.rotation)/2,
                a:this.width/2,
            });
            this.x =  Adapt.getInstance().stageWidth - this.width/2;
            // console.log(data5.a , data4.c , data6.b)
            this.y = this.father.y + data5.a - data4.c - data6.b;     
            this.dis = data5.c - data6.b;
            this.V = 0;
            this.Vx = 0;
            this.Vy = 0;
            // console.log(this.x,this.y)    
        }


        this.calcAcc();
    }
    public calcAcc(){
        this.F = Adapt.getInstance().powerDispersed({m:this.m,rotation:this.father.rotation});
        this.A = this.F/this.m;
        let aData = Adapt.getInstance().Triangle({c:this.A,A:this.father.rotation});
        let vData = Adapt.getInstance().Triangle({c:this.V,A:this.father.rotation});
        this.Ax = aData.b;
        this.Ay = aData.a;
        this.Vx = vData.b;
        this.Vy = vData.a;
    }
    public ticker(){
        if((this.x < this.width/2)||(this.x > Adapt.getInstance().stageWidth - this.width/2)){
            if((this.x<this.width/2&&this.Vx<0&&this.father.rotation>0)||(this.x > Adapt.getInstance().stageWidth - this.width/2&&this.Vx>0&&this.father.rotation<0)){
                this.A = 0;
                this.Ax = 0;
                this.Ay = 0;
                this.V = 0;
                this.Vx = 0;
                this.Vy = 0;
                this.move();
                let intervalTime = StartUp.getInstance().intervalTime/1000;
                this.V += this.A*intervalTime;
                this.Vx += this.Ax*intervalTime;
                this.Vy += this.Ay*intervalTime;
                this.dis += this.V;
                this.x += this.Vx;
                this.y += this.Vy;
                console.log(this.Vx)
                return;
            }else if((this.x<this.width/2&&this.father.rotation<0)||(this.x > Adapt.getInstance().stageWidth - this.width/2&&this.father.rotation>0)){
                this.A = 0;
                this.Ax = 0;
                this.Ay = 0;
                this.V = 0;
                this.Vx = 0;
                this.Vy = 0;
                return;
            }
            
        }
        let intervalTime = StartUp.getInstance().intervalTime/1000;
        this.V += this.A*intervalTime;
        this.Vx += this.Ax*intervalTime;
        this.Vy += this.Ay*intervalTime;
        this.dis += this.V;
        this.x += this.Vx;
        this.y += this.Vy;
    }
}