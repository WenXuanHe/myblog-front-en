// var router = require('koa-router')();
import * as Router from 'koa-router'
const router = Router()

router.get('/', async function (ctx, next) {
  if(ctx.session.sessionInfo){
    ctx.redirect('/writer');
  }else{
    ctx.redirect('/login');
  }
});

export default router;
