// import React from 'react'
// import { HashRouter as Router, Route , Redirect, Switch} from 'react-router-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// let React = require('react');
// let { BrowserRouter , Route , Redirect, Switch, StaticRouter} = require('react-router-dom');
// let Bundle = require('../components/Bundle.js');
// let Home = require('../components/Home.js');

// // //BrowserRouter
// let Router = BrowserRouter ;

import * as React from 'react'
import { BrowserRouter as Router , Route , Redirect, Switch, StaticRouter} from 'react-router-dom'
import Bundle from '../components/Bundle'
import Home from '$views/Home'
import storeData from '../redux/store/data'
let Writer =  require('bundle-loader?lazy&name=writer!$views/Writer');
let NoMatch =  require('bundle-loader?lazy&name=noMatch!$views/NoMatch');

const initialState = window['_INITIAL_STATE_'] || storeData;

const writer = (props) => (
  <Bundle load={Writer}>
    {(Component) => <Component {...props}/>}
  </Bundle>
)

const noMatch = (props) => (
  <Bundle load={NoMatch}>
    {(Component) => <Component {...props}/>}
  </Bundle>
)

let router = (
    <Router context={initialState} >
        <div>
            <Switch>
                {/*<Route path="/index"   getComponent={home} />*/}
                <Route path="/writer/index" exact  component={Home} />
                <Route path="/writer/writer" component={writer} />

                <Redirect from="/" to="/writer/index" />
                <Route component={noMatch}/>
            </Switch>
        </div>
    </Router>
)

export default router
