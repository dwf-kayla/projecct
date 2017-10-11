$(function () {
    var moneyItem = $('.moneyItem');
    var prev = $('.prev');
    var next = $('.next');

    var str = window.location.href;
    var str1 = str.split('?')[1];
    var select = $('.center select');
    var currentPage = 1;

    getData();

    function getData() {
        $.ajax({
            url: 'http://192.168.25.89:9090/api/getmoneyctrl?' + str1,
            type: 'get',
            data: {
                pageid: currentPage - 1
            },
            success: function (data) {
                console.log(data);
                moneyItem.html(template('tpl', data));

                var num = Math.ceil(data.totalCount / data.pagesize);
                var obj = {
                    num: num,
                    currentPage: currentPage
                }
                select.html(template('pagetpl', obj));

            }
        })
    }

    //点击上一页
    prev.on('click', function () {
        // alert('11')
        currentPage--;
        if (currentPage < 1) {
            currentPage = 1;
            return false;
        }
        getData();

    })

    //点击下一页
    next.on('click', function () {
        // alert('22')
        console.log(currentPage)
        currentPage++;
        if (currentPage > 15) {
            currentPage = 15;
            return false;
        }
        getData();

    })

    //设置onchange事件
    select.change(function () {
        var option = $(this).children();
        currentPage = $("option:selected").val();
        console.log(currentPage);
        //函数内部(局部作用域)没法改变全局的变量值，所以这里不能在currentPage前面添加var!!!!!!!
        getData();

    })





    //点击回到顶部，实现滑动的效果
    var back=$('.foot .back');
    back.on('click',function () {
        //滑动的速度
        $('body,html').animate({ scrollTop: 0 }, 200);
        return false;
    });


})




//先把中间的select创建出来
//     $.ajax({
//         url:'http://192.168.25.39:9090/api/getmoneyctrl?'+str1,
//         type:'get',
//         data:{
//             pageid:currentPage
//         },
//         success:function (data) {
//             console.log(data);
//             var num=Math.ceil(data.totalCount/data.pagesize);
//
//             var obj ={
//                 num:num,
//                 currentPage:currentPage
//
//             }
//             select.html(template('pagetpl',obj));
//             //中间框
//             // select.change(function () {
//             //     var option=$(this).children();
//             //     currentPage=$('option:selected').val();
//             //
//             //
//             // })
//         }
//     })
//
// })
//
//

