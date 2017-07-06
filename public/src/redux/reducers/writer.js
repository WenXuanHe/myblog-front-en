// import data from '../store/data';
let data = require('../store/data');

let reducer = (state = data.writer, action) => {
  const type = action.type;
  const payload = action.payload;
  let workList = Object.assign([], state.workList), work, articleList;
  switch (type) {
    case 'CREATE_NEW_WORK':
        workList.push(payload);
        return _.assign({}, state, {
                workList
            });
    case 'updateTitle':
        work = workList.length && workList[payload.currentWork];
        articleList = work && work.articleList || [];

        if(articleList.length && articleList[payload.currentArticle]){

            articleList[payload.currentArticle].title = payload.value;
            return _.assign({}, state, {
                articleList
            });
        }

        return state;

    case 'CREATE_NEW_ARTICLE':
        work = workList.length && workList[data.login.currentWork];
        articleList = work &&  _.assign([], work.articleList) || [];
        articleList.unshift(payload);
        return _.assign({}, state.workList, {
            articleList
        });
    default:
      return state;
  }
}

// export default reducer;
module.exports = reducer;

