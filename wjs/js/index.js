
/*
	1. 我们目前的轮播图是加载两种图片的，加载两种图片会造成资源浪费
	2. 在移动端加载两种图片如果网络不好，加载非常慢并且消耗流量
	3. 在移动端我们需要做成图片 能适配不同的尺寸的移动设备

*/ 

$(function() {

	// 轮播图
	banner();

});

function banner() {
	// 1. 获取数据，判断屏幕的尺寸，来选择哪种数据来解析数据
	// 用 ajax, $(window).width()
	// 这里使用模拟接口的方式，来模拟调用接口

	var myData = '';
	var getData = function(callback) {

		if (myData) {
			callback && callback(myData);
			return false; // 不向下执行
		}

		$.ajax({
			url: 'js/index.json',
			type: 'get',
			data: {},
			dataType: 'json',
			success: function(data) {
				// console.log(data);
				// 需要在这里执行解析和渲染方法，
				myData = data;
				callback && callback(data);
			}
		});
	};
	

	
	// 封装一个方法
	var renderHtml = function() {

		// 屏幕的尺寸
	var width = $(window).width();

	// 当屏幕宽度不足 768px 的时候都认为是移动端。
	var isMobile = false;

	if (width < 768) {
		isMobile = true;
	}

	// 2. 解析数据 转化为html,  (1.js拼接字符串， 2. 使用模板引擎)


	getData(function(data) {
		// 请求完成之后处理数据
		// 通过模板引擎解析json拿到html

		// 获取模板对象
		var templatePoint = _.template($('#template_point').html());
		var templateImage = _.template($('#template_image').html());

		
		// console.log(templatePoint({model: data}));


		/*
			model{
				list: data
				isMobile: isMoblie
			}
			这里需要传递两个数据

		*/
		// console.log(templateImage({
		// 	model: {
		// 		list: data,
		// 		isMobile: isMobile
		// 	}
		// }));

		var htmlPoint = templatePoint({model:data});
		var htmlImage = templateImage({
			model: {
				list: data,
				isMobile: isMobile
			}
		});

		// 渲染
		$('.carousel-indicators').html(htmlPoint);
		$('.carousel-inner').html(htmlImage);



	});

	} 

	// 3. 渲染html ，找到父盒子，将HTML添加进去 html()
	// 4. 监听屏幕尺寸变化，动态渲染html, resize() 事件

	// 在 resize 操作图片的时候，bootstrap也在操作图片，会产生冲突，大家注意这不是问题。

	renderHtml();
	// resize 加载的时候没有默认执行
	$(window).on('resize', function () {
		// 每一次尺寸改变都需要判断尺寸和渲染
		renderHtml();
	}).trigger('resize'); // 当绑定上这个事件就触发一次，即时触发


	// 移动端滑动功能
	var startX = 0;
	var moveX = 0;
	var distanceX = 0;
	var isMove = false;
	$('wjs_banner').on('touchstart', function(e) {
		// 滑动的返回的事件，和原生的不一样
		startX = e.originalEvent.touches[0].clientX;
	});

	$('wjs_banner').on('touchmove', function(e) {
		moveX = e.originalEvent.touches[0].clientX;
		distanceX = moveX - startX;
		isMove = true;
	});

	$('wjs_banner').on('touchend', function(e) {
		//  判断手势
		if (Math.abs(distanceX)>50 && isMove) { // 当移动的距离大于50的时候认为滑动
			if(distanceX > 0) {
				// 向右滑动
				$('.carousel').carousel('pre');
			} else {
				// 向左滑动
				$('.carousel').carousel('next');
			}
		}
	});

	// 目的： 为了优化轮播图 -- 选择性的渲染图片，只渲染一种， 在移动端做适配，也就是图片响应式

}


































