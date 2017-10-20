$(function () {
    // var currentPage=1;
    // var pageSize=10;
    // var maxTotal=0;



    //面包屑导航！！
    var str = window.location.href;
    //切分的方法要恰当！！
    str = str.split('categoryid=')[1];
    //这里要给一个容错！如果没有这个值就给一个默认值！
    str = str || 0;

    var $ul = $('.pros ul');


    // console.log(Dname);
    $.ajax({
        url: 'http://192.168.25.89:9090/api/getproductlist',
        type: 'get',
        data: {
            categoryid: str,
            pageid: 1
        },
        success: function (data) {
            console.log(data);
            $ul.html(template('tpl', data));

        }
    })

    $.ajax({
        url: 'http://192.168.25.89:9090/api/getcategorybyid',
        type: 'get',
        data: {
            categoryid: str
        },
        success: function (data) {
            //这里再发一次请求，去拿到category名，动态填到面包屑导航最后一栏！
            var Dname = $('.breadNav .name a');
            Dname.html(data.result[0].category);
        }
    })
})