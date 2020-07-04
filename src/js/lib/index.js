let baseUrl = 'http://localhost/web2003/week7/day35/khjx';

define(['jquery','slider','cookie'], function ($,slider,cookie) {
    return {
        rander: function (callback) {
            
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                dataType: "json",
                success: function (data) {
                    let str = ''
                    data.forEach(element => {
                        str += `<div class="mydiv">
                        <a href="${baseUrl}/src/html/detail.html?id=${element.product_id}"><img src="..${element.product_pic}" alt="">
                        </a>
                        <h4>${element.product_name}</h4>
                        <div>${element.product_detail}</div>
                        <p>￥${element.product_nprice} <span class="del">&nbsp;￥${element.product_pprice}</span></p>
                    </div>`
                    });
                    $('.myrow').append(str);
                }
            });
            $('.slider').slider({
                delay:5000
            })
            callback && callback()
        },

        // 楼梯效果
        indexfloor:function(){
            $('.anchor-container li').on('click',function(){
                $('html,body').animate({
                    scrollTop:$(`${$(this).attr('title')}`).offset().top-50
                })
                return false;
            })
            $(window).on('scroll',function(){
                let top = $('html,body').scrollTop();
                if(top<540){
                    $('.anchor-container').fadeOut(1000);
                }else{
                    $('.anchor-container').fadeIn(1000);
                }
                console.log($('html,body').scrollTop())
            })
            
        }
    }

});