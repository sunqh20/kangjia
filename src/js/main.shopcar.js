require.config({
    paths:{
        jquery:'./jquery.min',
        cookie:'./cookie',
        shopcar:'./lib/shopcar',
    }
})

require(['shopcar'],function(shopcar){
    shopcar.render(function(){
        shopcar.addclick();
    });
})