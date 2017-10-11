$(function () {
    var productHead=$('.product_head');
    var bottom=$('.bottom');
    var productCom=$('.product_com');
    var str=window.location.href;
    console.log(str);
    var str1=str.split('&')[0];
    console.log(str1);
    var str2=str1.split('=')[1];
    console.log(str2);
    $.ajax({
       url:'http://192.168.25.89:9090/api/getproduct',
        type:'get',
        data:{
            productid:str2
        },
        success:function (data) {
            console.log(data);
            productHead.prepend(template('tpl', data));
            bottom.append(template('tpl2', data));
        }

    })

    $.ajax({
        url:'http://192.168.25.89:9090/api/getproductcom',
        type:'get',
        data:{
            productid:0
        },
        success:function (data) {
            console.log(data);
            productCom.append(template('tpl3', data));

        }
    })
})