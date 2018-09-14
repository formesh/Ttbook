(function(root, factory, plug) {

	root[plug] = factory(root.jQuery, plug);

})(window, function($, plug) {
	var __def__ = {
		data: 0,
		appendDiv:"#myvideo",
	}
	var __prop__ = {
		_init: function() {
			var $video=$('<video id="video" src="http://img1.zazhipu.com/20180710huanqiushaoniandiliyouerban.mp4"></video>'+
			'<div class="mew"><div class="anniu"></div></div>'+
			'<div class="mydiveo_btn">'+
				'<div class="TheBar">'+
					'<div class="TheColorBar"></div>'+
					'<span class="hovertime">00:00</span>'+
				'</div>'+
				'<div class="videobtn"></div>'+
				'<div class="myvideo_time">'+
					'<label class="starttime">00:00</label>'+
					'<label class="endtime">00:00</label>'+
				'</div>'+
				'<div class="voice">'+
					'<div class="Voicebg"><div class="voiceBar"></div><div class="voiceColorBall"></div><div class="voiceColorBar"></div></div>'+
				'</div>'+
				'<div class="qpbtn"></div>'+
			'</div>');
			this.append($video);
			//hover事件
			let qp=false;
			$("#myvideo").hover(function(){
				if(!qp)
				{
					$(".mydiveo_btn").animate({bottom:"0px"},200);
				}
			},function(){
				if(!qp)
				{
					$(".mydiveo_btn").animate({bottom:"-50px"},200);
				}
			})
			//时间格式转换
			function timezh(number) {
				var minute = parseInt(number / 60);
				var second = parseInt(number % 60);
				minute = minute >= 10 ? minute : "0" + minute;
				second = second >= 10 ? second : "0" + second;
				return minute + ":" + second;
			}
			//获取video
			var video=$("#video")[0];
			let begin=false;
			let clicktime=0;
			//播放暂停
			$(".videobtn").click(function(){
				if(!begin)
				{
					video.play();
					video.currentTime=clicktime;
					$(".videobtn").css({
						"background":"url(img/stop.png)",
						"background-size":"100% 100%"
					});
					setInterval(function(){
						let nowtime=video.currentTime;
						let alltime=video.duration;
						let jindu=nowtime/alltime;
						let TheBarWidth=$(".TheBar").width();
						let nowjindu=TheBarWidth*jindu;
						$(".TheColorBar").css("width",nowjindu);
						$(".TimeBall").css("left",nowjindu);
						$(".starttime").text(timezh(nowtime));
						$(".endtime").text(timezh(alltime));
						if(alltime==nowtime)
						{
							
						}
					})
					begin=true;
					$(".anniu").hide();
				}else{
					video.pause();
					begin=false;
					$(".videobtn").css({
						"background":"url(img/begin.png)",
						"background-size":"100% 100%"
					});
					$(".anniu").show();
				}
			})
			//进度条设置
			let mouse=false;
			let run=0;
			let time=0;
			$(document).on("mousedown", '.TheBar', function(e) {
				e.preventDefault();
				mouse=true;
				run=e.clientX;
			})
			$(document).mousemove(function(e){
				e.preventDefault();
				if(mouse)
				{
					let nowrun=e.clientX-run;
					let TheBarWidth=$(".TheBar").width();
					time=parseFloat(nowrun/TheBarWidth*video.duration);
					
					let nowtime=parseFloat(video.currentTime);
					
				}
			})
			$(document).mouseup(function(e){
				e.preventDefault();
				time=0;
				mouse=false;
				run=0;
			})
			$(".TheBar").click(function(e){
				let left=$('.TheBar').offset().left;
				let clickrun=e.clientX-left;
				let TheBarWidth=$(".TheBar").width();
				clicktime=parseFloat(clickrun/TheBarWidth*video.duration)
				video.currentTime=clicktime;
				$(".TheColorBar").css("width",clickrun);
				$(".TimeBall").css("left",clickrun);
			})
			//全屏
			$(".qpbtn").click(function(){
				
				//进入全屏
				if(!qp)
				{
					qp=true;
					var docElm = document.documentElement; 
					docElm.webkitRequestFullScreen();
					$("body").parent().css("overflow-y","hidden");
					$("#myvideo").css({
						width:"100%",
						height:"100%",
						
					})
				}else{
					qp=false;
					$("body").parent().css("overflow-y","auto");
					document.webkitCancelFullScreen();
					$("#myvideo").css({
						width:"990px",
						height:"auto",
						
					})
				}
			})
			//双击全屏
			$("#video").dblclick(function(){
				if(!qp)
				{
					qp=true;
					var docElm = document.documentElement; 
					docElm.webkitRequestFullScreen();
					$("body").parent().css("overflow-y","hidden");
					$("#myvideo").css({
						width:"100%",
						height:"100%",
						
					})
				}else{
					qp=false;
					$("body").parent().css("overflow-y","auto");
					document.webkitCancelFullScreen();
					$("#myvideo").css({
						width:"990px",
						height:"auto",
						
					})
				}
			})
			//单击暂停
//			$("#video").click(function(){
//				$(".videobtn").click();
//			})
			//按ESC键退出全屏还原样式
			document.addEventListener("webkitfullscreenchange", function(e) {
				if (!document.webkitIsFullScreen) {
					qp=false;
					$("body").parent().css("overflow-y","auto");
					document.webkitCancelFullScreen();
					$("#myvideo").css({
						width:"990px",
						height:"auto",
						
					})
				};
			});
			//hover 显示时间
			let hover=false;
			$(".TheBar").hover(function(e){
				hover=true;
			},function(){
				hover=false;
				$(".hovertime").hide();
			})
			$(document).on("mousemove", '.TheBar', function(e) {
				if(hover)
				{
					let left=$('.TheBar').offset().left;
					let clickrun=e.clientX-left-25;
					let TheBarWidth=$(".TheBar").width();
					let clicktime=parseFloat(clickrun/TheBarWidth*video.duration)
					$(".hovertime").text(timezh(clicktime));
					$(".hovertime").css({
						"left":clickrun,
						"display":"block"
					});
				}
			})
			//声音控制
			video.volume=0.5;
			$(".voiceBar").click(function(e){
				e.preventDefault();
				let top=$('.voiceBar').offset().top;
				let bottom=100-e.offsetY;
				let TheBarHeight=$(this).height();
				video.volume=bottom/TheBarHeight;
				console.log(video.volume)
				$(".voiceColorBar").css("height",bottom);
				$(".voiceColorBall").css("bottom",bottom);
			})
			$(".voice").click(function(){
				$(".Voicebg").show();
			})
			$(".Voicebg").hover(function(){
				
			},function(){
				$(this).hide();
			})
			$(".anniu").click(function(){
				$(".videobtn").click();
				$(this).hide();
			})
			
		}
	};
	$.fn[plug] = function(options) {
		$.extend(this, __def__, options, __prop__); //将后面三个对象的方法属性以及值合并后赋给this对象。
		this._init(); //this对象拥有了_init方法，进行执行
	}
	return function(options) {
		var dom = options.dom;
		$(dom)[plug].call($(dom), options);
	}
}, "ttbookVideo")