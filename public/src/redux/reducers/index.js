// import {combineReducers} from 'redux'
// import writer from './writer'
// import login from './login'

let {combineReducers} = require('redux');
let writer = require('./writer');
let login = require('./login');
// export single root reducer
// export default combineReducers({
//   writer,
//   login
// })
module.exports = combineReducers({
  writer,
  login
});
