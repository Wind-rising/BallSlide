

type SKeyVal = {
    key: string,
    value: egret.SoundChannel
}

class ZSoundCenter {


    public runningMusic: egret.Sound = null;
    public backMusicChannel: egret.SoundChannel = null;
    public static s_pSoundInstance: ZSoundCenter = null;
    public testChannel: egret.SoundChannel = null;
    public inPlayerEff:SKeyVal[]    = [];

    public static GetInstance(): ZSoundCenter {
        if (ZSoundCenter.s_pSoundInstance == null)
            ZSoundCenter.s_pSoundInstance = new ZSoundCenter();

        return ZSoundCenter.s_pSoundInstance;
    }

    public PlayBackMusic(str:string) {
        if(this._isPlayBack){
            if (this.backMusicChannel)
                this.backMusicChannel.stop();

            this.runningMusic = RES.getRes(str);
            this.runningMusic.type  = egret.Sound.MUSIC;
            if (this.runningMusic)
                this.backMusicChannel   = this.runningMusic.play();
        }else{

        }
    }

    public PlaySound(str: string) {
        if(this._isPlaySound){
            var pSound: egret.Sound = RES.getRes(str);
            if (pSound)
            {
                console.log("Sound" + str);
                pSound.type  = egret.Sound.EFFECT;

                /*if(PlayerData.m_bIsWeiXin)
                {
                    if(this.inPlayerEff[str] != undefined)
                    {
                        this.inPlayerEff[str].stop();
                        this.inPlayerEff[str]    = pSound.play(0, 1);
                    }
                    else
                    {
                        var pSC = pSound.play(0, 1);
                        //var pKey    = new SKeyVal();
                        //pKey.key    = str;
                        //pKey.value  = pSC;

                        this.inPlayerEff[str]= pSC;
                    }
                }
                else*/
                    pSound.play(0, 1);
            }
        }else{
            
        }
    }


    private _isPlayBack:boolean=true;
    private _isPlaySound:boolean=true;


    /**
     * 停止或开启背景音乐
     * @param is 开启true 关闭close
     */
    public StopBack(is:boolean){
        if(is){
           this._isPlayBack=true;
           if (this.backMusicChannel)
            this.backMusicChannel=this.runningMusic.play();
        }else{
            this._isPlayBack=false;
            if (this.backMusicChannel)
            this.backMusicChannel.stop();
        }

    }

    /**
     * 停止播放音效
     * @param is 开启true 关闭close
     */
    public StopSound(is:boolean){
        this._isPlaySound=is;
    }


}