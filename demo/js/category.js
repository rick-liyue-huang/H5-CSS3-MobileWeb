/**
 * Created by leo on 28/9/16.
 */


window.onload = function () {
//      左侧滑动

    leftSwipe();
    swipeRight();
};

//左侧滑动
function leftSwipe() {

    /*
    * 1.要求垂直方向滑动
    * 2.当滑动到一定的距离，划动不了
    * 3.当滑动的位置超过了一个最小和最大允许的定位范围的时候，吸附回去
    * 4.点击li的时候改变当前元素的样式
    * 5.并且需要滑动到屏幕的顶部位置
    * 6.当底部触底的时候，滑动不了。
    *
    * */


//    获取父盒子
    var parentDom = document.querySelector('.jd_category_left');
    //获取子盒子
    var childDom = parentDom.querySelector('ul');

//    获取父盒子的高度
    var parentH = parentDom.offsetHeight;
//    子盒子的高度
    var childH = childDom.offsetHeight;

//    获取定位的区间
    var maxPosition = 0;
    var minPosition = parentH - childH;
    console.log(maxPosition + '-' + minPosition);


//    吸附的距离
    var distance = 100;
//    滑动时候的定位区间
    var minSwipe = minPosition - distance;
    var maxSwipe = maxPosition + distance;

    //贯穿程序的当前定位
    var currentY = 0;

    var startY = 0;  /*开始的Y坐标*/
    var moverY = 0; // 滑动Y的坐标
    var distanceY = 0;  // 改变的距离

    var isMove = false; // 是否滑动过

    var addTransition = function () {
        childDom.style.webkitTransition = 'all 0.2s';
        childDom.style.transition = 'all 0.2s';
    };

    var removeTransition = function () {
        childDom.style.webkitTransition = 'none';
        childDom.style.transition = 'none';
    };

    var setTranslateY = function (y) {
        childDom.style.webkitTransform = 'translateY(' + y + 'px)';
        childDom.style.transform = 'translateY(' + y + 'px)';
    };

    childDom.addEventListener('touchstart', function (e) {
        startY = e.touches[0].clientY;
    });
    childDom.addEventListener('touchmove', function (e) {
        moverY = e.touches[0].clientY;
        distanceY = moverY - startY;

        removeTransition();


        //我们使用将要定位的位置来做判断
        //当现在要定位的位置在最大和最小滑动区间内才允许滑动
        if ((currentY + distanceY) > minSwipe && (currentY + distanceY) < maxSwipe) {
            setTranslateY(currentY + distanceY);
        }

    });

    window.addEventListener('touchend', function (e) {
    //    记录当前的定位
        currentY = currentY + distanceY;

        //最终定位
        //大于最大定位的时候
        if ((currentY + distanceY) > maxPosition) {
            currentY = maxPosition;
            addTransition();
            setTranslateY(currentY);
        } else if ((currentY + distanceY) < minPosition) {
        //    小于最小定位
            currentY = minPosition;
            addTransition();
            setTranslateY(currentY);
        } else {
            currentY = currentY + distanceY;
        }

    //    重置参数
        startY = 0;
        moverY = 0;
        distanceY = 0;
        isMove = false;


    });

    var lis = childDom.querySelectorAll('li');
    //    点击
    itcast.tap(childDom, function (e) {
        // console.log(e);
        //这个时候的事件源是a

        // console.log(e.target);

    //    当前的li
        var li  = e.target.parentNode; // 通过事件源的父元素
        // console.log(li);
        for (var i = 0; i < lis.length; i++) {
            lis[i].className = "";
            lis[i].index = i;
        }
        li.className = "now";
        //打印索引
        console.log(li.index);

    //    计算将要定位的位置
        var translateY = -li.index * 50;


        //当我们的定位在定位区间内 才允许滑动
        if (translateY > minPosition) {

            currentY = translateY;
            //    加过渡
            addTransition();
            //    改变位置
            setTranslateY(currentY);

        } else {

            //否则的话保持最小的定位
            currentY = minPosition;
            setTranslateY(currentY);
        }



    });


}


//右侧滑动

function swipeRight() {
    itcast.iScroll({
        swipeDom: document.querySelector('.jd_category_right'),
        swipteType: 'y',
        swipeDistance: 50
    });
}
































