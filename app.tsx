import * as Koa from 'koa'
import * as views from 'koa-views'
import * as json from 'koa-json'
import * as onerror from 'koa-onerror'
import * as createBodyparser from 'koa-bodyparser'
import * as logger from 'koa-logger'
import * as render from 'koa-swig'
import * as co from 'co'
import * as path from 'path'
import * as session from "koa-session2"
import * as getExpires from "./lib/session/expires"
import * as Store from "./lib/session/Store"
import * as base from './routes/base'
import * as index from './routes/index'
import * as login from './routes/login'
import * as writer from './routes/writer'

const app = new Koa();
const bodyparser = createBodyparser();
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
  const start:any = new Date();
  await next();
  const end:any = new Date();
  const ms = end - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// session模块
app.use(session({
  key: "SESSIONID",
  store: new Store(),
  expires: getExpires(300, 'h')
}));

//验证用户是否过期
app.use(async function (ctx, next) {
  let session = ctx.session.sessionInfo;
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
console.log("PID", process.pid);
 export default app;
