$(function () {
    getUserinfo();
    //注册点击退出按钮事件
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出?', function (index) {
            //do something
            location.href = '../../login.html'
            localStorage.removeItem('token')
            //关闭confirm询问框
            layer.close(index);
        });
    })
})

//定义获取用户信息函数
function getUserinfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(
                    '获取用户信息失败'
                )
            } else {
                console.log(res.data);
                //按需渲染用户信息
                renderUserinfo(res.data)
            }
        },
        complete: function (res) {
            console.log(res);
            if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
                location.href = '../../login.html'
                localStorage.removeItem('token')
            }
        }
    })
}
//渲染用户信息函数
function renderUserinfo(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text_avatar').hide()
    } else {
        var first = name[0].toUpperCase();
        $('.text_avatar').html(first).show();
        $('.layui-nav-img').hide()
    }
}