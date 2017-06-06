var router = require('koa-router')();

router.get('/', async function (ctx, next) {
   await ctx.render('login', {});
  //  ctx.res.redirect('/login');
});

module.exports = router;
