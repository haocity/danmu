/*!
 * this.
 * @author   HaoDong <ureygt@gmail.com> <http://www.haotown.cn>
 * @license  The Star And Thank Author License (SATA)
 */
import html from './html';
import './style.css';
html.test();

let hasClass=(elements, cName)=>{
    return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
}

let addClass=(elements, cName)=>{
    if (!hasClass(elements, cName)) {
        elements.className += " " + cName;
    }
}

let removeClass=(elements, cName)=> {
    if (hasClass(elements, cName)) {
        elements.className = elements.className.replace(new RegExp("(\\s|^)" + cName + "(\\s|$)"), " ");
    }
}


function xhr(url, method='GET', data=null) {
    return new Promise(function(res, rej) {
      try {
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4 && xhr.status == 200) {
            res(xhr.responseText)
          } else if(xhr.readyState == 4) {
            rej(xhr.status)
          }
        }
        xhr.open(method, url, true)
        xhr.send(data)
      } catch(e) {}
    })
}

class Tplayer{
  constructor(options){
  		
  	let _this=this;
  	this.options=options;
  	this.warp=document.querySelector(this.options.Element);
  	this.geturl = this.options.danmakuapi + "get/?id=" + this.options.danmakuid;
    this.sendurl = this.options.danmakuapi + "send/";
    this.adddanmaku(this.geturl);
    this.data=new Array;
//	this.data=this.options.danmaku
//  this.nowdata = JSON.parse(this.data).danmaku
  	
    this.vloop=false
    this.nowduan = 0
    this.v = html.main()
  	this.warp.innerHTML=this.v
  	this.bar=false;

 
	this.ele={
		"tplayer":_this.$c(".tplayer")[0],
		"tplayer_main":_this.$c(".tp-video-main")[0],
		"danmaku_switch":_this.$c(".tp-danmaku-switch")[0],
		"tp_text":_this.$c(".tp-text")[0],
		"tp_up":_this.$c(".tp-up")[0],
		"tp_color_bo":_this.$c(".tp-color-bo")[0],
		"video_control_play":_this.$c(".tp-control-play")[0],
		"tp_oneplay":_this.$c(".tp-oneplay")[0],
		"danmaku_warp":_this.$c(".danmaku-warp")[0],
		"video_con":_this.$c(".tp-video-con")[0],
		"video_control_paused":_this.$c(".tp-control-paused")[0],
		"tp_s_w":_this.$c(".tp-s-tranger")[0],
		"tp_s":_this.$c(".tp-s-tranger-a")[0],
		"alltime":_this.$c(".tp-control-alltime")[0],
		"tranger_a":_this.$c(".tp-tranger-a")[0],
		"tranger_c":_this.$c(".tp-tranger-c")[0],
		"nowtime":_this.$c(".tp-control-nowtime")[0],
		"tp_spinner":_this.$c(".tp-spinner")[0],
		"full":_this.$c(".video-full")[0],
		"tp_con":_this.$c(".tp-con")[0],
		"tp_color_warp":_this.$c(".tp-color-warp")[0],
		"tp_place":_this.$c(".tp-place")[0],
		"tp_send":_this.$c(".tp-send")[0],
		"tranger":_this.$c(".tp-tranger")[0],
		"tp_speend_con":_this.$c(".tp-speend-con")[0],
		"tp_speend":_this.$c(".tp-speend")[0],
		"tp_video_warp":_this.$c(".tp-video-warp")[0],
		"tp_rightmenu":_this.$c(".tp-rightmenu")[0],
		"end":_this.$c(".video-end")[0],
		"replay":_this.$c(".replay")[0],
		"copy":_this.$c(".tp-copy-warp")[0],
		"copytext":_this.$c(".tp-copy-input")[0],
		"alltime_phone":_this.$c(".tp-control-alltime-phone")[0],
		"vloop":_this.$c('.tp-vloop')[0],
		"setbox":_this.$c('.tp-video-set')[0],
		"setclose":_this.$c('.tp-closeset')[0],
		"setbtn":_this.$c('.tp-set')[0],
		"setr1":_this.$c(".tp-s-r1")[0],
		"setr2":_this.$c(".tp-s-r2")[0],
		"setr3":_this.$c(".tp-s-r3")[0],
		"setr4":_this.$c(".tp-s-r4")[0],
		"setr5":_this.$c(".tp-s-r5")[0],
		"setr6":_this.$c(".tp-s-r6")[0],
		"setr7":_this.$c(".tp-s-r7")[0],
		"setr8":_this.$c(".tp-s-r8")[0],
		"video_ratio":_this.$c(".tp-ratio")[0],
		"alert":_this.$c(".tp-alert")[0],
		"alert_container":_this.$c(".tp-alert-container")[0],
		"alert_ok":_this.$c(".tp-alert-ok")[0],
		"screenshot":_this.$c(".tp-screenshot")[0],
		"definition":_this.$c(".tp-definition")[0],
		"tip":_this.$c(".tp-tip")[0],
		"css":_this.$c(".tp-css")[0]
	}

	
	
    if (localStorage.getItem('tdconfig')&&localStorage.getItem('tdconfig')!="undefined") {
       this.config=JSON.parse(localStorage.getItem('tdconfig'))
       console.log('加载设置成功')
    }else{
        this.config=new Object()
    }
    this.changerconfig()
    //判断地址类型
    if(typeof this.options.video.url[0]=='object'){
    	let src=this.options.video.url
    	console.log('多清晰度视频');
    	let t=this.config.definition;
    	let vv,ele;
    	ele=document.createElement('ul')
   		for(let i in src[0]){ 
   			if(src[0][i].v==t){
   				vv=src[0][i]
   			}
   			let li=document.createElement('li')
   			li.v=src[0][i].v
   			li.vsrc=src[0][i].m3u8
   			li.addEventListener('click',function(){
   				console.log('正在为你切换清晰度切换'+this.v);
   				this.alert({t:'<span style="line-height:26px;font-size: 21px;">正在为你切换清晰度..</span>',time:3000,padding:'6px 10px',opacity:"0.9"})
   				_this.ele.definition.querySelector('span').innerHTML=_this.Definition(this.v)
   				let time=_this.Element.currentTime
   				let hls = new Hls();
				hls.loadSource(this.vsrc);
				hls.attachMedia(_this.Element);
				hls.on(Hls.Events.MANIFEST_PARSED,function() {
					let i=true;
					_this.Element.addEventListener("canplay", function()
					  {
					  	if(i){
					  		i=false
					  		_this.tiao(time)
					  	}
					    
					  }
					);	   	
				   	_this.Element.style.display='block'
				})
   			},false);
   			li.innerHTML=_this.Definition(li.v)
   			ele.appendChild(li);
		}
   		if(!vv){
   			if(src[0].v1){
   				vv=src[0].v1
   			}else if(src[0].v2){
   				vv=src[0].v2
   			}else if(src[0].v3){
   				vv=src[0].v3
   			}else if(src[0].v4){
   				vv=src[0].v4
   			}
   		}
   		this.videosrcarr=[vv.m3u8]
   		//创建清晰度菜单
   		this.ele.definition.querySelector('span').innerHTML=_this.Definition(vv.v)
   		this.ele.definition.appendChild(ele);
   		this.ele.definition.style.display='block';
    	this.ele.definition.ul=this.ele.definition.querySelector('ul')
    	this.ele.definition.ul.style.display='none'
    	this.ele.definition.addEventListener('click',function(){
    		if(_this.ele.definition.ul.style.display=='block'){
    			_this.ele.definition.ul.style.display='none'
    		}else{
    			_this.ele.definition.ul.style.display='block'
    		}
    	})
    }else if(typeof this.options.video.url=="string"){
    	this.videosrcarr = new Array(this.options.video.url);
    }else{
    	this.videosrcarr = this.options.video.url
    }
    
    if(this.options.video.type == "flv"){
    	 let video = document.createElement("video");
    	 let arr=new Array
    	 for (let i = 0; i < this.videosrcarr.length; i++) {
    	  	arr.push({url:this.videosrcarr[i]})
    	 }
    	 if (flvjs&&flvjs.isSupported()) {
        	console.log('这是flv视频 启动加载');
        	let flvPlayer = flvjs.createPlayer({
                type: 'flv',
                segments: arr
         });
            flvPlayer.attachMediaElement(video)
            flvPlayer.load()
            this.Element = video
            video.className = "tp-video"
            video.preload = "auto"
            video.setAttribute('webkit-playsinline','')
            video.setAttribute('playsinline','')
            this.ele.tplayer.appendChild(video)
         }else{
        	console.error("请预先加载flv.js")
        }
    }else{
	    for (let i = 0; i < this.videosrcarr.length; i++) {
	        let video = document.createElement("video")
	        video.setAttribute('webkit-playsinline','')
            video.setAttribute('playsinline','')
            video.className = "tp-video"
	         if (this.options.video.type == "hls") {
	         	if (Hls&&Hls.isSupported()) {
		         	console.log('这是hls视频 启动加载');
		         	let hls = new Hls();
					hls.loadSource(this.videosrcarr[i]);
					hls.attachMedia(video);
					hls.on(Hls.Events.MANIFEST_PARSED,function() {
				     	console.log('可以开始加载');
				     	if(this.options.video.autoplay){
				     		this.play();
				     	}
				  	});
			  	}else if(video.canPlayType('application/vnd.apple.mpegurl')) {
					video.src = this.videosrcarr[i]
				}else{
			  		console.error("请预先加载hls.js")
			  	}
	        }else {
	        	video.src = this.videosrcarr[i]
	        }
	        
	        if (i != 0) {
	            video.style.display = "none"
	            video.preload = "meta"
	        } else {
	            video.preload = "auto"
	            this.Element = video
	        }
	        
	        this.ele.tplayer.appendChild(video)
	    }
    }
      //封面
    if(this.options.video.pic){
    	this.Element.poster=this.options.video.pic
    }
    this.danmakuelement = this.ele.danmaku_warp
    this.sjc = 0
    this.dsq = 0
    this.leftarr = {t:[],v:[],leaving:[],width:[]}
    this.toparr = []
    this.dmheight = 37
    this.dmplace = 1
   	if (/android/i.test(navigator.userAgent) || /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        this.istouch=1
        this.ele.video_con.style.opacity='1'
        this.ele.video_con.style.display='none'
    }else{
    	this.istouch=3//1.触摸 2.鼠标 3.可能为鼠标设备
    }
    //弹幕行高
    this.width = this.ele.tplayer_main.offsetWidth
    this.height =this.ele.tplayer_main.offsetHeight
    
    this.init()
}   
    
