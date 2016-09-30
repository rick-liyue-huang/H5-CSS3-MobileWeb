/**
 * Created by leo on 27/9/16.
 */

//声明一个全局对象
// 在 window下声明一个 叫做 itcast的对象
window.itcast = {};

//在itcast下声明事件绑定函数
itcast.transitionEnd = function (dom, callback) {
    if (typeof dom == 'object') {
        dom.addEventListener('webkitTransitionEnd', function () {
            // if (callback) {
            //     callback();
            // }
            callback && callback();
        });
    }
};

itcast.tap = function (dom, callback) {

    //判断dom是不是对象，如果是才绑定对象
    if (typeof dom == 'object') {

        //判断是否滑动过
        var isMove = false;
        //记录刚刚触摸屏幕的时候的时间
        var time = 0;
        dom.addEventListener('touchstart', function (e) {

            // console.time('time');
            //触发屏幕的时间
            time = Date.now();

        });
        dom.addEventListener('touchmove', function (e) {
            //设置为true
            isMove = true;
        });
        window.addEventListener('touchend', function (e) {


            /*
            * tap事件要求：
            * 1.没有滑动过
            * 2.响应时间在150ms之内
            *
            * */
            console.timeEnd('time');
            if (!isMove && (Date.now() - time) < 150) {
                // console.log('tap');
                callback && callback(e);
            }

            isMove = false;
            time = 0;
        });

    }
};















