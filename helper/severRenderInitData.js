
let sqlServer = require('../lib/sql/server');
let data = require('../public/src/redux/store/data');
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