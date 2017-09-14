import data from '../store/data'
import utils from '$utils/index'
import {ActionTypes} from '$redux/actionType/index'
import * as immutable from 'immutable'
import { isMap, isList } from '$utils/immutable-extend'

let { Map, List} = immutable;
let findIndex = (data:immutable.List<immutable.Map<string, {}>>, id:number) => {
    let index = -1;
    data.forEach((item, i) => {
        if(item.get('id') === id){
            return index = i;
        }
    });
    return index;
}

let reducer = (state = data.writer, action) => {

    let workList = state.get('workList'), 
    currentWorkID = state.get('currentWorkID').toString(), 
    currentArticleID = state.get('currentArticleID').toString();

    switch (action.type) {
        // 创建新文集
        case ActionTypes.CREATE_NEW_WORK:
            return state.set('workList', workList.unshift(Map(action.payload)));
        // 改变当前文集
        case ActionTypes.CHANGE_ACTIVE_WORK:

            var articleID = action.payload.articleList.length ? action.payload.articleList[0].id : 0;

            return state.set('articleLists', Map({
                    [action.payload.workID]: Map(utils.arrayToHashByID(action.payload.articleList, 'id'))
                }))
                .set('currentWorkID', action.payload.workID)
                .set('currentArticleID', articleID);
        // 改变当前文章
        case ActionTypes.CHANGE_ACTIVE_ARTICLE:
            return state.set('currentArticleID', action.payload.articleID);
        // 更新文章信息
        case ActionTypes.UPDATE_ARTICLE_INFO:
            let res = null;
            Object.keys(action.payload).forEach(function(key){
                res = state.setIn(['articleLists', currentWorkID, currentArticleID, key], action.payload[key]);
            });

            return res;
        // 新建文章
        case ActionTypes.CREATE_NEW_ARTICLE:

            return state.setIn(['articleLists', currentWorkID, action.payload.id.toString()], Map(action.payload));
        case ActionTypes.DELETE_ARTICLE:

            let articleLists = state.getIn(['articleLists', currentWorkID]).delete(action.payload.articleID.toString())
            return state.setIn(['articleLists', currentWorkID], articleLists);
        case ActionTypes.DELETE_WORK:
            workList = workList.delete(findIndex(workList, action.payload.workID));
            return state.set('workList', workList);
        default:
            return state;
    }
}

export default reducer;

