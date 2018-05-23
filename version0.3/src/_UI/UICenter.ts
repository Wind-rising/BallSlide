/*

界面层管理中心

*/

class UICenter extends eui.UILayer{
    
    public static g_uiCenter:UICenter   = null;

    public m_vInViewMenu:UIBaseMenu[]   = [];

    public static getInstance(): UICenter {
        if (UICenter.g_uiCenter == null) {
            UICenter.g_uiCenter = new UICenter();
            //PlayerData.player.InitData();
        }
        return UICenter.g_uiCenter;
    }

     constructor(){
         super();

         this.touchEnabled  = false;


     }

     public Update(){
         for(var i = 0; i < this.m_vInViewMenu.length; i++)
         {
             if(this.m_vInViewMenu[i].m_bMyVisable)
                this.m_vInViewMenu[i].Update();
            this.m_vInViewMenu[i].visible   = this.m_vInViewMenu[i].m_bMyVisable;
         }
     }
     
     //用于UIBaseMenu的调用,外部不可访问
     public OpenForm(pMenu : UIBaseMenu){
         this.CloseForm(pMenu);
        for(var i = 0; i < this.m_vInViewMenu.length; i++)
         {
             if(this.m_vInViewMenu[i].m_nZorder > pMenu.m_nZorder)
             {
                 this.addChildAt(pMenu,i);
                 this.m_vInViewMenu.splice(i,0,pMenu);
                 return;
             }
         }
         
         //直接在最上层打开
         this.addChild(pMenu);
         this.m_vInViewMenu.push(pMenu);
     }

    //用于UIBaseMenu的调用,外部不可访问
     public CloseForm(pMenu : UIBaseMenu){
         for(var i = 0; i < this.m_vInViewMenu.length; i++){
             if(this.m_vInViewMenu[i] == pMenu){
                 this.removeChild(pMenu);
                 this.m_vInViewMenu.splice(i,1);
                 return;
             }
         }
     }

} 