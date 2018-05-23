/**webSocket */
class BaseWSocket {
    public webSocket: egret.WebSocket;
	public parent:SocketManager	= null;

	public constructor(p:SocketManager) {
		this.parent	= p;
		this.webSocket = new egret.WebSocket();//实例化websocket        
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);//收到数据监听，收到数据执行onRFece...方法                            
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this); //成功连接服务器，可以发送数据 
        this.webSocket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this); //服务器断开连接
        this.webSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this); //添加异常侦听，出现异常会调用此方法
        this.webSocket.type	= egret.WebSocket.TYPE_BINARY;//设置数据格式为二进制，默认为字符串
		//BaseWSocket.webSocket.addEventListener("packet_"+101+"_"+1,this.onWarCmd,this);
		//BaseWSocket.webSocket.connect("139.199.11.115", 8808);
        
	}
	/**传入服务器地址，和端口号 服务器连接方法 */
	public ConnetTo(strIp:string, nPort:number)	{
		this.webSocket.connectByUrl(strIp);
        //this.webSocket.connect(strIp, nPort);
		//BaseWSocket.webSocket.connect("10.10.10.121", 8999);
	}
	/**连接成功 */
	public onSocketOpen():void {    

		var cmd = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";    
		console.log("连接成功，发送数据：" + cmd);    
		
		//ppDAta.writeByte(101);
		//ppDAta.writeByte(1);
		//ppDAta.writeUTF(cmd);
		//BaseWSocket.webSocket.writeBytes(ppDAta,0,0);
		/**发出事件“packet_5_0”,证明连接成功 */
		this.parent.LinkOk(this);
		
		/** */
		 // PlayerData.getInterface().startTick();   
		
	}
	/**连接失败 *//**应该重连 *//** */
	public onSocketClose():void {    
		var cmd = "Hello Egret WebSocket"; 
		console.log("连接失败：" + cmd);   
		/**重新连接 */
        //BaseWSocket.webSocket.connect(BaseWSocket.strIp, 8999); 
		//this.webSocket.writeUTF(cmd);
	}
	/**连接错误 *//**应该重连 */
	public onSocketError(e):void {   
		console.log("错误代码："+e.error); 
		/**重新连接 */
        //BaseWSocket.webSocket.connect(BaseWSocket.strIp, 8999); 
		
	}

	/**接收到数据 */
	public onReceiveMessage(e:egret.Event):void {    
		//var msg = this.webSocket.readUTF();    
		
		var ppDAta:egret.ByteArray=new egret.ByteArray();
		this.webSocket.readBytes(ppDAta,0,0);//将接收到的数据存储到ppdata数组
		//console.log("收到数据：" + ppDAta.length);
		ppDAta.endian	= egret.Endian.LITTLE_ENDIAN;
		var cmdgroup=ppDAta.readByte();
		var cmd	= ppDAta.readByte();
		/**收到服务器的数据发出事件“packet_cmdgroup_cmd” 携带数据ppDAta*/
		//console.log("收到数据：packet_"+cmdgroup+"_"+cmd);
        if (cmdgroup == 101 && cmd == 0) {
            //Map.wardata.m_pP2pWarCtrl.onWCSync(ppDAta);
        }
        else {
			if(this.parent.m_bTestLink)
			{
				if(cmdgroup == 5 && cmd == 2){
					this.parent.LoginOk(this,ppDAta);
				}
			}
			else
           		this.parent.dispatchEventWith("packet_" + cmdgroup + "_" + cmd, false, ppDAta);
        }

		
	}

}