 init() {
 	let _this=this
 	this.nowdm=[]
    this.Element.addEventListener("canplaythrough", function(){
			console.log('加载完成 可以进行播放')
	});
    this.videoelearr = this.ele.tplayer.getElementsByTagName("video")
    this.videotimearr = []
    for (let i = 0; i < this.videoelearr.length; i++) {
        this.getallvideotime(this.videoelearr[i], i)
    }

  
    //样式
    this.send = function(text, color, wz, me,user,size) {
        let dm = document.createElement("div")
        let videotime=this.getnowtime()
        let inttime = parseInt(videotime * 10)
        dm.user=user
	    dm.style.color = color
	    dm.style.fontSize=size+'px'
        if (me) {
            dm.style.border = "1px solid #fff"
        }
        if (wz == 1) {
				//left 弹幕
				dm.appendChild(document.createTextNode(text))
				dm.className = "danmaku tp-left"
				//this.config.danmakusize
				dm.style.transform = "translateX(-" + this.width / this.config.danmakusize + "px)"
				this.ele.danmaku_warp.appendChild(dm)
				let twidth=dm.offsetWidth*this.config.danmakusize;
				let time = this.width / 100
				let v = ( twidth + this.width) / time
				let dmtop = this.getlefttop(v,  twidth)
				let leavetime =  twidth / v
				this.leftarr.leaving[dmtop] = true
				
				
				if((dmtop+1) * this.dmheight*this.config.danmakusize<this.height){
					dm.style.display='block';
					
					
					//console.log('leavetime',leavetime)
					this.nowdm.push({time:inttime+leavetime.toFixed(1)*10,call:function() {
						_this.leftarr.leaving[dmtop] = false
					}})
					
					dm.style.top = dmtop * this.dmheight + "px"
					
					dm.addEventListener("webkitAnimationEnd", function() {
						_this.dmend(dm)
					})
					dm.addEventListener("animationend", function() {
						_this.dmend(dm)
					})
				}else{
					this.leftarr.leaving[dmtop] = false
					this.dmend(dm)
					console.log('超出屏幕范围')
				}

				
			} else if (wz == 2) {
            //顶部弹幕
            dm.appendChild(document.createTextNode(text))
	        
            dm.className = "danmaku tp-top"
            let dtop = this.getcansendtop()
            dm.style.top = dtop * this.dmheight + "px"
            this.toparr[dtop] = 1
            let e = this.ele.danmaku_warp.appendChild(dm)
            this.nowdm.push({time:inttime+50,call:function() {_this.danmakuhide(e, dtop)},g:true})
			
        }else if(wz==7){
				let tj = JSON.parse(text);
				console.log('高级弹幕', tj);
					//时间如果为0
					if(!tj.l || tj.l.toFixed(2) == 0) {
						tj.l=0;
					}
					let nowtime=tj.l;
					if(tj.z) {
						//console.log('z存在', tj.z);
						for (let i = 0; i < tj.z.length; i++) {
							let a=i;
							this.nowdm.push({"call":function() {
								dm.style.transition="all "+tj.z[a].l+'s';
								//console.log('到达动画时间',a,dm);
								setTimeout(function(){
									if(tj.z[a].x) {
										//console.log('x2存在',tj.z[a].x)
										dm.style.right = (1000 - tj.z[a].x) / 10 + '%';
									}
									if(tj.z[a].y) {
										//console.log('y2存在',tj.z[a].y)
										dm.style.bottom = (1000 - tj.z[a].y) / 10 + '%';
									}
									if(tj.z[a].t) {
										dm.style.opacity = tj.z[a].t
									}
									if(tj.z[a].f||tj.z[a].g||tj.z[a].rx||tj.z[a].e){
										tj.z[a].f=tj.z[a].f||0;
										tj.z[a].g=tj.z[a].g||0;
										tj.z[a].rx=tj.z[a].rx||0;
										tj.z[a].e=tj.z[a].e||0;
										dm.style.transform=`scale(${tj.z[a].f},${tj.z[a].g}) skew(${tj.z[a].rx}deg,${tj.z[a].e}deg) translate(50%,50%)`
									}
								},0)
							},"time":inttime+nowtime.toFixed(1)*10,g:true})
							if(tj.z[i].l){
								nowtime=nowtime+tj.z[i].l;
							}
						}
					} else {
						tj.l = 2;
					}

				

				//高级弹幕 test 
				//{"e":0.52,"w":{"b":false,"l":[[1,16777215,1,2.7,2.7,5,3,false,false],[2,0,0,16777215,0.5,32,32,2,2,false,false,false]],"f":"黑体"},"l":5.551115123125783e-17,"f":0.52,"z":[{"t":0,"g":0.8,"l":0.2,"y":930,"f":0.8},{"t":1,"g":0.52,"l":0.2,"y":940,"f":0.52},{"l":1.3099999999999998},{"c":16776960,"x":-2,"t":0,"l":0.3,"v":2}],"t":0,"a":0,"n":"但是那样不行哦","ver":2,"b":false,"c":3,"p":{"x":35,"y":950},"ovph":false}
				dm.className = "danmaku danmaku-ad";
				if(tj.w) {
					dm.style.fontFamily = tj.w.f;
				}
				if(tj.n) {
					dm.appendChild(document.createTextNode(tj.n))
				}
				if(tj.p) {
					dm.style.right = (1000 - tj.p.x) / 10 + '%';
					dm.style.bottom = (1000 - tj.p.y) / 10 + '%';
				}
				if(tj.a) {
					dm.style.opacity = tj.a;
				}
				if(tj.e||tj.f||tj.rx||tj.rx||tj.k){
					tj.e=tj.e||0;
					tj.f=tj.f||0;
					tj.rx=tj.rx||0;
					tj.k=tj.k||0;
					dm.style.transform=`scale(${tj.e},${tj.f}) skew(${tj.rx}deg,${tj.k}deg) translate(50%,50%)`
				}
				
				let e = this.ele.danmaku_warp.appendChild(dm);
				this.nowdm.push({"call":function() {
					_this.danmakuhide(e)
				} ,"time":inttime+nowtime.toFixed(1)*10,g:true})
			}
    }
   

    //重播
    this.ele.replay.addEventListener("click", function() {
        _this.tiao(0)
        _this.ele.end.style.display = "none"
    });


    //播放完成
    for (let arg=0;arg<this.videoelearr.length;arg++) {
			this.videoelearr[arg].onended=function(){
				 if(_this.videoelearr[arg+1]){
				 	_this.nowduan=arg+1;
				 	let oldele = _this.videoelearr[arg];
	                let nowele = _this.videoelearr[arg+1];
				 	for (let i = 0; i < _this.videoelearr.length; i++) {
	                    if (i != _this.nowduan) {
	                        let ele = _this.videoelearr[i];
	                        if (ele.style.display != "none") {
	                            ele.style.display = "none";
	                        }
	                        ele.currentTime = 0;
	                        ele.pause();
	                    } else {
	                        let ele = _this.videoelearr[i];
	                        _this.Element = ele;
	                        ele.style.display = "block";
	                        ele.currentTime = 0;
	                        ele.play();
	                    }
				 	}
				 	_this.changersound()
				 }else{
				 	console.log("播放完毕"+arg)
                    if (_this.vloop) {
                        _this.tiao(0)
                    }else{
                        _this.ele.end.style.display = 'block'
                        _this.leftarr={t:[],v:[],leaving:[],width:[]}
                        _this.toparr = []
                        let arr=_this.$c('.danmaku')
                        for (let i = arr.length - 1; i >= 0; i--) {
                            arr[i].parentNode.removeChild(arr[i])
                        }
                       
                    }
				 }
			}
		
    }
  	//post发弹幕
  	this.ele.tp_up.addEventListener("click", function() {
  		if(_this.ele.tp_text.value){
	        _this.send(_this.ele.tp_text.value, _this.ele.tp_color_bo.style.backgroundColor,_this.dmplace, 1);
	        _this.ele.tp_text.readonly = "readonly";
	        _this.ele.tp_up.disabled = "true";
	        _this.ele.tp_up.style.background = "#777479";
	        setTimeout(function() {
	            _this.ele.tp_text.value = "";
	            _this.ele.tp_up.disabled = "";
	            _this.ele.tp_up.style.background = "#8715EF";
	        }, 500);
	        let postData = {
	            id:_this.options.danmakuid,
	            text:_this.ele.tp_text.value,
	            color:_this.ele.tp_color_bo.style.backgroundColor,
	            time:parseInt(_this.getnowtime()*10),
	            place:_this.dmplace
	        };
	        
	        postData = function(obj) {
	            // 转成post需要的字符串.
	            let str = "";
	            for (let prop in obj) {
	                str += prop + "=" + obj[prop] + "&";
	            }
	            return str;
	        }(postData);
	        let xhr = new XMLHttpRequest();
	        xhr.open("POST", _this.options.danmakuapi+"send/", true);
	        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	        xhr.onreadystatechange = function() {
	            let XMLHttpReq = xhr;
	            if (XMLHttpReq.readyState == 4) {
	                if (XMLHttpReq.status == 200) {
	                    let text = XMLHttpReq.responseText;
	                    console.log(text);
	                }
	            }
	        };
	        xhr.send(postData);
	    }
  	});
    //回车发射
    this.ele.tp_text.onkeydown = function(event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if (e.keyCode == 13) {
           _this.ele.tp_up.click();
        } else if (e.keyCode == 32) {
            e.stopPropagation();
        }
    };
    //弹幕开关
    this.ele.danmaku_switch.addEventListener("click", function() {
        if (this.className == "tp-danmaku-switch") {
            this.className = "tp-danmaku-switch tp-danmaku-switch-c";
            _this.ele.danmaku_warp.style.opacity=0;
        } else {
            this.className = "tp-danmaku-switch";
            _this.ele.danmaku_warp.style.opacity=null;
        }
    });


    this.ele.setr5.onclick=function(){
        if (this.checked) {
            if(_this.removaldata){
                _this.nowdata=_this.removaldata
            }else{
               _this.removaldanmaku()
            }
            _this.config.qc=true
        }else{
            _this.nowdata=_this.data.slice(0)
            _this.config.qc=false
        }
        localStorage.setItem('tdconfig', JSON.stringify(_this.config))
    }
    this.ele.setr6.onclick=function(){
        if (this.checked) {
            _this.shielddanmaku()
            _this.config.pb=true
        }else{
            _this.nowdata=_this.data.slice(0)
            _this.config.pb=false
        }
        _this.config.pbs=_this.ele.setr7.value
        localStorage.setItem('tdconfig', JSON.stringify(_this.config))
    }
    this.ele.setr7.addEventListener('keydown',function(event){
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if (e.keyCode) {
            e.stopPropagation();
        }
    });
    this.ele.setr7.onchange=function(){
        if (_this.ele.setr6.checked) {
            _this.shielddanmaku()   
        }
    }
    this.ele.setr8.onchange=function(){
    	const t=this.selectedIndex+1
    	_this.config.definition=t
    }
    this.ele.setr7.value=_this.config.pbs
    


    this.ele.setr1.onchange=_this.changerset.bind(_this);
    this.ele.setr2.onchange=_this.changerset.bind(_this);
    this.ele.setclose.addEventListener('click',function(){
        _this.changerset.bind(_this)
        _this.config.pbs=_this.ele.setr7.value
    	localStorage.setItem('tdconfig', JSON.stringify(_this.config))
        addClass(_this.ele.setbox,'tp-zoomoutdown');
        setTimeout(function(){
            _this.ele.setbox.style.display='none'
            removeClass(_this.ele.setbox,'tp-zoomoutdown')
        },480);
    },false);
    this.ele.setbtn.addEventListener('click',function(){
        if (_this.ele.setbox.style.display!='block') {
            _this.ele.setbox.style.display='block'
            addClass(_this.ele.setbox,'tp-zoomoutup');
            setTimeout(function(){
               _this.ele.setbox.className='tp-video-set';
            },480);
        }else if(_this.ele.setbox.className=='tp-video-set'){
            _this.ele.setclose.click();
        }
    },false);
    this.ele.setr3.onclick=function(){
        if (this.checked) {
             _this.config.dmweight=600
        }else{
             _this.config.dmweight=400
        }
        _this.changerconfig();
    }
    this.ele.setr4.onclick=function(){
        if (this.checked) {
            _this.config.dmshadow=0;
        }else{
             _this.config.dmshadow=2
        }
        _this.changerconfig();
    }
 
	
    //视频播放
    this.ele.video_control_play.addEventListener("click",function(){
       _this.play();
    });
   
    this.ele.tp_oneplay.addEventListener("animationend", function(){
            removeClass(this,'tp-zoomoutdown')
            this.style.display='none'
    }, false)
    this.ele.tp_oneplay.addEventListener("webkitAnimationEnd", function(){
            removeClass(this,'tp-zoomoutdown')
            this.style.display='none'
    }, false)
    //视频暂停
    this.ele.video_control_paused.addEventListener("click", function() {
    	_this.pause();
    });
    
    this.ele.tp_oneplay.addEventListener("click", function() {
        addClass(this,'tp-zoomoutdown')
         _this.play()
    });
    //鼠标隐藏
	this.ele.danmaku_warp.addEventListener('mousemove',function(){
		if(this.time){clearTimeout(this.time)}
		_this.ele.danmaku_warp.style.cursor='auto';
		this.time=setTimeout(function(){
			_this.ele.danmaku_warp.style.cursor='none';
		},3000)
	})
	
    //触摸
    this.ele.danmaku_warp.addEventListener("touchend",()=> {
    	if(this.istouch!=1){
    		this.istouch==1
    	}
    	let e = this.ele.video_con;
    	if(e.style.display == "block") {
    		e.style.display = "none"
    		if(this.Element.paused) {
    			this.play();
    		} else {
    			this.pause()
    		}
    	} else {
    		e.style.display = "block";
    		if(!this.Element.paused) {
    			this.pause()
    		}
    	}
    });
 	

    this.ele.alert_ok.addEventListener('click',function(){
        _this.ele.alert.style.display='none'
    },false)
    this.ele.screenshot.addEventListener('click',function(){
        _this.ele.tp_rightmenu.style.display='none'
        _this.screenshot()
    },false)
    
    this.sound = this.config.sound;
    if (this.sound) {
        this.ele.tp_s.style.width = this.sound+"%";
        this.Element.volume = parseInt(this.ele.tp_s.style.width) * .01;
    } else {
         this.ele.tp_s.style.width = "80%";
        this.changersound();
    }
    //循环按钮
    this.ele.vloop.onclick=function(){
        if (_this.vloop) {
             _this.vloop=false
            this.className='tp-vloop tp-vloop1'
        }else{
             _this.vloop=true
            this.className='tp-vloop tp-vloop2'
        }
    }
    //音量调节
   this.ele.tp_s_w.addEventListener("click", function(event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        let xbl = _this.show_coords(e, this).xbl * 100;
        _this.ele.tp_s.style.width = xbl + "%";
        _this.changersound();
    }, false);

    //行走器
    this.Element.addEventListener('timeupdate',function(){
    	let videotime = _this.getnowtime();
        let smalltime = _this.Element.currentTime;
        _this.ele.tranger_a.style.width = videotime / _this.alltime * 100 + "%";
        let buff = _this.Element.buffered;
        //判断缓存段
        let oldduan = _this.nowduan - 1, oldtime = 0, time2 = 0;
        for (let i = 0; i <= oldduan; i++) {
            oldtime += _this.videotimearr[i];
        }
        if(buff.length){
        	time2 = oldtime + buff.end(buff.length - 1);
        }
        let width = time2 / _this.alltime * 100 + "%";
        if (_this.ele.tranger_c.style.width != width) {
            _this.ele.tranger_c.style.width = width;
        }
    },false)
   
    
    //定时器二 1s执行一次
    setInterval(()=>{
    	this.width = this.ele.tplayer_main.offsetWidth
		this.height =this.ele.tplayer_main.offsetHeight
    	let videotime=this.getnowtime(videotime);
        //当前段播放将要结束 缓存下一段
        let temp = _this.videoelearr[this.nowduan].currentTime;
        if (temp + 20 >= _this.videotimearr[this.nowduan]) {
            if (this.videoelearr[this.nowduan + 1]) {
            	if (this.videoelearr[this.nowduan + 1].preload != "auto") {
	                this.videoelearr[this.nowduan + 1].preload = "auto";
	                console.log("当前正在播放第" + this.nowduan + "段，正在加载下一段");
	            }
            }
        }
        this.ele.nowtime.innerHTML = this.getvideotime(videotime).m + ":" + this.getvideotime(videotime).s;
        
    }, 1e3);
    

    //进度条
    this.ele.tranger.addEventListener('mousemove',function(e){
    	if(!this.last){
    		this.last=e.x
    		this.w=this.offsetWidth
    		this.w2=_this.getLeft(this)
    		this.t=_this.getTop(this)
    	}
    	
    	if(this.last-e.x>4||this.last-e.x<-4){
    		
			_this.ele.tip.style.left=e.x-22+'px';
			_this.ele.tip.style.top=this.t-27-document.documentElement.scrollTop+'px';
			
			var xbl =(e.x-this.w2)/this.w;
			var videotime = _this.alltime*xbl;
			var a=_this.getvideotime(videotime);
			_this.ele.tip.innerHTML=a.m + ":" + a.s;
		}
	})
    
   this.ele.tranger.addEventListener('mouseleave',function(){
		 _this.ele.tip.style.display='none'
	})
    this.ele.tranger.addEventListener('mouseenter',function(){
		 _this.ele.tip.style.display='block'
	})
    
    
    this.ele.tranger.onmousedown = function(event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        let xbl = _this.show_coords(e, this);
        _this.ele.tranger_a.style.width = xbl.xbl * 100 + "%";
        _this.tiao(xbl.xbl * _this.alltime);
    };

    for (let i = 0; i < this.videoelearr.length; i++) {
        this.videoelearr[i].addEventListener("waiting", function() {
            _this.videohc();
        });
        this.videoelearr[i].addEventListener("playing", function() {
            _this.tdplay();
        });
    }

    //键盘
    this.ele.tp_video_warp.addEventListener('click',function(){
         setTimeout(function(){ _this.ele.tp_video_warp.xz=true;},200);
    }, false);
    document.addEventListener('click', function(e){
         if (e.target==_this.ele.danmaku_warp) {
            _this.ele.tp_video_warp.xz=true
         }else{
            _this.ele.tp_video_warp.xz=false
         }
    }, false);
    document.addEventListener("keydown", function(event) {
        let ev = event || window.event || arguments.callee.caller.arguments[0];
    
         if(_this.ele.tp_video_warp.xz==true&&ev.target.nodeName!='INPUT'){
	        _this.showbar();
	        if(ev.keyCode==39||37){
	        	if(_this.ele.end.style.display=="block"){
    				_this.ele.end.style.display="none"
    			}
	        }
	        if (ev && ev.keyCode == 39) {
	            // right 键
	            let videotime = _this.getnowtime();
	            _this.tiao(videotime + 5);
	        }
	        if (ev && ev.keyCode == 37) {
	            // left 键
	            let videotime = _this.getnowtime();
	            _this.tiao(videotime - 5);
	        }
	        if (ev && ev.keyCode == 32) {
	            // space 键
	              event.preventDefault();
                if(_this.ele.end.style.display=="block"){
                    _this.ele.end.style.display="none"
                    _this.tiao(0)
                }else if (_this.Element.paused) {
	                _this.play();
	            } else {
	                _this.pause()
	            }
	        }
	        if (ev && ev.keyCode == 38) {
	            // up 键
	            event.preventDefault();
	            _this.ele.tp_s.style.width = parseInt(_this.ele.tp_s.style.width) + 1 + "%";
                _this.changersound();
	        }
	        if (ev && ev.keyCode == 40) {
	            // down 键
	            event.preventDefault();
	            _this.ele.tp_s.style.width = parseInt(_this.ele.tp_s.style.width) - 1 + "%";
                _this.changersound();
	        }
	    }
    });
    
    this.ele.full.addEventListener("click", ()=>{
    	//全屏切换
        let e = this.ele.tplayer_main
        if(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement){
        	if(document.cancelFullScreen) {
        		document.cancelFullScreen()
        	} else if(document.mozCancelFullScreen) {
        		document.mozCancelFullScreen()
        	} else if(document.webkitCancelFullScreen) {
        		document.webkitCancelFullScreen()
        	}
        	//退出全屏
        } else {
        	this.isfull=true;
        	if(e.requestFullscreen) {
        		e.requestFullscreen()
        	} else if(e.mozRequestFullScreen) {
        		e.mozRequestFullScreen()
        	} else if(e.webkitRequestFullscreen) {
        		e.webkitRequestFullscreen()
        	}
        	//进入全屏
        }
        //document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement ? document.cancelFullScreen ? document.cancelFullScreen() :document.mozCancelFullScreen ? document.mozCancelFullScreen() :document.webkitCancelFullScreen && document.webkitCancelFullScreen() :e.requestFullscreen ? e.requestFullscreen() :e.mozRequestFullScreen ? e.mozRequestFullScreen() :e.webkitRequestFullscreen && e.webkitRequestFullscreen();

    });
    let screenChange = 'webkitfullscreenchange' || 'mozfullscreenchange' || 'fullscreenchange'
   	this.ele.tplayer_main.addEventListener(screenChange,()=>{this.joinfull()},false);
   	
    //颜色
    let tpcolor = new Object();
    tpcolor.arr = new Array("#FFFFFF", "#000000", "#4ab0c6", "#555656", "#09b745", "#f86141", "#FFEB3B", "#4d38d8", "#fe67c1", "#ff9c07");
    for (let r = 255; r >= 0; r -= 25) {
        for (let g = 0; g <= 255; g += 25) {
            for (let b = 0; b <= 255; b += 25) {
                tpcolor.arr.push("rgb(" + r + "," + g + "," + b + ")");
            }
        }
    }
    let danmakucon = this.ele.tp_con;
    let colorwarp = this.ele.tp_color_warp;
    this.ele.tp_color_bo.addEventListener("click", function() {
        if (danmakucon.style.display == "block") {
            danmakucon.style.display = "none";
        } else {
            danmakucon.style.display = "block";
        }
    });
    for (tpcolor.i = 0; tpcolor.i < tpcolor.arr.length; tpcolor.i++) {
        let colormain = document.createElement("div");
        colormain.className = "tp-color-w";
        let color = document.createElement("div");
        color.className = "tp-color-main";
        color.style.backgroundColor = tpcolor.arr[tpcolor.i];

        colormain.appendChild(color);
        colorwarp.appendChild(colormain);
    }
    this.ele.tp_color_warp.addEventListener('click',function(event){
    	if(event.target.className=="tp-color-main"){
    		console.log(event.target.style.backgroundColor)
    		_this.ele.tp_color_bo.style.backgroundColor = event.target.style.backgroundColor;
    		_this.ele.tp_con.style.display='none'
    	}
    })
    //设置
    //视频速度设置
    this.ele.tp_speend_con.addEventListener("click", function() {
        let t = _this.ele.tp_speend;
        if (t.style.display == "block") {
            t.style.display = "none";
        } else {
            t.style.display = "block";
        }
    });
    let videospeendele = this.ele.tp_speend.childNodes;
    for (let i = 0; i < videospeendele.length; i++) {
        let e = videospeendele[i];
        let s = parseFloat(videospeendele[i].innerText).toFixed(2);
        if (s != "NaN") {
            e.onclick = function() {
                let t = parseFloat(this.innerText).toFixed(2);
                for (let i=0;i<_this.videoelearr.length;i++) {
                	_this.videoelearr[i].playbackRate = t;
                }
            };
        } else {
            e.onclick = function() {
                for (let i=0;i<_this.videoelearr.length;i++) {
                	_this.videoelearr[i].playbackRate = 1;
                }
            };
        }
    }
    //视频比例设置
    this.ele.video_ratio.ratio=1;
    this.ele.video_ratio.addEventListener('click',function(){
    	let vh=_this.Element.videoHeight
        let vw=_this.Element.videoWidth
        if(this.ratio==1){
            this.ratio=2;
            let vb= vw*0.75/vh
            if(vb>1){
           		_this.ele.tplayer.style.transform=`scale(${1/vb},1)`
            	_this.ele.tplayer.style.webkitTransform=`scale(${1/vb},1)`
           	}else{
           		_this.ele.tplayer.style.transform=`scale(1,${vb})`
            	_this.ele.tplayer.style.webkitTransform=`scale(1,${vb})`
           	}
            
            
            this.innerText=`视频比例 4:3`
        }else if(this.ratio==2){
            this.ratio=3
            
            let vb= vw*0.5625/vh
           	
           	if(vb>1){
           		_this.ele.tplayer.style.transform=`scale(${1/vb},1)`
            	_this.ele.tplayer.style.webkitTransform=`scale(${1/vb},1)`
           	}else{
           		_this.ele.tplayer.style.transform=`scale(1,${vb})`
            	_this.ele.tplayer.style.webkitTransform=`scale(1,${vb})`
           	}
            
            this.innerText=`视频比例 16:9`
        }else if(this.ratio==3){
            this.ratio=4
            this.innerText=`视频比例 全屏`
            _this.ele.tplayer.style.transform=`none`
            _this.ele.tplayer.style.webkitTransform=`none`
            for (let i = 0; i < _this.videoelearr.length; i++) {
                _this.videoelearr[i].style.height='auto';
                _this.videoelearr[i].style.width='auto';
                _this.videoelearr[i].className="";
            }
            setTimeout(function(){
                let w1= _this.ele.tplayer.offsetWidth
                let w2= _this.videoelearr[0].offsetWidth
                let h1= _this.ele.tplayer.offsetHeight
                let h2= _this.videoelearr[0].offsetHeight
                _this.ele.tplayer.style.transform=`scale(${w1/w2},${h1/h2})`
                _this.ele.tplayer.style.webkitTransform=`scale(${w1/w2},${h1/h2})`
                _this.ele.tplayer.style.transformOrigin= 'left top'
                _this.ele.tplayer.style.webkitTransformOrigin='left top'
            },0);
        }else{
            for (let i = 0; i < _this.videoelearr.length; i++) {
                _this.videoelearr[i].style.height='100%';
                _this.videoelearr[i].style.width='100%';
                _this.videoelearr[i].className=".tp-video";
                _this.ele.tplayer.style.webkitTransformOrigin='center'
            }
            this.ratio=1
            this.innerText=`视频比例 默认`
            _this.ele.tplayer.style.transform=`none`
            _this.ele.tplayer.style.webkitTransform=`none`
        }
        

    })

    this.ele.danmaku_warp.onmousedown=function(event){
         let ev = event || window.event || arguments.callee.caller.arguments[0];
            if (ev.button == 0) {
            	if(_this.istouch!=1){
	                //如果左按键
	                if (_this.ele.tp_rightmenu.style.display == "block") {
	                    _this.ele.tp_rightmenu.style.display = "none";
	                } else {
	                    //视频暂停
	                    if (_this.Element.paused) {
	                       _this.play();
	                    } else {
	                         _this.pause()
	                    }
	                }
	                _this.showbar();
	            } 
            }
    }
   
   
    this.ele.danmaku_warp.oncontextmenu = function(event){
    	console.log('右键菜单')
        let ev = event || window.event || arguments.callee.caller.arguments[0];
        _this.tp_menu(ev)
        return false
    }
    

    this.ele.tp_place.addEventListener("click", function() {
        if (_this.dmplace == 1) {
            _this.dmplace = 2;
            this.innerText = "▲顶部弹幕";
        } else {
            _this.dmplace = 1;
            this.innerText = "◀滚动弹幕";
        }
    });
 


	
    this.dmspeend(this.width / 100);
	//页面滚动显示
	//this.options.srollfixe=screen.height
	if(this.options.srollfixe&&this.options.srollfixe>0){
		document.addEventListener('scroll',()=> {
			if((document.documentElement.scrollTop||document.body.scrollTop) >= this.options.srollfixe) {
				this.ele.tp_video_warp.className='tp-video-warp tp-video-warp-fixed'
			}else{
				this.ele.tp_video_warp.className='tp-video-warp'
			}
		})
	}
  }
  //函數
  $c(e){
  	return this.warp.querySelectorAll(e);
  }
  getthis(){
  	return this
  }
  //播放
  play(){
		addClass(this.ele.tp_oneplay,'tp-zoomoutdown');
        if (this.dsq == 0) {
            this.Interval = setInterval(function(){
            	this.danmakutime();
            }.bind(this), 100);
            this.dsq = 1;
        }
        if(this.istouch!=1){
         this.ele.video_con.style.opacity = "0";
        }
        let e = this.ele.danmaku_warp.getElementsByTagName("div");
        this.ele.video_control_play.style.display = "none";
        this.ele.video_control_paused.style.display = "inline-block";
        this.Element.play();
        for (let i = e.length - 1; i >= 0; i--) {
         removeClass(e[i], "tp-suspend");
		}
	}
	//暂停
	pause(){
		 clearInterval(this.Interval);
	     this.dsq = 0;
	     let e = this.ele.danmaku_warp.getElementsByTagName("div");
	     this.ele.video_control_paused.style.display = "none"
	     this.ele.video_control_play.style.display = "inline-block"
	     this.Element.pause();
	     for (let i = e.length - 1; i >= 0; i--) {
	        addClass(e[i], "tp-suspend")
	     }
	     this.ele.tp_spinner.style.display = "none";
	}
addacfundanmu(vid){
		let _this = this;
		fetch("http://danmu.aixifan.com/size/" + vid).then(response => response.json()).then(function(json) {
			let max=Math.ceil(json[2]/2000);
			let nowid=0;
			let nowp=0;
			for (let i = 1; i <= max; i++) {
				fetch("http://danmu.aixifan.com/V3/" + vid+'/'+i+'/2000').then(response => response.json()).then(function(json) {
					for (let x = 0; x < json.length; x++) {
						for (let y = 0; y < json[x].length; y++) {
							if(json[x][y]){
								let o=new Object
								o.text=json[x][y].m
								let c=json[x][y].c.split(',')
								o.time=parseInt(c[0]*10)
								o.color='#'+(Array(6).join(0) + parseInt(c[1]).toString(16)).slice(-6)
								o.place=c[2]
								o.size=c[3]
								o.user=c[4]
								if (o.place!=1&&o.place!=7) {o.place=2}
								o.id=nowid
								nowid++
								_this.data.push(o)
								_this.nowdata = _this.data.slice(0);
							}
						}
					}
					nowp++
					console.log('弹幕'+i+'段解析成功')
					if(nowp==max){
						console.log('弹幕添加完成')
						_this.setint();
					}
				})
			}
		})
}
addonedanmaku(url) {
	let _this = this;
  	fetch(url).then(response => response.json()).then(function(json) {
  		let nowid=0;
  		for(let x = 0; x < json.length; x++) {
  			for(let y = 0; y < json[x].length; y++) {
  				if(json[x][y]) {
  					let o = new Object
  					o.text = json[x][y].m
  					let c = json[x][y].c.split(',')
  					o.time = parseInt(c[0] * 10)
  					o.color = '#' + (Array(6).join(0) + parseInt(c[1]).toString(16)).slice(-6)
  					o.place = c[2]
  					o.size = c[3]
  					o.user = c[4]
  					if(o.place != 1 && o.place != 7) {
  						o.place = 2
  					}
  					o.id = nowid
  					nowid++
  					_this.data.push(o)
  					_this.nowdata = _this.data.slice(0);
  				}
  			}
  		}
  		console.log('弹幕添加完成')
  		_this.setint();
  	})
  }
  	adddanmaku(url) {
  		let _this=this;
        let xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let t = JSON.parse(xmlhttp.responseText);
                if (t.success == 1) {
                    if (t.data) {
                        for (let i = 0; i < t.data.length; i++) {
                            _this.data.push(t.data[i]);
                        }
                    }
                    if (t.danmu) {
                        for (let i = 0; i < t.danmu.length; i++) {
                            t.danmu[i].text = unescape(t.danmu[i].text);
                            _this.data.push(t.danmu[i]);
                        }
                    }
                }
                _this.nowdata = _this.data.slice(0);
                _this.setint();
            }
        };
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
    };

      //弹幕速度
     dmspeend(v) {
     	this.width = this.ele.tplayer_main.offsetWidth
        this.height =this.ele.tplayer_main.offsetHeight
    	console.log('弹幕速度调整为'+v);
        this.config.v=v;
        this.changerconfig();
    }
    joinfull(){
    	let isfull = document.fullscreenElement || document.mozFullScreenElement ||document.webkitFullscreenElement
    	if(isfull) {
    		if(this.ele.tplayer_main==isfull){
				console.log('进入全屏', this.height)
				this.ele.tranger.last=false
				this.ele.video_ratio.ratio=4
		        this.ele.video_ratio.click()
		        this.width = this.ele.tplayer_main.offsetWidth
		        this.height =this.ele.tplayer_main.offsetHeight
		        let e = this.ele.danmaku_warp.getElementsByTagName("div")
				for (let i = 0; i < e.length; i++) {
	            	if (hasClass(e[i], "tp-left")) {
	                	e[i].style.transform = "translateX(-" + this.width/this.config.danmakusize + "px)";
	           		}
	        	}
				this.dmspeend(this.width / 100)
			
			}
		} else {
			console.log('退出全屏')
			this.ele.tranger.last=false
	    	this.width = this.ele.tplayer.offsetWidth
	    	this.dmspeend(this.width / 100)
	        let e = this.ele.danmaku_warp.getElementsByTagName("div")
	        for (let i = e.length - 1; i >= 0; i--) {
		        if (hasClass(e[i], "tp-left")) {
		            e[i].style.transform = "translateX(-" + this.width/this.config.danmakusize + "px)"
		        }
	        }
	        this.ele.video_ratio.ratio=4
	        this.ele.video_ratio.click()
		}
    	
    }
    changerconfig(){
    	//默认清晰度
    	this.config.definition=this.config.definition||1
        this.config.v=this.config.v||this.width / 100
        this.config.danmakusize=this.config.danmakusize||1
        this.config.danmakuo=this.config.danmakuo||1
        this.config.dmweight=this.config.dmweight||600
        this.config.sound=this.config.sound||80
        this.config.pbs=this.config.pbs||'笑容我来守护,隔壁难民'
        1!=this.config.qc&&(this.config.qc=!1);
        1!=this.config.pb&&(this.config.pb=!1);
        0!=this.config.dmshadow&&(this.config.dmshadow=3);
        let shadow='';
        if(this.config.dmshadow){
        	shadow=`text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;`
        }
        let t=this.options.Element
        this.ele.css.innerHTML = `${t} .tp-left {animation: dmleft  ${this.config.v}s linear;-webkit-animation: dmleft ${this.config.v}s linear;}${t} .danmaku-warp{font-weight:${this.config.dmweight};transform:scale(${this.config.danmakusize});-webkit-transform:scale(${this.config.danmakusize});-moz-transform:scale(${this.config.danmakusize});width:${100/this.config.danmakusize}%;height:${100/this.config.danmakusize}%;opacity:${this.config.danmakuo}}${t} .tp-video-main>.danmaku-warp>.danmaku{${shadow}}`;
        let earr= this.$c('.tp-left');
        for (let i = 0; i < earr.length; i++) {
            earr[i].style.transform = "translateX(-" + this.width/this.config.danmakusize + "px)";
        }
        localStorage.setItem('tdconfig', JSON.stringify(this.config))      
    }
    	//下一段提示
	nextvideo(callback){
		console.log('视频存在下一段')
		let e=document.createElement('div')
		e.className='tp-msg'
		
		let text=document.createElement('span')
		text.i=5;
		text.innerHTML=text.i+'秒后将播放下一段'
		
		let btn=document.createElement('span')
		btn.innerHTML='×'
		btn.className='tp-msg-close'
		btn.addEventListener('click',function(){
			btn.parentNode.parentNode.removeChild(btn.parentNode)
			if(time){clearInterval(time)}
		})
		e.appendChild(btn)
		e.appendChild(text)
		let _this=this;
		this.ele.tplayer_main.appendChild(e)
		let time=setInterval(function(){
			if(text.i>0){
				text.i--
				text.innerHTML=text.i+'秒后将播放下一段'
			}else{
				clearInterval(time)
				console.log('播放下一段')
				let t=_this.warp.childNodes
				for (let i = 0; i < t.length; i++) {
					_this.warp.removeChild(t[i])
				}
				if (typeof callback === "function"){
		            callback()
		        }else{
		        	console.log('eero')
		        	console.log(callback)
		        }
			}
		},1000)
	}
	getnowtime() {
        let videotime = 0;
        for (let i = 0; i <= this.nowduan - 1; i++) {
            videotime += this.videotimearr[i];
        }
        videotime += this.videoelearr[this.nowduan].currentTime;
        return videotime;
    }
	getallvideotime(ele, i) {
        let time = ele.duration
        if (!time) {
            setTimeout(function() {
                this.getallvideotime(ele, i)
            }.bind(this), 500)
        } else {
            this.videotimearr[i] = time
            if (this.videotimearr[0] && this.videotimearr[this.videotimearr.length - 1]) {
                this.alltime = 0
                for (let i = 0; i < this.videotimearr.length; i++) {
                    this.alltime += this.videotimearr[i]
                }
                this.ele.alltime.innerHTML = this.getvideotime(this.alltime).m + ":" + this.getvideotime(this.alltime).s
                this.ele.alltime_phone.innerHTML ='&nbsp;/&nbsp;'+this.ele.alltime.innerHTML
            }
        }
    }

	
	Definition(i){
    	if(i==1){
    		return '超清'
    	}else if(i==2){
    		return '高清'
    	}else if(i==3){
    		return '普通'
    	}else if(i==4){
    		return '流畅'
    	}
    }
	getvideotime(time) {
        let tm;
        let m = parseInt(time / 60);
        if (parseInt(time % 60) >= 10) {
            tm = parseInt(time % 60);
        } else {
            tm = "0" + parseInt(time % 60);
        }
        return {
            m:m,
            s:tm
        };
    }
	//屏蔽关键词弹幕
    shielddanmaku(){
       let shieldarr=this.ele.setr7.value.split(",");
       let cache;
       let b=0;
       if (this.ele.setr5.checked) {
            if (!this.removaldata) {
               this.removaldanmaku()
            }
            let t=this.removaldata.slice(0)
            cache=t  
       }else{
            let t=this.data.slice(0)
            cache=t;
       }
       
       for (let i = cache.length - 1; i >= 0; i--) {
        if (cache[i]) {
           if (cache[i].text) {
               for (let x = shieldarr.length - 1; x >= 0; x--) {
                if (cache[i]) {
                    if (cache[i].text.indexOf(shieldarr[x])>-1) {
                        delete cache[i]
                        b++
                    }
                 }  
               }
           }
        }  
       }
       this.nowdata=cache
       let elearr=this.$c('.danmaku-warp>.danmaku')
       for (let x = 0; x < elearr.length; x++) {
           for (let y = 0; y < shieldarr.length; y++) {
               if (elearr[x].innerText.indexOf(shieldarr[y])>-1) {
                    elearr[x].innerText=null;
               }
           }
       }
       console.log(shieldarr)
       console.log(`弹幕屏蔽  屏蔽${b}个弹幕`)
    }
	
	danmakuhide(e, topid) {
		if(e&&e.parentNode){
			e.parentNode.removeChild(e)
		}
		if(topid !== undefined) {
			this.toparr[topid] = 0
		}
	}
	
    getlefttop(v,dmwidth) {
        let h
        let t=this.getnowtime()
        let allt=this.width/100
        for (let i = 0; i <= this.leftarr.t.length; i++) {
        	//leaving是否离开左侧屏幕 完全显示出来
            if (!this.leftarr.leaving[i]) {
                 if (this.leftarr.v[i]>=v) {
                       h = i;
                       break;
                    }else {
                       if (!this.leftarr.t[i]) {break}
                       //追上的时间和距离
                       let tt=this.width/100-t+this.leftarr.t[i];
                       let sz= tt*(v-this.leftarr.v[i]);
                       //间隔距离 这里-20是为了防止跟太紧
                       let so=(t-this.leftarr.t[i])*this.leftarr.v[i]-this.leftarr.width[i]-20;
                       //console.log(`${i}弹幕会在上一弹幕尾部飞行${tt}秒 速度差${v-this.leftarr.v[i]} 会追上路程 ${sz}  判断时距离 ${so}`)
                       if (sz<so) {
                            h = i;
                            break;
                       }
                    }
            }
        }
        if (typeof(h)=='undefined') {
            h=this.leftarr.t.length;
            //console.log('开辟新通道');
        }
        this.leftarr.t[h]=t;
        this.leftarr.v[h]=v;
        this.leftarr.leaving[h]=true;
        this.leftarr.width[h]=dmwidth;
        return h;
    };
    getcansendtop() {
        let h;
        for (let i = 0; i <= this.toparr.length; i++) {
            if (!this.toparr[i]) {
                //console.log('第'+i+'可以发射弹幕');
                h = i;
                break;
            }
        }
        return h;
    };
	
	dmend(a) {
        a.parentNode.removeChild(a)
    }
	
	setint(){
	    if (this.config.qc) {
	        this.ele.setr5.click()
	    } 
	    if (this.config.pb) {
	        this.ele.setr6.click()
	    }
	    if (this.config.danmakuo) {
	        this.ele.setr1.value=this.config.danmakuo*100;
	    }
	    if (this.config.danmakusize) {
	        this.ele.setr2.value=this.config.danmakusize*50;
	    }
	    if (this.config.dmweight!=400) {
	        this.ele.setr3.checked=true
	    }
	    if (this.config.dmshadow==0) {
	        this.ele.setr4.checked=true
	    }
	    if(this.config.definition){
	    	this.ele.setr8.selectedIndex=this.config.definition-1;
	    }
    }
