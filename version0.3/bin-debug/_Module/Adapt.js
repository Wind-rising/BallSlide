var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
// TypeScript file
var Adapt = (function () {
    function Adapt() {
        //UICenter必须在引用前插入Main中
        this.stageWidth = UICenter.getInstance().stage.$stageWidth;
        this.stageHeight = UICenter.getInstance().stage.$stageHeight;
        this.obj = null;
        this.init = {};
    }
    Adapt.getInstance = function () {
        if (Adapt.c_adapt == null) {
            Adapt.c_adapt = new Adapt();
        }
        return Adapt.c_adapt;
    };
    /*
        设置的时候除了obj其他对象可以选择需要设置，以json格式
        参数说明                类型
        obj 设置对象            object
        res 资源名称            string
        sign 宽高设置标准       "width"/"height"
        length 宽高的基准长度    number 比例
        width 直接定义宽度       number  比例
        height 直接定义高度      number 比例
        anchorX 锚点X定义       number 比例
        anchorY 锚点y定义       number 比例
        isAutoAnchor 当不手动设置锚点时是否自动按比例修改锚点 boolean 默认true
        guide系列说明
        参数
        guideX,guideY对齐方式
        x,y向当前对齐方式的距离
        posAnchorX,posAnchorY不修改锚点以虚拟锚点作为对齐的标准(暂时不做详细说明)
        1.参数前代表对象以当前位置做为起点
          参数后代表对象对齐方式
        2.center为起点时，以下图坐标为正负基准
        3.不写或者设置为none都基于锚点以当前设置的x,y坐标定位
        例：left-left代表对象以屏幕左侧作为起点以对象左侧为对齐方式
            所有上下左右起点以往屏幕内侧距离为正，向外为负值

        图：
                        ^  y-
                        |
                        |
                        |
                        |
                        | (0,0)           x+
        ——————————————————————————————————>
        x-              |
                        |
                        |
                        |
                        |
                        |  y+
    */
    Adapt.prototype.SETBitmap = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.obj, obj = _c === void 0 ? null : _c, _d = _b.res, res = _d === void 0 ? null : _d, _e = _b.anchorX, anchorX = _e === void 0 ? null : _e, _f = _b.anchorY, anchorY = _f === void 0 ? null : _f, _g = _b.sign, sign = _g === void 0 ? null : _g, _h = _b.length, length = _h === void 0 ? null : _h, _j = _b.width, width = _j === void 0 ? null : _j, _k = _b.height, height = _k === void 0 ? null : _k, _l = _b.guideX, guideX = _l === void 0 ? null : _l, _m = _b.guideY, guideY = _m === void 0 ? null : _m, _o = _b.x, x = _o === void 0 ? null : _o, _p = _b.y, y = _p === void 0 ? null : _p, _q = _b.posAnchorX, posAnchorX = _q === void 0 ? null : _q, _r = _b.posAnchorY, posAnchorY = _r === void 0 ? null : _r, _s = _b.isAutoAnchor, isAutoAnchor = _s === void 0 ? true : _s;
        if (typeof obj != 'object') {
            console.error('非法对象：' + obj);
            this.obj = null;
            return false;
        }
        else {
            this.obj = obj;
        }
        //解析顺序
        //加载资源->检测是否手动修改锚点->资源大小修改->锚点修改->坐标修改
        var isChangeAnchorX = typeof anchorX == "number";
        var isChangeAnchorY = typeof anchorY == "number";
        (typeof res == "string") && this.SetTexture(res);
        isChangeAnchorX || isAutoAnchor && this.ReSetAnchorX();
        isChangeAnchorY || isAutoAnchor && this.ReSetAnchorY();
        (typeof sign == "string" && typeof length == "number") && (sign == "width") ? this.AdaptWidth(length * this.stageWidth) : ((sign == "height") && (this.AdaptHeight(length * this.stageHeight)));
        (typeof width == "number") && this.SetWidth(width * this.stageWidth);
        (typeof height == "number") && this.SetHeight(height * this.stageHeight);
        isChangeAnchorX ? this.SetAnchorX(anchorX) : isAutoAnchor && this.ReSetAnchorX();
        isChangeAnchorY ? this.SetAnchorY(anchorY) : isAutoAnchor && this.ReSetAnchorY();
        (typeof guideX == "string" || typeof x == "number") && this.SetPosX({
            guide: guideX,
            length: x * this.stageWidth,
            anchorX: posAnchorX
        });
        (typeof guideY == "string" || typeof y == "number") && this.SetPosY({
            guide: guideY,
            length: y * this.stageHeight,
            anchorY: posAnchorY
        });
    };
    //资源加载
    Adapt.prototype.SetTexture = function (res) {
        var texture = RES.getRes(res);
        this.obj.texture = texture;
    };
    //等比例修改宽度
    Adapt.prototype.AdaptWidth = function (length) {
        var _this = this.obj;
        _this.height = _this.height / _this.width * length;
        _this.width = length;
    };
    //等比例修改高度
    Adapt.prototype.AdaptHeight = function (length) {
        var _this = this.obj;
        _this.width = _this.width / _this.height * length;
        _this.height = length;
    };
    //设置宽度
    Adapt.prototype.SetWidth = function (length) {
        this.obj.width = length;
    };
    //设置高度
    Adapt.prototype.SetHeight = function (length) {
        this.obj.height = length;
    };
    //外部调用锚点
    Adapt.prototype.SetAnchor = function (x, y) {
        this.SetAnchorX(x);
        this.SetAnchorY(y);
    };
    //修改X锚点
    Adapt.prototype.SetAnchorX = function (x) {
        var _this = this.obj;
        _this.$anchorOffsetX = _this.width * x;
    };
    //修改y锚点
    Adapt.prototype.SetAnchorY = function (y) {
        var _this = this.obj;
        _this.$anchorOffsetY = _this.height * y;
    };
    //按比例重新定义x锚点
    Adapt.prototype.ReSetAnchorX = function () {
        var _this = this.obj;
        this.init['anchorX'] ? (_this.$anchorOffsetX = this.init['anchorX'] * _this.width) : (this.init['anchorX'] = _this.$anchorOffsetX / _this.width);
    };
    //按比例重新定义y锚点
    Adapt.prototype.ReSetAnchorY = function () {
        var _this = this.obj;
        this.init['anchorY'] ? (_this.$anchorOffsetY = this.init['anchorY'] * _this.height) : (this.init['anchorY'] = _this.$anchorOffsetY / _this.height);
    };
    //设置x坐标
    Adapt.prototype.SetPosX = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.guide, guide = _c === void 0 ? null : _c, _d = _b.length, length = _d === void 0 ? null : _d, _e = _b.anchorX, anchorX = _e === void 0 ? null : _e;
        var _this = this.obj;
        var anchorPos = (typeof anchorX == 'number') ? (_this.$anchorOffsetX - anchorX * this.stageWidth) : 0;
        var anchorXl = _this.$anchorOffsetX - anchorPos;
        var anchorXr = _this.width - _this.$anchorOffsetX - anchorPos;
        var x = null;
        switch (guide) {
            case 'left-left':
                x = 0 + anchorXl + length;
                break;
            case 'left-right':
                x = 0 - anchorXr + length;
                break;
            case 'right-right':
                x = this.stageWidth - anchorXr - length;
                break;
            case 'right-left':
                x = this.stageWidth + anchorXl - length;
                break;
            case 'center-center':
                x = this.stageWidth / 2 + length;
                break;
            case 'center-left':
                x = this.stageWidth / 2 + anchorXl + length;
                break;
            case 'center-right':
                x = this.stageWidth / 2 - anchorXr + length;
                break;
            case 'none':
            default:
                x = length;
                break;
        }
        (typeof x != null) && (_this.x = x);
    };
    //设置y坐标
    Adapt.prototype.SetPosY = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.guide, guide = _c === void 0 ? null : _c, _d = _b.length, length = _d === void 0 ? null : _d, _e = _b.anchorY, anchorY = _e === void 0 ? null : _e;
        var _this = this.obj;
        var anchorPos = (typeof anchorY == 'number') ? (_this.$anchorOffsetY - anchorY * this.stageHeight) : 0;
        var anchorYt = _this.$anchorOffsetY - anchorPos;
        var anchorYb = _this.height - _this.$anchorOffsetY - anchorPos;
        var y = null;
        switch (guide) {
            case 'top-top':
                y = 0 + anchorYt + length;
                break;
            case 'top-bottom':
                y = 0 - anchorYb + length;
                break;
            case 'bottom-bottom':
                y = this.stageHeight - anchorYb - length;
                break;
            case 'bottom-top':
                y = this.stageHeight + anchorYt - length;
                break;
            case 'center-center':
                y = this.stageHeight / 2 + length;
                break;
            case 'center-top':
                y = this.stageHeight / 2 + anchorYt + length;
                break;
            case 'center-bottom':
                y = this.stageHeight / 2 - anchorYb + length;
                break;
            case 'none':
            default:
                y = length;
                break;
        }
        (typeof y != null) && (_this.y = y);
    };
    /*
            B
            /|
           / |
       c  /  | a
         /   |
        /_A__|
          b
      0~90度封装
    */
    Adapt.prototype.Triangle = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.a, a = _c === void 0 ? null : _c, _d = _b.b, b = _d === void 0 ? null : _d, _e = _b.c, c = _e === void 0 ? null : _e, _f = _b.A, A = _f === void 0 ? null : _f, _g = _b.B, B = _g === void 0 ? null : _g;
        //已知一边一角度
        var edge = 0;
        var angle = 0;
        if (typeof a == "number") {
            edge++;
        }
        if (typeof b == "number") {
            edge++;
        }
        if (typeof c == "number") {
            edge++;
        }
        if (typeof A == "number") {
            angle++;
        }
        if (typeof B == "number") {
            angle++;
        }
        if (angle < 1 && edge < 2) {
            console.error('所传参数无法计算三角函数');
            return;
        }
        if (angle) {
            if (A == null || B == null) {
                if (A != null) {
                    B = 90 - A;
                }
                if (B != null) {
                    A = 90 - B;
                }
            }
            if (a == null || b == null || c == null) {
                if (a != null) {
                    if (c == null) {
                        c = this.sinToc(a, A);
                    }
                    if (b == null) {
                        b = this.sinToa(c, A);
                    }
                }
                else if (b != null) {
                    if (c == null) {
                        c = this.sinToc(b, B);
                    }
                    if (a == null) {
                        a = this.sinToa(c, B);
                    }
                }
                else if (c != null) {
                    if (a == null) {
                        a = this.sinToa(c, A);
                    }
                    if (b == null) {
                        b = this.sinToa(c, B);
                    }
                }
            }
        }
        return {
            a: a,
            b: b,
            c: c,
            A: A,
            B: B,
        };
    };
    Adapt.prototype.sinToc = function (a, angle) {
        var c = a / Math.sin(this.angleToRadian(angle));
        return c;
    };
    Adapt.prototype.sinToa = function (c, angle) {
        var a = c * Math.sin(this.angleToRadian(angle));
        return a;
    };
    Adapt.prototype.cosTob = function (c, angle) {
        var b = c * Math.cos(this.angleToRadian(angle));
        return b;
    };
    Adapt.prototype.cosToc = function (b, angle) {
        var c = b / Math.cos(this.angleToRadian(angle));
        return b;
    };
    Adapt.prototype.aANDcToA = function (a, c) {
        var A = Math.asin(a / c);
        return A;
    };
    Adapt.prototype.aANDcToB = function (a, c) {
        var B = Math.acos(a / c);
        return B;
    };
    Adapt.prototype.angleToRadian = function (angle) {
        return Math.PI / 180 * angle;
    };
    Adapt.c_adapt = null;
    return Adapt;
}());
__reflect(Adapt.prototype, "Adapt");
//# sourceMappingURL=Adapt.js.map