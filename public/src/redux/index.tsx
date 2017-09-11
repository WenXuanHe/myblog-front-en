
// let React = require('react');
// let getStore = require('./store/index.js');
// let routes = require('../routes/index.js');
// let Provider = require('react-redux').Provider;
// let store = getStore(window['_INITIAL_STATE_']);
/*
export default <Provider store={store}>
    {routes}
  </Provider>*/

import * as React from 'react'
import {Provider} from 'react-redux'
import getStore from './store/index'
import routes from '../routes'

let store = getStore(window['_INITIAL_STATE_'])

export default (
  <Provider store={store}>
    {routes}
  </Provider> 
)