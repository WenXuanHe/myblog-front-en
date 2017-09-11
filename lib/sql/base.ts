import * as queryString from 'querystring'

// // 新建works表
// CREATE TABLE `blog`.`works` ( `id` INT NOT NULL AUTO_INCREMENT , `userID` INT NOT NULL ,
// `title` VARCHAR(50) NOT NULL , `lastModified` DATETIME NOT NULL , `isDelete` INT(2) NOT NULL DEFAULT '0', PRIMARY KEY (`id`)) ENGINE = InnoDB;
// //新建articles表
// CREATE TABLE `blog`.`articles` ( `id` INT NOT NULL AUTO_INCREMENT , `userID` INT NOT NULL , `workID` INT NOT NULL ,
// `title` VARCHAR(100) NOT NULL , `simpleContent` VARCHAR(100) NOT NULL, `content` TEXT NOT NULL , `lastModified` DATETIME NOT NULL , `isDelete` INT(2) NOT NULL DEFAULT '0', PRIMARY KEY (`id`)) ENGINE = InnoDB;
// // 创建user表
// CREATE TABLE `blog`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(30) NOT NULL , `hash` VARCHAR(100) NOT NULL , `salt` VARCHAR(100) NOT NULL ,
// `lastModified` DATETIME NOT NULL , `isDelete` INT(2) NOT NULL DEFAULT '0', PRIMARY KEY (`id`)) ENGINE = InnoDB;
interface ConditionType{
    type:string,
    tblName:string, 
    field:string, 
    condition:string, 
    updateField:string, 
    sort:string, 
    otherwise:string
}

class Base {
    Connection:any;
    constructor(Connection){
        this.Connection = Connection;
    }
    /**
     * 封装promise
     */
    promise(callBack:(resolve:(value?: {} | PromiseLike<{}>) => void, reject:(reason?: any) => void) => void) {
        if (typeof callBack !== 'function') {
            console.error('promise must input function');
            return;
        }

        return new Promise(function (resolve, reject) {
            callBack(resolve, reject);
        });
    }


    /**
     * 构造sql
     * @param {*} param0 参数对象
     * @param {string} param0.type-增INSERT，删DELETE，查QUERY，改UPDATE 的类型
     * @param {string} param0.tblName-操作的表名
     * @param {array}  param0.field-要返回的字段或者要操作的字段
     * @param {object} param0.updateField-要更新的字段
     * @param {object} param0.condition-条件字段
     * @param {string} 特殊的条件处理
     */
    constructCondition({type, tblName, field, condition, updateField, sort='lastModified DESC', otherwise=''}:ConditionType){
        let result = '';
        let con = queryString.stringify(condition, " AND ", "=");
        updateField = queryString.stringify(updateField, ",", "=");
        switch(type){
            case 'QUERY':
                result = `SELECT ${field.toString()} FROM ${tblName} WHERE ${con} ${otherwise} ORDER BY ${sort}`;
                break;
            case 'UPDATE':
                result = `UPDATE ${tblName} SET ${updateField} WHERE ${con}`;
                break;
            case 'INSERT':
                result = `INSERT INTO ${tblName} (${field.toString()}) VALUES (${condition.toString()})`;
                break;
            case 'DELETE':
                result = `UPDATE ${tblName} SET isDelete = 1 WHERE ${con}`;
                break;
            default:
                result = `SELECT ${field.toString()} FROM ${tblName} WHERE ${con}`;
                break;
        }

        return result;
    }

    /**
     * 查询数据库
     * @param {string} sql-传入sql， 查询
     */
    query(sql:string){

        return this.Connection().then((connection) =>{

            return this.promise((resolve, reject) => {
                try{
                    return connection.query(sql, (error, results, fields) => {

                        if (error) {
                            return reject(error);
                        }
                        resolve(results);
                    });

                }catch(e){
                    console.error(e);
                }
            });
        });

    }

    insert(sql){

        return this.query(sql).then(function(result){
            return result.insertId;
        });
    }

}

export default Base;
