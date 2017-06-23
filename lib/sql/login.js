let Connection = require('./connection');
let Base = require('./base');
let bcrypt = require('bcrypt');
let getReturnPattern = require('../model/return');
/**
 * 创建user表
 * CREATE TABLE `blog`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(8) NOT NULL , `password` VARCHAR(32) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
 *
 */
class LoginServer extends Base{

    constructor(Connection) {

        super(Connection);
    }

    judgeRepeatByUserName(userName){
        let sql = this.constructCondition({
            type:'QUERY',
            tblName:'user',
            field: 'count(*) as count',
            condition:{
                name:userName
            }
        });

        return this.query(sql);
    }

    hashPassword(password){

        return new Promise(function (resolve, reject) {

            let result = {};
            bcrypt.genSalt(10, function(err, salt){

                if(err) return reject(err);
                result.salt = salt;
                bcrypt.hash(password, salt, function (err, hash) {
                    if(err) return reject(err);
                    result.hash = hash;
                    resolve(result);
                });
            });
        })

    }

    /**
     * [registor description]注册
     * @param  {[type]} userName [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */
    async registor(userName, password){
        let {salt, hash} = await this.hashPassword(password);
        let sql = this.constructCondition({
            type:'INSERT',
            tblName:'user',
            field: ['name','hash', 'salt'],
            condition:[`'${userName}'`, `'${hash}'`, `'${salt}'`]
        });

        return this.insertUser(sql);
    }

    /**
     * [registor description]登录
     * 1.通过姓名查出salt和password
     * 2.密码+salt 混合后是否等于password
     * 3.相等则登录成功跳转，失败则登录失败
     * @param  {[type]} userName [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */
    async login(userName, password){
        let sql = this.constructCondition({
            type:'QUERY',
            tblName:'user',
            field: '*',
            condition:{
                name:userName
            }
        });
        let users = await this.query(sql), user, hash;
        if(users.length === 0){
            return getReturnPattern(false, '该账号还未注册');
        }
        user = users[0];
        hash = bcrypt.hashSync(password, user.salt);

        return getReturnPattern(user.hash === hash ? true : false , '账号密码错误');
    }

}

module.exports = new LoginServer(Connection);
