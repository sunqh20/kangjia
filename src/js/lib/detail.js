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
                    let arr = JSON.parse(response.product_smpic);
                    let str = `
                    <div class="col-md-7">
                        <div class="detail-bigpic">
                            <a href="javascript:;">
                                <img src="../${response.product_pic}" alt="" class="fhda">
                            </a>
                        </div>
                        <div class="detail-piclist">
                        <i class="iconfont icon-jiantou myi1"></i>
                        <div class="mylibox">
                        <ul class="myliev">
                        <li><a href=""><img src=${baseUrl + "/src" + arr[0].src} alt=""></a></li>
                        <li><a href=""><img src=${baseUrl + "/src" + arr[1].src} alt=""></a></li>
                        <li><a href=""><img src=${baseUrl + "/src" + arr[2].src} alt=""></a></li>
                        <li><a href=""><img src=${baseUrl + "/src" + arr[3].src} alt=""></a></li>
                        <li><a href=""><img src=${baseUrl + "/src" + arr[4].src} alt=""></a></li>
                        <li><a href=""><img src=${baseUrl + "/src" + arr[5].src} alt=""></a></li>
                        <li><a href=""><img src=${baseUrl + "/src" + arr[6].src} alt=""></a></li>
                    </ul>
                        </div>
                        <i class="iconfont icon-jiantou-copy"  id="myi2"></i>
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
                                    <span class="add1">北京</span>
                                    <span class="add1">北京市</span>
                                    <span class="add1">延庆县</span>
                                    <span class="add1">珍珠泉乡</span>
                                </div>
                                <i class="iconfont icon-jiantou" id="myaddress"></i>
                                <span class="haveshop">有货</span>
                                <li class="det-alladd">
                                    <ul>
                                        <li>
                                        <span>选择省份/自治区</span>
                                        <ol></ol>
                                        </li>
                                        <li>
                                        <span>选择城市/地区</span>
                                        <ol></ol></li>
                                        <li><span>选择区县</span>
                                        <ol></ol></li>
                                        <li>
                                        <span>选择配送区域</span>
                                        <ol></ol></li>
                                    </ul>
                                    
                                </li>
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

        // 添加购物车信息到cookie
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

        // 放大镜效果
        myevent: function () {
            $('.detail-bigpic>a').on({
                'mouseover': function (ev) {
                    $('.detail-bigpic img').css({
                        'width': '900px',
                        'height': '900px'
                    })
                },
                'mousemove': function (ev) {
                    let x = ev.pageX - $(this).offset().left;
                    let y = ev.pageY - $(this).offset().top;
                    let resx = parseInt((x / 530) * (900 - 530));
                    let resy = parseInt((y / 530) * (900 - 530));
                    $('.detail-bigpic img').css({
                        'top': `-${resy}px`,
                        'left': `-${resx}px`,

                    })
                },
                'mouseout': function () {
                    $('.detail-bigpic img').css({
                        'width': '530px',
                        'height': '530px',
                        'top': 0,
                        'left': 0,
                    })
                }
            })
        },

        // 图片展示的上下移动
        picListEv: function () {
            $('.myliev').on('mouseover', 'img', function (el) {
                $('.detail-bigpic img')[0].src = this.src;
            })
            $('.detail-piclist').children('i').on('click', function (ev) {
                if (this.id == 'myi2') {
                    let y1 = (parseInt($('.myliev').css('top')) + 82);
                    $('.myliev').css('top', `${y1}px`);

                } else {
                    let y = (parseInt($('.myliev').css('top')) - 82);
                    $('.myliev').css('top', `${y}px`);

                }
            })
        },

        // 详情的楼梯效果
        floorEv: function () {
            $('a[title^="#detail-id-"]').on('click',function(){
                $(this).parent().addClass('active').siblings().removeClass('active')
                console.log();
                $('html,body').animate({
                    scrollTop:$(`${this.title}`).offset().top - 50
                })
                return false;
                
            });
        },

        // 送货地址的三级菜单
        addressEv: function () {
            $('#myaddress').on('click', function () {
                $.ajax({
                    type: "get",
                    url: `${baseUrl}/json/city.json`,
                    dataType: "json",
                    success: function (data) {
                        // console.log(data)
                        let sstr = ''
                        data.forEach((e, i) => {
                            sstr += `<li data-id= ${i}>${e.name}</li>`

                        });
                        $('.det-alladd').css('display', 'block');
                        $('.det-alladd>ul>li:nth-of-type(1)>ol').css('display', 'block');
                        $('.det-alladd>ul>li:nth-of-type(1)>ol').html(sstr);
                        $('.det-alladd>ul>li:nth-of-type(1)>ol>li').on('click', function () {
                            $('.add1:nth-of-type(1)').html($(this).html()).siblings().html('')
                            console.log(this,)
                            $(this).parent().css('display', 'none');
                            let index = this.dataset.id;
                            let citystr = '';
                            let s = data[index];
                            // console.log(s.city,'s')
                            data[index].city.forEach((e, i) => {
                                citystr += `<li data-cid=${i}>${e.name}</li>`
                            })
                            $('.det-alladd>ul>li:nth-of-type(2)>ol').css('display', 'block');
                            $('.det-alladd>ul>li:nth-of-type(2)>ol').html(citystr)
                            $('.det-alladd>ul>li:nth-of-type(2)>ol>li').on('click', function () {
                                $(this).parent().css('display', 'none');
                                $('.add1:nth-of-type(2)').html($(this).html())
                                let index1 = this.dataset.cid;
                                let xstr = '';
                                s.city[index1].districtAndCounty.forEach((e,i)=>{
                                    xstr += `<li data-xid=${i}>${e}</li>`;
                                })
                                $('.det-alladd>ul>li:nth-of-type(3)>ol').css('display', 'block');
                                $('.det-alladd>ul>li:nth-of-type(3)>ol').html(xstr)
                                $('.det-alladd>ul>li:nth-of-type(3)>ol>li').on('click',function(){
                                    $(this).parent().css('display', 'none');
                                    $('.add1:nth-of-type(3)').html($(this).html())
                                    $(this).parents('.det-alladd').css('display','none')
                                })
                            })
                        })



                    }
                });
            })
        }
    }

});