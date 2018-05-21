
class CNumberSpr extends egret.Sprite {
    public m_nWidth:number  = 0;

    public m_nSpeedX:number = 0;
    public  m_nSpeedY:number    = 0;
    public m_nStartTick:number   = 0;
    public m_nPreTick:number    = 0;

    public static CreateNumSpr(nNum: number,nType:number):CNumberSpr {
        //Battle_Num_Red0.png,Battle_Num_Green0.png
        var pNumSpr = new CNumberSpr(nNum,nType);

        //pNumSpr.anchorOffsetX   = pNumSpr.m_nWidth/2;

        pNumSpr.x    = -30 + Math.random()*60;
        pNumSpr.y    = 0;
        pNumSpr.m_nStartTick = egret.getTimer();
        pNumSpr.m_nPreTick  = pNumSpr.m_nStartTick;
        pNumSpr.m_nSpeedX   = -60 + Math.random()*120;
        pNumSpr.m_nSpeedY   = 300+Math.random()*150;
        //pNumSpr.scaleX  = 5.0;
        //pNumSpr.scaleY  = 5.0;
        return pNumSpr;

    }

    public constructor(nNum: number,nType:number) {
        super();

        var calcNum = Math.floor(nNum);
        var strType:string = "Battle_Num_Green";
        if(calcNum < 0)
        {
            calcNum = -calcNum;
            strType = "Battle_Num_Red";
        } 

        do{
            var tmp = calcNum%10;
            var pSpr = new egret.Bitmap(RES.getRes(strType+tmp+"_png"));
            this.addChild(pSpr);
            pSpr.x = -this.m_nWidth;
            this.m_nWidth    += pSpr.width+1;

            calcNum = Math.floor(calcNum/10);
        }while(calcNum>0)
    }


    public RunMove():boolean{
        var nSpace = egret.getTimer() - this.m_nPreTick;
    

        this.x += this.m_nSpeedX*nSpace/1000 * 3;
        this.y  -= this.m_nSpeedY*nSpace/1000 * 3;
        this.m_nSpeedY -= 1000*nSpace/1000;

        var nPassTick   = egret.getTimer() -this.m_nStartTick;
        if(nPassTick > 500)
            this.alpha  = (1000 - nPassTick)/500;

        if(nPassTick >= 800)
            return false;

        this.m_nPreTick    = egret.getTimer();
        return true;
    }
}



class CEffectSpr extends egret.Sprite {

    public m_nStartTick: number = 0;
    public m_nEndTick: number = 0;
    public m_nEffID: number = 0;
    public m_nZorder:number = 1;
    public m_nMarkID:number = 0;
    public  m_pEff:any= null;
    public m_pArmature:dragonBones.Armature = null;
    public static CreateEff(nEffID: number,pEx1?:any,pEx2?:any):CEffectSpr {

        var listEff = ConfigData.getInterface().EffectCfg_json; 
        var pEff: CEffectSpr = null;
        for (var i = listEff.cnt; i > 0; i--) {
            if (listEff[i].ID == nEffID) {
                pEff = new CEffectSpr(listEff[i].file, listEff[i].act, listEff[i].type,pEx1,pEx2);
                pEff.m_pEff = listEff[i];
                pEff.m_nEffID = nEffID;
                pEff.scaleX = pEff.m_pEff.scale / 100;
                pEff.scaleY = pEff.m_pEff.scale / 100;
                pEff.m_nZorder  = pEff.m_pEff.zorder;
                var nMark   = listEff[i].mark;
                if(nMark != undefined)
                    pEff.m_nMarkID  = nMark;
                let nTime: number = parseInt(listEff[i].time);
                if (nTime)
                    pEff.m_nEndTick = pEff.m_nStartTick + nTime;
                if (listEff[i].sound)
                    ZSoundCenter.GetInstance().PlaySound(listEff[i].sound + "_mp3");
                
                break;
            }
        }
        
        return pEff;
    }

    public constructor(fid: string, act: string, ntype: number,pEx1?:any,pEx2?:any) {
        super();

        var skeletonData = RES.getRes(fid + "_ske_json");
        var textureData = RES.getRes(fid + "_tex_json");
        var texture = RES.getRes(fid + "_tex_png");
        if (skeletonData == null || textureData == null || texture == null) {
            return;
        }

        var factory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        if (ntype == 0) {
            this.m_pArmature = factory.buildFastArmature("Sprite");
            if (this.m_pArmature) {
                this.m_pArmature.enableAnimationCache(30);
                var armatureDisplay = this.m_pArmature.getDisplay();
                this.addChild(armatureDisplay);

                dragonBones.WorldClock.clock.add(this.m_pArmature);
                this.m_pArmature.animation.play(null, 0);
            }

        }
        else {
            this.m_pArmature = factory.buildFastArmature("armatureName");
            if (this.m_pArmature) {
                 if(this.m_pArmature){
                    var pObj = this.m_pArmature.getSlot("1");
                    if(pObj && pEx1 != undefined)
                        pObj.display    = pEx1;
                    pObj = this.m_pArmature.getSlot("2");
                    if(pObj && pEx2 != undefined)
                        pObj.display    = pEx2;
                }
                this.m_pArmature.enableAnimationCache(30);
                var armatureDisplay = this.m_pArmature.getDisplay();
                
                this.addChild(armatureDisplay);
                dragonBones.WorldClock.clock.add(this.m_pArmature);
                this.m_pArmature.animation.play(act, 0);
            }
        }

        this.m_nStartTick = egret.getTimer();

    }

    public CheckEnd(): boolean {
        if (this.m_nEndTick && this.m_nEndTick <= egret.getTimer())
            return true;

        return false;
    }

    public Clear(){
        if(this.m_pArmature)
        {
            dragonBones.WorldClock.clock.remove(this.m_pArmature);

        }
             


    }
}
