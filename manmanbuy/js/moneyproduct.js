var box=$('.box');
var str=window.location.href;
console.log(str);
var str1=str.split('?')[1];
console.log(str1);
var str2=str1.split('=')[1];
console.log(str2);
$.ajax({
    url:'http://192.168.25.89:9090/api/getmoneyctrlproduct',
    type:'get',
    data:{
        productid:str2
    },
    success:function (data) {
        console.log(data);
        box.html(template('tpl',data));
    }
})