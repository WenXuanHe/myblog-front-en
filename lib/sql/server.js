let Connection = require('./connection');
let Base = require('./base');
let moment = require('moment');

class SqlServer extends Base{

    constructor(Connection) {

        super(Connection);
    }

    /**
     * 新增文集
     */
    async addNewWork({title, userID}){
        let sql = this.constructCondition({
            type:'INSERT',
            tblName:'works',
            field: ['title','userID', 'lastModified', 'isDelete'],
            condition:[`'${title}'`, `'${userID}'`, `'${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'`, 0]
        });
         return await this.insert(sql);
    }

    /**
     * 查询某文集下所有的文章
     * 
     * @param {string} workId-文集的id
     */
    async queryArticlesByworkId(workId){
        
        let selectSql = this.constructCondition({
            type:'QUERY',
            field:['*'],
            tblName:'articles',
            condition:{
                workId
            }
        });

        return await this.query(selectSql);
    }

    
    /**
     * 查询出所有文集
     * @param {string} userId-用户id
     * @param {string} currentWorkId-当前文集id
     */
    async queryWorks(userId){
        let selectWorks = this.constructCondition({
            type:'QUERY',
            field:['id,title,userID'],
            tblName:'works',
            condition:{
                userId
            }
        });
        
        return await this.query(selectWorks);
    }
}

module.exports = new SqlServer(Connection);
