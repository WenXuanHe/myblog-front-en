const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const render = require('koa-swig');
const co = require('co');
const path = require('path');
const session = require("koa-session2");
const getExpires = require("./lib/session/expires");
const Store = require("./lib/session/Store");
////支持jsx语法
require('node-jsx').install();

const base = require('./routes/base');
const index = require('./routes/index');
const login = require('./routes/login');
const writer = require('./routes/writer');

// error handler
onerror(app);

app.context.render = co.wrap(render({
    root: path.join(__dirname, '/views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: true
}));
// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'html'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// session模块
app.use(session({
  key: "SESSIONID",
  store: new Store(),
  expires: getExpires(30, 'h')
}));

//验证用户是否过期
app.use(async function (ctx, next) {
  let session = ctx.session.sessionInfo;
  console.log(session);
  if(ctx.originalUrl === '/' || ctx.originalUrl.indexOf('/login') > -1 || session){
    await next();
  }else{
    ctx.redirect('/');
  }
});

// routes
app.use(base.routes(), base.allowedMethods());
app.use(index.routes(), index.allowedMethods());
app.use(login.routes(), login.allowedMethods());
app.use(writer.routes(), writer.allowedMethods());

module.exports = app;
