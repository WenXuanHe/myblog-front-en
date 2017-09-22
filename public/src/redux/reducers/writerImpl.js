import utils from '$utils/index'
import {ActionTypes} from '$redux/actionType/index'
import {Map, List} from 'immutable'

export const deal = {
    //创建新文集
    [ActionTypes.CREATE_NEW_WORK]:function(state, action, {workList}){
        return state.set('workList', workList.unshift(Map(action.payload)));
    },
    //新建文章
    [ActionTypes.CREATE_NEW_ARTICLE]:function(state, action, {currentWorkID}){
        return state.setIn(['articleLists', currentWorkID, action.payload.id.toString()], Map(action.payload));
    },
    //改变当前文集
    [ActionTypes.CHANGE_ACTIVE_WORK]:function(state, action){

        var articleID = action.payload.articleList.length ? action.payload.articleList[0].id : 0;    
        return state.withMutations((map) =>{
            map.set('articleLists', Map({
                [action.payload.workID]: Map(utils.arrayToHashByID(action.payload.articleList, 'id'))
            }))
            .set('currentWorkID', action.payload.workID)
            .set('currentArticleID', articleID);
        });  
    },
    //改变当前文章
    [ActionTypes.CHANGE_ACTIVE_ARTICLE]:function(state, action){
        return state.set('currentArticleID', action.payload.articleID);
    },
    //更新文章
    [ActionTypes.UPDATE_ARTICLE_INFO]:function(state, action, {currentWorkID, currentArticleID}){
        
        var keyList = ['articleLists', currentWorkID, currentArticleID];
        return state.setIn(keyList, state.getIn(keyList).mapEntries(([key, value])=>{
                return [key, action.payload[key] ? action.payload[key] : value];
            })
        )
    },
    //删除文章
    [ActionTypes.DELETE_ARTICLE]:function(state, action, {currentWorkID}){

        let articleList = state.getIn(['articleLists', currentWorkID]).delete(action.payload.articleID.toString())
        return state.setIn(['articleLists', currentWorkID], articleList);
    },
    //删除文集
    [ActionTypes.DELETE_WORK]: function(state, action, {workList}){

        let key = workList.findKey(value => value.get('id') === action.payload.workID)
        return state.set('workList', workList.delete(key));
    }
}