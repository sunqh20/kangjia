let baseUrl = 'http://localhost/web2003/week7/day35/khjx'
define(['jquery', 'cookie'], function ($, cookie) {
    return {
        render: function (callback) {
            let id = location.search.split('=')[1];
            $.ajax({
                type: "get",
                url: `${baseUrl}/interface/getitem.php`,
                data: {
                    id: id
                },
                dataType: "json",
                success: function (response) {
                    let str = `
                    <div class="col-md-7">
                        <div class="detail-bigpic">
                            <a href="javascript:;">
                                <img src="../${response.product_pic}" alt="" class="fhda">
                            </a>
                        </div>
                        <div class="detail-piclist">
                        <i class="iconfont icon-jiantou"></i>
                        <ul>
                            <li><a href=""><img src="../images/detaillist1.jpg" alt=""></a></li>
                            <li><a href=""><img src="../images/detaillist1.jpg" alt=""></a></li>
                            <li><a href=""><img src="../images/detaillist1.jpg" alt=""></a></li>
                            <li><a href=""><img src="../images/detaillist1.jpg" alt=""></a></li>
                            <li><a href=""><img src="../images/detaillist1.jpg" alt=""></a></li>
                        </ul>
                        <i class="iconfont icon-jiantou-copy"></i>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <h3>${response.product_name}</h3>
                        <div class="p-detail">${response.product_detail}</div>
                        <div class="p-price">
                            <li>
                                <strong>￥${response.product_nprice}.00</strong>
                                <span>￥${response.product_pprice}.00</span>
                                <a href="">手机购买</a>
                            </li>
                        </div>
                        <div class="detail-address">
                            <div class="det-add-info">
                                <span>配送至:</span>
                                <div>
                                    <span>北京</span>
                                    <span>北京市</span>
                                    <span>延庆县</span>
                                    <span>珍珠泉乡</span>
                                </div>
                                <i class="iconfont icon-jiantou"></i>
                                <span class="haveshop">有货</span>
                        </div>
                        </div>
                        <div class="detail-numcontainer">
                            <div class="detail-num">
                                <span>数量</span>
                                <div>
                                    <button>-</button>
                                </div>
                                <input type="text" id="number" value="1">
                                <div><button>+</button></div>
                            </div>
                            <div class="detail-numadd">
                                <a href="" class="detail-a1">立即购买</a>
                                <a href="" class="detail-a2">加入购物车</a>
                            </div>
                        </div>
                    </div>
                `

                    $('#detail-row').append(str)
                    callback && callback(response.product_id, response.product_nprice)
                }
            });
        },
        additem: function (id, num, price) {
            let shop = cookie.get('shop')
            let product = {
                id: id,
                num: num,
                price: price
            }
            if (shop) {
                shop = JSON.parse(shop)
                if (shop.some(ele => ele.id == id)) {
                    shop.forEach(elm => {
                        elm.id == id ? elm.num = num : null;
                    });
                } else {
                    shop.push(product)
                }
            } else {
                shop = []
                shop.push(product)
            }
            cookie.set('shop', JSON.stringify(shop), 1)
        },



// 优化失败
        // eventover: function () {
        //     $('.detail-bigpic img').css({
        //         'width': '800px',
        //         'height': '800px'
        //     })
        // },
        // eventmove: function (ev) {
        //     let x = ev.pageX - $(this).offset().left;
        //     let y = ev.pageY - $(this).offset().top;
        //     let resx = parseInt((x / 530) * (800 - 530));
        //     let resy = parseInt((y / 530) * (800 - 530));
        //     $('.detail-bigpic img').css({
        //         'top': `-${resy}px`,
        //         'left': `-${resx}px`,

        //     })
        // },
        // eventout: function () {
        //     $('.detail-bigpic img').css({
        //         'width': '530px',
        //         'height': '530px',
        //         'top': 0,
        //         'left': 0,
        //     })
        // }
    }

});