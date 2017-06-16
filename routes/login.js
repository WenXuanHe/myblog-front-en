var router = require('koa-router')();
var loginServer = require('../lib/sql/login');
router.prefix('/login');


router.post('/loginRequest', async function(ctx, next){

    try{

        let {userName, password} = ctx.request.body;
        let result = await loginServer.login(userName, password);
    }catch(e){

    }
    
});

router.post('/judgeRepeat', async function(ctx, next){
    try{
        //GET请求在this.query里，POST在this.request.body里
        let {userName} = ctx.request.body;
        let isRepeat = await loginServer.judgeRepeatByUserName(userName);
        //未重复
        if(isRepeat.count === 0){
            return ctx.body = {
                code:1,
                isRepeat:false
            };
        }else{
            return ctx.body = {
                code:1,
                isRepeat:true
            };
        }
    }catch(ex){
        console.error(ex);
        return ctx.body = {
            code:0,
            error:ex
        };
    }
   
});

module.exports = router;