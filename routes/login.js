var router = require('koa-router')();

router.get('/', async function (ctx, next) {
   await ctx.render('login', {});
});

module.exports = router;