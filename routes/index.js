var router = require('koa-router')();
require('node-jsx').install({
    extension: '.jsx'
});
var React = require('react');

// var ReactDOMServer = require('react-dom/server');

var writer = React.createFactory(require('../public/src/components/Writer.jsx'));
var initData = require('../public/src/redux/store/data.js');
// var Test = require('../public/src/components/Test.js');

router.get('/', async function (ctx, next) {
  await ctx.render('index', {
    initialHTML:React.renderToString(writer(initData)),
    initialData:initData
  });
})

module.exports = router;
