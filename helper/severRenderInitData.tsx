
import sqlServer from '../lib/sql/server'
import States from '../public/src/redux/store/data'
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
            let NewData = States.writer.setIn(['workList'], List(workList.map(item => Map(item))));
            resolve({writer: NewData});
        } catch (e) {
            reject(e);
        }
    });
}