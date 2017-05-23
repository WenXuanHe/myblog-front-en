import data from '../store/data';

export default (state = data.writer, action) => {
  const type = action.type;
  const payload = action.payload;
  let workList = Object.assign([], state.workList);
  let work = workList.length && workList[payload.currentWork];
  let articleList = work && work.articleList || [];
  switch (type) {
    case 'createNewWork':
        workList.push(payload);
        return _.assign({}, state, {
                workList
            });
    case 'updateTitle':
        if(articleList.length && articleList[payload.currentArticle]){

            articleList[payload.currentArticle].title = payload.value;
            return _.assign({}, state, {
                articleList
            });
        }

        return state;

    case 'createNewArticle':
        articleList.unshift(payload);
        return _.assign({}, state, {
            articleList
        });
    default:
      return state;
  }
}

