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
        shopcar.addclick();
    });
})