let baseUrl = 'http://localhost/web2003/week7/day35/khjx';
define(['jquery'],function($){
    return {
        render:function(){
            let obj ={}
            $('#username').on('change',function(){
                let usrnameReg =/^[A-Za-z][A-Za-z0-9_]{5,15}$/;
                usrnameReg.test(this.value) ? $('#username + span').css('display',"none"):$('#username + span').css('display',"block");
                $('#username + span').html('请输入6-16位数字字母')
                ;
                obj['username'] = usrnameReg.test(this.value);
            })
            $('#password').on('change',function(){
                let passReg = /^.{6,16}$/;
                passReg.test(this.value) ?$('#password + span').css('display',"none"):$('#password + span').css('display',"block");
                $('#password + span').html('请输入6-16位密码');
                obj['password'] = passReg.test(this.value);
            })

            $('#repass').on('change',function(){
                if(!($('#repass').val() ==$('#password').val())){
                    console.log('dd')
                    $('#repass + span').css('display',"block");
                    $('#repass + span').html('两次输入密码不一致');
                }else{
                    $('#repass + span').css('display',"none");
                }
                let rlt = ($('#repass').val() ==$('#password').val());
                obj['repass'] =  rlt;
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
                let icode = $('#yanzh').parent().children('i');
                icode.html(fourRandom());
                
                let changeCode = $('#yanzh').parent().children('span');
                changeCode.on('click',function(){
                    icode.html(fourRandom());
                    let mycode = $('#yanzh').val();
                    let yourcode = icode.html();
                    obj['yanzh'] =  (mycode == yourcode)
                })
                $('#yanzh').on('change',function(){
                    let mycode = $('#yanzh').val();
                    let yourcode = icode.html();
                    obj['yanzh'] =  (mycode == yourcode)
                    
                });
            }
            adde();


            $('.boxagree>input').on('click',function(){
                let s = $(this).prop('checked')
                console.log(s);
                obj['check'] = s
            })

            $('body').on('click',function(){
                console.log(obj)
            })
            $('#btn').on('click',function(){
                let arr = []
                for(let i in obj){
                    arr.push(obj[i])
                }
                let r = arr.every(elm=> elm)
                if(arr.length == 5 && r){
                    let username = $('#username').val();
                    let password = $('#password').val();
                    $.ajax({
                        type: "get",
                        url: `${baseUrl}/interface/login.php`,
                        data: {
                            username: username,
                            password: password
                        },
                        dataType:'json',
                        success: function (response) {
                            console.log(response,typeof response,Boolean(response))
                            if(response){
                                location.href = `${baseUrl}/src/html/login.html`
                            }else{
                                location.href = `${baseUrl}/src/html/reg.html`
                            }
                        }
                    });
                }
            
               
            })
            
            return false;
        }
        
    }
})