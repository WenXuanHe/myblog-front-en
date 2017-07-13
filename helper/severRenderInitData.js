
let sqlServer = require('../lib/sql/server');

/**
 * 传入userID
 */
module.exports = function (userID) {

    return new Promise(async function (resolve, reject) {

        let initData = {
            writer: {
                workList: [],
                articleList:[]
            }
        };
        try {
            //查询出文集列表
            await Promise.all([
                sqlServer.queryWorks(userID),
                sqlServer.queryArticlesByUserId(userID, " AND title!='' ")
            ]).then(function(result){
                initData.writer.workList = result[0];
                initData.writer.articleList = result[1];
            });
            
            resolve(initData);
        } catch (e) {
            reject(e);
        }
    });
}