// TypeScript file
class Adapt{
    //UICenter必须在引用前插入Main中
    public stageWidth = UICenter.getInstance().stage.$stageWidth;
    public stageHeight = UICenter.getInstance().stage.$stageHeight;
    public intervalTime = 0;
    private obj = null;
    public init = {};
    public static c_adapt:Adapt = null;
    public static getInstance(){
        if(Adapt.c_adapt == null){
            Adapt.c_adapt = new Adapt();
        }
        return Adapt.c_adapt;
    }
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
    public SETBitmap({
        obj = null,
        res = null,
        anchorX = null,
        anchorY = null,
        sign = null,
        length = null,
        width = null,
        height = null,
        guideX = null,
        guideY = null,
        x = null,
        y = null,
        posAnchorX = null,
        posAnchorY = null,
        isAutoAnchor = true,
     }={}){
         if(typeof obj != 'object'){
             console.error('非法对象：'+obj)
             this.obj = null;
             return false;
         }else{
             this.obj = obj;
         }
        //解析顺序
        //加载资源->检测是否手动修改锚点->资源大小修改->锚点修改->坐标修改
        let isChangeAnchorX = typeof anchorX == "number";
        let isChangeAnchorY = typeof anchorY == "number";
        (typeof res == "string")&&this.SetTexture(res);
        isChangeAnchorX||isAutoAnchor&&this.ReSetAnchorX();
        isChangeAnchorY||isAutoAnchor&&this.ReSetAnchorY();
        (typeof sign == "string"&&typeof length == "number")&&(sign == "width")?this.AdaptWidth(length*this.stageWidth):((sign == "height")&&(this.AdaptHeight(length*this.stageHeight)));
        (typeof width == "number")&&this.SetWidth(width*this.stageWidth);
        (typeof height == "number")&&this.SetHeight(height*this.stageHeight);
        isChangeAnchorX?this.SetAnchorX(anchorX):isAutoAnchor&&this.ReSetAnchorX();
        isChangeAnchorY?this.SetAnchorY(anchorY):isAutoAnchor&&this.ReSetAnchorY();
        (typeof guideX == "string"||typeof x == "number")&&this.SetPosX({
            guide:guideX,
            length:x*this.stageWidth,
            anchorX:posAnchorX
        });
        (typeof guideY == "string"||typeof y == "number")&&this.SetPosY({
            guide:guideY,
            length:y*this.stageHeight,
            anchorY:posAnchorY
        });
    }
    //资源加载
    public SetTexture(res:string){
        let texture:egret.Texture = RES.getRes(res);
        this.obj.texture = texture;
    }
    //等比例修改宽度
    public AdaptWidth(length:number){
        let _this = this.obj;
        _this.height = _this.height / _this.width * length ;
        _this.width = length;
    }
    //等比例修改高度
    public AdaptHeight(length:number){
        let _this = this.obj;
        _this.width = _this.width / _this.height * length ;
        _this.height = length;
    }
    //设置宽度
    public SetWidth(length:number){
        this.obj.width = length;
    }
    //设置高度
    public SetHeight(length:number){
        this.obj.height = length;
    }
    //外部调用锚点
    public SetAnchor(x:number,y:number){
        this.SetAnchorX(x);
        this.SetAnchorY(y);
    }
    //修改X锚点
    public SetAnchorX(x:number){
        let _this = this.obj;
        _this.$anchorOffsetX = _this.width*x;
    }
    //修改y锚点
    public SetAnchorY(y:number){
        let _this = this.obj;
        _this.$anchorOffsetY = _this.height*y;
    }
    //按比例重新定义x锚点
    public ReSetAnchorX(){
        let _this = this.obj;
        this.init['anchorX']?(_this.$anchorOffsetX = this.init['anchorX']*_this.width):(this.init['anchorX'] = _this.$anchorOffsetX/_this.width);
    }
    //按比例重新定义y锚点
    public ReSetAnchorY(){
        let _this = this.obj;
        this.init['anchorY']?(_this.$anchorOffsetY = this.init['anchorY']*_this.height):(this.init['anchorY'] = _this.$anchorOffsetY/_this.height);
    }
    //设置x坐标
    public SetPosX({guide=null,length=null,anchorX = null}={}){
        let _this = this.obj;
        let anchorPos = (typeof anchorX == 'number')?(_this.$anchorOffsetX - anchorX*this.stageWidth):0;
        let anchorXl = _this.$anchorOffsetX - anchorPos;
        let anchorXr = _this.width - _this.$anchorOffsetX - anchorPos;
        let x = null;
        switch(guide){
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
                x = this.stageWidth/2 + length;
                break;
            case 'center-left':
                x = this.stageWidth/2 + anchorXl + length;
                break;
            case 'center-right':
                x = this.stageWidth/2 - anchorXr + length;
                break;
            case 'none':
            default:
                x = length;
                break;
        }
        (typeof x!=null)&&(_this.x = x);
    }
    //设置y坐标
    public SetPosY({guide=null,length=null,anchorY = null}={}){
        let _this = this.obj;
        let anchorPos = (typeof anchorY == 'number')?(_this.$anchorOffsetY - anchorY*this.stageHeight):0;
        let anchorYt = _this.$anchorOffsetY - anchorPos;
        let anchorYb = _this.height - _this.$anchorOffsetY - anchorPos;
        let y = null;
        switch(guide){
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
                y = this.stageHeight/2 + length;
                break;
            case 'center-top':
                y = this.stageHeight/2 + anchorYt + length;
                break;
            case 'center-bottom':
                y = this.stageHeight/2 - anchorYb + length;
                break;
            case 'none':
            default:
                y = length;
                break;
        }
        (typeof y != null)&&(_this.y = y);
    }
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
    public Triangle({
        a = null,
        b = null,
        c = null,
        A = null,
        B = null,
     }={}){
        //已知一边一角度
        let edge = 0;
        let angle = 0;
        if(typeof a == "number"){
            edge++;
        }
        if(typeof b == "number"){
            edge++;
        }
        if(typeof c == "number"){
            edge++;
        }
        if(typeof A == "number"){
            angle++;
        }
        if(typeof B == "number"){
            angle++;
        }
        if(angle<1&&edge<2){
            console.error('所传参数无法计算三角函数');
            return;
        }
        if(angle){
            if(A == null||B == null){
                if(A != null){
                    B = 90 - A;
                }
                if(B != null){
                    A = 90 - B;
                }
            }
            if(a == null||b == null||c == null){
                if(a != null){
                    if(c == null){
                        c = this.sinToc(a,A);
                    }
                    if(b == null){
                        b = this.sinToa(c,B);
                    }
                }else if(b != null){
                    if(c == null){
                        c = this.sinToc(b,B);
                    }
                    if(a == null){
                        a = this.sinToa(c,A);
                    }
                }else if(c != null){
                    if(a == null){
                        a = this.sinToa(c,A);
                    }
                    if(b == null){
                        b = this.sinToa(c,B);
                    }
                }
            }
        }else{
            if(a==null||c==null||b==null){
                if(a == null){
                    a = Math.sqrt(c*c - b*b);
                }
                if(b == null){
                    b = Math.sqrt(c*c - a*a);
                }
                if(c == null){
                    c = Math.sqrt(a*a + b*b);
                }
            }
            A = this.radianToAngle(Math.asin(a/c));
            B = this.radianToAngle(Math.asin(b/c));
        }
        return {
            a:a,
            b:b,
            c:c,
            A:A,
            B:B,
        }
    }
    public sinToc(a,angle){
        let c = a/Math.sin(this.angleToRadian(angle));
        return c;
    }
    public sinToa(c,angle){
        let a = c*Math.sin(this.angleToRadian(angle));
        return a;
    }
    public cosTob(c,angle){
        let b = c*Math.cos(this.angleToRadian(angle));
        return b;
    }
    public cosToc(b,angle){
        let c = b/Math.cos(this.angleToRadian(angle));
        return b;
    }
    public aANDcToA(a,c){
        let A = Math.asin(a/c);
        return A;
    }
    public aANDcToB(a,c){
        let B = Math.acos(a/c);
        return B;
    }
    public angleToRadian(angle:number){
        return Math.PI/180*angle;
    }
    public radianToAngle(radian:number){
        return 180/Math.PI*radian;
    }
    /*          

                   ^ N
               ____|_____
       f<---  |         |
        ______|_________|______
                   |
                   v G
        
       物体表面水平 F = 0; 
    */ 
    //力的作用函数(重力，摩擦力，弹力)
    /*
        F = ma;  m(kg)
        a = F/m;
    */ 
    public powerDispersed({
        m,rotation,μs = 0,μk = 0,
     }){
        let F = 0;
        let G = 9.8/m;
        if((rotation/180)%2 == 0){
            /*
                G = N
                F = G - N
            */ 
            F = 0;
        }else if((rotation+90)%180 == 0){
            /*
                F = G(1-f); f(空气阻力);
            */ 
            F = G;
        }else{
            /*
                F = cos(rotation)G(1-f);
            */
            F  = this.Triangle({c:G,B:rotation}).b*(1 - μk);
        }
        return F;
    }
}