let data = require('../store/data');
let utils = require('../../utils/index');
let ActionTypes = require('../actionType/index');
let { Map, List} = require('immutable');
let { isMap, isList } = require('../../utils/immutable-extend');

let reducer = (state = data.writer, action) => {

    let newState = isMap(state) ? state: Map(state),
        workList = List(newState.get('workList')),
        currentWorkID = newState.get('currentWorkID'),
        currentArticleID = newState.get('currentArticleID');

    switch (action.type) {
        // 创建新文集
        case ActionTypes.CREATE_NEW_WORK:

            return newState.set('workList', workList.push(action.payload));
        // 改变当前文集
        case ActionTypes.CHANGE_ACTIVE_WORK:

            var articleID = action.payload.articleList.length ? action.payload.articleList[0].id : 0;

            return newState.set('articleLists', Map({
                    [action.payload.workID]: Map(utils.arrayToHashByID(action.payload.articleList, 'id'))
                }))
                .set('currentWorkID', +action.payload.workID)
                .set('currentArticleID', articleID);
        // 改变当前文章
        case ActionTypes.CHANGE_ACTIVE_ARTICLE:
            return newState.set('currentArticleID', action.payload.articleID);
        // 更新文章信息
        case ActionTypes.UPDATE_ARTICLE_INFO:

            Object.keys(action.payload).forEach(function(key){
                newState = newState.setIn(['articleLists', currentWorkID.toString(), currentArticleID.toString(), key], action.payload[key]);
            });

            return newState;
        // 新建文章
        case ActionTypes.CREATE_NEW_ARTICLE:

            return newState.setIn(['articleLists', currentWorkID.toString(), action.payload.id.toString()], Map(action.payload));

        case ActionTypes.DELETE_ARTICLE:

            let articleLists = newState.getIn(['articleLists', currentWorkID.toString()]).delete(action.payload.articleID.toString())

            return newState.setIn(['articleLists', currentWorkID.toString()], articleLists);

        default:
            return newState;
    }
}

module.exports = reducer;

