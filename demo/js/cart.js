/**
 * Created by leo on 29/9/16.
 */


window.onload = function () {

//    删除方法
    deleteFunc();
};

function deleteFunc() {

/*
*   步骤
*   1.让弹出框动画的显示出来
*   2.打开盖子
*   3.点击取消的时候隐藏弹出框
*   4.同时盖上盖子
* */

//获取弹出框
    var win = document.querySelector('.jd_window');

//    弹出盒子
    var bounceBox = win.querySelector('.jd_window_box');

//    获取所有的删除按钮
    var deleteBtns = document.querySelectorAll('.delete_box');

    // console.log(win);
    // console.log(bounceBox);
    // console.log(deleteBtn);


//    当前点击的按钮
    var deleteBox;

//    加入click事件
    for (var i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].onclick = function () {
        //    点击的时候，盒子做动画
        //    加入class bounceInDown
        //    动画之前
            win.style.display = 'block';
        //    动画
        //     bounceBox.className += 'bounceInDown';
            bounceBox.className += ' bounceInDown';

            // console.log(this);

            deleteBox = this;
            var deleteUp = deleteBox.querySelector('span');  // 默认是第一个
            // console.log(deleteUp);


            //加过渡
            deleteUp.style.webkitTransition = "all 1s";
            deleteUp.style.transition = "all 1s";

            deleteUp.style.webkitTransform = 'rotate(-35deg) translateY(2px)';
            deleteUp.style.transform = 'rotate(-35deg) translateY(2px)';

        //    改变旋转原点
            deleteUp.style.webkitTransformOrigin = "0 5px";
            deleteUp.style.transformOrigin = "0 5px";
        }
    }


    bounceBox.querySelector('.cancel').onclick = function () {
    //    隐藏弹出框
        win.style.display = 'none';

    //    盖上盖子 , 当有点击过之后
        if (deleteBox) {
            var deleteUp = deleteBox.querySelector('span');
        //    置空
            deleteUp.style.webkitTransform = 'none';
            deleteUp.style.transform = 'none';

        }
    }
}






























