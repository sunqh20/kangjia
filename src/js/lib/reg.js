let baseUrl = 'http://localhost/web2003/week7/day35/khjx';
define(['jquery'],function($){
    return {
        render:function(){
            $('#btn').on('click',function(){
                let username = $('#username').val();
                let password = $('#password').val();
                // console.log(username)
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
               
            })
            
            return false;
        }
        
    }
})