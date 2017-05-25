var router = require('koa-router')();
var path = require('path');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
require('node-jsx').install({
    extension: '.jsx'
});

// require("babel-core").transform("code", {
//   plugins: ["syntax-dynamic-import"]
// });
// import Test from '../public/src/index.js';
// var Test = require('../public/src/index.js');

router.get('/', async function (ctx, next) {
  await ctx.render('index', {
    // initialHTML: ReactDOMServer.renderToString(Test),
    // initialData:{}
  });
})

module.exports = router;
