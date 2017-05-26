// import {Provider} from 'react-redux';
// import store from '$redux/store';
// import routes from '$routes';
let React = require('react');
let store = require('./store/index.js');
let routes = require('../routes/index.js');
let Provider = require('react-redux').Provider;

/*
export default <Provider store={store}>
    {routes}
  </Provider>*/

module.exports = (<Provider store={store}>{routes}</Provider>)