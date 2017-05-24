import React from 'react'
import { HashRouter as Router, Route , Redirect, Switch} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
//BrowserRouter
import Index from '$components/Index.jsx'
import Writer from '$components/Writer.jsx'
import NoMatch from '$components/NoMatch.jsx'

export default (
    <Router basename='/blog'>
        <div>
            <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={3000}
                    transitionLeaveTimeout={3000}
                >
                <Switch>
                        <Route path="/index"   component={Index} />
                        <Route path="/writer" exact  component={Writer} />

                        <Redirect from="/" to="/writer" />
                        <Route component={NoMatch}/>
                </Switch>
            </ReactCSSTransitionGroup>
        </div>
    </Router>
)
