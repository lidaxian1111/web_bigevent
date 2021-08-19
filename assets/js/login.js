$(function () {
    $('#link_reg').on('click', function () {
        $('#loginbox').hide();
        $('#regbox').show()
    })
    $('#link_login').on('click', function () {
        $('#loginbox').show();
        $('#regbox').hide()
    });
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            //通过形参将表单的内容传递进来
            var pwdCon = $('#pwd').val();
            if (pwdCon !== value) {
                return '注册失败'
            }
        }
    })
    // 点击注册调用接口

    $('#reg_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('#regbox [name=username').val(),
                password: $('#regbox [name=password').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    //利用layui弹出框提示信息
                    layer.msg(res.message)
                } else {
                    layer.msg(
                        '注册成功,请登录'
                    );
                    $('#link_login').click()
                }
            }
        })
    });
    //为登录页面注册提交事件
    $('#login_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#login_form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    layer.open({
                        content: res.message
                    })
                } else {
                    layer.open({
                        content: '登录成功'
                    })
                    localStorage.setItem('token', res.token)
                    location.href = "../../index.html"

                }
            }
        })
    })
})