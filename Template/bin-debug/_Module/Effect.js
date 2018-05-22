var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var CNumberSpr = (function (_super) {
    __extends(CNumberSpr, _super);
    function CNumberSpr(nNum, nType) {
        var _this = _super.call(this) || this;
        _this.m_nWidth = 0;
        _this.m_nSpeedX = 0;
        _this.m_nSpeedY = 0;
        _this.m_nStartTick = 0;
        _this.m_nPreTick = 0;
        var calcNum = Math.floor(nNum);
        var strType = "Battle_Num_Green";
        if (calcNum < 0) {
            calcNum = -calcNum;
            strType = "Battle_Num_Red";
        }
        do {
            var tmp = calcNum % 10;
            var pSpr = new egret.Bitmap(RES.getRes(strType + tmp + "_png"));
            _this.addChild(pSpr);
            pSpr.x = -_this.m_nWidth;
            _this.m_nWidth += pSpr.width + 1;
            calcNum = Math.floor(calcNum / 10);
        } while (calcNum > 0);
        return _this;
    }
    CNumberSpr.CreateNumSpr = function (nNum, nType) {
        //Battle_Num_Red0.png,Battle_Num_Green0.png
        var pNumSpr = new CNumberSpr(nNum, nType);
        //pNumSpr.anchorOffsetX   = pNumSpr.m_nWidth/2;
        pNumSpr.x = -30 + Math.random() * 60;
        pNumSpr.y = 0;
        pNumSpr.m_nStartTick = egret.getTimer();
        pNumSpr.m_nPreTick = pNumSpr.m_nStartTick;
        pNumSpr.m_nSpeedX = -60 + Math.random() * 120;
        pNumSpr.m_nSpeedY = 300 + Math.random() * 150;
        //pNumSpr.scaleX  = 5.0;
        //pNumSpr.scaleY  = 5.0;
        return pNumSpr;
    };
    CNumberSpr.prototype.RunMove = function () {
        var nSpace = egret.getTimer() - this.m_nPreTick;
        this.x += this.m_nSpeedX * nSpace / 1000 * 3;
        this.y -= this.m_nSpeedY * nSpace / 1000 * 3;
        this.m_nSpeedY -= 1000 * nSpace / 1000;
        var nPassTick = egret.getTimer() - this.m_nStartTick;
        if (nPassTick > 500)
            this.alpha = (1000 - nPassTick) / 500;
        if (nPassTick >= 800)
            return false;
        this.m_nPreTick = egret.getTimer();
        return true;
    };
    return CNumberSpr;
}(egret.Sprite));
__reflect(CNumberSpr.prototype, "CNumberSpr");
var CEffectSpr = (function (_super) {
    __extends(CEffectSpr, _super);
    function CEffectSpr(fid, act, ntype, pEx1, pEx2) {
        var _this = _super.call(this) || this;
        _this.m_nStartTick = 0;
        _this.m_nEndTick = 0;
        _this.m_nEffID = 0;
        _this.m_nZorder = 1;
        _this.m_nMarkID = 0;
        _this.m_pEff = null;
        _this.m_pArmature = null;
        var skeletonData = RES.getRes(fid + "_ske_json");
        var textureData = RES.getRes(fid + "_tex_json");
        var texture = RES.getRes(fid + "_tex_png");
        if (skeletonData == null || textureData == null || texture == null) {
            return _this;
        }
        var factory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        if (ntype == 0) {
            _this.m_pArmature = factory.buildFastArmature("Sprite");
            if (_this.m_pArmature) {
                _this.m_pArmature.enableAnimationCache(30);
                var armatureDisplay = _this.m_pArmature.getDisplay();
                _this.addChild(armatureDisplay);
                dragonBones.WorldClock.clock.add(_this.m_pArmature);
                _this.m_pArmature.animation.play(null, 0);
            }
        }
        else {
            _this.m_pArmature = factory.buildFastArmature("armatureName");
            if (_this.m_pArmature) {
                if (_this.m_pArmature) {
                    var pObj = _this.m_pArmature.getSlot("1");
                    if (pObj && pEx1 != undefined)
                        pObj.display = pEx1;
                    pObj = _this.m_pArmature.getSlot("2");
                    if (pObj && pEx2 != undefined)
                        pObj.display = pEx2;
                }
                _this.m_pArmature.enableAnimationCache(30);
                var armatureDisplay = _this.m_pArmature.getDisplay();
                _this.addChild(armatureDisplay);
                dragonBones.WorldClock.clock.add(_this.m_pArmature);
                _this.m_pArmature.animation.play(act, 0);
            }
        }
        _this.m_nStartTick = egret.getTimer();
        return _this;
    }
    CEffectSpr.CreateEff = function (nEffID, pEx1, pEx2) {
        var listEff = ConfigData.getInterface().EffectCfg_json;
        var pEff = null;
        for (var i = listEff.cnt; i > 0; i--) {
            if (listEff[i].ID == nEffID) {
                pEff = new CEffectSpr(listEff[i].file, listEff[i].act, listEff[i].type, pEx1, pEx2);
                pEff.m_pEff = listEff[i];
                pEff.m_nEffID = nEffID;
                pEff.scaleX = pEff.m_pEff.scale / 100;
                pEff.scaleY = pEff.m_pEff.scale / 100;
                pEff.m_nZorder = pEff.m_pEff.zorder;
                var nMark = listEff[i].mark;
                if (nMark != undefined)
                    pEff.m_nMarkID = nMark;
                var nTime = parseInt(listEff[i].time);
                if (nTime)
                    pEff.m_nEndTick = pEff.m_nStartTick + nTime;
                if (listEff[i].sound)
                    ZSoundCenter.GetInstance().PlaySound(listEff[i].sound + "_mp3");
                break;
            }
        }
        return pEff;
    };
    CEffectSpr.prototype.CheckEnd = function () {
        if (this.m_nEndTick && this.m_nEndTick <= egret.getTimer())
            return true;
        return false;
    };
    CEffectSpr.prototype.Clear = function () {
        if (this.m_pArmature) {
            dragonBones.WorldClock.clock.remove(this.m_pArmature);
        }
    };
    return CEffectSpr;
}(egret.Sprite));
__reflect(CEffectSpr.prototype, "CEffectSpr");
//# sourceMappingURL=Effect.js.map