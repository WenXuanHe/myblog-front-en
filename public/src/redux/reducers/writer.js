// let data = require('../store/data');
// let utils = require('../../utils/index');
// let ActionTypes = require('../actionType/index');
// let { Map, List} = require('immutable');
// let { isMap, isList } = require('../../utils/immutable-extend');

import data from '../store/data'
import utils from '$utils/index'
import {ActionTypes} from '$redux/actionType/index'
import * as immutable from 'immutable'
import { isMap, isList } from '$utils/immutable-extend'

let { Map, List} = immutable;
let reducer = (state = data.writer, action) => {

    if(!(state instanceof Map)) state = Map(state);
    let workList = List(state.get('workList')),
        currentWorkID = state.get('currentWorkID'),
        currentArticleID = state.get('currentArticleID');

    switch (action.type) {
        // 创建新文集
        case ActionTypes.CREATE_NEW_WORK:

            return state.set('workList', workList.unshift(action.payload));
        // 改变当前文集
        case ActionTypes.CHANGE_ACTIVE_WORK:

            var articleID = action.payload.articleList.length ? action.payload.articleList[0].id : 0;

            return state.set('articleLists', Map({
                    [action.payload.workID]: Map(utils.arrayToHashByID(action.payload.articleList, 'id'))
                }))
                .set('currentWorkID', +action.payload.workID)
                .set('currentArticleID', articleID);
        // 改变当前文章
        case ActionTypes.CHANGE_ACTIVE_ARTICLE:
            return state.set('currentArticleID', action.payload.articleID);
        // 更新文章信息
        case ActionTypes.UPDATE_ARTICLE_INFO:
            let res = null;
            Object.keys(action.payload).forEach(function(key){
                res = state.setIn(['articleLists', currentWorkID.toString(), currentArticleID.toString(), key], action.payload[key]);
            });

            return res;
        // 新建文章
        case ActionTypes.CREATE_NEW_ARTICLE:

            return state.setIn(['articleLists', currentWorkID.toString(), action.payload.id.toString()], Map(action.payload));

        case ActionTypes.DELETE_ARTICLE:

            let articleLists = state.getIn(['articleLists', currentWorkID.toString()]).delete(action.payload.articleID.toString())

            return state.setIn(['articleLists', currentWorkID.toString()], articleLists);

        default:
            return state;
    }
}

export default reducer;

