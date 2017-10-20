$(function () {
    var ul = $('.products>ul');
    var products = $('.products');

    $.ajax({
        url: 'http://192.168.25.89:9090/api/getcategorytitle',
        type: 'get',
        dataType: 'JSON',
        success: function (data) {
            console.log(data);
            ul.html(template('tpl', data));
            //这里不能把事件绑定到li身上，否则可能发生事件冒泡。所以应该绑在li下边的title身上！这样才不会冲突
            var title = $('.products .item_hook>.title');

            title.click(function () {

                var index = $(this).parent().data("id");
                var proIntro = $('.pro_intro');
                var _this = $(this).parent();
                var $ul = proIntro.children("ul");
                //如果点击的理下面已经有了内容，就不去加载数据了
                if (_this.find('.pro_intro>ul>li').length) {
                    //排他展示
                    _this.siblings().find('.pro_intro').slideUp(200);
                    //展开隐藏当前li
                    _this.find('.pro_intro').slideToggle(200);
                    return;
                }
                $.ajax({
                    url: 'http://192.168.25.89:9090/api/getcategory',
                    type: 'get',
                    data: {
                        titleid: index
                    },
                    success: function (data2) {
                        console.log(data2);
                        $ul.each(function (i, e) {
                            var _e = $(e);
                            var j = i;
                            if (index == j) {
                                _e.html(template("tpll", data2));

                                //排他展示
                                _this.siblings().find('.pro_intro').slideUp(200);
                                //展开隐藏当前li
                                _this.find('.pro_intro').slideToggle(200);
                            }
                        })
                    }
                })
            })
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
