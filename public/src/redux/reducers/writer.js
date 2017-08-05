// import data from '../store/data';
let data = require('../store/data');
let utils = require('../../utils/index');
let _ = require('lodash');
let ActionTypes = require('../actionType/index');

let reducer = (state = data.writer, action) => {

    //深复制workList
    let workList = _.cloneDeep(state.workList);

    switch (action.type) {
        // 创建新文集
        case ActionTypes.CREATE_NEW_WORK:
            return create_new_work(state, workList, action);
        // 改变当前文集
        case ActionTypes.CHANGE_ACTIVE_WORK:
            return change_active_work(state, workList, action);
        // 更新文章信息
        case ActionTypes.UPDATE_ARTICLE_INFO:
            return update_article_info(state, workList, action);
        // 新建文章
        case ActionTypes.CREATE_NEW_ARTICLE:
            return create_new_article(state, workList, action);
        case ActionTypes.CHANGE_ACTIVE_ARTICLE:
            return change_active_article(state, workList, action);
        case ActionTypes.DELETE_ARTICLE:
            return delete_article(state, workList, action);
        case ActionTypes.UPDATE_TITLE:
            var workInfo = utils.getCurrentWorkInfo(workList, state.currentWorkID);
            var articleInfo = utils.getCurrentArticleInfo(workInfo.articleList, state.currentArticleID);
                articleInfo = Object.assign(articleInfo, {title: action.payload});
            return _.assign({}, state, {
                workList
            });
        default:
            return state;
    }
}

function create_new_work(state, workList, action) {
    workList.push(action.payload);
    return _.assign({}, state, {
        workList
    });
}

function delete_article(state, workList, action) {
    //从workInfo里删除当前那条article消息
    var workInfo = utils.getCurrentWorkInfo(workList, state.currentWorkID);
    workInfo.articleList = workInfo.articleList.filter((item) => item.id !== action.payload.articleID);
    return _.assign({}, state, {
        workList
    });
}

function change_active_article(state, workList, action) {
    let { workID, articleID } = action.payload;
    let articleIDHash = JSON.parse(localStorage.getItem('currentArticleIDHash') || '{}');
    articleIDHash[workID] = articleID;
    localStorage.setItem('currentArticleIDHash', JSON.stringify(articleIDHash));
    return _.assign({}, state, {
        currentArticleID: articleID
    });
}

function update_article_info(state, workList, action) {

    var workInfo = utils.getCurrentWorkInfo(workList, state.currentWorkID);
    var articleInfo = utils.getCurrentArticleInfo(workInfo.articleList, state.currentArticleID);

    articleInfo = Object.assign(articleInfo, action.payload)
    return _.assign({}, state, {
        workList
    });
    // if (action.status === 'success') {

    // } else if (action.status === 'error') {
    //     return state;
    // } else if (action.payload.data) {

    //     articleInfo = Object.assign(articleInfo, action.payload.data);
    //     return _.assign({}, state, {
    //         workList
    //     });

    // }
    // return state;
}


function create_new_article(state, workList, action) {

    var workInfo = utils.getCurrentWorkInfo(workList, state.currentWorkID);
    var articleList = workInfo && workInfo.articleList || [];
    articleList.unshift(action.payload);
    workInfo.articleList = articleList;
    state.workList = workList;
    return _.assign({}, state, {
        workList
    });
}

function setArticleIDHash(articleList, workID) {
    let articleIDHash = JSON.parse(localStorage.getItem('currentArticleIDHash') || '{}');
    let articleID = 0;
    if (articleIDHash && articleIDHash[workID]) {
        articleID = articleIDHash[workID];
    } else if (articleList.length > 0) {
        articleID = articleList[0].id;
        articleIDHash[workID] = articleID;
        localStorage.setItem('currentArticleIDHash', JSON.stringify(articleIDHash));
    }
    return +articleID;
}

function change_active_work(state, workList, action) {
    let articleIDHash = JSON.parse(localStorage.getItem('currentArticleIDHash') || '{}');
    let articleID = setArticleIDHash(action.payload.articleList, action.payload.workID);
    workList.forEach(function (item) {
        if (item.id === action.payload.workID) {
            item.articleList = action.payload.articleList;
        }
    });
    //每一次改变都加到localStorage里面去
    localStorage.setItem('currentWorkID', action.payload.workID);
    return _.assign({}, state, {
        workList,
        currentWorkID: +action.payload.workID,
        currentArticleID: articleID
    });
}
// export default reducer;
module.exports = reducer;

