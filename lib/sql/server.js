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
    async createNewWork({title, userID}){
        let sql = this.constructCondition({
            type:'INSERT',
            tblName:'works',
            field: ['title','userID', 'lastModified', 'isDelete'],
            condition:[`'${title}'`, `'${userID}'`, `'${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'`, 0]
        });
         return await this.insert(sql);
    }

    /**
     * 新增文章
     * @param {*workID} workID
     * @param {*userID} userID
     */
    async createNewArticle({workID, userID}){
        let sql = this.constructCondition({
            type:'INSERT',
            tblName:'articles',
            field: ['workID','userID', 'lastModified', 'isDelete'],
            condition:[`'${workID}'`, `'${userID}'`, `'${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'`, 0]
        });
        return await this.insert(sql);
    }

    /**
     * 通过id来更新article
     * @param {*{id, title, content}} param0 
     */
    async updateArticleById({id, title='', content=''}){
        let simpleContent = content.slice(0, 50);
        let sql = this.constructCondition({
            type:'UPDATE',
            tblName:'articles',
            updateField:{
                title: `'${title}'`,
                simpleContent: `'${simpleContent}'`,
                content: `'${content}'`,
                lastModified: `'${moment(new Date()).format("YYYY-MM-DD HH:mm:ss")}'`
            },
            condition:{
                id
            }
        });

        return await this.query(decodeURIComponent(sql));
    }

    async deleteArticleById(id){

        let sql = this.constructCondition({
            type:'UPDATE',
            tblName:'articles',
            updateField:{
                isDelete: 1,
            },
            condition:{
                id
            }
        });

        return await this.query(decodeURIComponent(sql));
    }

    /**
     * 查询某文集下所有的文章
     * 
     * @param {string} workID-文集的id
     */
    async queryArticlesByworkId(workID){
        
        let selectSql = this.constructCondition({
            type:'QUERY',
            field:['*'],
            tblName:'articles',
            condition:{
                workID,
                isDelete: 0
            }
        });

        return await this.query(decodeURIComponent(selectSql));
    }
    /**
     * 查询该用户的所有文章
     * @param {*用户ID} userID 
     */
    async queryArticlesByUserId(userID, otherwise=''){
        let selectSql = this.constructCondition({
            type:'QUERY',
            field:['*'],
            tblName:'articles',
            condition:{
                userID,
                isDelete: 0,
            },
            otherwise
        });
        return await this.query(decodeURIComponent(selectSql));
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
                userId,
                isDelete: 0
            }
        });
        
        return await this.query(selectWorks);
    }
}

module.exports = new SqlServer(Connection);
