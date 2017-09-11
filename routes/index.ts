// var router = require('koa-router')();
import Router from 'koa-router'
const router = new Router()

router.get('/', async function (ctx, next) {
  if(ctx.session.sessionInfo){
    ctx.redirect('/writer');
  }else{
    ctx.redirect('/login');
  }
});

export default router;
