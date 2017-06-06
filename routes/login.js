var router = require('koa-router')();
var loginServer = require('../lib/sql/login');
router.prefix('/login');

router.post('/judgeRepeat', function(ctx, next){
    try{
        //GET请求在this.query里，POST在this.request.body里
        let {userName} = ctx.request.body;
        loginServer.judgeRepeatByUserName(userName)
        .then(function(res){

        })
        .catch(function(e){

        })
    }catch(ex){
        console.error(ex);
    }
   
});

module.exports = router;