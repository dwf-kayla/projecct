$(function () {
    var shopList = $('.shopList');
    var areaList = $('.areaList');
    var proItem = $('.proItem');
    var shopid = 0;
    var areaid = 0;
    var allprice=$('.allprice');
    //页面一上来需要获取数据
    getData()

    $.ajax({
        url: 'http://192.168.25.89:9090/api/getgsshop',
        type: 'get',
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            shopList.html(template('tpl', data));
        }
    })

    $.ajax({
        url: 'http://192.168.25.89:9090/api/getgsshoparea',
        type: 'get',
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            areaList.html(template('tpl2', data));

        }
    })

    //疑问一：这里为什么在ajax外面的点击事件，一上来就有数据呢？ajax是异步的啊
    var lis = $('.leftArea').find('li');
    console.log(lis);


    lis.eq(0).on('click', function () {
        var _this = $(this);
        areaList.hide();
        allprice.hide();
        shopList.slideToggle();
        var li = shopList.children();

        console.log(li);
       //这里的li是伪数组
        li.on('click', function () {
            $(this).addClass('on').siblings().removeClass('on');
            shopid = $(this).data('shopid');
            shopList.slideUp();
            getData();
            //下面是实现文字同步
            var txt = $(this).children('a').html();
            // console.log(txt);
            // _this.text(txt);
            var $i=_this.children('i');
            console.log($i);
            _this.empty().append(txt).append($i);
        })
    })


    lis.eq(1).on('click', function () {
        var _this = $(this);
        shopList.hide();
        allprice.hide();
        areaList.slideToggle();
        var li = areaList.children();
        li.on('click', function () {
            $(this).addClass('on').siblings().removeClass('on');
            areaid = $(this).data('areaid');
            areaList.slideUp();
            getData();
            //下面是实现文字同步
            var txt = $(this).children('a').html();
            console.log(txt);
            console.log(typeof (txt));
            //这里是将下拉框中的文字放到头部标签里
            txt=txt.split('（')[0];
            //注意：上面必须用中文的括号进行切割！
            console.log(txt);
            var $i=_this.children('i');
            console.log($i);
            //注意：这里用不了text()和html()方法，这样会直接把li标签里面的i标签一起给干掉的，所以先把里面的内容清空，再去添加i标签！！！下面是百度的方法。

            _this.empty().append(txt).append($i);
        })
    })

    lis.eq(2).on('click',function () {
        shopList.hide();
        areaList.hide();
        allprice.slideToggle();
    })


    function getData() {
        $.ajax({
            url: 'http://192.168.25.89:9090/api/getgsproduct',
            type: 'get',
            data: {
                shopid: shopid,
                areaid: areaid
            },
            success: function (data) {
                console.log(data);
                proItem.html(template('proTpl', data));

            }
        })

    }


    //点击回到顶部，实现滑动的效果
    var back=$('.foot .back');
    back.on('click',function () {
         //滑动的速度
            $('body,html').animate({ scrollTop: 0 }, 200);
            return false;
        });



})