var PhotoTiltSlide = function(opts) {

    'use strict';

    //可配置参数
    var targ = document.getElementById(opts.targ),
    	container = opts.container || document.body,		//滑动容器的区域
    	setGamma = opts.setGamma || 6,						//触发陀螺仪的偏转角度
    	setSpeed = opts.setSpeed || 2,						//动画速度
    	setPoi = opts.setPoi || 0.2,						//初始化时候所在位置，百分比

    	viewport,											//viewport数据
    	targData,											//整体容器width和height
    	firstPoi,											//初始化位置
    	playTo,												//更新动画位置
    	delta,												//边界
    	speed = 0,											//速度
    	isStopRender = false,								//是否停止渲染
    	firstRun = true;									//是否第一次执行动画

        window.requestAnimationFrame = window.requestAnimationFrame ||
        							   window.mozRequestAnimationFrame ||
        							   window.webkitRequestAnimationFrame ||
        							   window.msRequestAnimationFrame;


    //初始化启动
    var _init = function() {
        _initData();

        console.log(viewport);
        console.log(targData);
        console.log(playTo);
        console.log(delta);
        //绑定拖动事件
        _bindEvent();

    };

    //初始化启动数据
    var _initData = function() {
        
        getViewPort();														//获取viewport信息
        getWrapData();														//获取节点信息

        playTo = firstPoi = targData.width * setPoi * -1;					//初始化当前视口所在位置
        delta = targData.width * -1 + viewport.width;					//初始化边界
    	setTranslateX(targ, firstPoi);
    };



    var _bindEvent = function(){
    	if (window.DeviceOrientationEvent) {

            window.addEventListener('deviceorientation', function(eventData) {
            	var gamma = eventData.gamma;
            	// console.log(gamma);
            	if(gamma < setGamma * -1){


                    speed = setSpeed;
            	}else if(gamma > setGamma){
                    speed = setSpeed * -1;
                }else{
                    speed = 0;
                }
            }, false);
            if(firstRun){
                window.requestAnimationFrame(updatePosition);
            }

        }
    };

    var updatePosition = function(){
    	firstRun = false;
    	console.log(playTo);
        if(playTo > speed * -1){
            playTo = speed * -1;
        }else if(playTo < delta - speed){
            playTo = delta - speed;
        }else{
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