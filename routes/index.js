let router = require('koa-router')();
let path = require('path');
let React = require('react');
let ReactDOMServer = require('react-dom/server');
let Provider = require('react-redux').Provider;
let Home = require('../public/src/components/Home');
process._INITIAL_STATE_ = require('../public/src/redux/store/data');
let store = require('../public/src/redux/store/index');
let { StaticRouter } = require('react-router');

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