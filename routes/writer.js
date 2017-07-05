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
    if(workList.length){
      // 查询第一个文集下的文章列表
      articleList = await sqlServer.queryArticlesByworkId(workList[0].id);
      workList[0].articleList = articleList;
    }

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
})

module.exports = router;