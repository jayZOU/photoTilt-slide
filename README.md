# PhotoTiltSlide

 - 图片和页面浏览方式
 - 可混合拖动

##Scan
[demo][1]

##Install

    git clone https://github.com/jayZOU/photoTilt-slide.git
    npm install
    npm run dev
    
访问[http://localhost:8080/][2]
##Examples

```js
    /**
		*	PhotoTiltSlide 方向传感器组件
		*	@author jayzou
		*	@time 2015-11-24
		*	@version 0.0.2
		*	@class PhotoTiltSlide
		*	@param String	targ		            必填	传入容器ID
		*	@param {Object}	deviceorientation		选填	方向传感器配置
		*	@param {Object}	slide		            选填	拖动配置
	**/

    var photoTiltSlide = new PhotoTiltSlide({
		targ: "content",					//必填，区域容器
		deviceorientation: {				//选填，
			setGamma: 6,					//选填，触发陀螺仪的偏转角度，默认6
			setSpeed: 2,					//选填，动画速度，单位px，默认2
			setPoi: 0.2,					//选填，初始化时候所在位置，百分比，默认0.2
			acceleration: true				//选填，是否开启加速度，默认false
		},
		slide: {							//选填
			isTouch: true,					//选填，touch事件发生时是否停止deviceorientation，默认true
			timeout: 2,						//选填，点击之后停留时间，默认0
		}
	});

```
##Notes

 - 容器只能传入ID值，不允许传入class


	
	


  [1]: http://htmlpreview.github.io/?https://github.com/jayZOU/photoTilt-slide/blob/master/src/index.html
  [2]: http://localhost:8080/