var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ZSoundCenter = (function () {
    function ZSoundCenter() {
        this.runningMusic = null;
        this.backMusicChannel = null;
        this.testChannel = null;
        this.inPlayerEff = [];
        this._isPlayBack = true;
        this._isPlaySound = true;
    }
    ZSoundCenter.GetInstance = function () {
        if (ZSoundCenter.s_pSoundInstance == null)
            ZSoundCenter.s_pSoundInstance = new ZSoundCenter();
        return ZSoundCenter.s_pSoundInstance;
    };
    ZSoundCenter.prototype.PlayBackMusic = function (str) {
        if (this._isPlayBack) {
            if (this.backMusicChannel)
                this.backMusicChannel.stop();
            this.runningMusic = RES.getRes(str);
            this.runningMusic.type = egret.Sound.MUSIC;
            if (this.runningMusic)
                this.backMusicChannel = this.runningMusic.play();
        }
        else {
        }
    };
    ZSoundCenter.prototype.PlaySound = function (str) {
        if (this._isPlaySound) {
            var pSound = RES.getRes(str);
            if (pSound) {
                console.log("Sound" + str);
                pSound.type = egret.Sound.EFFECT;
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
        }
        else {
        }
    };
    /**
     * 停止或开启背景音乐
     * @param is 开启true 关闭close
     */
    ZSoundCenter.prototype.StopBack = function (is) {
        if (is) {
            this._isPlayBack = true;
            if (this.backMusicChannel)
                this.backMusicChannel = this.runningMusic.play();
        }
        else {
            this._isPlayBack = false;
            if (this.backMusicChannel)
                this.backMusicChannel.stop();
        }
    };
    /**
     * 停止播放音效
     * @param is 开启true 关闭close
     */
    ZSoundCenter.prototype.StopSound = function (is) {
        this._isPlaySound = is;
    };
    ZSoundCenter.s_pSoundInstance = null;
    return ZSoundCenter;
}());
__reflect(ZSoundCenter.prototype, "ZSoundCenter");
//# sourceMappingURL=SoundCenter.js.map