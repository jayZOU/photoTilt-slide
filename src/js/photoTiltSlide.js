var PhotoTiltSlide = function(opts) {

    'use strict';

    //可配置参数
    var targ = document.getElementById(opts.targ),
    	container = opts.container || document.body,			//滑动容器的区域
    	// disX = opts.slide.disX || 2,							//触发滑动
    	deviceorientation = opts.deviceorientation || null,		//deviceorientation相关参数
    	slide = opts.slide || {isTouch: true, timeout: 0},

    	viewport,												//viewport数据
    	targData,												//整体容器width和height
    	firstPoi,												//初始化位置
    	playTo,													//更新动画位置
    	delta,													//边界
    	
    	//slide相关数据
    	x,														//初始X位置
    	_x,														//移动中_x位置
    	st,														//计时器
    	isStop = false,											//是否停止动画


    	//deviceorientation相关数据
    	speed = 0,												//速度
    	firstRun = true;										//是否第一次执行动画

        window.requestAnimationFrame = window.requestAnimationFrame ||
        							   window.mozRequestAnimationFrame ||
        							   window.webkitRequestAnimationFrame ||
        							   window.msRequestAnimationFrame;


    //初始化启动
    var _init = function() {
        _initData();
        // console.log(viewport);
        // console.log(targData);
        // console.log(playTo);
        // console.log(delta);

        //绑定拖动事件
        _bindEvent();

    };

    //初始化启动数据
    var _initData = function() {
        
        getViewPort();														//获取viewport信息
        getWrapData();														//获取节点信息

        if(deviceorientation){
        	deviceorientation.setGamma = opts.deviceorientation.setGamma || 6;
        	deviceorientation.setSpeed = opts.deviceorientation.setSpeed || 2;
        	deviceorientation.setPoi = opts.deviceorientation.setPoi || 0.2;
        	playTo = firstPoi = targData.width * deviceorientation.setPoi * -1;//初始化当前视口所在位置
        					
        }else{
        	playTo = firstPoi = 0;
        }

        

        delta = targData.width * -1 + viewport.width;					//初始化边界
    	setTranslateX(targ, firstPoi);
    };



    var _bindEvent = function(){
    	if (window.DeviceOrientationEvent && opts.deviceorientation) {

            window.addEventListener('deviceorientation', function(eventData) {
            	var gamma = eventData.gamma;
            	// console.log(gamma);
            	if(gamma < deviceorientation.setGamma * -1){


                    speed = deviceorientation.setSpeed;
            	}else if(gamma > deviceorientation.setGamma){
                    speed = deviceorientation.setSpeed * -1;
                }else{
                    speed = 0;
                }
            }, false);
            if(firstRun){
                window.requestAnimationFrame(updatePosition);
            }
        }

        if(opts.slide){
	        targ.addEventListener('touchstart', function(e) {
	            _touchstart(e);
	        });
	        targ.addEventListener('touchmove', function(e) {
	            _touchmove(e);
	        });
	        targ.addEventListener('touchend', function(e) {
	            _touchend(e);
	        });

        }
    };

    var _touchstart = function(e) {
        e.preventDefault();
        x = e.targetTouches[0].clientX;
        if(slide.timeout != 0) isStop = true;
        
        clearTimeout(st);
    };

    var _touchmove = function(e) {
        e.preventDefault();

        _x = e.targetTouches[0].clientX;

        var disX = _x - x;
        x = e.targetTouches[0].clientX;
        // console.log(playTo, "playTo");
        // console.log(disX, "disX");
        // console.log(firstPoi,"firstPoi");
        // console.log(playTo, "-playTo");

        playTo = playTo + disX + firstPoi;


        if(playTo > 0){
            playTo = 0;
        }else if(playTo < targData.width * -1 + viewport.width){

            playTo = targData.width * -1 + viewport.width;
        }


        if (playTo > targData.width * -1 + viewport.width) {
            // console.log((playTo + disX + firstPoi));
            // console.log(playTo,"playTo");
            // console.log(disX,"disX");
            // console.log(firstPoi,"firstPoi");

            firstPoi = 0;
            // console.log(targ.style.transform);
            setTranslateX(targ, playTo);
        } else if (playTo <= 0) {
            firstPoi = 0;

            setTranslateX(targ, playTo);
        }


    };

    var _touchend = function(e) {
        e.preventDefault();

        if(slide.timeout != 0){
        	st = setTimeout(function(){
	        	isStop = false;
	        },slide.timeout * 1000);
        }
        // slide.isTouch = false;

    };

    var updatePosition = function(){
    	firstRun = false;
    	console.log(playTo);
        if(playTo > speed * -1){
            playTo = speed * -1;
        }else if(playTo < delta - speed){
            playTo = delta - speed;
        }else if(slide.isTouch && !isStop){
            playTo = playTo + firstPoi + speed;
            firstPoi = 0;
            setTranslateX(targ, playTo);
        }
            // console.log(playTo);


                   
		window.requestAnimationFrame(updatePosition);
    }

    var setTranslateX = function(node, amount) {
		node.style.webkitTransform =
		node.style.transform = "translate3d(" + Math.round(amount) + "px, 0, 0)";
	};

    var cssXY = function(elem, type) {
    	if(type == 'x' || type == 'X'){
    		if (elem.style.width) return elem.style.width;
	        if (elem.currentStyle) return elem.currentStyle.width;
	        if (document.defaultView && document.defaultView.getComputedStyle)
	            return document.defaultView.getComputedStyle(elem, "").getPropertyValue("width");
    	}else if(type == 'y' || type == 'Y'){
    		if (elem.style.width) return elem.style.height;
	        if (elem.currentStyle) return elem.currentStyle.height;
	        if (document.defaultView && document.defaultView.getComputedStyle)
	            return document.defaultView.getComputedStyle(elem, "").getPropertyValue("height");
    	}else{
    		return false;
    	}
        
    };

    var getViewPort = function() {

        var containerStyle = window.getComputedStyle(container, null);

        viewport = {
            width: parseInt(containerStyle.width, 10),
            height: parseInt(containerStyle.height, 10)
        };

    };

    var getWrapData = function(){
    	targData = {
			width: cssXY(targ, 'x').replace("px", ""),
			height: cssXY(targ, 'y').replace("px", "")
		};

    };

    _init();
};

if (typeof module ==  'object') {
    module.exports = PhotoTiltSlide;
} else {
    window.photoTiltSlide = PhotoTiltSlide;
}