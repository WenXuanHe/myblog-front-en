import React from 'react'
import { HashRouter as Router, Route , Redirect, Switch} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// //BrowserRouter

const home = (location, cb) =>{
    require.ensure([], require => {
        cb(null, require('$components/Index.jsx').default);
    }, 'home');
}
const writer = (location, cb) =>{
    require.ensure([], require => {
        cb(null, require('$components/Writer.jsx').default);
    }, 'writer');
}
const noMatch = (location, cb) =>{
    require.ensure([], require => {
        cb(null, require('$components/NoMatch.jsx').default);
    }, 'noMatch');
}

export default (
    <Router basename='/blog'>
        <div>
            <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={3000}
                    transitionLeaveTimeout={3000}
                >
                <Switch>
                        <Route path="/index"   getComponent={home} />
                        <Route path="/writer" exact  getComponent={writer} />

                        {/*<Redirect from="/" to="/writer" />*/}
                        <Route getComponent={noMatch}/>
                </Switch>
            </ReactCSSTransitionGroup>
        </div>
    </Router>
)
