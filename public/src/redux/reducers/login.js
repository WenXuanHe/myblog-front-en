import data from '../store/data';

export default (state = data.login, action) => {
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