//合并重复弹幕
   removaldanmaku(){
   		//console.log("弹幕去重开始")
        if (this.nowdata) {
            let cache=this.data.slice(0);
            let b=0;
            if(cache){
            	 for (let i = cache.length - 1; i >= 0; i--) {
	                for (let a = cache.length - 1; a >= 0; a--) {
	                    if (a==i) {break}
	                    if (cache[i]&&cache[a]) {
	                        if (cache[i].text==cache[a].text) {
	                            delete cache[a];
	                            b++
	                        }
	                    }
	                }
            	}
            }
            this.removaldata=cache
            this.nowdata=this.removaldata
            console.log(`弹幕去重  去除${b}个重复弹幕`)
        }   
    }
	changerset(){
        let e=this.ele;
        this.config.danmakuo=parseInt(e.setr1.value)/100;
        this.config.danmakusize=parseInt(e.setr2.value)/50;
        this.changerconfig();
    }
	showbar() {
    		if(this.bar){
	    		clearTimeout(this.bar)
	    	}
    		if(this.ele.video_con.style.opacity!='1'){
    			this.ele.video_con.style.opacity = "1";
					
    		}
	        let _this=this;
	    	this.bar=setTimeout(function(){
	    		_this.ele.video_con.style.opacity = "0";
	    	},3000);	
    }

	 //定时器
    danmakutime() {
    	let videotime = this.getnowtime();
        if (this.nowdata) {
            let inttime = parseInt(videotime * 10);
            for (let i = 0; i < this.nowdata.length; i++) {
                if (this.nowdata[i]) {
                    //console.log('nowtime:'+inttime);
                    if (this.nowdata[i].time == inttime) {
                        this.send(unescape(this.nowdata[i].text), this.nowdata[i].color, this.nowdata[i].place,false,this.nowdata[i].user,this.nowdata[i].size);
                        delete this.nowdata[i];
                    }
                }
            }
            //弹幕定时器
            for (var i = 0; i < this.nowdm.length; i++) {
            	 if (this.nowdm[i]&&this.nowdm[i].time&&this.nowdm[i].time <= inttime) {
            	 	this.nowdm[i].call()
            	 	delete this.nowdm[i];
            	 }
            }
        }
    }
    //返回当前播放段
   getduan(time) {
        let mun = 0;
        for (let i = 0; i < this.videotimearr.length; i++) {
            mun += this.videotimearr[i];
            if (mun >= time) {
                return i;
                break;
            }
        }
    }
    tdplay() {
        if (this.ele.tp_spinner.style.display = "block") {
            if (this.dsq == 0) {
                this.Interval = setInterval(function(){this.danmakutime()}.bind(this), 100);
                this.dsq = 1;
            }
            let e = this.ele.danmaku_warp.getElementsByTagName("div");
            this.ele.tp_spinner.style.display = "none";
            this.ele.alltime.innerHTML = this.getvideotime(this.alltime).m + ":" +this.getvideotime(this.alltime).s;
            for (let i = e.length - 1; i >= 0; i--) {
                removeClass(e[i], "tp-suspend");
            }
        }
    }
       //获取元素的纵坐标（相对于窗口）
    getTop(e) {
        let offset = e.offsetTop;
        if (e.offsetParent != null) offset += this.getTop(e.offsetParent);
        return offset;
    }
    //获取元素的横坐标（相对于窗口）
    getLeft(e) {
        let offset = e.offsetLeft;
        if (e.offsetParent != null) offset += this.getLeft(e.offsetParent);
        return offset;
    }
    show_coords(event, elem) {
        let x = event.clientX - this.getLeft(elem);
	    let y = event.clientY - this.getTop(elem);
	    let xbl = x / elem.offsetWidth;
	    let ybl =1- y / elem.offsetHeight;
	    return {
	        x:x,
	        y:y,
	        w:elem.offsetWidth,
	        h:elem.offsetHeight,
	        xbl:xbl,
	        ybl:ybl
	    };
    }
    //视频缓冲事件
    videohc() {
        console.log("loding");
        clearInterval(this.Interval);
        this.dsq = 0;
        this.ele.tp_spinner.style.display = "block";
        let e = this.ele.danmaku_warp.getElementsByTagName("div");
        for (let i = e.length - 1; i >= 0; i--) {
            addClass(e[i], "tp-suspend");
        }
    }
    alert(o) {
		let ele=this.ele.alert
		clearTimeout(ele.t)
		ele.style.display='block'
		o.w = o.w || 'auto'
		o.h = o.h || 'auto'
		o.time=o.time||1000
		o.padding=o.padding||"20px"
		o.opacity=o.opacity||1
		if(o.btn){
			this.ele.alert_ok.style.display='block'
		}else{
			this.ele.alert_ok.style.display='none'
			ele.t=setTimeout(function(){
				ele.style.display='none'
			},o.time)
		}
		if(typeof o.t == 'object') {
			this.ele.alert_container.innerHTML = null
			this.ele.alert_container.appendChild(o.t)
		} else {
			this.ele.alert_container.innerHTML = o.t
		}
		this.ele.alert_container.style.padding=o.padding
		ele.style.opacity=o.opacity
		this.ele.alert.style.display = 'block'

	}
    screenshot() {
		let c = document.createElement('canvas');
		c.width = this.ele.tplayer.offsetWidth
		c.height = this.ele.tplayer.offsetHeight
		c.getContext('2d').drawImage(this.videoelearr[this.nowduan], 0, 0, c.width, c.height);
		c.className = 'tp-screenshot-canvas'
		let warp = document.createElement("div");
		warp.innerHTML = '<p>请右键保存截图</p>'
		warp.appendChild(c)
		this.alert({t:warp,btn:true})
	}
    changersound() {
		let s = parseInt(this.ele.tp_s.style.width) * .01;
		for(let i = 0; i < this.videoelearr.length; i++) {
			this.videoelearr[i].volume = s;
		}
		this.config.sound =parseInt(s * 100);
		this.alert({t:'<div class="sound-ico"></div><span style="line-height:26px;font-size: 21px;">'+this.config.sound+"%</span>",time:1000,padding:'6px 10px',opacity:"0.9"})
		localStorage.setItem('tdconfig', JSON.stringify(this.config))
	}
   //菜单
    tp_menu(ev) {
    	let _this=this;
        let container = this.ele.tplayer;
        let rightmenu = this.ele.tp_rightmenu;
        if (this.istouch!=1){
                let target = ev.target || ev.srcElement;
                if (hasClass(target, "danmaku")) {
                    this.ele.copytext.innerHTML = target.innerHTML;
                    this.ele.copy.style.display = "block";
                    this.ele.copy.onclick = function() {
                        _this.ele.copytext.select();
                        document.execCommand("Copy");
                        rightmenu.style.display = "none";
                    };
                } else {
                    this.ele.copy.style.display = "none";
                }
                rightmenu.style.display = "block";
                let leftedge, topedge, danmakuheight = this.ele.danmaku_warp.offsetHeight, danmakuwidth = this.ele.danmaku_warp.offsetWidth;
                if (danmakuheight == document.documentElement.clientHeight) {
                    topedge = ev.clientY;
                    leftedge = ev.clientX;
                    if (leftedge + rightmenu.offsetWidth > danmakuwidth) {
                        leftedge = danmakuwidth - rightmenu.offsetWidth;
                    }
                    if (topedge + rightmenu.offsetWidth > danmakuheight) {
                        topedge = danmakuheight - rightmenu.offsetHeight;
                    }
                } else {
                    topedge = ev.clientY + document.documentElement.scrollTop - this.getTop(this.ele.tplayer);
                    leftedge = ev.clientX - this.getLeft(this.ele.tplayer);
                    let tweidth = container.offsetWidth;
                    let theigtht = container.offsetHeight;
                    if (leftedge + rightmenu.offsetWidth > tweidth) {
                        leftedge = tweidth - rightmenu.offsetWidth;
                    }
                    if (topedge + rightmenu.offsetHeight > theigtht) {
                      topedge = theigtht - rightmenu.offsetHeight;
                    }
                }
                rightmenu.style.top = topedge + "px";
                rightmenu.style.left = leftedge + "px";
            
        } 
    }
    changermode(a) {
    	//this.ele.tp_video_warp.style.height = this.ele.tp_video_warp.offsetWidth * 0.6 + 'px';
    }
    tiao(time) {
        let oldduan = this.getduan(time) - 1, oldtime = 0;
        for (let i = 0; i <= oldduan; i++) {
            oldtime += this.videotimearr[i];
        }
        let duantime = time - oldtime;
        this.nowduan = this.getduan(time);
        //video id
        for (let i = 0; i < this.videoelearr.length; i++) {
            if (i != this.nowduan) {
                let ele = this.videoelearr[i];
                ele.style.display = "none";
                ele.currentTime = 0;
                ele.pause();
            } else {
                let ele = this.videoelearr[i];
                this.Element = ele;
                if (ele.style.display!= "block") {
                    ele.style.display = "block"
                }
                ele.currentTime = duantime;
                if(ele.paused){
                    ele.play() 
                }
                this.ele.tp_spinner.style.display = "none";
            }
        }
       if(this.removaldata&&this.config.qc){
          this.nowdata=this.removaldata
          if (this.config.pb) {
            this.shielddanmaku()
          }
        }else{
           this.nowdata=this.data.slice(0);
        }
        if (this.ele.video_control_play.display != "none") {
            this.play();
        }
        //清空top和高级弹幕
//      let a=this.ele.danmaku_warp.querySelectorAll('.danmaku-ad')
//      for (let i = 0; i < a.length; i++) {
//      	a[i].parentNode.removeChild(a[i])
//      }
//      let b=this.ele.danmaku_warp.querySelectorAll('.tp-top')
//		for (let i = 0; i < b.length; i++) {
//      	b[i].parentNode.removeChild(b[i])
//      }
		for (let i = 0; i < this.nowdm.length; i++) {
			if(this.nowdm[i]&&this.nowdm[i].call){
				this.nowdm[i].call()
			}
		}
    }
    
	
}

window.Tplayer=Tplayer;

