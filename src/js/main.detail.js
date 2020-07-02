require.config({
    paths:{
        jquery:'./jquery.min',
        cookie:'./cookie',
        detail:'./lib/detail'
    }
});

require(['jquery','detail'],function($,detail){
    detail.render(function(id,price){
        $('#detail-row').on('click',function(){
            detail.additem(id,$('#number').val(),price)
        })
        $('.detail-bigpic>a').on({

            // detail。JS优化失败
            // "mouseover":detail.eventover(),
            // "mousemove":detail.eventmove(ev),
            // 'mouseout':detail.eventout()
            'mouseover':function(ev){
                $('.detail-bigpic img').css({
                    'width':'800px',
                    'height':'800px'
                })
            },
            'mousemove':function(ev){
                let x = ev.pageX-$(this).offset().left;
                let y = ev.pageY-$(this).offset().top;
                let resx = parseInt((x / 530) * (800-530));
                let resy = parseInt((y / 530) * (800-530));
                $('.detail-bigpic img').css({
                    'top':`-${resy}px`,
                    'left':`-${resx}px`,
                    
                })
            },
            'mouseout':function(){
                $('.detail-bigpic img').css({
                    'width':'530px',
                    'height':'530px',
                    'top':0,
                    'left':0,
                })
            }
        })
       
    })
})