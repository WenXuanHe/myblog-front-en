let router = require('koa-router')();
let loginServer = require('../lib/sql/login');
let getReturnPattern = require('../lib/model/return');

router.prefix('/login');
router.post('/registorRequest', async function(ctx, next){
    try{
        let {userName, password} = ctx.request.body;
        let result;
        //先判断姓名是否重复
        let users = await loginServer.judgeExitByName(userName, 'count(*) as count');
        if(!users[0].count){
            let {salt, hash} = await loginServer.hashPassword(password);
            //存mysql数据库
            result = await loginServer.registor(userName, hash, salt);
            if(result){
                ctx.session.sessionInfo = {
                    userName: userName,
                    salt: salt,
                    hash: hash
                };
                //跳转博客页面
                ctx.res.redirect('/writer');
            }
        }else{
            ctx.body = getReturnPattern(true, '该账户名已存在,请重新输入');
        }

    }catch(e){
        ctx.body = getReturnPattern(false, e);
    }
});

router.post('/loginRequest', async function(ctx, next){
    try{
        let {userName, password} = ctx.request.body;
        let res = await loginServer.login(userName, password);
        if(res.status){
            //登录成功
            let {salt, hash} = res.result;
            ctx.session.sessionInfo = {
                userName: userName,
                salt: salt,
                hash: hash
            };
            ////跳转博客页面
            ctx.res.redirect('/writer');
        }else{
            ctx.body = res;
        }
    }catch(e){
        ctx.body = getReturnPattern(false, e);
    }
});

router.post('/judgeRepeat', async function(ctx, next){
    try{
        //GET请求在this.query里，POST在this.request.body里
        let {userName} = ctx.request.body;
        let result = await loginServer.judgeExitByName(userName, 'count(*) as count');
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
