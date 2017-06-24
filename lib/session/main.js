const Koa = require("koa");
const session = require("koa-session2");
const Store = require("./Store.js");
 
const app = new Koa();
 
app.use(session({
    store: new Store()
}));
 
app.use(ctx => {
    let user = ctx.session.user;
 
    ctx.session.view = "index";
});