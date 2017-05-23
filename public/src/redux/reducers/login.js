
const login = {
    currentArticle:0,
    currentWork:0
}

export default (state = login, action) => {
  const type = action.type;
  const payload = action.payload;
  switch (type) {
    case 'changeActiveArticle':
        return _.assign({}, state, {
            currentArticle: payload
        });
    case 'currentWork':
        return _.assign({}, state, {
            currentWork: payload
        });
    default:
      return state;
  }
}

