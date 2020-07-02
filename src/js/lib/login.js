let baseUrl = 'http://localhost/web2003/week7/day35/khjx';
define(['jquery'],function($){
    return {
        render:function(){
            $('.mybtn').on('click',function(){
                let username = $('#username').val();
                let password = $('#password').val();
                console.log(username,password);
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/log.php`,
                    data: {
                        username: username,
                        password: password
                    },
                    dataType: "json",
                    success: function (response) {
                        if(response){
                            location.href = `${baseUrl}/src/html/index.html`
                        }else{
                            alert('账号密码错误')
                            location.reload()
                        }
                    }
                });
            })
            return false;
            // console.log($('#username'))
        }
    }
})