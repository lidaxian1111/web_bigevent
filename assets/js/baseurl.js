//jquery提供的一个方法,当调用ajax函数时会先调用ajaxPrefilter函数,这个函数会拿到ajax的配置对象传递给形参
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    //统一为有权限的接口设置请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

})