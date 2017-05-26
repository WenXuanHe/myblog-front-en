var router = require('koa-router')();
var path = require('path');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
require("node-jsx").install();
// require('node-jsx').install({
//     extension: '.js'
// });
var InitData = require('../public/src/redux/store/data.js');
process._INITIAL_STATE_ = InitData;
var Provider = require('../public/src/redux/index.js');

router.get('/', async function (ctx, next) {
  console.log(ReactDOMServer.renderToString(Provider));
  await ctx.render('index', {
    initialHTML: ReactDOMServer.renderToString(Provider),
    initialData:{InitData}
  });
})

module.exports = router;