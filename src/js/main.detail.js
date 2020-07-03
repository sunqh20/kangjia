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
        });
        
        detail.myevent();
        detail.picListEv();
        detail.addressEv();
    })
    
})