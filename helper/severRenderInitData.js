
let sqlServer = require('../lib/sql/server');

/**
 * 传入userID
 */
module.exports = function (userID) {

    return new Promise(async function (resolve, reject) {

        let initData = {
            writer: {
                workList: []
            }
        };
        try {
            //查询出文集列表
            let workList = await sqlServer.queryWorks(userID);
            if (Array.isArray(workList)) {
                initData.writer.workList = workList;
            }
            resolve(initData);
        } catch (e) {
            reject(e);
        }
    });
}