let baseUrl = 'http://localhost/web2003/week7/day35/khjx';
define(['jquery'], function ($) {
    return {
        render: function () {
            let preuser = localStorage.getItem('user');
            if(preuser != null){
                let objuser = JSON.parse(preuser);
                $('#username').val(objuser.username)
                $('#password').val(objuser.password)
            }
            
            // 记住密码
            function rembuser(){
                if($('.boxagree>input').prop('checked')){
                    let user = {
                        username :$('#username').val(),
                        password :$('#password').val()
                    }
                    let userstr = JSON.stringify(user);
                    localStorage.setItem('user',userstr)
                    ;
                    
                }
            }


            $('.mybtn').on('click', function () {
                let username = $('#username').val();
                let password = $('#password').val();
               

                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/log.php`,
                    data: {
                        username: username,
                        password: password
                    },
                    dataType: "json",
                    success: function (response) {
                        if (response) {
                            rembuser()
                            location.href = `${baseUrl}/src/html/index.html`
                        } else {
                            alert('账号密码错误')
                            location.reload()
                        }
                    }
                });
            })

            // 验证码
            // 生成随机数
            function myrandom(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min)
            }
            // 生成验证码
            function fourRandom() {
                var arr = []
                for (var i = 0; i < 4; i++) {
                    var myCase = myrandom(1, 3);
                    switch (myCase) {
                        case 1:
                            var num1 = myrandom(97, 122);
                            arr.push(String.fromCharCode(num1));
                            break;
                        case 2:
                            var num2 = myrandom(65, 90)
                            arr.push(String.fromCharCode(num2))
                            break;
                        case 3:
                            var num3 = myrandom(48, 57)
                            arr.push(String.fromCharCode(num3))
                            break;
                    }
                }
                return arr.join('')
            }

            // 验证码验证
            function adde(){
                if(!$('#yanzh').val()){
                    $('#btn').attr('disabled',true);
                }
                let icode = $('#yanzh').parent().children('i');
                icode.html(fourRandom());
                
                let changeCode = $('#yanzh').parent().children('span');
                changeCode.on('click',function(){
                    icode.html(fourRandom());
                    $('#btn').attr('disabled',true);
                })
                $('#yanzh').on('change',function(){
                    let mycode = $('#yanzh').val();
                    let yourcode = icode.html();
                    if(mycode != yourcode){
                        $('#btn').attr('disabled',true);
                    }else{
                        $('#btn').attr('disabled',false)
                    }
                });
            }
            adde();
        }
    }
})