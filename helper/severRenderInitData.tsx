
import sqlServer from '../lib/sql/server'
import data from '../public/src/redux/store/data'
import {List, Map} from 'immutable'

/**
 * 传入userID
 */
export default function (userID:number|string) {

    return new Promise(async function (resolve, reject) {

        try {
            //查询出文集列表
            let workList = await sqlServer.queryWorks(userID);
            //转换为immutable的格式
            let NewData = data.setIn(['writer', 'workList'], List(workList.Map(item => Map(item))));
            resolve(NewData);
        } catch (e) {
            reject(e);
        }
    });
}