/**webSocket */

class MyTestLink{
    public pSocket:BaseWSocket  = null;
    public linkTick: number = 0;

    public rqHeatBeat() {
        var ppDAta: egret.ByteArray = new egret.ByteArray();
        ppDAta.endian = egret.Endian.LITTLE_ENDIAN;

        ppDAta.writeByte(5);
        ppDAta.writeByte(44);
        this.pSocket.webSocket.writeBytes(ppDAta);
    }
    public onLoginOk(data:egret.ByteArray): void {	//INIT_CLIENT 连接服务器成功
        var msg = data.readByte();
        console.log("连接服务器成功!!"+msg); 
        /**当服务器返回的数据解析出来是0的时候返回 */
        if (msg == 0) {
            data.readByte();
            var m_nUin    = data.readInt();
            var m_nPassKey    = data.readInt();

            {
                var ppDAta: egret.ByteArray = new egret.ByteArray();
                ppDAta.endian = egret.Endian.LITTLE_ENDIAN;

                ppDAta.writeByte(5);
                ppDAta.writeByte(5);

                ppDAta.writeInt(m_nUin);	//UIN
                ppDAta.writeInt(m_nPassKey);	//m_PKey
                ppDAta.writeInt(0);		//version
                ppDAta.writeByte(0);		//byLinkMark;
                var len = ppDAta.length;
                ppDAta.writeUTFBytes("h5");	//     szPlat
                ppDAta.length = len + 25;
                ppDAta.position = ppDAta.length;
                ppDAta.writeInt(1);		//langueage

                this.pSocket.webSocket.writeBytes(ppDAta);
            }
            {
                var ppDAta: egret.ByteArray = new egret.ByteArray();
                ppDAta.endian = egret.Endian.LITTLE_ENDIAN;

                ppDAta.writeByte(5);
                ppDAta.writeByte(7);

                ppDAta.writeInt(m_nUin);		//uinInvite
                ppDAta.writeInt(m_nPassKey);		//uinInvite
                var len = ppDAta.length;
                //ppDAta.writeUTFBytes(PlayerData.getInterface().playerName);	//     
                ppDAta.length = len + 20;
                ppDAta.position = ppDAta.length;
                ppDAta.writeInt(0);		//version
                ppDAta.writeInt(1);		//language
                this.pSocket.webSocket.writeBytes(ppDAta);
            }
        }

    }
    public onlinkOk(): void {	//INIT_CLIENT 连接服务器成功
        var ppDAta: egret.ByteArray = new egret.ByteArray();
        ppDAta.endian = egret.Endian.LITTLE_ENDIAN;
        ppDAta.writeByte(5);
        ppDAta.writeByte(45);

        var len = ppDAta.length;
        ppDAta.writeUTFBytes("xfj_H5_main");	//渠道
        ppDAta.length = len + 25;
        ppDAta.position = ppDAta.length;
        ppDAta.writeInt(1); //版本
        this.pSocket.webSocket.writeBytes(ppDAta);

        //LogonMenu.m_bLinkOK  = true;
        console.log("网络连接OK");
        //if (LogonMenu.m_bLinkOK && LogonMenu.m_bLoginCmd)
            this.RqLoginAcc();
    }
    public RqLoginAcc() {
        var ppDAta: egret.ByteArray = new egret.ByteArray();
        ppDAta.endian = egret.Endian.LITTLE_ENDIAN;
        ppDAta.writeByte(5);
        ppDAta.writeByte(26);

        var len = ppDAta.length;
        ppDAta.writeUTFBytes("AAAABBBBCCCCDDDD");	//DeviceID
        ppDAta.length = len + 100;
        ppDAta.position = ppDAta.length;

        len = ppDAta.length;
        ppDAta.writeUTFBytes("123456");	//密码最多15位
        ppDAta.length = len + 16;
        ppDAta.position = ppDAta.length;

        ppDAta.writeByte(1);       //bSpeedReg
        ppDAta.writeByte(1);       //bJoin

        len = ppDAta.length;
        ppDAta.writeUTFBytes("TestUser"+Math.floor(Math.random()*100000000));	     //szUName
        ppDAta.length = len + 32;
        ppDAta.position = ppDAta.length;

        ppDAta.writeInt(1);     //nIOSVersion
        len = ppDAta.length;
        ppDAta.writeUTFBytes("xfj_H5_main");	     //plat
        ppDAta.length = len + 25;
        ppDAta.position = ppDAta.length;
        len = ppDAta.length;
        ppDAta.writeUTFBytes("imeih5");	     //szImei
        ppDAta.length = len + 25;
        ppDAta.position = ppDAta.length;

        len = ppDAta.length;
        ppDAta.writeUTFBytes("1.1.1.1");	     //szImei
        ppDAta.length = len + 20;
        ppDAta.position = ppDAta.length;

        ppDAta.writeInt(5);         //数据版本

       this.pSocket.webSocket.writeBytes(ppDAta);//(ppDAta);
        //this.m_pRunningSocket   = null;
    }

}

