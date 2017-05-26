// import React from 'react'
// import { HashRouter as Router, Route , Redirect, Switch} from 'react-router-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

let React = require('react');
let { HashRouter, Route , Redirect, Switch, StaticRouter} = require('react-router-dom');
let ReactCSSTransitionGroup = require('react-addons-css-transition-group');
let Bundle = require('../components/Bundle.js');
let Index =  require('../components/Index.js');
let Writer =  require('../components/Writer.js');
// //BrowserRouter
let Router = typeof window === 'undefined' ? StaticRouter : HashRouter;
const initialState = (typeof window !== 'undefined') ? (window['_INITIAL_STATE_'] || {}) : process._INITIAL_STATE_;
// const home = (location, cb) =>{
//     return require.ensure([], require => {
//         let index =  require('../components/Index.jsx');
//         return <index />;
//         // cb(null, require('../components/Index.jsx'));
//     }, 'home');
// }


const home = (props) => (
  <Bundle load={Index}>
      {/*//这里只是给this.props.child传一个方法，最后在Bundle的render里面调用*/}
    {(Component) => <Component {...props}/>}
  </Bundle>
)

const writer = (props) => (
  <Bundle load={Writer}>
      {/*//这里只是给this.props.child传一个方法，最后在Bundle的render里面调用*/}
    {(Component) => <Component {...props}/>}
  </Bundle>
)

const noMatch = (location, cb) =>{
    require.ensure([], require => {
        cb(null, require('../components/NoMatch.js'));
    }, 'noMatch');
}

let router = (
    <Router context={initialState}>
        <div>
            <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={3000}
                    transitionLeaveTimeout={3000}
                >
                <Switch>
                        {/*<Route path="/index"   getComponent={home} />*/}
                        <Route path="/index"  exact  component={home} />
                        <Route path="/writer"  component={writer} />

                        <Redirect from="/" to="/writer" />
                        <Route component={noMatch}/>
                </Switch>
            </ReactCSSTransitionGroup>
        </div>
    </Router>
)

// export default router
module.exports = router;
