(function($) {
    $.fn.extend({
        slider: function(options) {
            // 函数式编程
            let main = null, // 主函数
                init = null, // 初始化
                start = null, // 开始动画
                stop = null, // 停止动画
                prev = null, // 上一张
                next = null, // 下一张
                timer = null, // 计时器
                elms = {}, // 命名空间 存储元素
                defaults = {
                    speed: 500, // 动画速度
                    delay: 3000 // 延迟时间  展示使用
                };

            $.extend(defaults, options); // 合并参数

            init = function() {
                // 1. 元素选取
                elms.sliderDiv = this.children('div'); // 选择滑动的div
                elms.btns = this.children('span'); // 选择按钮
                elms.bcount = elms.sliderDiv.children().length
                elms.sliderDiv.append(elms.sliderDiv.children('img').first().clone()); // 克隆第一张图片
                //  索引 用于记录当前图片的索引
                elms.index = 1; // 第一张图片

                // 选择点击的li中的b元素
                
           
                for(let i = 1;i<elms.bcount;i++){
                    this.children('li').append(this.children('li').children('b').first().clone())
                }
                
                elms.liblist = this.children('li').children('b');
                $(elms.liblist[0]).addClass('cy').siblings().removeClass('cy')


                // 时间绑定
                this.hover(function() {
                    stop();
                    // console.log('移入')
                }, function() {
                    timer = setInterval(start.bind(null, 1), defaults.delay + defaults.speed);
                    // console.log('溢出');
                });

// 设置小点的点击事件
                elms.liblist.on('click',function(){
                    let i = elms.liblist.index(this);
                    elms.index = i+1;
                    // console.log(elms.index,'ss')
                    let mydiv = elms.sliderDiv.children().eq(i).position().left;
                    $(elms.liblist[i]).addClass('cy').siblings().removeClass('cy')
                    elms.sliderDiv.animate({
                        left:`-${mydiv}px`
                    },500)
                })

                elms.btns.on('click', function() {
                    if (elms.btns.index(this)) {
                        next();
                    } else {
                        prev();
                    }
                });

            }.bind(this);


            start = function(direction) {
                
                let myleft = elms.sliderDiv.children().first().width();
              
                // let left = '-=570px'; // 设置移动的距离
                let left = `-=${myleft}px`
                if (!direction) {
                    left = `+=${myleft}px`;
                    if (elms.index === 1) { // 判断当前为第一张图片
                        elms.index = elms.bcount+1; // 切换到第四张图片
                        let divLeft = this.offset().left,
                            imgLeft = elms.sliderDiv.children('img').last().offset().left;
                        elms.sliderDiv.css('left', `-${imgLeft - divLeft}px`);
                    }
                    
                    
                }

                elms.sliderDiv.animate({
                    left: left
                }, defaults.speed, function() {

                    if (direction) elms.index++;
                    else elms.index--;

                    if (elms.index === elms.bcount+1) { // 判断到达最后一张图片
                        elms.index = 1; // 将索引设置为1
                        elms.sliderDiv.css('left', 0); //  将定位设置为0
                    }
                });
                // console.log(elms.index%3)
                if(!direction){
                    let t = elms.index -2
                    if(t === elms.bcount){
                        $(elms.liblist[0]).addClass('cy').siblings().removeClass('cy')
                    }else{
                        $(elms.liblist[t]).addClass('cy').siblings().removeClass('cy')
                    }
                    console.log(t)
                }else{
                    if(elms.index === elms.bcount){
                        $(elms.liblist[0]).addClass('cy').siblings().removeClass('cy')
                    }else{
                        $(elms.liblist[elms.index]).addClass('cy').siblings().removeClass('cy')
                    }
                }
                
                
                
               
                
            }.bind(this);

            prev = function() {
                stop();
                start(0);
            }

            next = function() {
                stop();
                start(1);
            }

            stop = function() {
                elms.sliderDiv.stop(true, true);
                clearInterval(timer);
            }


            main = function() {
                init();
                timer = setInterval(start.bind(null, 1), defaults.speed + defaults.delay);
            }

            main();
        }
    });
})(jQuery);