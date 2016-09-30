/**
 * Created by leo on 27/9/16.
 */

window.onload = function () {
    search();

    banner();

    downTime();
};

function search() {

    var searchDom = document.getElementsByClassName('jd_header_box')[0];

    var bannerDom = document.getElementsByClassName('jd_banner')[0];

    var height = bannerDom.offsetHeight;

    window.onscroll = function () {
        var top = document.body.scrollTop;

        var opacity = 0;

        if (top < height) {
            opacity = top/height * 0.85;
        } else {
            opacity = 0.85;
        }

        searchDom.style.background = "rgba(201,21,35," + opacity+")";
    };
}

function banner() {
    /*
//    1.自动滚动起来
//    2.小圆点也要跟着起来
//    3.滚动的时候需要动画
//    4.图片盒子需要滑动
//    5.当滑动的距离不超过0.3，让它吸附回去
//    6.当超过0.33时候，根据滑动的方向来跳转到另外一张

*/
//    首先要获取banner
    var banner = document.getElementsByClassName('jd_banner')[0];

//    获取图片盒子
    var imageBox = banner.getElementsByTagName('ul')[0];

    //获取小圆点
    var pointBox = banner.getElementsByTagName('ul')[1];

//    获取所有的点
    var points = pointBox.getElementsByTagName('li');

//    获取宽度
    var width = banner.offsetWidth;

    //加过渡
    var addTransition = function () {
        imageBox.style.webkitTransition = 'all 0.2s'; // 做兼容
        imageBox.style.transition = 'all 0.2s';
    };
    //删除过渡
    var removeTransition = function () {
        imageBox.style.webkitTransition = 'none'; // 做兼容
        imageBox.style.transition = 'none';
    };

    //定位

    //当前的定位
    var setTranslateX = function (x) {
        imageBox.style.webkitTransform = 'translateX(' + x+ 'px)';
        imageBox.style.transform = 'translateX(' +x + 'px)';
    };

    //设置当前点的样式
    var setPoint = function (index) {
        for (var i = 0; i < points.length; i++) {
            points[i].className = " ";
        }
        //找到当前图片对应的点
        points[index-1].className = "now";

    };

    var index = 1;  /*默认的索引位置*/

    var timer = setInterval(function () {
        index++;
        //加过渡

        // imageBox.style.webkitTransition = 'all 0.2s'; // 做兼容
        // imagebox.style.transition = 'all 0.2s';

        addTransition();


        // imagebox.style.webkitTransform = 'translateX(-' + index*width+ 'px)';
        // imagebox.style.transform = 'translateX(-' +index*width + 'px)';

        setTranslateX(-index*width);

    }, 2000);

//    transitionEnd 过度结束触发的事件, animationEnd 动画结束出发的事件

//    过度结束的时候判断当前图片的索引位置， 来无缝的衔接

/*    imagebox.addEventListener('webkitTransitionEnd', function () {
        // console.log('transitionEnd');

        //运行到这个位置是 0-9
        if (index >= 9) {
            //当地九张动画结束的时候，让它瞬间定位到第一张
            index = 1;

            //瞬间定位，需要删除过渡
            removeTransition();
            setTranslateX(-index*width)
        } else if (index <= 0) {
            index = 8;

            removeTransition();
            setTranslateX(-index*index);
        }

    //    运行到这个位置， index 1-8
    //    设置点
        setPoint(index);
    });
*/
    itcast.transitionEnd(imageBox, function () {
        // console.log('transitionEnd');

        //运行到这个位置是 0-9
        if (index >= 9) {
            //当地九张动画结束的时候，让它瞬间定位到第一张
            index = 1;

            //瞬间定位，需要删除过渡
            removeTransition();
            setTranslateX(-index*width)
        } else if (index <= 0) {
            index = 8;

            removeTransition();
            setTranslateX(-index*width);
        }

        //    运行到这个位置， index 1-8
        //    设置点
        setPoint(index);
    });


//    记录触摸开始时候x的坐标
    var startX = 0;

//    记录滑动时候，x 轴的坐标
    var moveX = 0;

//    记录滑动的距离
    var distanceX = 0;

//    记录过有没有滑动过
    var isMove = false;

//    绑定事件
    imageBox.addEventListener('touchstart', function (e) {
    //    记录x的位置
        startX = e.touches[0].clientX;
        // console.log(startX);

        //清除定时器
        clearInterval(timer);
    });

    imageBox.addEventListener('touchmove', function (e) {
        moveX = e.touches[0].clientX;
        // console.log(moveX);
        distanceX = moveX - startX;
        console.log(distanceX);

    //    清除过度
        removeTransition();

    //    改变位置
        setTranslateX(-index*width + distanceX);

    //    设置已经滑动过
        isMove = true;
    });


    //在最终完成touchend事件触发来操作，因为在模拟器中会有bug
    window.addEventListener('touchend', function (e) {


    //    如果滑动的距离超过0.3， 将跳到下一张
        if (Math.abs(distanceX) > (width/3) && isMove) {

        //    上一张
            if (distanceX > 0) {
                index--;
            } else {
                //下一张
                index++;
            }
            addTransition();
            setTranslateX(-index*width);
        } else {

            //不超过三分之一，吸附回去
            addTransition();
            setTranslateX(-index*width);
        }

    //    重置记录的参数值
        startX = 0;
        moveX = 0;
        isMove = false;
        distanceX = 0;

    //    加上定时任务
        clearInterval(timer);

        timer = setInterval(function () {
            index++;
            //加过渡
            addTransition();

            setTranslateX(-index*width);

        }, 2000);

    });

//    zepto js 类似于jquery的框架


}

//倒计时
var downTime = function () {

    var time = 5 * 60 * 60;

//    时间盒子
    var timeBox = document.getElementsByClassName('sk_time')[0];

//    所有的span
    var spans = timeBox.getElementsByTagName('span');

    var timer = setInterval(function () {

        if (time <= 0) {
            clearInterval(timer);
            return false;
        }

        time--;
        var h = Math.floor(time / 3600); // 小时

        var m = Math.floor(time % 3600 / 60);// 分钟

        var s = time % 60;  // 秒
        // console.log(h+ ":" + m + ":" + s);

    //    放置到dom中
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h % 10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m % 10;

        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

    }, 1000);
};







































