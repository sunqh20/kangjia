require.config({
    paths:{
        jquery:'./jquery.min',
        cookie:'./cookie',
        shopcar:'./lib/shopcar',
    }
})

require(['shopcar'],function(shopcar){
    shopcar.render(function(){
        $('.shop-c-box').on('click','.sun-del',function(ev){
            var id = ev.target.id
            shopcar.delShopcar(id)
        })

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
            // console.log(priceall)
        })

    });
})