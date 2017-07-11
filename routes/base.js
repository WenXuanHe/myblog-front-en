/**
 * 开放基础接口
 */

let router = require('koa-router')();
let sqlServer = require('../lib/sql/server');
let getReturnPattern = require('../lib/model/return');

router.prefix('/base');

router.get('/queryArticlesByworkId', async function(ctx, next){
    let {workID} = ctx.query;
    try{
        let articleList = await sqlServer.queryArticlesByworkId(workID);
        return ctx.body = getReturnPattern(true, '', articleList);
    }catch(e){
        return ctx.body = getReturnPattern(false, e);
    }
});

router.get('/queryWorks', async function(ctx, next){
    let {userId} = ctx.query;
    try{
        let works = await sqlServer.queryWorks(workID);
        return ctx.body = getReturnPattern(true, '', works);
    }catch(e){
        return ctx.body = getReturnPattern(false, e);
    }
});

module.exports = router;
