//(function(root, factory, plug) {
//
//	root[plug] = factory(root.jQuery, plug);
//
//})(window, function($, plug) {
//	var __def__ = {
//		data: 0
//	}
//	var __prop__ = {
//		_init: function() {
//			var $ul = $("<ul></ul>");
//			for(var i = 0; i < this.data.length; i++) {
//				$ul.append($("<li>" + this.data[i] + "</li>"));
//			}
//			this.append($ul);
//		}
//	};
//	$.fn[plug] = function(options) {
//		$.extend(this, __def__, options, __prop__); //将后面三个对象的方法属性以及值合并后赋给this对象。
//		this._init(); //this对象拥有了_init方法，进行执行
//	}
//	return function(options) {
//		var dom = options.dom;
//		$(dom)[plug].call($(dom), options);
//	}
//}, "addList")
(function(root, factory, plug) {

	root[plug] = factory(root.jQuery, plug);

})(window, function($, plug) {
	var __def__ = {
		music:0,
		progressWrapbg:"#EBE8E8",
		progressWrapspanbg:"rgb(114, 223, 255)",
		progressbg:"rgb(114, 223, 255)"
	}
	var __prop__ = {
		_init: function() {
			var $progress = $("<div id='progressWrap' style='background:"+this.progressWrapbg+"'><span id='span' style='background:"+this.progressWrapspanbg+"'></span></div><div id='progress' style='background:"+this.progressbg+"'></div><span class='dqtime'>00:00</span><span class='endtime'>00:00</span>");
			var $audio = $("<div class='music'><audio src="+this.music+"></audio></div>");
			var $audioControl = $("<div class='audioControl'><a id='playButton' class='play contral' href='javascript:void(0);'></a></div>");
			var audios = $(".music audio")[0];
			function timezh(number) {
				var minute = parseInt(number / 60);
				var second = parseInt(number % 60);
				minute = minute >= 10 ? minute : "0" + minute;
				second = second >= 10 ? second : "0" + second;
				return minute + ":" + second;
			}
			this.append($progress);
			this.append($audio);
			this.append($audioControl);
			var audios = $(".music audio")[0];
			function timezh(number) {
				var minute = parseInt(number / 60);
				var second = parseInt(number % 60);
				minute = minute >= 10 ? minute : "0" + minute;
				second = second >= 10 ? second : "0" + second;
				return minute + ":" + second;
			}
			var flag = true;
			$('#playButton').on('click' , function(){
			if(flag) {
					audios.play();
					$(this).css("background-position", "-4px -73px");
					setInterval(function() {
						var dqtime = audios.currentTime;
						var time = audios.duration;
						var jl = dqtime / time;
						var poressWidth = $("#progressWrap").width();
						var progresswidth = jl * poressWidth;
						$("#progress").css("width", progresswidth + "px");
						$(".dqtime").text(timezh(dqtime));
						$(".endtime").text(timezh(time));
						$("#span").css("left", (progresswidth - 2) + "px");
					}, 500)
					flag = false;
				} else {
					audios.pause();
					$(this).css("background-position", "-4px -144px");
					flag = true;
	
				}
			})
			$('#progressWrap').on('click' , function(e){
				var myduratime = audios.duration;
				var poressWidth = $("#progressWrap").width();
				var s=e.offsetX/poressWidth;
				var time = s* myduratime
				audios.currentTime = time.toFixed(0);
				$("#span").css("left", (e.offsetX-2) + "px");
			})
			$('#progress').on('click' , function(e){
				var myduratime = audios.duration;
				var poressWidth = $("#progressWrap").width();
				var s=e.offsetX/poressWidth;
				var time = s* myduratime
				audios.currentTime = time.toFixed(0);
				$("#span").css("left", (e.offsetX-2) + "px");
			})
			var div1 = document.getElementById("progressWrap");
	        var div2 = document.getElementById("span");       
	        div2.addEventListener('touchmove', function(event) {
	            event.preventDefault();
	            var styles = window.getComputedStyle(div1,null);
	            var width=styles.width;
	            console.log(width);
	            if (event.targetTouches.length == 1) {
	                var touch = event.targetTouches[0];
	                moveleft = touch.pageX-15;
	                if(moveleft<=0){
	                    moveleft=0;
	                };
	                if(moveleft>=parseInt(width)-30){
	                    moveleft=parseInt(width)-30;
	                }
	                div2.style.left=moveleft+"px";
	                var poressWidth = $("#progressWrap").width();
	                var time = audios.duration;
	                var time=moveleft/poressWidth*time;
	                audios.currentTime=time;
	                $("#progress").css("width", (moveleft+2) + "px");
	            };
	        });
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
}, "addAudio")