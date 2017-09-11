//得到carousel
		var carousel = document.getElementById("carousel");
		//得到li
		var lis = document.getElementById("imageslist").getElementsByTagName("li");
		//得到按钮
		var leftBtn = document.getElementById("leftBtn");
		var rightBtn = document.getElementById("rightBtn");
		//得到小圆点
		var circlesLi = document.getElementById("circles").getElementsByTagName("li");
		//图片数量
		var imgLength = lis.length;
		//图片宽度
		var width = 560;
		//滚动速度
		var animatetime = 300;
		//缓冲描述
		var tween = "Linear";
		//间隔时间
		var interval = 2000;
		 
		var idx = 0;


		//自动轮播
		var timer = setInterval(rightBtnHandler,interval);
		//鼠标进入停止
		carousel.onmouseover = function(){
			clearInterval(timer);
		}
		//鼠标离开开始
		carousel.onmouseout = function(){
			timer = setInterval(rightBtnHandler,interval);
		}
 		
 		//右按钮的监听
 		rightBtn.onclick = rightBtnHandler;

 		function rightBtnHandler(){
 			//函数截流
 			if(lis[idx].isanimated) return;

 			//原来的信号量的图片淡出
 			animate(lis[idx],{"opacity" : 0},1000);
 			//信号量改变
 			idx++;
 			if(idx > imgLength - 1){
 				idx = 0;
 			}
 			//新信号量的图片淡入
 			animate(lis[idx],{"opacity" : 1},1000);

 			changeCircle();
 		}

 		//左按钮的监听
 		leftBtn.onclick = function(){
 			//函数截流
 			if(lis[idx].isanimated) return;

 			//原来的信号量的图片淡出
 			animate(lis[idx],{"opacity" : 0},1000);
 			//信号量改变
 			idx--;
 			if(idx < 0){
 				idx = imgLength - 1;
 			}
 			//新信号量的图片淡入
 			animate(lis[idx],{"opacity" : 1},1000);

 			changeCircle();
 		}

 		//批量添加小圆点的监听
		for(var i = 0 ; i <= imgLength - 1 ; i++){
			circlesLi[i].index = i;	//先编号
			circlesLi[i].onmouseover = function(){
				//截流
				if(lis[idx].isanimated) return;
				
				//原来的信号量的图片淡出
 				animate(lis[idx],{"opacity" : 0},1000);
 				//信号量改变
 				idx = this.index;
 				//新信号量的图片淡入
 				animate(lis[idx],{"opacity" : 1},1000);

 				changeCircle();
			}
		}


 		//更换小圆点函数
		function changeCircle(){
			//去掉所有小圆点的cur
			for (var i = 0; i < circlesLi.length; i++) {
				circlesLi[i].className = "";
			}
			//第信号量这个小圆点加cur
			circlesLi[idx].className = "cur";
		}