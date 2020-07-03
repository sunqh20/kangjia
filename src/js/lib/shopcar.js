let baseUrl = 'http://localhost/web2003/week7/day35/khjx'

define(['jquery', 'cookie'], function ($, cookie) {
    return {
        render: function (callback) {
            let shop = cookie.get('shop');
            let count = 0;
            if (shop) {
                shop = JSON.parse(shop);
                var arr = [];
                shop.forEach(element => {
                    arr.push(element.id)
                    count += parseInt(element.num)
                });
                var str = arr.join()
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/interface/shop.php`,
                    data: {
                        idlist: str
                    },
                    dataType: "json",
                    success: function (response) {
                        var str1 = '';
                       var  allprice = 0
                        response.forEach(data => {
                            let arr1 = shop.filter(val => val.id == data.product_id);
                            // console.log(data.product_id)
                            var p = data.product_nprice
                            allprice += parseInt(arr1[0].num)*parseInt(p)
                            var s = p * parseInt(arr1[0].num)
                            str1 += `<div>
                                        <ul>
                                            <li class="lilist-2"><input type="checkbox" class="mycheck"></li>
                                            <li class="lilist-2">
                                                <div><a href=""><img src="../${data.product_pic}" alt=""></a></div>
                                                <div>
                                                    <h3>${data.product_name}</h3>
                                                    <p>${data.product_detail}</p>
                                                </div>
                                            </li>
                                            <li class="lilist-2">${data.product_nprice}</li>
                                            <li class="lilist-2">
                                                <div>
                                                    <button>-</button>
                                                </div>
                                                <input type="text" value="${arr1[0].num}">
                                                <div><button>+</button></div>
                                            </li>
                                            <li class="lilist-2">
                                                <strong>${s}</strong>
                                            </li>
                                            <li class="lilist-2">
                                                <ol>
                                                    <li><a href="" class="sun-del" id=${data.product_id}>删除</a>
                                                    </li>
                                                    <li><a href="">移到收藏夹</a></li>
                                                </ol>
                                            </li>
                                        </ul>
                                    </div>`
                        })
                        $('.shop-c-box').append(str1);
                        // $('#mycount').html(count);
                        // $('#myallprice').html(allprice.toFixed(2));
                        callback && callback();
                    }
                });
              
            }

        },
        
        delShopcar:function(id){
            let shop = cookie.get('shop');
            let arr = JSON.parse(shop)
            cookie.remove('shop')
            let result = []
            arr.forEach(elm=>{
                console.log(elm.id,id)
                if(!(elm.id == id)){
                    result.push(elm)
                }
            })
            cookie.set('shop',JSON.stringify(result),1)

        },

        addclick: function(){
            $('.shop-warp').on('click',function(ev){
                let numall= 0;
                let priceall = 0;
                let typ1 = $(ev.target).prop('checked');
                let arr = Array.from($('.mycheck'))
                if(ev.target.className == 'mycheckall'){
                    $.each($(this).find("input[type='checkbox']"),function(i,elm){
                        $(elm).prop('checked',typ1);
                    })
                }
                if(ev.target.className == 'mycheck'){
                    if(!$(ev.target).prop('checked')){
                        $.each($('.mycheckall'),function(i,elm){
                            $(elm).prop('checked',$(ev.target).prop('checked'))
                        })
                    }
                    
                    let result =arr.every(elm=>{
                        return $(elm).prop('checked')
                        
                    })
                    if(result){
                        $.each($('.mycheckall'),function(i,elm){
                            $(elm).prop('checked',true)
                        })
                    }
              
                }
                arr.forEach(e=>{
                    if($(e).prop('checked')){
                        numall += parseInt($(e).parents('ul').find('input[type="text"]').val());
                        console.log()
                        priceall += parseInt($(e).parents('ul').find('strong').html())
                        
                    }
                })
                $('#mycount').html(numall);
                $('.my-header-login>a>span').html(numall);
                $('#myallprice').html(priceall);
            })
        }
    }

});