
import { _decorator, Component, Node, Button, RichText, Prefab } from 'cc';
const { ccclass, property } = _decorator;

import * as cc from 'cc';  //要想使用CC 得加这个  应为3.3.0后是全面抛弃了cc命名空间  搞了一个按需加载的功能(有点多余！！！)
/**
 * Predefined variables
 * Name = MianlayerFun1
 * DateTime = Sun Nov 21 2021 21:40:56 GMT+0800 (中国标准时间)
 * Author = cxwlh2021
 * FileBasename = mianlayerFun_1.ts
 * FileBasenameNoExtension = mianlayerFun_1
 * URL = db://assets/script/UI/mainlayer/mianlayerFun_1.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */


//使用的引擎是cocos creator 3.3.2      2021-10-11 发布的版本   和3.3.0版本好像还是有很多的新增功能
//3.0.0版本后完全抛弃了cc 可以直接的使用
//3.3.3之后的TS需要按照许多的依赖包才能运行
//主要是在node.js 下使用npm 来安装环境
//creator 3.3.0 在Creator菜单栏点击：开发者-Export.d.ts  功能来在VScode中进行creator项目的代码的提示，
//点击后会自动的生成一个@type的文件夹   
//注意必须在导入在项目的更目录下面才能生效【比如TS提示的 cc 找不到可能就是这个原因】
//一定要用VScode打开整个工程的文夹不要只是assert文夹不然那些提示还是不会消停

//const  NUM = 6; //可以在类外定义常量
@ccclass('MianlayerFun1')
export class MianlayerFun1 extends Component {
    //先定义脚本的编辑器代码
    @property(
        {
            type:[Button],//属性数组的定义方式
            displayName:"按钮列表"
        }
    )
    btns:Button[] = Array<Button>();//泛型的动态数组

    @property(
        {
            type:RichText,
            displayName:"富文本",
        }
    )
    tex:RichText = null;

    @property(
        {
            type:Node,
            displayName:"音频设置",
        }
    )
    musicPrefab:Node =null;

    //<1>脚本对象被构建时会执行一次
    construct()

    {
        /*
        就是脚本的构造函数
         */
    }

    //<2>脚本所在的节点激活时会触发  只执行一次  主要用于数据的加载
    onLoad()
    {
        //给按钮赋值
        //给富文本赋值
        let strname  = ["btn","btn-001","btn-002","btn-003","btn-004","btn-005"];
        //for(let item in strname)  数组不要用for(in) for in 得到的是键、而不是值
        for(let i=0;i<strname.length;i++)
        {
            let item = strname[i];
            let node = this.node.getChildByName(item);
            if(node)
            {
                let com = node.getComponent(Button);
                if(com)
                {
                    this.btns.push(com);
                }
            }
        }
        this.tex = this.node.getChildByName("wenben")?.getComponent(RichText)??null;

        // this.node.on(cc.Node.EventType.TOUCH_END,function () {
        //     this.playMp3();
        // },this);

        cc.resources.load<Prefab>("prefabs/music_bgm",Prefab,function(err, item)
        {
            if(err)
            {
                console.log("this is a error!!!");
                return ;
            }
            else if(item)
            {
                //先赋值了一个预制件
                let pre = cc.instantiate(item) as Node;
                this.musicPrefab = pre;
                this.musicPrefab.parent =  this.node;
                //this.node.addChild(this.musicPrefab);
        

            }
        }.bind(this)//回调函数中不能直接使用this 需要进行绑定
        );

        //给按钮注册事件
        var clickEventHandler = new cc.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "MianlayerFun1";
        clickEventHandler.handler  = "playMp3";
        clickEventHandler.customEventData = "播放音乐";
        //clickEventHandler.emit(["播放音乐"]);
        //console.log("the length is "+this.btns.length);
        this.btns[0].clickEvents.push(clickEventHandler);


        //给按钮注册事件
        var clickEventHandler = new cc.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "MianlayerFun1";
        clickEventHandler.handler  = "pauseMp3";
        clickEventHandler.customEventData = "暂停音乐";
        //clickEventHandler.emit(["播放音乐"]);
        this.btns[1].clickEvents.push(clickEventHandler);


        //给按钮注册事件
        var clickEventHandler = new cc.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "MianlayerFun1";
        clickEventHandler.handler  = "replayMp3";
        clickEventHandler.customEventData = "从头播放音乐";
        //clickEventHandler.emit(["播放音乐"]);
        this.btns[2].clickEvents.push(clickEventHandler);

         //给按钮注册事件
         var clickEventHandler = new cc.EventHandler();
         clickEventHandler.target = this.node;
         clickEventHandler.component = "MianlayerFun1";
         clickEventHandler.handler  = "reduceplayMp3";
         clickEventHandler.customEventData = "减弱播放音乐";
         //clickEventHandler.emit(["播放音乐"]);
         this.btns[3].clickEvents.push(clickEventHandler);


         //给按钮注册事件
         var clickEventHandler = new cc.EventHandler();
         clickEventHandler.target = this.node;
         clickEventHandler.component = "MianlayerFun1";
         clickEventHandler.handler  = "addplayMp3";
         clickEventHandler.customEventData = "增强播放音乐";
         //clickEventHandler.emit(["播放音乐"]);
         this.btns[4].clickEvents.push(clickEventHandler);

         //给按钮注册事件
         var clickEventHandler = new cc.EventHandler();
         clickEventHandler.target = this.node;
         clickEventHandler.component = "MianlayerFun1";
         clickEventHandler.handler  = "dalayplayMp3";
         clickEventHandler.customEventData = "延时播放音乐";
         //clickEventHandler.emit(["播放音乐"]);
         this.btns[5].clickEvents.push(clickEventHandler);
    }

