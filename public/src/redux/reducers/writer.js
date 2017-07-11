// import data from '../store/data';
let data = require('../store/data');
let utils = require('./../utils/index');

let reducer = (state = data.writer, action) => {

  //深复制workList
  let workList = _.assign([], state.workList);

  switch (action.type) {
    case 'CREATE_NEW_WORK':
        workList.push(payload);
        return _.assign({}, state, {
                workList
            });
    case 'UPDATE_ARTICLE':
        return update_article(state, workList, action);

    case 'CREATE_NEW_ARTICLE':
        return create_new_article(state, workList, action);
        
    case 'CHANGE_ACTIVE_WORK':
        return change_active_work(state, workList, action);

    default:
      return state;
  }
}

function update_article(state, workList, action){

    var workInfo = utils.getCurrentWorkInfo(workList, state.currentWorkID);
    var articleInfo = utils.getCurrentArticleInfo(workInfo.articleList, state.currentArticleID);
    articleInfo = Object.assign(articleInfo, action.payload)
    return _.assign({}, state, workList);
}


function create_new_article(state, workList, action){

    if(action.status === 'success'){

        var workInfo = utils.getCurrentWorkInfo(workList, state.currentWorkID);
        var articleList = workInfo &&  workInfo.articleList || [];
        articleList.unshift(action.payload);
        workInfo.articleList = articleList;
        return _.assign({}, state, workList);
    }else if(action.status === 'error'){
        return state;
    }else{
        return state;
    }
}
function change_active_work(state, workList, action){
    if(action.status === 'success'){
        workList.forEach(function(item) {
            if(item.id === action.payload.workID){
                item.articleList = action.payload.articleList;
            }
        });
        //每一次改变都加到localStorage里面去
        localStorage.setItem('currentWorkID', action.payload.workID);
        return _.assign({}, state, {
            workList,
            currentWorkID: +action.payload.workID
        });
        
    }else if(action.status === 'error'){
        return state;
    }else{
        return state;
    }
}
// export default reducer;
module.exports = reducer;

