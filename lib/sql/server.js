let Connection = require('./connection');
let Base = require('base');

/**
 * 创建user表
 * CREATE TABLE `blog`.`user` ( `id` INT NOT NULL AUTO_INCREMENT , `name` VARCHAR(8) NOT NULL , `password` VARCHAR(32) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;
 * 
 * 
 */
class SqlServer extends Base{

    constructor(Connection) {

        super(Connection);

        this.queryAsync = async function(sql){
            return await this.query(sql);
        }
        this.queryWorkListAsync = async function(){
            return await this.queryWorkList(...arguments);
        }
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

module.exports = new SqlServer(Connection);
