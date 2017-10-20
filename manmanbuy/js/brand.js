//这是一个特殊的页面。请求了三个ajax，分别渲染在三个部分

$(function () {
    var str = window.location.href;
    str = str.split('?brandtitleid=')[1];
    console.log(str);
    str = str || 0;
    var tvWrap = $('.tvWrap');
    var rankItem = $('.rankItem');
    var arr = [];//这里弄一个空数组是用来拿到第二个ajax里面的图片和文字信息的，从而可以渲染到第三个模板里面。
   var commentWrap=$('.commentWrap');
    $.ajax({
        url: 'http://192.168.25.89:9090/api/getbrand',
        type: 'get',
        data: {
            brandtitleid: str
        },
        success: function (data) {
            console.log(data);
            tvWrap.html(template('tpl', data));
        }
    })

    $.ajax({
        url: 'http://192.168.25.89:9090/api/getbrandproductlist',
        type: 'get',
        data: {
            brandtitleid: str,
            pagesize: 5
            //    上面的5是控制显示的数据条数的。
        },
        success: function (data) {
            console.log(data);
            data.result.forEach(function (v, i) {
                console.log(v);
                arr.push({
                    productName:v.productName,
                    productImg:v.productImg
                });
            });
            console.log(arr);

            rankItem.html(template('rankTpl', data));
        }
    })


    $.ajax({
        url: 'http://192.168.25.89:9090/api/getproductcom',
        type: 'get',
        data: {
            productid: 1
        },
        success: function (data) {
            console.log(data);
            for(var i=0;i<data.result.length;i++){
                var item = data.result[i];
                for(var k in arr[i]){
                    //遍历对象
                    item[k] =  arr[i][k];
                }
            }
            //这里已经把原始的data数据进行了改动，添加了上一个AJAX里面的arr的数据进来了！因为arr是全局的，所以在任意处都能获取到它的值.
            console.log(data);
            commentWrap.html(template('commentTpl', data));
        }
    })
    console.log(arr);


    //点击回到顶部，实现滑动的效果
    var back=$('.foot .back');
    back.on('click',function () {
        //滑动的速度
        $('body,html').animate({ scrollTop: 0 }, 200);
        return false;
    });



})