import React from 'react'
import { BrowserRouter as Router, Route , Redirect, Link, Switch} from 'react-router-dom'
import Index from '../components/Index'
import NoMatch from '../components/NoMatch'
//<Redirect from="*" to="/index" />,
//<Route path="/" component={Index} />
export default (
    <Router>
        <div>
            <Switch>
                <Route path="/" exact  component={Index} />
                <Route component={NoMatch}/>
            </Switch>
        </div>
    </Router>
)
