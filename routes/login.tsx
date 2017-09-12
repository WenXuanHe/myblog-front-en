
import Router from 'koa-router'
import loginServer, { PasswordType } from '../lib/sql/login'
import getReturnPattern from '../lib/model/return'
const router = new Router()
router.prefix('/login');

router.get('/', async function(ctx, next){
    var old:number = new Date().getTime();
    await next();
    var now:number = new Date().getTime();
    console.log("跳转耗时：" , now - old);
},async function(ctx, next){
     await ctx.render('login', {});
});

router.post('/registorRequest', async function(ctx, next){
    try{
        let {userName, password} = ctx.request.body, result;
        //先判断姓名是否重复
        let res = await loginServer.judgeExitByName(userName, 'count(*) as count');
        let isRepeat = res[0];
        if(!isRepeat.count){
            let {hash, salt}:PasswordType = await loginServer.hashPassword(password);
            //存mysql数据库
            let userID = await loginServer.registor(userName, hash, salt);
            if(userID){
                ctx.session.sessionInfo = {
                    userName,
                    userID,
                    salt,
                    hash,
                };
            }
            result = getReturnPattern(true, '注册成功');
        }else{
            result = getReturnPattern(false, '该账户名已存在,请重新输入');
        }

        ctx.body = result;
    }catch(e){
        ctx.body = getReturnPattern(false, '注册用户失败', e);
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
                userName,
                salt,
                hash,
                userID: res.result.userID
            };
        }
        ctx.body = res;
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
        if(!isRepeat.count){
            ctx.body = getReturnPattern(true, '', {isRepeat:false});
        }else{
            ctx.body = getReturnPattern(true, '', {isRepeat:true});
        }
    }catch(ex){
        ctx.body = getReturnPattern(false, ex);
    }

});

export default router;
