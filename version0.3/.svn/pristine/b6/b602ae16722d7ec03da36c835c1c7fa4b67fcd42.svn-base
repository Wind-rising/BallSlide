/*
界面基类,封装基本的操作, 打开关闭及注册按钮事件,同时管理界面的显示层级及自动隐藏
*/

class BtnEventObj{
    public pBtn:eui.Button;
    public type: string;
    public listener: Function;
    public thisObject: any;
}

class UIBaseMenu extends eui.Component{

    public m_bIsHideBack:boolean = false;   //显示的时候将层级低于自己的界面全部隐藏
    public m_nZorder:number = 10;   //默认层级参数是10
    public m_byMenuGroup:number = 0;        //0不限制  1游戏外界面  2游戏内界面
    public m_bMyVisable:boolean = true;
    public m_vEvents:BtnEventObj[]  = [];

    private Close:eui.Button;

     constructor(str:string){
         super();

         this.skinName  = str;

     }

    public createChildren(){
        super.createChildren();
        this.top=null;
        this.bottom=null;
        this.left=null;
        this.right=null;
    }

    public Open() {   //打开界面
        UICenter.getInstance().OpenForm(this);

        this.start();
        
    }

    public start() {    //界面显示

        if(this.Close != undefined)
        {
            
            //ButtonEffect.getButtonEffect().addBtnEffect(this.Close);
            //this.Close.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent) => {this.Closed();},this);
            this.AddEvent(this.Close,egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent) => {this.Closed();},this);
        }
    }

    public Closed() {   //调用关闭界面
        UICenter.getInstance().CloseForm(this);

        this.end();
    }

    public end() {  //界面隐藏

        for(var i = 0; i < this.m_vEvents.length; i++)
        {
            var pBE:BtnEventObj = this.m_vEvents[i];
            //ButtonEffect.getButtonEffect().removeBtnEffect(pBE.pBtn);
            pBE.pBtn.removeEventListener(pBE.type,pBE.listener,pBE.thisObject);
        }
        this.m_vEvents.splice(0,this.m_vEvents.length);
    }

    //注册事件,按钮点击效果,不需要调用取消函数
    public AddEvent(pBtn:eui.Button,type: string,listener: Function,thisObject: any){
        var  pBE:BtnEventObj = null;
        for(var i = 0; i < this.m_vEvents.length; i++)
        {
            if(this.m_vEvents[i].pBtn == pBtn && this.m_vEvents[i].type == type)
            {
                pBE   = this.m_vEvents[i];
                break;
            }
        }
        if(pBE == null){
            pBE = new BtnEventObj();
            pBE.pBtn  = pBtn;
            pBE.type      = type;
            this.m_vEvents.push(pBE);
            //ButtonEffect.getButtonEffect().addBtnEffect(pBE.pBtn);
        }
        else
            pBE.pBtn.removeEventListener(pBE.type,pBE.listener,pBE.thisObject);
        pBE.listener  = listener;
        pBE.thisObject    = thisObject;
        
        pBE.pBtn.addEventListener(pBE.type,pBE.listener,pBE.thisObject);
    }

    public Update() {   //界面刷新函数 ,毎帧触发


    }

} 