// import {Provider} from 'react-redux';
// import store from '$redux/store';
// import routes from '$routes';
let React = require('react');
let getStore = require('./store/index.js');
let routes = require('../routes/index.js');
let Provider = require('react-redux').Provider;
let store = getStore(window['_INITIAL_STATE_']);
/*
export default <Provider store={store}>
    {routes}
  </Provider>*/

module.exports = (
  <Provider store={store}>
    {routes}
  </Provider>
)