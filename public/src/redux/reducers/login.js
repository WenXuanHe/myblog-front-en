// import data from '../store/data';
let data = require('../store/data');

let reducer = (state = data.login, action) => {
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
};

// export default reducer;
module.exports = reducer;

