$(function () {
    var str=window.location.href;
    console.log(str);
    str=str.split('?')[1].split('&')[0].split('=')[1];
    console.log(str);
    var items=$('.items');
    $.ajax({
        url:'http://192.168.25.89:9090/api/getcouponproduct',
        type:'get',
        data:{
            couponid:str
        },
        success:function (data) {
            console.log(data);
            // storeItem.html(template('tpl',data));
            items.html(template('tpl',data));

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