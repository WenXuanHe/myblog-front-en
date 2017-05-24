var router = require('koa-router')();
var React = require('react');
var ReactDOMServer = require('react-dom/server');
// var Test = require('../public/src/components/Test.js');
var HelloBox = React.createElement('h1',null,'HelloBox');
var cc = React.createElement('div', null, HelloBox );

router.get('/', async function (ctx, next) {
  console.log(cc);
  console.log(React.createFactory(cc));
  await ctx.render('index', {
    initialHTML:ReactDOMServer.renderToString(cc),
    initialData:{name:'hewenxuan'}
  });
})

router.get('/foo', async function (ctx, next) {
  await ctx.render('index', {
    title: 'koa2 foo'
  });
});

module.exports = router;
