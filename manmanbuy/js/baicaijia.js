$(function () {
    var Wrap = $('.products .wrap')
    $.ajax({
        url: 'http://192.168.25.89:9090/api/getbaicaijiatitle',
        type: 'get',
        dataType: 'JSON',
        success: function (data) {
            console.log(data);

            Wrap.html(template('tpl', data));

            var lis = Wrap.children();
            // 页面一上来需要给第一个li加上样式
            lis[0].classList.add('active');


            // console.log(lis);
            var lisWidth = lis[0].offsetWidth;

            //这里由于获取的Wrap是JQ方法获取的元素，所以需要用width方法去写！
            Wrap.width(lisWidth * lis.length);

            // 这里需要注意：水平拉动条myscroll必须写在ul的长度创建出来之后！！
            var myscroll = new IScroll(".itemWrap", {
                scrollX: true,
                scrollY: false
            });

            var list = $('.baicaiList .list');
            $.ajax({
                url: 'http://192.168.25.89:9090/api/getbaicaijiaproduct',
                type: 'get',
                data: {
                    titleid: 0
                },
                success: function (data) {
                    console.log(data);
                    list.html(template('Mtpl', data));

                }
            })

            lis.on('click', function () {
                $(this).addClass('active').siblings().removeClass('active');
                var index = $(this).index();

                $.ajax({
                    url: 'http://192.168.25.89:9090/api/getbaicaijiaproduct',
                    type: 'get',
                    data: {
                        titleid: index
                    },
                    success: function (data) {
                        console.log(data);
                        list.html(template('Mtpl', data));

                    }
                })
            })
            // lis.each(function (i,e) {
            //     var _e=$(e);
            //     var index=_e.data('id');
            //     console.log(index);
            //     $.ajax({
            //         url:'http://192.168.25.39:9090/api/getbaicaijiaproduct',
            //         type:'get',
            //         data:{
            //             titleid:0
            //         },
            //         success:function (data) {
            //             console.log(data);
            //
            //
            //
            //         }
            //     })
            // })

        }
    })

    //点击回到顶部，实现滑动的效果
    var back=$('.foot .back');
    back.on('click',function () {
        //滑动的速度
        $('body,html').animate({ scrollTop: 0 }, 200);
        return false;
    });



})

