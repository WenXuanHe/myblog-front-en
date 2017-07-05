var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  if(ctx.session.sessionInfo){
    ctx.redirect('/writer');
  }else{
    ctx.redirect('/login');
  }
  
  //  ctx.res.redirect('/login');
});

module.exports = router;
