let router = require('koa-router')();
let React = require('react');
let ReactDOMServer = require('react-dom/server');
let Provider = require('react-redux').Provider;
let Home = require('../public/src/components/Home');
let getStore = require('../public/src/redux/store/index');
let { StaticRouter } = require('react-router');
let getReturnPattern = require('../lib/model/return');
let sqlServer = require('../lib/sql/server');

router.prefix('/writer');

router.get('/', async function (ctx, next) {

  let {userID, userName} = ctx.session.sessionInfo, workList=[], articles=[];

  try{
    //查询出文集列表
    workList = await sqlServer.queryWorks(userID);
  }catch(e){
    return ctx.body = getReturnPattern(false, e);
  }

  let initData = {
    login:{
      userID,
      userName
    },
    writer:{
      workList
    }
  };
  let store = getStore(initData);
  let html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter>
          <Home />
      </StaticRouter>
    </Provider>
  );
  await ctx.render('index', {
    initialHTML: html,
    initialData:JSON.stringify(initData)
  });
});

router.post('/createNewWork', async function(ctx, next){
  try{
    let { title } = ctx.request.body;
    let {userID} = ctx.session.sessionInfo;
    let workID = await sqlServer.createNewWork({title, userID});
    ctx.body = getReturnPattern(true, '',  {
      title,
      userID,
      id: workID,
      articleList:[]
    });
  }catch(e){
    return ctx.body = getReturnPattern(false, e);
  }
});

router.post('/createNewArticle', async function(ctx, next){
  try{
    let { workID } = ctx.request.body;
    let { userID } = ctx.session.sessionInfo;
    let articleID = await sqlServer.createNewArticle({workID, userID});
    ctx.body = getReturnPattern(true, '',  {
      workID,
      userID,
      id: articleID,
      title:'',
      content:''
    });
  }catch(e){
    return ctx.body = getReturnPattern(false, e);
  }
});

router.post('/updateArticleInfo', async function(ctx, next){
  try{
    let { articleID, title, content } = ctx.request.body;
    let articleInfo = await sqlServer.updateArticleById({id: articleID, title, content});
    ctx.body = getReturnPattern(true, '',  articleInfo);

  }catch(e){
    return ctx.body = getReturnPattern(false, e);
  }
});

router.post('/deleteArticleById', async function(ctx, next){

  try{
    let { articleID } = ctx.request.body;
    await sqlServer.deleteArticleById(articleID);
    ctx.body = getReturnPattern(true, '',  {
      articleID
    });

  }catch(e){
    return ctx.body = getReturnPattern(false, e);
  }
})

module.exports = router;