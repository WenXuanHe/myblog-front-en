
import sqlServer from '../lib/sql/server'
import data from '../public/src/redux/store/data'

/**
 * 传入userID
 */
export default function (userID:number|string) {

    return new Promise(async function (resolve, reject) {

        let initData = data;
        try {
            //查询出文集列表
            let workList = await sqlServer.queryWorks(userID);
            workList = data.writer.setIn(['workList'], workList);
            resolve({writer:workList});
        } catch (e) {
            reject(e);
        }
    });
}