//游戏场景
class GameMain extends UIBaseMenu{
    constructor(){
        super('skin_BallSlideGame');
        this.init();
    }
    public static g_GameMain:GameMain = null;
    public static getInstance(){
        if(GameMain.g_GameMain == null){
            GameMain.g_GameMain = new GameMain();
        }
        return GameMain.g_GameMain;
    }
    public exa_BalanceBar:BalanceBar = new BalanceBar();
    public exa_TouchScreenLeft:TouchScreenLeft = new TouchScreenLeft();
    public exa_TouchScreenRight:TouchScreenRight = new TouchScreenRight();
    public exa_Ball:Ball = new Ball(this.exa_BalanceBar);
    //初始化
    public init(){
        if(GameMain.g_GameMain != null){}//删除页面控件监听
        this.addChild(this.exa_BalanceBar);
        this.addChild(this.exa_Ball);
        this.addChild(this.exa_TouchScreenLeft);
        this.addChild(this.exa_TouchScreenRight);
    }
}