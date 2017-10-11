$(function () {
    var box=$('.box');
    var str=window.location.href;
    console.log(str);
   str=str.split('productid=')[1];
    console.log(str);

    str=str||0;
    $.ajax({
        url:'http://192.168.25.89:9090/api/getdiscountproduct',
        type:'get',
        data:{
            productid:str
        },
        success:function (data) {
            console.log(data);
            box.html(template('tpl',data));
            var bread=$('.bread .txt2');
            bread.html(data.result[0].productName);

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