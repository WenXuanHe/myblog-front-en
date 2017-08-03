// import React from 'react'
// import { HashRouter as Router, Route , Redirect, Switch} from 'react-router-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

let React = require('react');
let { BrowserRouter , Route , Redirect, Switch, StaticRouter} = require('react-router-dom');
let Bundle = require('../components/Bundle.js');
// let Home =  require('bundle-loader?lazy&name=home!../components/Home.js');
let Home = require('../components/Home.js');
let Writer =  require('bundle-loader?lazy&name=writer!../components/Writer.js');
let NoMatch =  require('bundle-loader?lazy&name=noMatch!../components/NoMatch.js');
// //BrowserRouter
let Router = BrowserRouter ;
const initialState = window['_INITIAL_STATE_'] || {};

/*const home = (props) => (
  <Bundle load={Home}>
    {(Component) => <Component {...props}/>}
  </Bundle>
)*/

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
                <Route path="/index"  exact  component={Home} />
                <Route path="/writer"  component={writer} />

                <Redirect from="/" to="/index" />
                <Route component={noMatch}/>
            </Switch>
        </div>
    </Router>
)

// export default router
module.exports = router;
