let queryString = require('queryString');

class Base {

    constructor(Connection){
        this.Connection = Connection;
    }
    /**
     * 封装promise
     */
    promise(callBack) {
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
     */
    constructCondition({type, tblName, field, condition, updateField}){
        let result = '';
        let regexp = /=([^,]+)/g;
        let con = queryString.stringify(condition, ",", "=");
        updateField = queryString.stringify(updateField, ",", "=");

        switch(type){
            case 'QUERY':
                result = `SELECT ${field.toString()} FROM ${tblName} WHERE ${con.replace(regexp, "='$1'")}`;
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
    query(sql){

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

    insertUser(sql){

        return this.Connection().then((connection) =>{

            return this.promise((resolve, reject) => {
                try{
                    return connection.query(sql, (error, results, fields) => {

                        if (error) {
                            return reject(error);
                        }
                        resolve(results.insertId);
                    });

                }catch(e){
                    console.error(e);
                }
            });
        });

    }

}

module.exports = Base;
