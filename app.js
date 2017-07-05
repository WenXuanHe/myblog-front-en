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

const index = require('./routes/index');
const login = require('./routes/login');

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
  expires: getExpires(30)
}));

// routes
app.use(index.routes(), index.allowedMethods());
app.use(login.routes(), login.allowedMethods());

module.exports = app;
