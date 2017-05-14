import React from 'react'
import { BrowserRouter as Router, Route , Redirect} from 'react-router-dom'
import Index from '../components/Index'

export default (
    <Router>
        <div>
            <Route path="/index" component={Index} />

            <Redirect from="*" to="/index" />
        </div>
    </Router>
)
