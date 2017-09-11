// import React from 'react'
// import { HashRouter as Router, Route , Redirect, Switch} from 'react-router-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// let React = require('react');
// let { BrowserRouter , Route , Redirect, Switch, StaticRouter} = require('react-router-dom');
// let Bundle = require('../components/Bundle.js');
// let Home = require('../components/Home.js');
// let Writer =  require('bundle-loader?lazy&name=writer!../components/Writer.js');
// let NoMatch =  require('bundle-loader?lazy&name=noMatch!../components/NoMatch.js');
// // //BrowserRouter
// let Router = BrowserRouter ;

import * as React from 'react'
import { BrowserRouter as Router , Route , Redirect, Switch, StaticRouter} from 'react-router-dom'
import Bundle from '../components/Bundle'
import Home from '$views/Home'
import Writer from '$views/Writer'
import NoMatch from '$views/NoMatch'
import storeData from '../redux/store/data'

// function lazyLoadComponent(lazyModule) {  
//   return (location, cb) => {
//       lazyModule(module => cb(null, module.default));
//   }
// }

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
