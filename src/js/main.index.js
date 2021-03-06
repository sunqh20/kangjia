require.config({
    paths: {
        jquery: './jquery.min',
        index: './lib/index',
        slider: './jquery.slider',
        cookie: './cookie'
    },
    shim: {
        slider: ['jquery']
    }
});

require(['index', 'cookie', 'jquery'], function (index, cookie, $) {
    // 后加的退出和欢迎用户
    let myuser = cookie.get('username');
    if(myuser){
        let str = `<li><span>${myuser}</span><span>welcome</span> <a href="./index.html" id="myexit">退出</a></li>`;
        $('.topbar-top').html(str);
    }
    $('#myexit').on('click', function () {
        cookie.remove('username')
        let str1 = `
        <a href="./login.html" class="signin-btn">登录</a>
                    <span>|</span>
                    <a href="./reg.html" class="signup-btn">注册</a>`;
        $('.topbar-top').html(str1);
        
    })

    index.rander(function(){
        index.indexfloor();
    });
})