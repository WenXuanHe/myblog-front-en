let Connection = require('./sql_connection');
let queryString = require('queryString');
let connection = Connection({
    host: 'localhost',
    user: 'hewenxuan',
    password: 'Aa111111',
    database:'blog'
});

class SqlServer {

    constructor(connection) {
        this.connection = connection;

        this.queryAsync = async function(sql){
            return await this.query(sql);
        }
        this.queryWorkListAsync = async function(){
            return await this.queryWorkList(...arguments);
        }
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
    constructCondition({type = 'QUERY', tblName, field = ['*'], condition, updateField}){
        let result = '';
        let con = queryString.stringify(condition, ',', '=');
        updateField = queryString.stringify(updateField, ',', '=');

        switch(type){
            case 'QUERY':
                result = `SELECT ${field.toString()} FROM ${tblName} WHERE ${con}`;
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

        return this.promise((resolve, reject) => {
            try{
                this.connection.query(sql, (error, results, fields) => {

                    if (error) reject(error);
                    resolve(results);
                });

            }catch(e){
                console.error(e);
            }
             
        });
    }

    /**
     * 查询某文集下所有的文章
     * 
     * @param {string} workId-文集的id
     */
    queryArticleListByworkId(workId){
        
        let selectSql = this.constructCondition({
            type:'QUERY',
            field:['*'],
            tblName:'articles',
            condition:{
                workId
            }
        });

        return this.queryAsync(selectSql);
    }

    /**
     * 查询出所有文集和当前文集下所有文章
     * @param {string} userId-用户id
     * @param {string} currentWorkId-当前文集id
     */
    queryWorkList(userId, currentWorkId){
        let selectWorkList = this.constructCondition({
            type:'QUERY',
            field:['*'],
            tblName:'works',
            condition:{
                userId
            }
        });
        let selectArticle = this.constructCondition({
            type:'QUERY',
            field:['*'],
            tblName:'articles',
            condition:{
                workId:currentWorkId
            }
        });

        try{
            return Promise.all([
                this.query(selectWorkList), 
                this.query(selectArticle)
            ]).then(function(workList, articleList){
                let currentWork = workList.find((item) => item.id === currentWorkId);
                currentWork.articleList = articleList;
            });
        
        }catch(e){
            console.error(e);
        }
        
    }
}

module.exports = new SqlServer(connection);
