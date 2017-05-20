
const writer = {
    articleList:[],
    workList:[],
    login:{
        currentArticle:0,
        currentWork:0
    }
}

export default (state = writer, action) => {
  let {articleList, workList, login} = state;
  const type = action.type;
  const payload = action.payload;

  switch (type) {
    case 'createNewWork':
      return state;
    case 'createNewArticle':
        articleList.unshift(payload);
        return {
            articleList,workList,login
        };
    case 'activeArticle':
        return state;
    default:
      return state;
  }
}

