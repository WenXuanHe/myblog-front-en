
let sqlServer = require('../lib/sql/server');
let data = {
    writer: {
        workList: [],
        articleLists:{},
        currentArticleID:0,
        currentWorkID:0,
        //显示编辑模块
        contentVisible: false
    }
};
/**
 * 传入userID
 */
module.exports = function (userID) {

    return new Promise(async function (resolve, reject) {

        let initData = data;
        try {
            //查询出文集列表
            initData.writer.workList = await sqlServer.queryWorks(userID);
            resolve(initData);
        } catch (e) {
            reject(e);
        }
    });
}