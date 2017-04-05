import React, {Component} from 'react'
import {Router, Route, IndexRedirect} from 'react-router'

import App from './components/App'

import ParcelsList from './components/Parcels/ParcelsList'
import ParcelsShow from './components/Parcels/ParcelsShow'
import ParcelsCreate from './components/Parcels/ParcelsCreate'
import ParcelsTrack from './components/Parcels/ParcelsTrack'

import DeliveryCreate from './components/Deliveries/DeliveriesCreate'

import PostboxesCreate from './components/Postboxes/PostboxesCreate'

import SignupPage from './components/SignupPage'
import LoginPage from './components/LoginPage'
import store, {history} from './store.js'

import {getParcel, getAllParcels, ensureParcelIsFetched} from './actions/parcel'
import {getAllServices} from './actions/service'

export default class ReactRouter extends Component {
    
    static requireAuth(nextState, replace) {
        if (!store.getState().user || !store.getState().user.user) {
            replace('/login')
        }
    }
    
    render() {
        return (
            <Router history={history}>
                <Route path="signup" component={SignupPage} onEnter={() => store.dispatch(getAllServices())}/>
                <Route path="login" component={LoginPage}/>
                <Route path="/" onEnter={ReactRouter.requireAuth} component={App}>
                    <Route path="/parcels" component={ParcelsList} onEnter={() => store.dispatch(getAllParcels())}/>
                    <Route path="/parcels/create" component={ParcelsCreate}/>
                    <Route path="/parcels/:id" component={ParcelsShow} onEnter={location => store.dispatch(getParcel(location.params.id))}/>
                    <Route path="/parcels/:id/track" component={ParcelsTrack} onEnter={location => store.dispatch(ensureParcelIsFetched(location.params.id))}/>
                    <Route path="/parcels/:id/deliveries/create" components={DeliveryCreate} onEnter={location => store.dispatch(ensureParcelIsFetched(location.params.id))}/>
                    <Route path="/postboxes/create" components={PostboxesCreate}/>
                    <IndexRedirect to="/parcels"/>
                </Route>
            </Router>
        )
    }
}