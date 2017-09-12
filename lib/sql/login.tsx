import Connection from './connection'
import Base from './base'
import * as bcrypt from 'bcryptjs'
import getReturnPattern from '../model/return'

/**
 * Password 返回格式
 */
export type PasswordType = {
    salt?:string,
    hash?: string
}

class LoginServer extends Base {

    constructor(Connection:any) {

        super(Connection);
    }

    hashPassword(password:string){

        return new Promise(function (resolve, reject) {
            let result:PasswordType = {};
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
     * 1.先注册
     * 2.取回userID存在sessonINfo中
     * @param  {[type]} userName [description]
     * @param  {[type]} password [description]
     * @return {[type]}          [description]
     */
    async registor(userName, hash, salt){

        let sql = super.constructCondition({
            type:'INSERT',
            tblName:'user',
            field: ['name','hash', 'salt'],
            condition:[`'${userName}'`, `'${hash}'`, `'${salt}'`]
        });
        console.log("sql", sql);
        return super.insert(sql);
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
        let user, hash;
        let users = await this.judgeExitByName(userName);

        if(users.length === 0){
            return getReturnPattern(false, '该账号还未注册');
        }
        user = users[0];
        hash = bcrypt.hashSync(password, user.salt);

        if(user.hash === hash){
            return getReturnPattern(true, '', {
                salt: user.salt,
                hash: hash,
                userID: user.id
            });
        }else{
            return getReturnPattern(false, '账号密码错误');
        }
    }

    /**
     * 判断姓名是否存在
     * @param  {[type]} userName [description]
     * @param  {String} field    [description]
     * @return {[type]}          [description]
     */
    async judgeExitByName(userName, field='*'){
        let sql = super.constructCondition({
            type:'QUERY',
            tblName:'user',
            field: field,
            condition:{
                name:`'${userName}'`
            }
        });

        return await super.query(decodeURIComponent(sql));
    }

}

export default new LoginServer(Connection);
