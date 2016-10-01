/**
 * Created by leo on 30/9/16.
 */


/*
问题：
* 1.我们目前轮播图是加载两种图片的
* 2.加载两种图片会造成资源浪费
* 3.移动端加载两张图片，如果网络不好，加载非常慢，并且消耗流量
* 4.在移动端我们需要做成图片，能适配不同的尺寸移动设备
* */

$(function () {

    //轮播图
    banner();


});

function banner() {
    /*
     * 1.获取数据
     * 2.判断屏幕尺寸 来选择渲染成哪种数据 pc m  $(window).width();
     * 3. 解析数据 转化成html  (1.js拼接字符串 2.使用模板引擎)
     * 4.渲染html 找到父容器 把 html 添加进去 html()
     * 5.监听屏幕的尺寸变化 动态渲染html resize 事件
     * */

    /*
     * 目的：
     * 优化轮播图
     * 1.选择性的渲染图片 只渲染一种
     * 2.在移动端需要做适配
     * 图片响应式
     * */

    /*
     * 获取数据 ajax
     * */

    /*模拟接口的方式来 模拟调用接口*/

    var myData = "";

    var getData = function (callback) {

        //判断是否有数据存储
        if (myData) {
            callback && callback(myData);
            return false;  // 有数据就不向下执行
        }
        $.ajax({

            //路径错误， 因为当前这段js是在index.html中， 这个时候是从
            url: './js/index.json',
            type: 'get',
            data: {},
            dataType: 'json',
            success: function (data) {
                console.log(data);

                //myData 不能取data这个名字
                myData = data;

            //    需要在这里执行 解析和渲染方法
                callback && callback(data);
            }
        })
    };

//    渲染html
    var renderHtml = function () {

        //    2.判断屏幕的尺寸， 来选择渲染成哪种数据，pc m, $(window).width()

        //当前尺寸
        var width = $(window).width();

//    当宽度不足768px的时候，都认为是移动端
        var isMobile = false;

        //满足移动端条件
        //根据这个条件来判断是不是移动端
        if (width < 768) {
            isMobile = true;
        }

//  3.  解析数据，转换成html
        getData(function (data) {

            //    通过回调函数来处理成功后的事件处理
            //    请求完成之后处理数据
            //    通过模板引擎解析json 拿到html

            //    获取模板对象
            var templatePoint = _.template($('#template_point').html());
            var templateImage = _.template($('#template_image').html());

            // console.log(templatePoint({model:data}));  //传进去的对象叫做model

            /*
             *
             * model {
             *   list: data
             *   isMobile: isMobile
             * }  需要传两个数据
             *
             * */

            // console.log(templateImage({
            //     model: {
            //         list:data,
            //         isMobile:isMobile
            //     }
            // }));

            var htmlPoint = templatePoint({model:data});
            var htmlImage = templateImage({
                model: {
                    list:data,
                    isMobile:isMobile
                }
            });

            //    渲染
            $('.carousel-indicators').html(htmlPoint);

            $('.carousel-inner').html(htmlImage);

        });
    };




//    5.监听屏幕的尺寸变化 动态渲染html resize 事件
//    在resize 操作图片的时候bootstrap也在操作图片， 会产生冲突 大家注意

    //resize 在页面加载的时候没有默认执行


    $(window).on('resize', function () {
    //     每一次尺寸改变都需要判断尺寸和渲染
        renderHtml();
    }).trigger('resize');  // 当绑定上这个事件就触发一次， 即时触发

//    移动端图片滑动功能
    var startX = 0;
    var moveX = 0;
    var distance = 0;
    var isMove = false;

    $('.wjs_banner').on('touchstart', function (e) {
        startX = e.originalEvent.touches[0].clientX;
    });

    $('.wjs_banner').on('touchmove', function (e) {
        moveX = e.originalEvent.touches[0].clientX;
        distance = moveX - startX;
        isMove = true;
    });

    $('.wjs_banner').on('touchend', function (e) {
    //    判断手势
        if (Math.abs(distance)>50 && isMove) {
            if (distance > 0) {
            //    向右划
                $('.carousel').carousel('prev');
            } else {
            //    向左划
               $('.carousel').carousel('next');
            }
        }
    });

}

























