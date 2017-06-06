const redis = require("redis");
const redisClient = redis.createClient();

class RedisServer {

    /**
     * 
     * userInfo -   铁定存在 注册时增加
     * sessionID 登录时指向userInfo{id}
     * sessionInfo { sessionID -> }
     * userName{
     *  name -> sessionID
     * }
     * 
     * @param {*} redisClient 
     */
    constructor(redisClient){
        this.redisClient = redisClient;
        this.connection = false;
        this.connectionError = '';
        redisClient.on("error", function (err) {
            console.log("Error " + err);
        });

        redisClient.select('0', (error)=>{
            if (error) {
                this.connectionError = error;
                return ;
            }
            this.connection = true;
        });
    }

    /**
     * 封装promise， 避免每次都写
     * @param {*} callBack 具体执行的函数 
     */
    promise(callBack){
         return new Promise(function(resolve, reject){
            if(_self.connection){
                callBack(resolve, reject);
            }else{
                 reject(this.connectionError);
            }
         });
    }


}