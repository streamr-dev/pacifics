import React, {Component} from 'react'
import {Router, Route} from 'react-router'

import App from './components/App.jsx'
import SignupPage from './components/SignupPage.jsx'
import LoginPage from './components/LoginPage.jsx'
import /* store, */ {history} from './store.js'

export default class ReactRouter extends Component {
    
    // Uncomment if wanted to check if user is logged in.
    // Also uncomment onEnter below and store above
    //static requireAuth(nextState, replace) {
    //    if (!store.getState().user || !store.getState().user.user) {
    //        replace({
    //            pathname: '/login',
    //            state: {
    //                nextPathname: nextState.location.pathname
    //            }
    //        })
    //    }
    //}
    
    render() {
        return (
            <Router history={history}>
                <Route path="/" component={App} /* onEnter={ReactRouter.requireAuth} */ />
                <Route path="signup" component={SignupPage}/>
                <Route path="login" component={LoginPage}/>
            </Router>
        )
    }
}