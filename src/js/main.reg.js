require.config({
    paths:{
        'jquery':'./jquery.min',
        'reg':'./lib/reg'
    }
})

require(['jquery','reg'],function($,reg){
    reg.render()
})