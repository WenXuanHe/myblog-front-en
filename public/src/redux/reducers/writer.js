
const writer = {
    articleList:[],
    workList:[]
}

export default (state = writer, action) => {
  const type = action.type;
  const payload = action.payload;
  let articleList = Object.assign([], state.articleList);
  switch (type) {
    case 'createNewWork':
      return state;
    case 'updateTitle':
        articleList[payload.currentArticle].title = payload.value;
        return _.assign({}, state, {
            articleList
        });
    case 'createNewArticle':
        articleList.unshift(payload);
        return _.assign({}, state, {
            articleList
        });
    default:
      return state;
  }
}

