$(function () {
    var storeItem=$('.storeItem');
    // var str=window.location.href;
    // console.log(str);
    $.ajax({
        url:'http://192.168.25.89:9090/api/getcoupon',
        type:'get',
        dataType:'JSON',
        success:function (data) {
            console.log(data);
            storeItem.html(template('tpl',data));

        }
    });




    //点击回到顶部，实现滑动的效果
    var back=$('.foot .back');
    back.on('click',function () {
        //滑动的速度
        $('body,html').animate({ scrollTop: 0 }, 200);
        return false;
    });


})