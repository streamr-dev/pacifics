import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import styles from './app-styles.pcss'
import without from 'lodash/without'

class App extends Component {
    render() {
        return (
            <div className={['container', styles.appContainer].join(' ')}>
                {/*Nav?*/}
                {this.props.errors.map(e => (
                    <Alert bsStyle="danger" key={Date.now() + e}>
                        {e.message || e}
                    </Alert>
                ))}
                {this.props.children}
                {/*Footer?*/}
            </div>
        )
    }
}

App.propTypes = {
    user: React.PropTypes.object,
    children: React.PropTypes.oneOfType([React.PropTypes.element, React.PropTypes.arrayOf(React.PropTypes.element)]),
    errors: React.PropTypes.array
}

const mapStateToProps = ({user, deliveries, parcels, postboxes}) => {
    return {
        user: user.user,
        // If no errors are defined, errors = []
        errors: without([user.error, deliveries.error, parcels.error, postboxes.error], undefined, null)
    }
}

export default connect(mapStateToProps, null)(App)