
let sqlServer = require('../lib/sql/server');

/**
 * 传入userID
 */
module.exports = function (userID) {

    return new Promise(async function (resolve, reject) {

        let initData = {
            writer: {
                workList: [],
                currentArticleID:0,
                currentWorkID:0
            }
        };
        try {
            //查询出文集列表
            initData.writer.workList = await sqlServer.queryWorks(userID);
            resolve(initData);
        } catch (e) {
            reject(e);
        }
    });
}