    //<3>脚本启用时会执行一次   每次状态更新都会执行一次
    onEnable()
    {

    }

    //<4>脚本禁用时会执行一次 每次状态的更新会执行一次
    onDisable()
    {

    }


    //<5>相机在进行场景渲染前需要执行一次  主要是进行场景的初始化工作
    start () 
    {
    }


    //<6>游戏逻辑帧函数   每一帧都会执行一次   60fps 那么每一秒钟执行60次
    // 动画、物理、粒子等渲染前执行，每帧调用
    update (deltaTime: number) {
    }

    //<7>游戏逻辑值更新后的函数  每一次执行完update后就会立马执行lateUpdate  Unity中主要是在这个地方执行相机位置的调整
    //动画、物理、粒子等渲染后执行，每帧调用
    lateUpdate()
    {

    }

    //脚本销毁、生命周期结束时调用 、整个生命周期只会触发一次
    onDestroy()
    {

    }

    playMp3(event:cc.EventTouch,data:string):void
    {
        //let suocmp  = this.musicPrefab.node.getComponent();
        //debugger;
        console.log("我被点击了……"+data);//非要点击两下才能有效果
        if(this.musicPrefab)
        {
            let audiocmp = this.musicPrefab.getComponent(cc.AudioSource);
            audiocmp.volume = 1;
            audiocmp.play();
            let clip = audiocmp.clip;
            console.log("the clip name is : "+clip?.name);
        }
    }

    pauseMp3(event:cc.EventTouch,data:string):void
    {
        //let suocmp  = this.musicPrefab.node.getComponent();
        //debugger;
        console.log("我被点击了……"+data);//非要点击两下才能有效果
        if(this.musicPrefab)
        {
            let audiocmp = this.musicPrefab.getComponent(cc.AudioSource);
            audiocmp.pause();
        }
    }

    replayMp3(event:cc.EventTouch,data:string):void
    {
        console.log("我被点击了……"+data);//非要点击两下才能有效果
        if(this.musicPrefab)
        {
            let audiocmp = this.musicPrefab.getComponent(cc.AudioSource);
            audiocmp.volume = 1;
            if(audiocmp.playing)
            {
                audiocmp.currentTime = 0;
            }
            else
            {
                audiocmp.currentTime = 0;
                audiocmp.play();
            }
        }
    }

    reduceplayMp3(event:cc.EventTouch,data:string):void
    {
        console.log("我被点击了……"+data);//非要点击两下才能有效果
        if(this.musicPrefab)
        {
            let audiocmp = this.musicPrefab.getComponent(cc.AudioSource);
            audiocmp.volume = 1;
            cc.tween(audiocmp).to(0.5,{volume:0.01}).start();
        }
    }

    addplayMp3(event:cc.EventTouch,data:string):void
    {
        console.log("我被点击了……"+data);//非要点击两下才能有效果
        if(this.musicPrefab)
        {
            let audiocmp = this.musicPrefab.getComponent(cc.AudioSource);
            audiocmp.volume = 0;
            cc.tween(audiocmp).to(0.5,{volume:1}).start();
        }
    }

    dalayplayMp3(event:cc.EventTouch,data:string):void
    {
        console.log("我被点击了……"+data);//非要点击两下才能有效果
        if(this.musicPrefab)
        {
            let audiocmp = this.musicPrefab.getComponent(cc.AudioSource);
            audiocmp.volume = 1;
            audiocmp.stop();
            cc.tween(audiocmp).delay(2).call(()=>{audiocmp.play();}).start();
        }
    }

}

//######################自己的函数写在下面##################################

