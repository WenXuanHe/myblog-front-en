/**
 * 开放基础接口
 */

import * as Router from 'koa-router'
import sqlServer from '../lib/sql/server'
import getReturnPattern from '../lib/model/return'

const router = Router()
router.prefix('/base');

router.get('/queryArticlesByworkId', async function (ctx, next) {
    let { workID } = ctx.query;
    try {
        let articleList = await sqlServer.queryArticlesByworkId(workID);
        return ctx.body = getReturnPattern(true, '', articleList);
    } catch (e) {
        return ctx.body = getReturnPattern(false, e);
    }
});

router.get('/queryWorks', async function (ctx, next) {
    let { userId } = ctx.query;
    try {
        let works = await sqlServer.queryWorks(userId);
        return ctx.body = getReturnPattern(true, '', works);
    } catch (e) {
        return ctx.body = getReturnPattern(false, e);
    }
});

router.get('/queryArticlesByUserId', async function (ctx, next) {
    let { userId } = ctx.query;
    try {
        let articleList = await sqlServer.queryArticlesByUserId(userId);

        return ctx.body = getReturnPattern(true, '', articleList);
    } catch (e) {
        return ctx.body = getReturnPattern(false, '查询失败', e);
    }
});

router.post('/persistenceTimingInfo', async function (ctx, next) {

    let { connectTime, pageLoadTime, renderTime } = ctx.request.body;
    try {
        let result = await sqlServer.persistenceTimingInfo({ connectTime, pageLoadTime, renderTime });
        return ctx.body = getReturnPattern(true, '持久化页面渲染信息成功', result);
    } catch (e) {
        return ctx.body = getReturnPattern(false, '持久化页面渲染信息失败', e);
    }
})
export default router;
