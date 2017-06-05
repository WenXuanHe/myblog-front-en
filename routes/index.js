let router = require('koa-router')();
let path = require('path');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
let Provider = require('react-redux').Provider;
let Home = require('../public/src/components/Home');
let getStore = require('../public/src/redux/store/index');
let { StaticRouter } = require('react-router');
let sqlServer = require('../lib/sql_server');

router.prefix('/writer');

//todo  登录后 取登录信息
let login = {
  currentArticleId:'',
  currentWorkId:'',
  userId:'',
  userName:''
};

let workList = sqlServer.queryWorkListAsync(login.userId, login.currentWorkId);
let store = getStore({
  login,
  writer:{
    workList
  }
});

router.get('/', async function (ctx, next) {
  // console.log(ReactDOMServer.renderToString(Provider));
  let html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter>
          <Home />
      </StaticRouter>
    </Provider>
  );
  await ctx.render('index', {
    initialHTML: html,
    initialData:JSON.stringify(process._INITIAL_STATE_)
  });
})

module.exports = router;