class SocketManager extends egret.EventDispatcher {

    public m_bTestLink:boolean  = false;
    private heartTick: number = 0;
    private m_bActive:boolean   = false;
    private  m_pRunningSocket:BaseWSocket = null;

    private static g_pSocketMng: SocketManager;
    private static emptySocket: egret.WebSocket;
    public static s_svrIps: string[] = ["wss://h5xfg.zdjoys.com","ws://10.10.10.121:8999"];//"10.10.10.121",
    public m_pListSockets:MyTestLink[]  = [];

    public static SendPacket(pPacket: egret.ByteArray){
        if (SocketManager.g_pSocketMng == null) {
            SocketManager.g_pSocketMng = new SocketManager();
        }
        if(SocketManager.g_pSocketMng.m_pRunningSocket == null)
            return;
        
        SocketManager.g_pSocketMng.m_pRunningSocket.webSocket.writeBytes(pPacket,0,0);
    }
    public static getInstance(): SocketManager {
        if (SocketManager.g_pSocketMng == null) {
            SocketManager.g_pSocketMng = new SocketManager();
        }
        return SocketManager.g_pSocketMng;
    }


	public constructor() {
		super();
        this.addEventListener("packet_" + 5 + "_" + 44, this.onPing, this);
	}

	/**传入服务器地址，和端口号 服务器连接方法 */
    public LoginOk(pSocket:BaseWSocket,ppData:egret.ByteArray){
        for(var i = 0; i < this.m_pListSockets.length; i++){
                if(this.m_pListSockets[i].pSocket == pSocket)
                {
                    this.m_pListSockets[i].linkTick = egret.getTimer()+Math.random()*15000;
                    this.m_pListSockets[i].onLoginOk(ppData);
                }
                    
            }
    }

    public LinkOk(pSocket:BaseWSocket){
        if(this.m_bTestLink){
            for(var i = 0; i < this.m_pListSockets.length; i++){
                if(this.m_pListSockets[i].pSocket == pSocket)
                {
                    this.m_pListSockets[i].linkTick = egret.getTimer()+Math.random()*15000;
                    this.m_pListSockets[i].onlinkOk();
                }
                    
            }
        }
        else{
            if(this.m_pRunningSocket == null)
            {
                this.m_pRunningSocket   = pSocket;
                this.heartTick  = 0;
                var ppDAta:egret.ByteArray	= new egret.ByteArray();//
                this.dispatchEventWith("packet_"+5+"_"+0,false,ppDAta);
            }
            else
            {
                pSocket.webSocket.close();
            }
        }
    }




	public StartConnet()	{
        console.log("ZYL StartConnet");
        this.m_bActive  = true;
        this.m_pRunningSocket = null;
        for(var i = 0; i < SocketManager.s_svrIps.length; i++){
            var pSocket :BaseWSocket = null;
            if(this.m_pListSockets.length >i)
                pSocket = this.m_pListSockets[i].pSocket;
            else{
                pSocket = new BaseWSocket(this);
                var pTLink  = new MyTestLink();
                pTLink.pSocket  = pSocket;
                pTLink.linkTick = 0;
                this.m_pListSockets.push(pTLink);
            }
            pSocket.ConnetTo(SocketManager.s_svrIps[i], 8999);
        }
	}



    public CheckNetConnected(nHurry:number) {
        if(this.m_bTestLink)
        {
            var nNowTick    = egret.getTimer();
            for(var i = 0; i < this.m_pListSockets.length; i++){
                    this.m_pListSockets[i].rqHeatBeat();
            }
            return;
        }
        if(this.m_pRunningSocket == null){
            this.heartTick+=nHurry;
            if(this.heartTick > 15)
            {
                this.heartTick = 0;
                this.StartConnet();
            }
        }

        if(this.m_bActive == false && nHurry == 1)
            return;
        if (this.heartTick+nHurry < 7) {
            this.heartTick+=nHurry;
            if(this.m_pRunningSocket)
            {
                var ppDAta: egret.ByteArray = new egret.ByteArray();
                ppDAta.endian = egret.Endian.LITTLE_ENDIAN;

                ppDAta.writeByte(5);
                ppDAta.writeByte(44);

                this.m_pRunningSocket.webSocket.writeBytes(ppDAta, 0, 0);
            }

        }
        else {
            this.heartTick = 0;
            this.StartConnet();
        }

    }
    public onPing(e: egret.Event): void {

        this.heartTick = 0;
    }
}