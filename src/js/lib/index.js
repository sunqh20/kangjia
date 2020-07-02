let baseUrl = 'http://localhost/web2003/week7/day35/khjx';

define(['jquery','slider','cookie'], function ($,slider,cookie) {
    return {
        rander: function () {
            
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getall.php`,
                // data: "data",
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
                        // console.log(element)
                    });
                    $('.myrow').append(str);
                }
            });
            $('.slider').slider({
                delay:5000
            })
            
            

        },
        
    }

});