let Connection = require('./connection');
let Base = require('./base');

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
            field: 'count(*)',
            condition:{
                name:userName
            }
        });

        return this.query(sql);
    }

}

module.exports = new LoginServer(Connection);
