let Connection = require('./connection');
let Base = require('./base');

class SqlServer extends Base{

    constructor(Connection) {

        super(Connection);
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
            field:['*'],
            tblName:'works',
            condition:{
                userId
            }
        });
        
        return await this.query(selectWorks);
        // try{
        //     return Promise.all([
        //         this.query(selectWorks), 
        //         this.query(selectArticle)
        //     ]).then(function(workList, articleList){
        //         let currentWork = workList.find((item) => item.id === currentWorkId);
        //         currentWork.articleList = articleList;
        //     });
        
        // }catch(e){
        //     console.error(e);
        // }
        
    }
}

module.exports = new SqlServer(Connection);
