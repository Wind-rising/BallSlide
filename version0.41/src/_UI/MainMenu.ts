/*

UI管理中心

*/

class MainMenu{

    public static pMainMenu:MainMenu   = null;
    
    public static getInstance(): MainMenu {
        if (MainMenu.pMainMenu == null) {
            MainMenu.pMainMenu = new MainMenu();
            //PlayerData.player.InitData();
        }
        return MainMenu.pMainMenu;
    }

    /**任务界面 */
    //public m_pMenuQuest: QuestMenu;//
    public m_pGameMain:GameMain;
     constructor(){
         //this.m_pMenuQuest  = new QuestMenu();
         this.m_pGameMain = GameMain.getInstance();
     }
     public Update(){



     }


} 