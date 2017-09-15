import data from '../store/data'
import { deal } from './writerImpl'

let reducer = (state = data.writer, action) => {

    let workList = state.get('workList'), 
    currentWorkID:string = state.get('currentWorkID').toString(), 
    currentArticleID:string = state.get('currentArticleID').toString();

    return typeof deal[action.type] === 'function' ? 
        deal[action.type](state, action, {workList, currentWorkID, currentArticleID}) : state;

    // switch (action.type) {
    //     // 创建新文集
    //     case ActionTypes.CREATE_NEW_WORK:
    //         return state.set('workList', workList.unshift(Map(action.payload)));
    //     // 改变当前文集
    //     case ActionTypes.CHANGE_ACTIVE_WORK:

    //         var articleID = action.payload.articleList.length ? action.payload.articleList[0].id : 0;

    //         return state.set('articleLists', Map({
    //                 [action.payload.workID]: Map(utils.arrayToHashByID(action.payload.articleList, 'id'))
    //             }))
    //             .set('currentWorkID', action.payload.workID)
    //             .set('currentArticleID', articleID);
    //     // 改变当前文章
    //     case ActionTypes.CHANGE_ACTIVE_ARTICLE:
    //         return state.set('currentArticleID', action.payload.articleID);
    //     // 更新文章信息
    //     case ActionTypes.UPDATE_ARTICLE_INFO:
    //         let res = null;
    //         Object.keys(action.payload).forEach(function(key){
    //             res = state.setIn(['articleLists', currentWorkID, currentArticleID, key], action.payload[key]);
    //         });

    //         return res;
    //     // 新建文章
    //     case ActionTypes.CREATE_NEW_ARTICLE:

    //         return state.setIn(['articleLists', currentWorkID, action.payload.id.toString()], Map(action.payload));
    //     case ActionTypes.DELETE_ARTICLE:

    //         let articleLists = state.getIn(['articleLists', currentWorkID]).delete(action.payload.articleID.toString())
    //         return state.setIn(['articleLists', currentWorkID], articleLists);
    //     case ActionTypes.DELETE_WORK:

    //         return state.set('workList', workList.delete(findIndex(workList, action.payload.workID)));
    //     default:
    //         return state;
    // }
}

export default reducer;

