let router = require('koa-router')();
let loginServer = require('../lib/sql/login');
let getReturnPattern = require('../lib/model/return');

router.prefix('/login');
router.post('/registorRequest', async function(ctx, next){
    try{
        let {userName, password} = ctx.request.body;
        //存mysql数据库
        let result = await loginServer.registor(userName, password);
        if(result.status){
            //存redis，sessionInfo， 设置session过期时间，得到sessionID
        }
    }catch(e){
        ctx.body = getReturnPattern(false, ex);
    }
});

router.post('/loginRequest', async function(ctx, next){
    try{
        let {userName, password} = ctx.request.body;
        let result = await loginServer.login(userName, password);
    }catch(e){
        ctx.body = getReturnPattern(false, ex);
    }
});

router.post('/judgeRepeat', async function(ctx, next){
    try{
        //GET请求在this.query里，POST在this.request.body里
        let {userName} = ctx.request.body;
        let result = await loginServer.judgeRepeatByUserName(userName);
        let isRepeat = result[0];
        //未重复
        if(isRepeat.count === 0){
            ctx.body = getReturnPattern(true, '', {isRepeat:false});
        }else{
            ctx.body = getReturnPattern(true, '', {isRepeat:true});
        }
    }catch(ex){
        ctx.body = getReturnPattern(false, ex);
    }

});

module.exports = router;
