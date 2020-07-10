require.config({
    paths:{
        jquery:'./jquery.min',
        cookie:'./cookie',
        detail:'./lib/detail'
    }
});

require(['jquery','detail'],function($,detail){
    detail.render(function(id,price){
        $('#detail-row').on('click',function(ev){
            detail.additem(id,$('#number').val(),price)
            ev.preventDefault()
        });
        
        detail.myevent();
        detail.picListEv();
        detail.addressEv();
        detail.floorEv();
    })
    
})