let router = require('koa-router')();
let getReturnPattern = require('../lib/model/return');
let sqlServer = require('../lib/sql/server');
////支持jsx语法
require('node-jsx').install();

let buildSeverRenderInitData = require('../helper/severRenderInitData');
let buildServerRenderByReact = require('../helper/serverRenderByReact');

router.prefix('/writer');

router.get('/', async function (ctx, next) {
  ctx.redirect('/writer/index');
});

/**
 * 刷新的时候才走后端路由，不刷新时走前端路由
 */
router.get('/writer', async function (ctx, next) {
  let initData;
  try {
    initData = await buildSeverRenderInitData(ctx.session.sessionInfo.userID);
  } catch (e) {
    return ctx.body = getReturnPattern(false, "查询文集列表失败", e);
  }

  await ctx.render('index', {
    initialData: JSON.stringify(initData)
  });

});

/**
 * react SPA的首页
 */
router.get('/index', async function (ctx, next) {

  try {
    let initData = await buildSeverRenderInitData(ctx.session.sessionInfo.userID);
    let html = buildServerRenderByReact(initData);

    await ctx.render('index', {
      initialHTML: html,
      initialData: JSON.stringify(initData)
    });
  } catch (e) {
    return ctx.body = getReturnPattern(false, "查询文集列表失败", e);
  }

});


router.post('/createNewWork', async function (ctx, next) {
  try {
    let { title } = ctx.request.body;
    let { userID } = ctx.session.sessionInfo;
    let workID = await sqlServer.createNewWork({ title, userID });
    return ctx.body = getReturnPattern(true, '新增成功', {
      title,
      userID,
      id: workID,
      articleList: []
    });
  } catch (e) {
    return ctx.body = getReturnPattern(false, '新增文集失败', e);
  }
});

router.post('/createNewArticle', async function (ctx, next) {
  try {
    let { workID } = ctx.request.body;
    let { userID } = ctx.session.sessionInfo;
    let articleID = await sqlServer.createNewArticle({ workID, userID });
    return ctx.body = getReturnPattern(true, '新增成功', {
      workID,
      userID,
      id: articleID,
      title: '',
      content: ''
    });
  } catch (e) {
    return ctx.body = getReturnPattern(false, '新增文章失败', e);
  }
});

router.post('/updateArticleInfo', async function (ctx, next) {
  try {
    let { articleID, title, content } = ctx.request.body;
    let articleInfo = await sqlServer.updateArticleById({ id: articleID, title, content });
    return ctx.body = getReturnPattern(true, '更新成功', articleInfo);

  } catch (e) {
    return ctx.body = getReturnPattern(false, '更新文章失败', e);
  }
});

router.post('/deleteArticleById', async function (ctx, next) {

  try {
    let { articleID } = ctx.request.body;
    await sqlServer.deleteArticleById(articleID);
    return ctx.body = getReturnPattern(true, '删除成功', {
      articleID
    });

  } catch (e) {
    return ctx.body = getReturnPattern(false, '删除文章失败', e);
  }
})

module.exports = router;