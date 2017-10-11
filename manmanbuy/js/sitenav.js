$(function () {
    var itemWrap=$('.itemWrap');
    $.ajax({
        url:'http://192.168.25.89:9090/api/getsitenav',
        type:'get',
        dataType:'JSON',
        success:function (data) {
            console.log(data);
            itemWrap.html(template('shopTpl',data));
        }
    })
})