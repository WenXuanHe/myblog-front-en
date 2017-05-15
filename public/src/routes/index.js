import React from 'react'
import { BrowserRouter as Router, Route , Redirect, Switch} from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Index from '../components/Index'
import Writer from '../components/Writer'
import NoMatch from '../components/NoMatch'

//<Redirect from="*" to="/index" />,
export default (
    <Router basename='/blog'>
        <div>
            <ReactCSSTransitionGroup
                    transitionName="fade"
                    transitionEnterTimeout={3000}
                    transitionLeaveTimeout={3000}
                >
                <Switch>
                        <Route path="/" exact  component={Index} />
                        <Route path="/writer"  component={Writer} />

                        <Route component={NoMatch}/>
                </Switch>
            </ReactCSSTransitionGroup>
        </div>
    </Router>
)
