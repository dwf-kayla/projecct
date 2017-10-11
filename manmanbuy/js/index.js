$(function () {
    var dom=$('.mmm_menu>ul');
    var recommend=$('.rec_body>ul');
    $.ajax({
        url:'http://192.168.25.89:9090/api/getindexmenu',
        type:'get',
        dataType:'JSON',
        success:function (data) {
            console.log(data);
            dom.html(template('menuTpl',data));
            dom.find('li').eq(7).click(function () {
                dom.find('li').eq(8).slideToggle(0);
                dom.find('li').eq(9).slideToggle(0);
                dom.find('li').eq(10).slideToggle(0);
                dom.find('li').eq(11).slideToggle(0);
            })
        }
    });
    $.ajax({
        url:'http://192.168.25.89:9090/api/getmoneyctrl',
        type:'get',
        dataType:'JSON',
        success:function (data) {
            console.log(data);
            recommend.html(template('recomTpl',data));


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
